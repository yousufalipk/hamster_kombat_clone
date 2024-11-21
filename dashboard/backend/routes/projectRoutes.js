const express = require('express');
const router = express.Router();

const {
    createProject,
    removeProject,
    fetchProjects,
    updateProject,
    toggleComboCard
} = require('../controller/projectsController');


// Projects routes

router.route('/create').post(createProject);

router.route('/remove').delete(removeProject);

router.route('/fetch').get(fetchProjects);

router.route('/update').post(updateProject);

router.route('/toogle-combo-card').post(toggleComboCard);

module.exports = router;