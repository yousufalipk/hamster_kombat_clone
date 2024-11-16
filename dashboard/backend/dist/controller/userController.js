"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var UserModel = require('../models/userSchema');
var SocialModel = require('../models/socialSchema');
var DailyModel = require('../models/dailySchema');
var TelegramModel = require('../models/telegramSchema');
var AnnouncementModel = require('../models/annoucementSchema');
var RefreshTokenModel = require("../models/tokenSchema");
var bcrypt = require('bcrypt');
var XLSX = require('xlsx');
var JWTService = require('../Services/JWTService');
var _require = require('../utils/imageUpload'),
  upload = _require.upload,
  storage = _require.storage;
var refreshToken = require('../models/tokenSchema');
exports.createUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, fname, lname, email, password, confirmPassword, tick, alreadyUser, saltRound, salt, hashedPassword, newUser, _accessToken, _refreshToken, newRefreshToken;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, fname = _req$body.fname, lname = _req$body.lname, email = _req$body.email, password = _req$body.password, confirmPassword = _req$body.confirmPassword, tick = _req$body.tick;
          _context.next = 4;
          return UserModel.findOne({
            email: email
          });
        case 4:
          alreadyUser = _context.sent;
          if (!alreadyUser) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            status: 'failed',
            message: "Account Already Created!"
          }));
        case 7:
          if (!(password !== confirmPassword)) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            status: 'failed',
            message: "Password did't match!"
          }));
        case 9:
          // Hashing Password before saving
          saltRound = 10;
          _context.next = 12;
          return bcrypt.genSalt(saltRound);
        case 12:
          salt = _context.sent;
          _context.next = 15;
          return bcrypt.hash(password, salt);
        case 15:
          hashedPassword = _context.sent;
          newUser = new UserModel({
            fname: fname,
            lname: lname,
            email: email,
            password: hashedPassword,
            userType: 'user'
          });
          if (!tick) {
            _context.next = 23;
            break;
          }
          // Token Generation 

          _accessToken = JWTService.signAccessToken({
            _id: newUser._id,
            email: newUser.email
          }, '30m');
          _refreshToken = JWTService.signRefreshToken({
            _id: newUser._id
          }, '60m');
          newRefreshToken = new RefreshTokenModel({
            token: _refreshToken,
            userId: newUser._id
          }); //Save Refresh Token
          _context.next = 23;
          return newRefreshToken.save();
        case 23:
          _context.next = 25;
          return newUser.save();
        case 25:
          if (!tick) {
            _context.next = 30;
            break;
          }
          console.log("tick was true");
          return _context.abrupt("return", res.status(200).json({
            status: 'success',
            user: newUser,
            auth: true,
            accessToken: accessToken,
            refreshToken: refreshToken
          }));
        case 30:
          return _context.abrupt("return", res.status(200).json({
            status: 'success',
            user: newUser,
            auth: true
          }));
        case 31:
          _context.next = 37;
          break;
        case 33:
          _context.prev = 33;
          _context.t0 = _context["catch"](0);
          console.log("Error", _context.t0);
          return _context.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error'
          }));
        case 37:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 33]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.loginUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, email, password, user, match, _accessToken2, _refreshToken2;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 4;
          return UserModel.findOne({
            email: email
          });
        case 4:
          user = _context2.sent;
          if (user) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'User not found!'
          }));
        case 7:
          _context2.next = 9;
          return bcrypt.compare(password, user.password);
        case 9:
          match = _context2.sent;
          if (match) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Invalid Password'
          }));
        case 12:
          _accessToken2 = JWTService.signAccessToken({
            _id: user._id,
            email: user.email
          }, '30m');
          _refreshToken2 = JWTService.signRefreshToken({
            _id: user._id
          }, '60m');
          _context2.next = 16;
          return RefreshTokenModel.updateOne({
            userId: user._id
          }, {
            $set: {
              token: _refreshToken2
            }
          }, {
            upsert: true
          });
        case 16:
          return _context2.abrupt("return", res.status(200).json({
            status: 'success',
            user: user,
            auth: true,
            accessToken: _accessToken2,
            refreshToken: _refreshToken2
          }));
        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](0);
          console.log("Error: ", _context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
          }));
        case 23:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 19]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.logOutUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _refreshToken3, deleteRefreshToken;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _refreshToken3 = req.body.refreshToken;
          if (_refreshToken3) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Refresh Token not found!'
          }));
        case 4:
          _context3.next = 6;
          return RefreshTokenModel.deleteOne({
            token: _refreshToken3
          });
        case 6:
          deleteRefreshToken = _context3.sent;
          if (deleteRefreshToken) {
            _context3.next = 9;
            break;
          }
          return _context3.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Error Logging Out!'
          }));
        case 9:
          return _context3.abrupt("return", res.status(200).json({
            status: 'success',
            user: null,
            auth: false
          }));
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          console.log("Error: ", _context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
          }));
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 12]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.refresh = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var originalRefreshToken, id, decoded, match, _accessToken3, _refreshToken4, user;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          originalRefreshToken = req.body.originalRefreshToken;
          if (originalRefreshToken) {
            _context4.next = 3;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Refresh token is missing',
            auth: false
          }));
        case 3:
          _context4.prev = 3;
          decoded = JWTService.verifyRefreshToken(originalRefreshToken);
          id = decoded._id;
          _context4.next = 12;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](3);
          console.error('Token verification failed:', _context4.t0.message);
          return _context4.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Token verification failed'
          }));
        case 12:
          _context4.prev = 12;
          _context4.next = 15;
          return RefreshTokenModel.findOne({
            userId: id,
            token: originalRefreshToken
          });
        case 15:
          match = _context4.sent;
          if (match) {
            _context4.next = 18;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Unauthorized'
          }));
        case 18:
          _accessToken3 = JWTService.signAccessToken({
            _id: id
          }, "30m");
          _refreshToken4 = JWTService.signRefreshToken({
            _id: id
          }, "60m");
          _context4.next = 22;
          return JWTService.storeRefreshToken(_refreshToken4, id);
        case 22:
          _context4.next = 24;
          return UserModel.findById(id);
        case 24:
          user = _context4.sent;
          if (user) {
            _context4.next = 27;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'User not found'
          }));
        case 27:
          return _context4.abrupt("return", res.status(200).json({
            status: 'success',
            user: user,
            auth: true,
            accessToken: _accessToken3,
            refreshToken: _refreshToken4
          }));
        case 30:
          _context4.prev = 30;
          _context4.t1 = _context4["catch"](12);
          console.error('Error', _context4.t1);
          return _context4.abrupt("return", res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error'
          }));
        case 34:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 8], [12, 30]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.fetchUsers = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var users;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return UserModel.find({
            userType: {
              $ne: 'admin'
            }
          });
        case 3:
          users = _context5.sent;
          if (users) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'No Users found!'
          }));
        case 6:
          return _context5.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'Users Fetched Succesfuly!',
            users: users
          }));
        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          console.log("Error", _context5.t0);
          return _context5.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
          }));
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 9]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.deleteUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var userId, user;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          userId = req.body.userId;
          _context6.next = 4;
          return UserModel.findById(userId);
        case 4:
          user = _context6.sent;
          if (user) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'User not found!'
          }));
        case 7:
          _context6.next = 9;
          return user.deleteOne();
        case 9:
          return _context6.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'User removed Succesfuly!'
          }));
        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](0);
          console.log("Error", _context6.t0);
          return _context6.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error'
          }));
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 12]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.updateUser = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body3, fname, lname, userId, user;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _req$body3 = req.body, fname = _req$body3.fname, lname = _req$body3.lname, userId = _req$body3.userId;
          _context7.next = 4;
          return UserModel.findById(userId);
        case 4:
          user = _context7.sent;
          if (user) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'User not found!'
          }));
        case 7:
          _context7.next = 9;
          return UserModel.updateOne({
            _id: user._id
          }, {
            $set: {
              fname: fname,
              lname: lname
            }
          });
        case 9:
          return _context7.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'Info Updated Succesfuly!'
          }));
        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](0);
          console.log("Error", _context7.t0);
          return _context7.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error'
          }));
        case 16:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 12]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.downloadUserData = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var users, usersData, wb, ws, excelBuffer;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return UserModel.find({}, {
            password: 0
          });
        case 3:
          users = _context8.sent;
          usersData = [['UID', 'First Name', 'Last Name', 'Email', 'User Type']];
          users.forEach(function (user) {
            usersData.push([user._id.toString(),
            // UID
            user.fname || '',
            // First Name
            user.lname || '',
            // Last Name
            user.email || '',
            // Email
            user.userType || '' // User Type
            ]);
          });
          wb = XLSX.utils.book_new();
          ws = XLSX.utils.aoa_to_sheet(usersData);
          XLSX.utils.book_append_sheet(wb, ws, 'Users Data');
          excelBuffer = XLSX.write(wb, {
            bookType: 'xlsx',
            type: 'buffer'
          });
          res.setHeader('Content-Disposition', 'attachment; filename="users_data.xlsx"');
          res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          res.send(excelBuffer);
          _context8.next = 19;
          break;
        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          return _context8.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
          }));
        case 19:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 15]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.downloadTelegramUserData = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var users, usersData, wb, ws, excelBuffer;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return TelegramModel.find();
        case 3:
          users = _context9.sent;
          usersData = [['Telegram Id', 'Date of Joining', 'Username', 'First Name', 'Last Name', 'tonWalletAddress', 'twitterUsername', 'balance']];
          users.forEach(function (user) {
            usersData.push([user.userId.toString(), user.createdAt || 'undefined', user.username || 'undefined', user.firstName || 'undefined', user.lastName || 'undefined', user.tonWalletAddress || 'undefined', user.twitterUserName || 'undefined', user.balance || 'undefined']);
          });
          wb = XLSX.utils.book_new();
          ws = XLSX.utils.aoa_to_sheet(usersData);
          XLSX.utils.book_append_sheet(wb, ws, 'Users Data');
          excelBuffer = XLSX.write(wb, {
            bookType: 'xlsx',
            type: 'buffer'
          });
          res.setHeader('Content-Disposition', 'attachment; filename="users_data.xlsx"');
          res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          res.send(excelBuffer);
          _context9.next = 19;
          break;
        case 15:
          _context9.prev = 15;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          return _context9.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
          }));
        case 19:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 15]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
exports.fetchTelegramUsers = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var telegramUsers;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return TelegramModel.find();
        case 3:
          telegramUsers = _context10.sent;
          if (telegramUsers) {
            _context10.next = 8;
            break;
          }
          return _context10.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'no users found!'
          }));
        case 8:
          return _context10.abrupt("return", res.status(200).json({
            status: 'success',
            telegramUsers: telegramUsers
          }));
        case 9:
          _context10.next = 15;
          break;
        case 11:
          _context10.prev = 11;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
          return _context10.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error'
          }));
        case 15:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 11]]);
  }));
  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
exports.createTask = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var _req$body4, img, priority, title, link, reward, existingTask, newTask;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _req$body4 = req.body, img = _req$body4.img, priority = _req$body4.priority, title = _req$body4.title, link = _req$body4.link, reward = _req$body4.reward; // Check if priority already exists
          _context11.next = 4;
          return SocialModel.findOne({
            priority: priority
          });
        case 4:
          existingTask = _context11.sent;
          if (!existingTask) {
            _context11.next = 7;
            break;
          }
          return _context11.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Priority already taken!'
          }));
        case 7:
          // If priority doesn't exist, create a new task
          newTask = new SocialModel({
            image: img,
            link: link,
            priority: priority,
            reward: reward,
            title: title
          });
          _context11.next = 10;
          return newTask.save();
        case 10:
          return _context11.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'Task created successfully!',
            task: newTask
          }));
        case 13:
          _context11.prev = 13;
          _context11.t0 = _context11["catch"](0);
          console.error(_context11.t0);
          return _context11.abrupt("return", res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
          }));
        case 17:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 13]]);
  }));
  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();
exports.fetchTasks = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var response;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return SocialModel.find();
        case 3:
          response = _context12.sent;
          if (response) {
            _context12.next = 8;
            break;
          }
          return _context12.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'No Social Task created!'
          }));
        case 8:
          return _context12.abrupt("return", res.status(200).json({
            status: 'success',
            tasks: response
          }));
        case 9:
          _context12.next = 15;
          break;
        case 11:
          _context12.prev = 11;
          _context12.t0 = _context12["catch"](0);
          console.log(_context12.t0);
          return _context12.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
          }));
        case 15:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 11]]);
  }));
  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();
exports.updateTask = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var id, _req$body5, img, priority, title, link, reward, existingTaskWithPriority, updatedTask;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          id = req.params.id;
          _req$body5 = req.body, img = _req$body5.img, priority = _req$body5.priority, title = _req$body5.title, link = _req$body5.link, reward = _req$body5.reward;
          _context13.next = 5;
          return SocialModel.findOne({
            priority: priority,
            _id: {
              $ne: id
            }
          });
        case 5:
          existingTaskWithPriority = _context13.sent;
          if (!existingTaskWithPriority) {
            _context13.next = 8;
            break;
          }
          return _context13.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Priority already taken!'
          }));
        case 8:
          _context13.next = 10;
          return SocialModel.findByIdAndUpdate(id, {
            image: img,
            link: link,
            priority: priority,
            reward: reward,
            title: title
          }, {
            "new": true
          });
        case 10:
          updatedTask = _context13.sent;
          if (updatedTask) {
            _context13.next = 13;
            break;
          }
          return _context13.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Task not found!'
          }));
        case 13:
          return _context13.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'Task updated successfully!',
            task: updatedTask
          }));
        case 16:
          _context13.prev = 16;
          _context13.t0 = _context13["catch"](0);
          console.error(_context13.t0);
          return _context13.abrupt("return", res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
          }));
        case 20:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 16]]);
  }));
  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
exports.deleteTask = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var id, deletedTask;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          id = req.params.id;
          _context14.next = 4;
          return SocialModel.findByIdAndDelete(id);
        case 4:
          deletedTask = _context14.sent;
          if (deletedTask) {
            _context14.next = 7;
            break;
          }
          return _context14.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Task not found!'
          }));
        case 7:
          return _context14.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'Task deleted successfully!',
            task: deletedTask
          }));
        case 10:
          _context14.prev = 10;
          _context14.t0 = _context14["catch"](0);
          console.error(_context14.t0);
          return _context14.abrupt("return", res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
          }));
        case 14:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 10]]);
  }));
  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();
exports.createDailyTask = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var _req$body6, img, priority, title, link, reward, existingTask, newTask;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _req$body6 = req.body, img = _req$body6.img, priority = _req$body6.priority, title = _req$body6.title, link = _req$body6.link, reward = _req$body6.reward; // Check if priority already exists
          _context15.next = 4;
          return DailyModel.findOne({
            priority: priority
          });
        case 4:
          existingTask = _context15.sent;
          if (!existingTask) {
            _context15.next = 7;
            break;
          }
          return _context15.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Priority already taken!'
          }));
        case 7:
          // If priority doesn't exist, create a new task
          newTask = new DailyModel({
            image: img,
            link: link,
            priority: priority,
            reward: reward,
            title: title
          });
          _context15.next = 10;
          return newTask.save();
        case 10:
          return _context15.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'Task created successfully!',
            task: newTask
          }));
        case 13:
          _context15.prev = 13;
          _context15.t0 = _context15["catch"](0);
          console.error(_context15.t0);
          return _context15.abrupt("return", res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
          }));
        case 17:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 13]]);
  }));
  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();
exports.fetchDailyTasks = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var response;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return DailyModel.find();
        case 3:
          response = _context16.sent;
          if (response) {
            _context16.next = 8;
            break;
          }
          return _context16.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'No Daily Task created!'
          }));
        case 8:
          return _context16.abrupt("return", res.status(200).json({
            status: 'success',
            tasks: response
          }));
        case 9:
          _context16.next = 15;
          break;
        case 11:
          _context16.prev = 11;
          _context16.t0 = _context16["catch"](0);
          console.log(_context16.t0);
          return _context16.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
          }));
        case 15:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 11]]);
  }));
  return function (_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();
exports.updateDailyTask = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var id, _req$body7, img, priority, title, link, reward, existingTaskWithPriority, updatedTask;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          id = req.params.id;
          _req$body7 = req.body, img = _req$body7.img, priority = _req$body7.priority, title = _req$body7.title, link = _req$body7.link, reward = _req$body7.reward;
          _context17.next = 5;
          return DailyModel.findOne({
            priority: priority,
            _id: {
              $ne: id
            }
          });
        case 5:
          existingTaskWithPriority = _context17.sent;
          if (!existingTaskWithPriority) {
            _context17.next = 8;
            break;
          }
          return _context17.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Priority already taken!'
          }));
        case 8:
          _context17.next = 10;
          return DailyModel.findByIdAndUpdate(id, {
            image: img,
            link: link,
            priority: priority,
            reward: reward,
            title: title
          }, {
            "new": true
          });
        case 10:
          updatedTask = _context17.sent;
          if (updatedTask) {
            _context17.next = 13;
            break;
          }
          return _context17.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Task not found!'
          }));
        case 13:
          return _context17.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'Task updated successfully!',
            task: updatedTask
          }));
        case 16:
          _context17.prev = 16;
          _context17.t0 = _context17["catch"](0);
          console.error(_context17.t0);
          return _context17.abrupt("return", res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
          }));
        case 20:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 16]]);
  }));
  return function (_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}();
exports.deleteDailyTask = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var id, deletedTask;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          id = req.params.id;
          _context18.next = 4;
          return DailyModel.findByIdAndDelete(id);
        case 4:
          deletedTask = _context18.sent;
          if (deletedTask) {
            _context18.next = 7;
            break;
          }
          return _context18.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Task not found!'
          }));
        case 7:
          return _context18.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'Task deleted successfully!',
            task: deletedTask
          }));
        case 10:
          _context18.prev = 10;
          _context18.t0 = _context18["catch"](0);
          console.error(_context18.t0);
          return _context18.abrupt("return", res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
          }));
        case 14:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[0, 10]]);
  }));
  return function (_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}();
exports.createAnnouncement = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, res) {
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          upload.single('image')(req, res, /*#__PURE__*/function () {
            var _ref20 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(err) {
              var _req$body8, description, imageName, reward, status, subtitle, title, newAnnouncement;
              return _regeneratorRuntime().wrap(function _callee19$(_context19) {
                while (1) switch (_context19.prev = _context19.next) {
                  case 0:
                    if (!err) {
                      _context19.next = 2;
                      break;
                    }
                    return _context19.abrupt("return", res.status(200).json({
                      status: 'failed',
                      message: err.message
                    }));
                  case 2:
                    if (req.file) {
                      _context19.next = 4;
                      break;
                    }
                    return _context19.abrupt("return", res.status(200).json({
                      status: 'failed',
                      message: 'No file uploaded'
                    }));
                  case 4:
                    _context19.prev = 4;
                    _req$body8 = req.body, description = _req$body8.description, imageName = _req$body8.imageName, reward = _req$body8.reward, status = _req$body8.status, subtitle = _req$body8.subtitle, title = _req$body8.title;
                    newAnnouncement = new AnnouncementModel({
                      description: description,
                      image: "/uploads/".concat(req.file.filename),
                      imageName: imageName,
                      reward: reward,
                      status: status,
                      subtitle: subtitle,
                      title: title
                    });
                    _context19.next = 9;
                    return newAnnouncement.save();
                  case 9:
                    res.status(201).json({
                      status: 'success',
                      message: 'Announcement created successfully!',
                      announcement: newAnnouncement
                    });
                    _context19.next = 16;
                    break;
                  case 12:
                    _context19.prev = 12;
                    _context19.t0 = _context19["catch"](4);
                    console.error(_context19.t0);
                    res.status(500).json({
                      error: 'Server Error'
                    });
                  case 16:
                  case "end":
                    return _context19.stop();
                }
              }, _callee19, null, [[4, 12]]);
            }));
            return function (_x39) {
              return _ref20.apply(this, arguments);
            };
          }());
        case 1:
        case "end":
          return _context20.stop();
      }
    }, _callee20);
  }));
  return function (_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}();
exports.updateAnnouncement = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21(req, res) {
    var _req$body9, id, updateData, announcement, key;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          _req$body9 = req.body, id = _req$body9.id, updateData = _req$body9.updateData;
          if (!(!id || !updateData)) {
            _context21.next = 4;
            break;
          }
          return _context21.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Announcement ID and update data are required!'
          }));
        case 4:
          _context21.next = 6;
          return AnnouncementModel.findById(id);
        case 6:
          announcement = _context21.sent;
          if (announcement) {
            _context21.next = 9;
            break;
          }
          return _context21.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Announcement not found!'
          }));
        case 9:
          // Update the announcement with the new data
          for (key in updateData) {
            if (updateData.hasOwnProperty(key)) {
              announcement[key] = updateData[key];
            }
          }

          // Save the updated announcement
          _context21.next = 12;
          return announcement.save();
        case 12:
          return _context21.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'Announcement updated successfully!',
            data: announcement
          }));
        case 15:
          _context21.prev = 15;
          _context21.t0 = _context21["catch"](0);
          console.log(_context21.t0);
          return _context21.abrupt("return", res.status(500).json({
            status: 'failed',
            message: 'Internal Server Error!'
          }));
        case 19:
        case "end":
          return _context21.stop();
      }
    }, _callee21, null, [[0, 15]]);
  }));
  return function (_x40, _x41) {
    return _ref21.apply(this, arguments);
  };
}();
exports.deleteAnnoucement = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(req, res) {
    var id, deletedAnnoucement;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          id = req.params.id;
          _context22.next = 4;
          return AnnouncementModel.findByIdAndDelete(id);
        case 4:
          deletedAnnoucement = _context22.sent;
          if (deletedAnnoucement) {
            _context22.next = 7;
            break;
          }
          return _context22.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Annoucement not found!'
          }));
        case 7:
          return _context22.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'Annoucement deleted successfully!',
            task: deletedAnnoucement
          }));
        case 10:
          _context22.prev = 10;
          _context22.t0 = _context22["catch"](0);
          console.log(_context22.t0);
          return _context22.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
          }));
        case 14:
        case "end":
          return _context22.stop();
      }
    }, _callee22, null, [[0, 10]]);
  }));
  return function (_x42, _x43) {
    return _ref22.apply(this, arguments);
  };
}();
exports.toggleAnnoucement = /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23(req, res) {
    var id, announcement, otherAnnouncement;
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          _context23.prev = 0;
          id = req.body.id; // Find the announcement by ID
          _context23.next = 4;
          return AnnouncementModel.findById(id);
        case 4:
          announcement = _context23.sent;
          if (announcement) {
            _context23.next = 7;
            break;
          }
          return _context23.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Announcement not found!'
          }));
        case 7:
          _context23.next = 9;
          return AnnouncementModel.findOne({
            status: true
          });
        case 9:
          otherAnnouncement = _context23.sent;
          if (!(otherAnnouncement && otherAnnouncement._id.toString() !== id)) {
            _context23.next = 12;
            break;
          }
          return _context23.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Another announcement is already active!'
          }));
        case 12:
          // Update the status of the found announcement
          announcement.status = !announcement.status; // Toggle status
          if (!announcement.status) {
            _context23.next = 16;
            break;
          }
          _context23.next = 16;
          return AnnouncementModel.updateMany({
            _id: {
              $ne: id
            }
          }, {
            $set: {
              status: false
            }
          });
        case 16:
          _context23.next = 18;
          return announcement.save();
        case 18:
          return _context23.abrupt("return", res.status(200).json({
            status: 'success',
            message: 'Announcement status updated successfully!',
            data: announcement
          }));
        case 21:
          _context23.prev = 21;
          _context23.t0 = _context23["catch"](0);
          console.log(_context23.t0);
          return _context23.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
          }));
        case 25:
        case "end":
          return _context23.stop();
      }
    }, _callee23, null, [[0, 21]]);
  }));
  return function (_x44, _x45) {
    return _ref23.apply(this, arguments);
  };
}();
exports.fetchAnnoucement = /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24(req, res) {
    var annoucements;
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          _context24.prev = 0;
          _context24.next = 3;
          return AnnouncementModel.find();
        case 3:
          annoucements = _context24.sent;
          if (annoucements) {
            _context24.next = 6;
            break;
          }
          return _context24.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'No annoucement found!'
          }));
        case 6:
          return _context24.abrupt("return", res.status(200).json({
            status: 'success',
            annoucements: annoucements
          }));
        case 9:
          _context24.prev = 9;
          _context24.t0 = _context24["catch"](0);
          console.log(_context24.t0);
          return _context24.abrupt("return", res.status(200).json({
            status: 'failed',
            message: 'Internal Server Error!'
          }));
        case 13:
        case "end":
          return _context24.stop();
      }
    }, _callee24, null, [[0, 9]]);
  }));
  return function (_x46, _x47) {
    return _ref24.apply(this, arguments);
  };
}();