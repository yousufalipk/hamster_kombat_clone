const express = require('express');
const router = express.Router();

const {
    fetchVcs,
    addVc,
    updateVc,
    removeVc
} = require('../controller/vcController');


// Vc's routes

router.route('/fetch-vc').get(fetchVcs);

router.route('/add-vc').post(addVc);

router.route('/update-vc').post(updateVc);

router.route('/remove-vc').delete(removeVc);


module.exports = router;