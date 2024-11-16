"use strict";

var multer = require('multer');
var path = require('path');

// Set storage engine for multer
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: function fileFilter(req, file, cb) {
    var fileTypes = /jpeg|jpg|png|gif/;
    var extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    var mimeType = fileTypes.test(file.mimetype);
    if (extName && mimeType) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
});
module.exports = {
  upload: upload,
  storage: storage
};