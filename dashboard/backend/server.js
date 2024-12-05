const express = require('express');
const { PORT, FRONTEND_ORIGIN } = require('./config/env');
const ConnectToDB = require('./config/db');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const patnerRoutes = require('./routes/patnerRoutes');
const kolsRoutes = require('./routes/kolsRoutes');
const vcRoutes = require('./routes/vsRoutes');
const taskRoutes = require('./routes/tasksRoute');

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
app.use('/task', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

app.get('/random-card-status-update', async (req, res) => {
    try {
        const previousCardCollaborators = await Promise.all([
            ProjectModel.find({ card: true, tgeDate: null }, { _id: 1 }),
            KolsModel.find({ card: true }, { _id: 1 }),
            PatnersModel.find({ card: true }, { _id: 1 }),
            VcModel.find({ card: true }, { _id: 1 })
        ]);

        const previousCardIds = previousCardCollaborators.flat().map(doc => doc._id);

        await Promise.all([
            ProjectModel.updateMany({ card: true }, { card: false }),
            KolsModel.updateMany({ card: true }, { card: false }),
            PatnersModel.updateMany({ card: true }, { card: false }),
            VcModel.updateMany({ card: true }, { card: false })
        ]);

        const projects = await ProjectModel.find({ _id: { $nin: previousCardIds } }, { _id: 1, createdAt: 1 }).lean();
        const kols = await KolsModel.find({ _id: { $nin: previousCardIds } }, { _id: 1, createdAt: 1 }).lean();
        const partners = await PatnersModel.find({ _id: { $nin: previousCardIds } }, { _id: 1, createdAt: 1 }).lean();
        const vcs = await VcModel.find({ _id: { $nin: previousCardIds } }, { _id: 1, createdAt: 1 }).lean();

        const allCollaborators = [
            ...projects.map(doc => ({ ...doc, type: 'project' })),
            ...kols.map(doc => ({ ...doc, type: 'kol' })),
            ...partners.map(doc => ({ ...doc, type: 'partner' })),
            ...vcs.map(doc => ({ ...doc, type: 'vc' }))
        ];

        const recentTenCollaborators = allCollaborators
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 10);

        if (recentTenCollaborators.length === 0) {
            return res.status(200).json({
                status: 'Failed',
                message: 'No collaborators found for selection.'
            });
        }

        const randomIndices = new Set();
        while (randomIndices.size < 2) {
            randomIndices.add(Math.floor(Math.random() * recentTenCollaborators.length));
        }

        const selectedCollaborators = Array.from(randomIndices).map(index => recentTenCollaborators[index]);

        const updatePromises = selectedCollaborators.map(async collaborator => {
            let Model;
            switch (collaborator.type) {
                case 'project': Model = ProjectModel; break;
                case 'kol': Model = KolsModel; break;
                case 'partner': Model = PatnersModel; break;
                case 'vc': Model = VcModel; break;
            }

            await Model.findByIdAndUpdate(collaborator._id, { card: true });
        });

        await Promise.all(updatePromises);

        return res.status(200).json({
            status: 'success',
            message: 'Random card status update completed!'
        });

    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
        });
    }
});