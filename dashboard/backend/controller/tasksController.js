const SocialTaskModel = require('../models/socialTaskSchema');
const DailyTasksModel = require('../models/dailyTaskSchema');
const PatnerTasksModel = require('../models/patnerTaskSchema');

exports.createSocialTask = async (req, res) => {
    try {
        const { taskType, iconType, title, link, reward, priority } = req.body;

        const alreadyTask = await SocialTaskModel.findOne({ priority: priority });

        if (alreadyTask) {
            return res.status(200).json({
                status: 'failed',
                message: 'Priority already taken!'
            })
        }

        newTask = SocialTaskModel({
            taskType: taskType,
            iconType: iconType,
            title: title,
            link: link,
            reward: reward,
            priority: priority
        });

        await newTask.save();

        return res.status(200).json({
            status: 'success',
            message: 'Social Task Added Succesfully!'
        })

    } catch (error) {
        console.log('Internal Server Error!', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.createDailyTask = async (req, res) => {
    try {
        const { taskType, iconType, title, link, reward, priority } = req.body;

        const alreadyTask = await DailyTasksModel.findOne({ priority: priority });

        if (alreadyTask) {
            return res.status(200).json({
                status: 'failed',
                message: 'Priority already taken!'
            })
        }

        newTask = DailyTasksModel({
            taskType: taskType,
            iconType: iconType,
            title: title,
            link: link,
            reward: reward,
            priority: priority
        });

        await newTask.save();

        return res.status(200).json({
            status: 'success',
            message: 'Daily Task Added Succesfully!'
        })

    } catch (error) {
        console.log('Internal Server Error!', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.createPatnerTask = async (req, res) => {
    try {
        const { taskType, iconType, title, link, reward, priority } = req.body;

        const alreadyTask = await PatnerTasksModel.findOne({ priority: priority });

        if (alreadyTask) {
            return res.status(200).json({
                status: 'failed',
                message: 'Priority already taken!'
            })
        }

        newTask = PatnerTasksModel({
            taskType: taskType,
            iconType: iconType,
            title: title,
            link: link,
            reward: reward,
            priority: priority
        });

        await newTask.save();

        return res.status(200).json({
            status: 'success',
            message: 'Patner Task Added Succesfully!'
        })

    } catch (error) {
        console.log('Internal Server Error!', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.updateSocialTask = async (req, res) => {
    try {
        const { taskId, newTaskTitle, newTaskLink, newTasksReward, newPriority } = req.body;

        const task = await SocialTaskModel.findById(taskId);

        if (!task) {
            return res.status(200).json({
                status: 'failed',
                message: 'Task not found!'
            })
        }

        if (task.priority === newPriority) {
            task.title = newTaskTitle;
            task.link = newTaskLink;
            task.reward = newTasksReward;

            await task.save();

            return res.status(200).json({
                status: 'success',
                message: 'Daily task updated succesfully 1!',
                task: task
            })
        } else {
            const alreadyTask = await SocialTaskModel.findOne({ priority: newPriority });

            if (alreadyTask) {
                return res.status(200).json({
                    status: 'failed',
                    message: 'Priority already taken!'
                })
            } else {
                task.title = newTaskTitle;
                task.link = newTaskLink;
                task.reward = newTasksReward;
                task.priority = newPriority;

                await task.save();
                return res.status(200).json({
                    status: 'success',
                    message: 'Social task updated succesfully 2!',
                    task: task
                })
            }
        }
    } catch (error) {
        console.log('Internal Server Errorr!', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.updateDailyTask = async (req, res) => {
    try {
        const { taskId, newTaskTitle, newTaskLink, newTasksReward, newPriority } = req.body;

        console.log('Task Updated Request!');

        console.log('Task Id', taskId);
        console.log('newTaskTitle', newTaskTitle);
        console.log('newTaskLink', newTaskLink);
        console.log('newTasksReward', newTasksReward);
        console.log('newPriority', newPriority);

        const task = await DailyTasksModel.findById(taskId);

        if (!task) {
            return res.status(200).json({
                status: 'failed',
                message: 'Task not found!'
            })
        }

        if (task.priority === newPriority) {
            task.title = newTaskTitle;
            task.link = newTaskLink;
            task.reward = newTasksReward;

            await task.save();

            return res.status(200).json({
                status: 'success',
                message: 'Daily task updated succesfully!',
                task: task
            })
        } else {
            const alreadyTask = await DailyTasksModel.findOne({ priority: newPriority });

            if (alreadyTask) {
                return res.status(200).json({
                    status: 'failed',
                    message: 'Priority already taken!'
                })
            } else {
                task.title = newTaskTitle;
                task.link = newTaskLink;
                task.reward = newTasksReward;
                task.priority = newPriority

                await task.save();
                return res.status(200).json({
                    status: 'success',
                    message: 'Daily task updated succesfully!',
                    task: task
                })
            }
        }
    } catch (error) {
        console.log('Internal Server Errorr!', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.updatePatnerTask = async (req, res) => {
    try {
        const { taskId, newTaskTitle, newTaskLink, newTasksReward, newPriority } = req.body;

        const task = await PatnerTasksModel.findById(taskId);

        if (!task) {
            return res.status(200).json({
                status: 'failed',
                message: 'Task not found!'
            })
        }

        if (task.priority === newPriority) {
            task.title = newTaskTitle;
            task.link = newTaskLink;
            task.reward = newTasksReward;
            task.priority = newPriority

            await task.save();

            return res.status(200).json({
                status: 'success',
                message: 'Daily task updated succesfully!',
                task: task
            })
        } else {
            const alreadyTask = await PatnerTasksModel.findOne({ priority: newPriority });

            if (alreadyTask) {
                return res.status(200).json({
                    status: 'failed',
                    message: 'Priority already taken!'
                })
            } else {
                task.title = newTaskTitle;
                task.link = newTaskLink;
                task.reward = newTasksReward;

                await task.save();
                return res.status(200).json({
                    status: 'success',
                    message: 'Daily task updated succesfully!',
                    task: task
                })
            }
        }
    } catch (error) {
        console.log('Internal Server Errorr!', error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { taskId, taskType } = req.body;
        if (taskType === 'social') {
            await SocialTaskModel.findByIdAndDelete(taskId);
            return res.status(200).json({
                status: 'success',
                message: 'Social Task Removed Succesfuly!!'
            });
        } else if (taskType === 'daily') {
            await DailyTasksModel.findByIdAndDelete(taskId);
            return res.status(200).json({
                status: 'success',
                message: 'Daily Task Removed Succesfuly!!'
            });
        } else if (taskType === 'partner') {
            await PatnerTasksModel.findByIdAndDelete(taskId);
            return res.status(200).json({
                status: 'success',
                message: 'Partner Task Removed Succesfuly!!'
            });
        }
    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}

exports.fetchSocialTasks = async (req, res) => {
    try {
        const tasks = await SocialTaskModel.find();

        if (tasks.length === 0) {
            return res.status(200).json({
                status: 'failed',
                message: 'No Social Task Found!',
                tasks: tasks
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Social Tasks Found!',
            socialTasks: tasks
        });

    } catch (error) {
        console.error("Error fetching social tasks:", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        });
    }
};

exports.fetchDailyTasks = async (req, res) => {
    try {
        const tasks = await DailyTasksModel.find();

        if (tasks.length === 0) {
            return res.status(200).json({
                status: 'failed',
                message: 'No Daily Task Found!',
                tasks: tasks
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Daily Tasks Found!',
            dailyTasks: tasks
        });

    } catch (error) {
        console.error("Error fetching social tasks:", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        });
    }
};

exports.fetchPatnerTasks = async (req, res) => {
    try {
        const tasks = await PatnerTasksModel.find();
        if (tasks.length === 0) {
            console.log('No tasks')
            return res.status(200).json({
                status: 'failed',
                message: 'No Patner Task Found!',
                tasks: tasks
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Patner Tasks Found!',
            patnerTasks: tasks
        });

    } catch (error) {
        console.error("Error fetching social tasks:", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        });
    }
};

exports.toggleTaskStatus = async (req, res) => {
    try {
        const { taskId, taskType } = req.body;

        let task;
        if (taskType === 'social') {
            task = await SocialTaskModel.findById(taskId);
        } else if (taskType === 'daily') {
            task = await DailyTasksModel.findById(taskId);
        } else if (taskType === 'partner') {
            task = await PatnerTasksModel.findById(taskId);
        }
        task.status = !task.status;
        await task.save();

        return res.status(200).json({
            status: 'success',
            message: 'Task status updated successfuly!',
            updatedStatus: task.status
        })
    } catch (error) {
        console.log('Internal Server Error!');
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}