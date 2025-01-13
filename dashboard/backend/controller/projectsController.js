const ProjectModel = require('../models/projectSchema');
const mongoose = require('mongoose');
const { CLOUD_NAME, API_KEY, API_SECRET } = require('../config/env');

const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
});

exports.createProject = async (req, res) => {
    try {
        const { name, icon, fromColor, toColor, lineFromColor, lineToColor, numberOfLevel, baseValues, multipliers } = req.body;

        if (
            !name || !icon || !icon.name || !icon.data || !icon.contentType ||
            !fromColor || !toColor || !lineFromColor || !lineToColor || !numberOfLevel || !baseValues ||
            !baseValues.baseCost || !baseValues.baseReward || !baseValues.baseCpm ||
            !multipliers || !multipliers.costMultiplier || !multipliers.rewardMultiplier || !multipliers.cpmMultiplier
        ) {
            return res.status(400).json({
                status: 'failed',
                message: "All fields are required!",
            });
        }

        const base64Data = icon.data.startsWith('data:image')
            ? icon.data.split(',')[1]
            : icon.data;

        const uploadResult = await cloudinary.uploader.upload(base64Data, {
            folder: 'projects'
        });

        if (!uploadResult || !uploadResult.secure_url) {
            return res.status(500).json({
                status: 'failed',
                message: "Image upload to Cloudinary failed!",
            });
        }

        const levels = [];
        const { baseCost, baseReward, baseCpm } = baseValues;
        const { costMultiplier, rewardMultiplier, cpmMultiplier } = multipliers;

        for (let i = 0; i < numberOfLevel; i++) {
            if (i === 0) {
                levels.push({
                    level: i + 1,
                    cost: baseCost,
                    reward: baseReward,
                    cpm: baseCpm,
                });
            } else {
                const prevLevel = levels[i - 1];
                levels.push({
                    level: i + 1,
                    cost: prevLevel.cost * costMultiplier,
                    reward: prevLevel.reward * rewardMultiplier,
                    cpm: prevLevel.cpm * cpmMultiplier,
                });
            }
        }

        const newProject = new ProjectModel({
            name,
            icon: {
                name: icon.name,
                data: uploadResult.secure_url,
                contentType: icon.contentType,
            },
            fromColor,
            toColor,
            lineFromColor,
            lineToColor,
            levels,
            numberOfLevel: numberOfLevel,
            baseValues: {
                baseCost: baseCost,
                baseReward: baseReward,
                baseCpm: baseCpm
            },
            multipliers: {
                costMultiplier: costMultiplier,
                rewardMultiplier: rewardMultiplier,
                cpmMultiplier: cpmMultiplier
            }
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
                levels,
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
        const { projectId, name, icon, fromColor, toColor, lineToColor, lineFromColor, numberOfLevel, baseValues, multipliers } = req.body;

        if (
            !name || !icon || !icon.name || !icon.data || !icon.contentType ||
            !fromColor || !toColor || !lineToColor || !lineFromColor || !numberOfLevel || !baseValues ||
            !baseValues.baseCost || !baseValues.baseReward || !baseValues.baseCpm ||
            !multipliers || !multipliers.costMultiplier || !multipliers.rewardMultiplier || !multipliers.cpmMultiplier
        ) {
            return res.status(400).json({
                status: 'failed',
                message: "All fields are required!",
            });
        }

        const base64Data = icon.data.startsWith('data:image')
            ? icon.data.split(',')[1]
            : icon.data;

        const uploadResult = await cloudinary.uploader.upload(base64Data, {
            folder: 'projects'
        });

        if (!uploadResult || !uploadResult.secure_url) {
            return res.status(500).json({
                status: 'failed',
                message: "Image upload to Cloudinary failed!",
            });
        }

        const project = await ProjectModel.findById(projectId);
        if (!project) {
            return res.status(404).json({
                status: 'failed',
                message: "Project not found!",
            });
        }

        const levels = [];
        const { baseCost, baseReward, baseCpm } = baseValues;
        const { costMultiplier, rewardMultiplier, cpmMultiplier } = multipliers;

        for (let i = 0; i < numberOfLevel; i++) {
            if (i === 0) {
                levels.push({
                    level: i + 1,
                    cost: baseCost,
                    reward: baseReward,
                    cpm: baseCpm,
                });
            } else {
                const prevLevel = levels[i - 1];
                levels.push({
                    level: i + 1,
                    cost: prevLevel.cost * costMultiplier,
                    reward: prevLevel.reward * rewardMultiplier,
                    cpm: prevLevel.cpm * cpmMultiplier,
                });
            }
        }

        project.name = name;
        project.icon = {
            name: icon.name,
            data: uploadResult.secure_url,
            contentType: icon.contentType,
        };
        project.fromColor = fromColor;
        project.toColor = toColor;
        project.lineToColor = lineToColor;
        project.lineFromColor = lineFromColor;
        project.levels = levels;
        project.numberOfLevel = numberOfLevel;
        project.baseValues = {
            baseCost: baseCost,
            baseReward: baseReward,
            baseCpm: baseCpm,
        };
        project.multipliers = {
            costMultiplier: costMultiplier,
            rewardMultiplier: rewardMultiplier,
            cpmMultiplier: cpmMultiplier,
        };

        await project.save();

        res.status(200).json({
            status: 'success',
            message: "Project updated successfully!",
            project: {
                id: project._id,
                name: project.name,
                fromColor: project.fromColor,
                toColor: project.toColor,
                icon: {
                    name: project.icon.name,
                    data: project.icon.data,
                    contentType: project.icon.contentType,
                },
                levels: project.levels,
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

exports.fetchProjectTasks = async (req, res) => {
    try {
        const { projectId } = req.body;
        const project = await ProjectModel.findById(projectId);

        if (!project) {
            return res.status(200).json({
                status: 'failed',
                message: 'Project not found!',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Project level fetched succesfully',
            tasks: project.tasks
        });
    } catch (error) {
        console.log("Internal Server Error!", error);
        return res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.addProjectTask = async (req, res) => {
    try {
        const { projectId, taskType, iconType, title, link, reward } = req.body;

        const project = await ProjectModel.findById(projectId);

        if (!project) {
            return res.status(200).json({
                status: 'failed',
                message: 'Project not found!',
            });
        }

        const taskData = {
            iconType: iconType,
            taskType: taskType,
            title: title,
            link: link,
            reward: reward,
        };

        project.tasks.push(taskData);

        await project.save();
        return res.status(200).json({
            status: 'success',
            message: 'Task Added Successfully!',
        });

    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!',
        });
    }
};

exports.removeProjectTask = async (req, res) => {
    try {
        const { projectId, taskId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(200).json({
                status: 'failed',
                message: 'Invalid projectId or taskId!',
            });
        }

        const project = await ProjectModel.findById(projectId);

        if (!project) {
            return res.status(200).json({
                status: 'failed',
                message: 'Project not found!',
            });
        }

        const taskIndex = project.tasks.findIndex(task => task._id.toString() === taskId);

        if (taskIndex === -1) {
            return res.status(200).json({
                status: 'failed',
                message: 'Task not found!',
            });
        }

        project.tasks.splice(taskIndex, 1);

        await project.save();

        return res.status(200).json({
            status: 'success',
            message: 'Task removed successfully!',
        });
    } catch (error) {
        console.error("Internal Server Error!", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error',
        });
    }
};

exports.updateProjectTask = async (req, res) => {
    try {
        const { projectId, taskId, newTaskType, newIconType, newTitle, newLink, newReward } = req.body;


        console.log("New Link", newLink);

        if (!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(200).json({
                status: 'failed',
                message: 'Invalid projectId or levelId!',
            });
        }

        const project = await ProjectModel.findById(projectId);

        if (!project) {
            return res.status(200).json({
                status: 'failed',
                message: 'Project not found!',
            });
        }

        const taskToUpdate = project.tasks.find(task => task._id.toString() === taskId);

        if (!taskToUpdate) {
            return res.status(200).json({
                status: 'failed',
                message: 'Task not found!',
            });
        }

        taskToUpdate.taskType = newTaskType;
        taskToUpdate.iconType = newIconType;
        taskToUpdate.title = newTitle;
        taskToUpdate.reward = newReward;
        taskToUpdate.link = newLink;

        await project.save();

        return res.status(200).json({
            status: 'success',
            message: 'Task updated successfully!'
        });

    } catch (error) {
        console.error("Internal Server Error", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!',
        });
    }
};

exports.addtgeDate = async (req, res) => {
    try {
        const { projectId, tgeDate } = req.body;

        const project = await ProjectModel.findById(projectId);

        if (!project) {
            return res.status(200).json({
                status: 'failed',
                message: 'Project not found!'
            })
        }
        project.tgeDate = tgeDate;
        await project.save();
        return res.status(200).json({
            status: 'success',
            message: 'Tge date Added Succesfuly!'
        })
    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
        })
    }
}