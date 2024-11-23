const express = require('express');
const router = express.Router();

const {
    fetchKols,
    addKols,
    updateKols,
    removeKols
} = require('../controller/kolsController');


// Kols routes

router.route('/fetch-kol').post(fetchKols);

router.route('/add-kol').post(addKols);

router.route('/update-kol').post(updateKols);

router.route('/remove-kol').post(removeKols);

module.exports = router;