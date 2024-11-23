const express = require('express');
const router = express.Router();

const {
    fetchVc,
    addVc,
    updateVc,
    removeVc
} = require('../controller/vcController');


// Vc's routes

router.route('/fetch-vc').post(fetchVc);

router.route('/add-vc').post(addVc);

router.route('/update-vc').post(updateVc);

router.route('/remove-vc').post(removeVc);

module.exports = router;