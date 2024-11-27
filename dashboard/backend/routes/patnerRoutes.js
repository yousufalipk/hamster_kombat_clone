const express = require('express');
const router = express.Router();

const {
    fetchPatners,
    addPatner,
    updatePatner,
    removePatner
} = require('../controller/patnersController');


// Patners routes

router.route('/fetch-patner').get(fetchPatners);

router.route('/add-patner').post(addPatner);

router.route('/update-patner').post(updatePatner);

router.route('/remove-patner').delete(removePatner);

module.exports = router;