const express = require('express');
const router = express.Router();

const {
    fetchSocialTasks,
    fetchDailyTasks,
    fetchPatnerTasks,
    createSocialTask,
    createDailyTask,
    createPatnerTask,
    updateSocialTask,
    updateDailyTask,
    updatePatnerTask,
    deleteTask,
    toggleTaskStatus
} = require('../controller/tasksController');


// Tasks routes

router.route('/create-social').post(createSocialTask);
router.route('/create-daily').post(createDailyTask);
router.route('/create-partner').post(createPatnerTask);

router.route('/update-social').post(updateSocialTask);
router.route('/update-daily').post(updateDailyTask);
router.route('/update-partner').post(updatePatnerTask);

router.route('/fetch-social').get(fetchSocialTasks);
router.route('/fetch-daily').get(fetchDailyTasks);
router.route('/fetch-patner').get(fetchPatnerTasks);

router.route('/remove').delete(deleteTask);

router.route('/toggle-task-status').post(toggleTaskStatus);

module.exports = router;