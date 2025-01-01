const TasksModel = require('../models/tasksSchema');

exports.fetchSocialTasks = async (req, res) => {
    try {
        const tasks = await TasksModel.find({ taskType: 'social' });

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
        const tasks = await TasksModel.find({ taskType: 'daily' });

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
        const tasks = await TasksModel.find({ taskType: 'patner' });

        if (tasks.length === 0) {
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

exports.createTask = async (req, res) => {
    try {
        const { taskType, iconType, title, link, reward } = req.body;

        const newTask = TasksModel({
            taskType: taskType,
            iconType: iconType,
            title: title,
            link: link,
            reward: reward
        });

        await newTask.save();

        return res.status(200).json({
            status: 'success',
            message: 'Task Added Succesfully!'
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
        })
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { taskId, newTaskType, newTaskTitle, newTaskIconType, newTaskLink, newTasksReward } = req.body;

        const task = await TasksModel.findById(taskId);
        if (!task) {
            return res.status(200).json({
                status: 'failed',
                message: 'Task not found to update'
            });
        }

        task.taskType = newTaskType;
        task.iconType = newTaskIconType;
        task.title = newTaskTitle;
        task.link = newTaskLink;
        task.reward = newTasksReward;

        await task.save();

        return res.status(200).json({
            status: 'success',
            message: 'Task updated succesfully!'
        })
    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).jsom({
            status: 'failed',
            message: 'Internal Server Error'
        })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.body;
        await TasksModel.findByIdAndDelete(taskId);
        return res.status(200).json({
            status: 'success',
            message: 'Task Removed Succesfuly!!'
        });
    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}