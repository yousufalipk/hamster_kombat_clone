const CutomRefferalModel = require('../models/cutomRefferal');

exports.creareRefferal = async () => {
    try {

    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
        })
    }
}