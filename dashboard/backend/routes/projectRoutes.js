const express = require('express');
const router = express.Router();

const {
    createProject,
    removeProject,
    fetchProjects,
    updateProject,
    toggleComboCard,
    fetchProjectLevel,
    addProjectLevel,
    removeProjectLevel,
    updateProjectLevel
} = require('../controller/projectsController');


// Projects routes

router.route('/create').post(createProject);

router.route('/remove').delete(removeProject);

router.route('/fetch').get(fetchProjects);

router.route('/update').post(updateProject);

router.route('/toogle-combo-card').post(toggleComboCard);

router.route('/fetch-project-level').post(fetchProjectLevel);

router.route('/add-project-level').post(addProjectLevel);

router.route('/remove-project-level').post(removeProjectLevel);

router.route('/update-project-level').post(updateProjectLevel);

module.exports = router;