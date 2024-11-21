const ProjectModel = require('../models/projectSchema');

exports.createProject = async (req, res) => {
    try {
        const { name, icon, fromColor, toColor } = req.body;

        if (!name || !icon || !icon.name || !icon.data || !icon.contentType || !fromColor || !toColor) {
            return res.status(400).json({
                status: 'failed',
                message: "All fields are required!",
            });
        }

        const base64Data = icon.data.startsWith('data:image')
            ? icon.data.split(',')[1]
            : icon.data;

        const buffer = Buffer.from(base64Data, 'base64');

        const maxSize = 1 * 1024 * 1024;
        if (buffer.length > maxSize) {
            return res.status(200).json({
                status: 'failed',
                message: "Image size exceeds the maximum allowed size (1MB).",
            });
        }

        const newProject = new ProjectModel({
            name,
            icon: {
                name: icon.name,
                data: icon.data,
                contentType: icon.contentType,
            },
            fromColor,
            toColor,
        });

        await newProject.save();

        res.status(200).json({
            status: 'success',
            message: "Project created successfully!",
            project: {
                id: newProject._id,
                name: newProject.name,
                fromColor: newProject.fromColor,
                toColor: newProject.toColor,
                icon: {
                    name: newProject.icon.name,
                    data: newProject.icon.data,
                    contentType: newProject.icon.contentType,
                },
            },
        });
    } catch (error) {
        console.error("Internal Server Error!", error);
        res.status(500).json({
            status: 'failed',
            message: "Internal Server Error!",
        });
    }
};

exports.removeProject = async (req, res) => {
    try {
        const { projectId } = req.body;

        if (!projectId) {
            return res.status(400).json({
                status: 'failed',
                message: 'Project ID is required!',
            });
        }

        const project = await ProjectModel.findById(projectId);

        if (!project) {
            return res.status(200).json({
                status: 'failed',
                message: 'Project not found!'
            })
        }

        await ProjectModel.findByIdAndDelete(projectId);

        return res.status(200).json({
            status: 'success',
            message: 'Project removed succesfully!'
        })
    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.fetchProjects = async (req, res) => {
    try {
        const projects = await ProjectModel.find();

        if (projects.length === 0) {
            return res.status(200).json({
                status: 'failed',
                message: 'No projects found!',
            });
        }
        return res.status(200).json({
            status: 'success',
            projects: projects
        })
    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.updateProject = async (req, res) => {
    try {
        const { id, name, icon, fromColor, toColor } = req.body;

        if (!id) {
            return res.status(200).json({
                status: 'failed',
                message: "Project ID is required!"
            });
        }

        const updatedProject = await ProjectModel.findByIdAndUpdate(
            id,
            { name, icon, fromColor, toColor },
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return res.status(200).json({
                status: 'failed',
                message: "Project not found!"
            });
        }

        res.status(200).json({
            status: 'success',
            message: "Project updated successfully!",
            project: updatedProject
        });
    } catch (error) {
        console.log("Internal Server Error!", error);
        res.status(500).json({
            status: 'failed',
            message: "Internal Server Error!"
        });
    }
};

exports.toggleComboCard = async (req, res) => {
    try {
        const { projectId } = req.body;

        const project = await ProjectModel.findById(projectId);

        if (!project) {
            return res.status(200).json({
                status: 'failed',
                message: 'Project not found to update!'
            });
        }

        if (project.card === true) {
            project.card = false;
            await project.save();
            return res.status(200).json({
                status: 'success',
                message: 'Project Combo Card Deactivated!',
                project: {
                    card: project.card
                }
            });
        }

        const activeProjects = await ProjectModel.find({ card: true });
        if (activeProjects.length >= 2) {
            return res.status(200).json({
                status: 'failed',
                message: 'Already two combo cards enabled!'
            });
        }

        project.card = true;
        await project.save();
        return res.status(200).json({
            status: 'success',
            message: 'Project Combo Card Activated!',
            project: {
                card: project.card
            }
        });

    } catch (error) {
        console.error('Internal Server Error:', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error',
        });
    }
};
