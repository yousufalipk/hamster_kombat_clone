"use strict";

var express = require('express');
var _require = require('./config/env'),
  PORT = _require.PORT,
  FRONTEND_ORIGIN = _require.FRONTEND_ORIGIN;
var ConnectToDB = require('./config/db');
var cors = require('cors');
var userRoutes = require('./routes/userRoutes');
var app = express();
app.use(express.json());
app.use(cors({
  origin: function origin(FRONTEND_ORIGIN, callback) {
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
  credentials: true
}));
app.use(express.json());
ConnectToDB();

// test route
app.get('/', function (req, res) {
  return res.json('Server Running...');
});
app.use('/', userRoutes);
app.listen(PORT, function () {
  console.log("Server running on port: ".concat(PORT));
});