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
const comboLogs = require('./models/comboCardsLogs');

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
        const updatePreviousCards = [
            ProjectModel.updateMany({ card: true }, { card: false }),
            KolsModel.updateMany({ card: true }, { card: false }),
            PatnersModel.updateMany({ card: true }, { card: false }),
            VcModel.updateMany({ card: true }, { card: false })
        ];

        await Promise.all(updatePreviousCards);

        const fetchCollaborators = [
            ProjectModel.find({ card: false }, { _id: 1, createdAt: 1, name: 1 }).sort({ createdAt: -1 }).limit(10).lean(),
            KolsModel.find({ card: false }, { _id: 1, createdAt: 1, name: 1 }).sort({ createdAt: -1 }).limit(10).lean(),
            PatnersModel.find({ card: false }, { _id: 1, createdAt: 1, name: 1 }).sort({ createdAt: -1 }).limit(10).lean(),
            VcModel.find({ card: false }, { _id: 1, createdAt: 1, name: 1 }).sort({ createdAt: -1 }).limit(10).lean()
        ];

        const [projects, kols, partners, vcs] = await Promise.all(fetchCollaborators);

        const allCollaborators = [
            ...projects.map(doc => ({ ...doc, type: 'project' })),
            ...kols.map(doc => ({ ...doc, type: 'kol' })),
            ...partners.map(doc => ({ ...doc, type: 'partner' })),
            ...vcs.map(doc => ({ ...doc, type: 'vc' }))
        ];

        if (allCollaborators.length === 0) {
            return res.status(200).json({
                status: 'Failed',
                message: 'No collaborators found for selection.'
            });
        }

        const recentTenCollaborators = allCollaborators
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 10);

        const randomIndices = new Set();
        while (randomIndices.size < Math.min(2, recentTenCollaborators.length)) {
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

            return Model.findByIdAndUpdate(collaborator._id, { card: true });
        });

        await Promise.all(updatePromises);

        const log = new comboLogs({
            comboCard1: {
                name: selectedCollaborators[0].name,
                type: selectedCollaborators[0].type
            },
            comboCard2: {
                name: selectedCollaborators[1].name,
                type: selectedCollaborators[1].type
            }
        });

        await log.save();

        return res.status(200).json({
            status: 'success',
            message: 'Random card status update completed!',
            selectedCollaborators
        });
    } catch (error) {
        console.error('Error in random-card-status-update:', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
        });
    }
});