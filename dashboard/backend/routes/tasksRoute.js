const express = require('express');
const router = express.Router();

const {
    fetchSocialTasks,
    fetchDailyTasks,
    createTask,
    updateTask,
    deleteTask
} = require('../controller/tasksController');


// Tasks routes

router.route('/fetch-social').get(fetchSocialTasks);

router.route('/fetch-daily').get(fetchDailyTasks);

router.route('/create').post(createTask);

router.route('/update').post(updateTask);

router.route('/remove').delete(deleteTask);

module.exports = router;