"use strict";

var express = require('express');
var router = express.Router();
var _require = require('../controller/userController'),
  createUser = _require.createUser,
  loginUser = _require.loginUser,
  logOutUser = _require.logOutUser,
  refresh = _require.refresh,
  fetchUsers = _require.fetchUsers,
  deleteUser = _require.deleteUser,
  updateUser = _require.updateUser,
  downloadUserData = _require.downloadUserData,
  createTask = _require.createTask,
  fetchTasks = _require.fetchTasks,
  updateTask = _require.updateTask,
  deleteTask = _require.deleteTask,
  fetchTelegramUsers = _require.fetchTelegramUsers,
  downloadTelegramUserData = _require.downloadTelegramUserData,
  createDailyTask = _require.createDailyTask,
  fetchDailyTasks = _require.fetchDailyTasks,
  updateDailyTask = _require.updateDailyTask,
  deleteDailyTask = _require.deleteDailyTask,
  createAnnouncement = _require.createAnnouncement,
  updateAnnouncement = _require.updateAnnouncement,
  deleteAnnoucement = _require.deleteAnnoucement,
  toggleAnnoucement = _require.toggleAnnoucement,
  fetchAnnoucement = _require.fetchAnnoucement;
router.route('/register-user').post(createUser);
router.route('/login-user').post(loginUser);
router.route('/logout-user').post(logOutUser);
router.route('/refresh').post(refresh);
router.route('/fetch-users').get(fetchUsers);
router.route('/remove-user')["delete"](deleteUser);
router.route('/update-user').put(updateUser);
router.route('/downloadUsersData').get(downloadUserData);
router.route('/downloadTeleUsersData').get(downloadTelegramUserData);
router.route('/fetch-telegram-users').get(fetchTelegramUsers);
router.route('/create-social-task').post(createTask);
router.route('/fetch-social-task').get(fetchTasks);
router.route('/update-social-task/:id').post(updateTask);
router.route('/delete-task/:id')["delete"](deleteTask);
router.route('/create-daily-task').post(createDailyTask);
router.route('/fetch-daily-task').get(fetchDailyTasks);
router.route('/update-daily-task/:id').post(updateDailyTask);
router.route('/delete-daily/:id')["delete"](deleteDailyTask);
router.route('/create-annoucement').post(createAnnouncement);
router.route('/update-annoucement').put(updateAnnouncement);
router.route('/remove-annoucement/:id')["delete"](deleteAnnoucement);
router.route('/fetch-annoucements').get(fetchAnnoucement);
router.route('/toggle-annoucement').post(toggleAnnoucement);
module.exports = router;