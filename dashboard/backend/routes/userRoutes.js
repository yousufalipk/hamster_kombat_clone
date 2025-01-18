const express = require('express');
const router = express.Router();

const {
    createUser,
    loginUser,
    logOutUser,
    refresh,
    fetchTwoTrueCards,
    broadcastMessageToUsers
} = require('../controller/userController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// User routes

router.route('/register-user').post(createUser);

router.route('/login-user').post(loginUser);

router.route('/logout-user').post(logOutUser);

router.route('/refresh').post(refresh);

router.route('/fetch-dailyComboCard').get(fetchTwoTrueCards);

router.post('/broadcast-message', upload.single('file'), broadcastMessageToUsers);

module.exports = router;