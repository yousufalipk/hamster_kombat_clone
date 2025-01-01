const express = require('express');
const router = express.Router();

const {
    fetchSocialTasks,
    fetchDailyTasks,
    createTask,
    updateTask,
    deleteTask,
    fetchPatnerTasks
} = require('../controller/tasksController');


// Tasks routes

router.route('/fetch-social').get(fetchSocialTasks);

router.route('/fetch-daily').get(fetchDailyTasks);

router.route('/fetch-patner').get(fetchPatnerTasks);

router.route('/create').post(createTask);

router.route('/update').post(updateTask);

router.route('/remove').delete(deleteTask);

module.exports = router;