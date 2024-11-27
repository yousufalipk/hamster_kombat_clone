const express = require('express');
const { PORT, FRONTEND_ORIGIN } = require('./config/env');
const ConnectToDB = require('./config/db');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const patnerRoutes = require('./routes/patnerRoutes');
const kolsRoutes = require('./routes/kolsRoutes');
const vcRoutes = require('./routes/vsRoutes');

const cron = require('node-cron');
const ProjectModel = require('./models/projectSchema');
const KolsModel = require('./models/kolsSchema');
const PatnersModel = require('./models/patnersSchema');
const VcModel = require('./models/vcSchema');

const app = express();

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));

app.use(
    cors({
        origin: function (origin, callback) {
            return callback(null, true);
        },
        optionsSuccessStatus: 200,
        credentials: true,
    })
);

ConnectToDB();

app.get('/', (req, res) => {
    return res.json('Server Running...');
});

app.use('/', userRoutes);
app.use('/project', projectRoutes);
app.use('/patners', patnerRoutes);
app.use('/kols', kolsRoutes);
app.use('/vcs', vcRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

const updateRandomCardStatus = async () => {
    try {
        console.log("Setting random card true!");
        await Promise.all([
            ProjectModel.updateMany({}, { card: false }),
            KolsModel.updateMany({}, { card: false }),
            PatnersModel.updateMany({}, { card: false }),
            VcModel.updateMany({}, { card: false }),
        ]);
        console.log('Set all card values to false.');

        const projects = await ProjectModel.find({}, { _id: 1, createdAt: 1 }).lean();
        const kols = await KolsModel.find({}, { _id: 1, createdAt: 1 }).lean();
        const partners = await PatnersModel.find({}, { _id: 1, createdAt: 1 }).lean();
        const vcs = await VcModel.find({}, { _id: 1, createdAt: 1 }).lean();

        const projectsWithType = projects.map(doc => ({ ...doc, type: 'project' }));
        const kolsWithType = kols.map(doc => ({ ...doc, type: 'kol' }));
        const partnersWithType = partners.map(doc => ({ ...doc, type: 'partner' }));
        const vcsWithType = vcs.map(doc => ({ ...doc, type: 'vc' }));

        const allCollaborators = [
            ...projectsWithType,
            ...kolsWithType,
            ...partnersWithType,
            ...vcsWithType,
        ];

        const recentTenCollaborators = allCollaborators
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 10);

        if (recentTenCollaborators.length === 0) {
            console.log('No collaborators found.');
            return;
        }

        const randomIndex = Math.floor(Math.random() * recentTenCollaborators.length);
        const selectedCollaborator = recentTenCollaborators[randomIndex];

        let Model;
        if (selectedCollaborator.type === 'project') Model = ProjectModel;
        else if (selectedCollaborator.type === 'kol') Model = KolsModel;
        else if (selectedCollaborator.type === 'partner') Model = PatnersModel;
        else if (selectedCollaborator.type === 'vc') Model = VcModel;

        await Model.findByIdAndUpdate(selectedCollaborator._id, { card: true });
        console.log('Updated card status to true for:', selectedCollaborator);
    } catch (error) {
        console.error('Error updating random card status:', error);
    }
};

cron.schedule('0 12 * * *', async () => {
    await updateRandomCardStatus();
    cronJobScheduled = false;
}, {
    timezone: 'Asia/Karachi',
    scheduled: true,
});
