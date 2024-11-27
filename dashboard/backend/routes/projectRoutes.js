const express = require('express');
const router = express.Router();

const {
    createProject,
    removeProject,
    fetchProjects,
    updateProject,

    fetchProjectTasks,
    addProjectTask,
    removeProjectTask,
    updateProjectTask,

    addtgeDate
} = require('../controller/projectsController');


// Projects routes

router.route('/create').post(createProject);

router.route('/remove').delete(removeProject);

router.route('/fetch').get(fetchProjects);

router.route('/update').post(updateProject);

router.route('/fetch-project-task').post(fetchProjectTasks);

router.route('/add-project-task').post(addProjectTask);

router.route('/remove-project-task').post(removeProjectTask);

router.route('/update-project-task').post(updateProjectTask);

router.route('/add-tge-date').post(addtgeDate);

module.exports = router;