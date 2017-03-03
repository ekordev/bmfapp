require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  __webpack_require__(3);
  
  var _path = __webpack_require__(4);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(5);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _cookieParser = __webpack_require__(6);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _bodyParser = __webpack_require__(7);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _expressJwt = __webpack_require__(8);
  
  var _expressJwt2 = _interopRequireDefault(_expressJwt);
  
  var _expressGraphql = __webpack_require__(9);
  
  var _expressGraphql2 = _interopRequireDefault(_expressGraphql);
  
  var _jsonwebtoken = __webpack_require__(10);
  
  var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
  
  var _server = __webpack_require__(11);
  
  var _server2 = _interopRequireDefault(_server);
  
  var _universalRouter = __webpack_require__(12);
  
  var _prettyError = __webpack_require__(13);
  
  var _prettyError2 = _interopRequireDefault(_prettyError);
  
  var _passport = __webpack_require__(14);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _routes = __webpack_require__(18);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _assets = __webpack_require__(215);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var mongodb = __webpack_require__(237); // eslint-disable-line import/no-unresolved
  
  //import models from './data/models';
  //import schema from './data/schema';
  
  //import UniversalRouter from 'universal-router';
  
  var session = __webpack_require__(238);
  
  var app = (0, _express2.default)();
  app.use(session({
    secret: '1234567890QWERTY',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
  
  //
  // Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
  // user agent is not known.
  // -----------------------------------------------------------------------------
  global.navigator = global.navigator || {};
  global.navigator.userAgent = global.navigator.userAgent || 'all';
  
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
  app.use((0, _cookieParser2.default)());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_bodyParser2.default.json());
  
  //
  // Authentication
  // -----------------------------------------------------------------------------
  app.use((0, _expressJwt2.default)({
    secret: _config.auth.jwt.secret,
    credentialsRequired: false,
    /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
    getToken: function getToken(req) {
      return req.cookies.id_token;
    }
  }));
  app.use(_passport2.default.initialize());
  
  app.get('/login/facebook', _passport2.default.authenticate('facebook', { scope: ['email', 'user_location'], session: false }));
  app.get('/login/facebook/return', _passport2.default.authenticate('facebook', { failureRedirect: '/login', session: false }), function (req, res) {
    var expiresIn = 60 * 60 * 24 * 180; // 180 days
    var token = _jsonwebtoken2.default.sign(req.user, _config.auth.jwt.secret, { expiresIn: expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  });
  
  //
  // Register API middleware
  // -----------------------------------------------------------------------------
  /*app.use('/graphql', expressGraphQL(req => ({
    schema,
    graphiql: true,
    rootValue: { request: req },
    pretty: process.env.NODE_ENV !== 'production',
  })));*/
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  app.get('*', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                var css, statusCode, template, data;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        css = [];
                        statusCode = 200;
                        template = __webpack_require__(239); // eslint-disable-line global-require
  
                        data = { title: '', description: '', user: '', css: '', body: '', entry: 'assets.main.js' }; //assets.main.js
                        //var sess = req.session;
  
                        if (false) {
                          data.trackingId = _config.analytics.google.trackingId;
                        }
  
                        _context.next = 7;
                        return (0, _universalRouter.resolve)(_routes2.default, {
                          path: req.path,
                          query: req.query,
  
                          context: {
                            insertCss: function insertCss(styles) {
                              return css.push(styles._getCss());
                            }, // eslint-disable-line no-underscore-dangle
                            setTitle: function setTitle(value) {
                              return data.title = value;
                            },
                            setUser: function setUser(value) {
                              return data.user = value;
                            },
                            setMeta: function setMeta(key, value) {
                              return data[key] = value;
                            },
                            getUser: function getUser(key) {
                              return data[key];
                            }
                          },
                          render: function render(component) {
                            var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
  
                            css = [];
                            statusCode = status;
                            data.body = _server2.default.renderToString(component);
                            data.css = css.join('');
                            return true;
                          }
                        });
  
                      case 7:
  
                        res.status(statusCode);
                        res.send(template(data));
  
                      case 9:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              })(), 't0', 2);
  
            case 2:
              _context2.next = 7;
              break;
  
            case 4:
              _context2.prev = 4;
              _context2.t1 = _context2['catch'](0);
  
              next(_context2.t1);
  
            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 4]]);
    }));
  
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  
  //
  // Error handling
  // -----------------------------------------------------------------------------
  var pe = new _prettyError2.default();
  pe.skipNodeFiles();
  pe.skipPackage('express');
  
  app.use(function (err, req, res, next) {
    // eslint-disable-line no-unused-vars
    console.log(pe.render(err)); // eslint-disable-line no-console
    var template = __webpack_require__(241); // eslint-disable-line global-require
    var statusCode = err.status || 500;
    res.status(statusCode);
    res.send(template({
      message: err.message,
      stack:  false ? '' : err.stack
    }));
  });
  
  // Launch the server
  // -----------------------------------------------------------------------------
  /* eslint-disable no-console */
  //models.sync().catch(err => console.error(err.stack)).then(() => {
  app.listen(_config.port, function () {
    console.log('The server is running at http://localhost:' + _config.port + '/');
  });
  //});
  /* eslint-enable no-console */

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/regenerator");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 6 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 7 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 8 */
/***/ function(module, exports) {

  module.exports = require("express-jwt");

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = require("express-graphql");

/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = require("jsonwebtoken");

/***/ },
/* 11 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ },
/* 12 */
/***/ function(module, exports) {

  module.exports = require("universal-router");

/***/ },
/* 13 */
/***/ function(module, exports) {

  module.exports = require("pretty-error");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _passport = __webpack_require__(15);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _passportFacebook = __webpack_require__(16);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Sign in with Facebook.
   */
  _passport2.default.use(new _passportFacebook.Strategy({
    clientID: _config.auth.facebook.id,
    clientSecret: _config.auth.facebook.secret,
    callbackURL: '/login/facebook/return',
    profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
    passReqToCallback: true
  }, function (req, accessToken, refreshToken, profile, done) {
    /* eslint-disable no-underscore-dangle */
    var loginName = 'facebook';
    var claimType = 'urn:facebook:access_token';
    var fooBar = function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var userLogin, user, users, _user;
  
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!req.user) {
                  _context.next = 14;
                  break;
                }
  
                _context.next = 3;
                return UserLogin.findOne({
                  attributes: ['name', 'key'],
                  where: { name: loginName, key: profile.id }
                });
  
              case 3:
                userLogin = _context.sent;
  
                if (!userLogin) {
                  _context.next = 8;
                  break;
                }
  
                // There is already a Facebook account that belongs to you.
                // Sign in with that account or delete it, then link it with your current account.
                done();
                _context.next = 12;
                break;
  
              case 8:
                _context.next = 10;
                return User.create({
                  id: req.user.id,
                  email: profile._json.email,
                  logins: [{ name: loginName, key: profile.id }],
                  claims: [{ type: claimType, value: profile.id }],
                  profile: {
                    displayName: profile.displayName,
                    gender: profile._json.gender,
                    picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
                  }
                }, {
                  include: [{ model: UserLogin, as: 'logins' }, { model: UserClaim, as: 'claims' }, { model: UserProfile, as: 'profile' }]
                });
  
              case 10:
                user = _context.sent;
  
                done(null, {
                  id: user.id,
                  email: user.email
                });
  
              case 12:
                _context.next = 32;
                break;
  
              case 14:
                _context.next = 16;
                return User.findAll({
                  attributes: ['id', 'email'],
                  where: { '$logins.name$': loginName, '$logins.key$': profile.id },
                  include: [{
                    attributes: ['name', 'key'],
                    model: UserLogin,
                    as: 'logins',
                    required: true
                  }]
                });
  
              case 16:
                users = _context.sent;
  
                if (!users.length) {
                  _context.next = 21;
                  break;
                }
  
                done(null, users[0]);
                _context.next = 32;
                break;
  
              case 21:
                _context.next = 23;
                return User.findOne({ where: { email: profile._json.email } });
  
              case 23:
                _user = _context.sent;
  
                if (!_user) {
                  _context.next = 28;
                  break;
                }
  
                // There is already an account using this email address. Sign in to
                // that account and link it with Facebook manually from Account Settings.
                done(null);
                _context.next = 32;
                break;
  
              case 28:
                _context.next = 30;
                return User.create({
                  email: profile._json.email,
                  emailVerified: true,
                  logins: [{ name: loginName, key: profile.id }],
                  claims: [{ type: claimType, value: accessToken }],
                  profile: {
                    displaynName: profile.displayName,
                    gender: profile._json.gender,
                    picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
                  }
                }, {
                  include: [{ model: UserLogin, as: 'logins' }, { model: UserClaim, as: 'claims' }, { model: UserProfile, as: 'profile' }]
                });
  
              case 30:
                _user = _context.sent;
  
                done(null, {
                  id: _user.id,
                  email: _user.email
                });
  
              case 32:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));
  
      return function fooBar() {
        return _ref.apply(this, arguments);
      };
    }();
  
    fooBar().catch(done);
  }));
  //import { User, UserLogin, UserClaim, UserProfile } from '../data/models';
  
  
  /**
   * Passport.js reference implementation.
   * The database schema used in this sample is available at
   * https://github.com/membership/membership.db/tree/master/postgres
   */

  exports.default = _passport2.default;

/***/ },
/* 15 */
/***/ function(module, exports) {

  module.exports = require("passport");

/***/ },
/* 16 */
/***/ function(module, exports) {

  module.exports = require("passport-facebook");

/***/ },
/* 17 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var port = exports.port = process.env.PORT || 3006;
  var host = exports.host = process.env.WEBSITE_HOSTNAME || 'localhost:' + port;
  
  var apiport = exports.apiport = process.env.PORT || 3002;
  var apihost = exports.apihost = process.env.WEBSITE_HOSTNAME || 'localhost:' + apiport;
  
  var databaseUrl = exports.databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';
  var mongodbUrl = exports.mongodbUrl = process.env.mongo_URL || 'mongodb://localhost:27017/bmf';
  var smsAPIKey = exports.smsAPIKey = process.env.sms_APIKEY || '123775A0EfpcTgrR57c6a923';
  var SMSmessage = exports.SMSmessage = process.env.sms_message || 'Thank you for booking the event';
  var analytics = exports.analytics = {
  
    // https://analytics.google.com/
    google: { trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-XXXXX-X' }
  
  };
  
  var auth = exports.auth = {
  
    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },
  
    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '282046005472557',
      secret: process.env.FACEBOOK_APP_SECRET || '20c4eb700f9064f3e2fe1449e04fd672'
    },
  
    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },
  
    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  
  };

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(20);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _home = __webpack_require__(60);
  
  var _home2 = _interopRequireDefault(_home);
  
  var _searchprovider = __webpack_require__(72);
  
  var _searchprovider2 = _interopRequireDefault(_searchprovider);
  
  var _contact = __webpack_require__(79);
  
  var _contact2 = _interopRequireDefault(_contact);
  
  var _login = __webpack_require__(83);
  
  var _login2 = _interopRequireDefault(_login);
  
  var _register = __webpack_require__(84);
  
  var _register2 = _interopRequireDefault(_register);
  
  var _forgotpass = __webpack_require__(88);
  
  var _forgotpass2 = _interopRequireDefault(_forgotpass);
  
  var _savecustomer = __webpack_require__(92);
  
  var _savecustomer2 = _interopRequireDefault(_savecustomer);
  
  var _content = __webpack_require__(100);
  
  var _content2 = _interopRequireDefault(_content);
  
  var _error = __webpack_require__(107);
  
  var _error2 = _interopRequireDefault(_error);
  
  var _verifypass = __webpack_require__(111);
  
  var _verifypass2 = _interopRequireDefault(_verifypass);
  
  var _changepassword = __webpack_require__(115);
  
  var _changepassword2 = _interopRequireDefault(_changepassword);
  
  var _updatepass = __webpack_require__(119);
  
  var _updatepass2 = _interopRequireDefault(_updatepass);
  
  var _serviceprovider = __webpack_require__(123);
  
  var _serviceprovider2 = _interopRequireDefault(_serviceprovider);
  
  var _saveprovider = __webpack_require__(127);
  
  var _saveprovider2 = _interopRequireDefault(_saveprovider);
  
  var _booking = __webpack_require__(131);
  
  var _booking2 = _interopRequireDefault(_booking);
  
  var _savebooking = __webpack_require__(135);
  
  var _savebooking2 = _interopRequireDefault(_savebooking);
  
  var _providerlogin = __webpack_require__(139);
  
  var _providerlogin2 = _interopRequireDefault(_providerlogin);
  
  var _providerforgotpass = __webpack_require__(143);
  
  var _providerforgotpass2 = _interopRequireDefault(_providerforgotpass);
  
  var _providerchangepassword = __webpack_require__(148);
  
  var _providerchangepassword2 = _interopRequireDefault(_providerchangepassword);
  
  var _updateproviderpass = __webpack_require__(152);
  
  var _updateproviderpass2 = _interopRequireDefault(_updateproviderpass);
  
  var _linkprovider = __webpack_require__(156);
  
  var _linkprovider2 = _interopRequireDefault(_linkprovider);
  
  var _verifyproviderlogin = __webpack_require__(160);
  
  var _verifyproviderlogin2 = _interopRequireDefault(_verifyproviderlogin);
  
  var _providerlist = __webpack_require__(164);
  
  var _providerlist2 = _interopRequireDefault(_providerlist);
  
  var _logout = __webpack_require__(165);
  
  var _logout2 = _interopRequireDefault(_logout);
  
  var _bookinglist = __webpack_require__(169);
  
  var _bookinglist2 = _interopRequireDefault(_bookinglist);
  
  var _cancelbooking = __webpack_require__(173);
  
  var _cancelbooking2 = _interopRequireDefault(_cancelbooking);
  
  var _changebookingdate = __webpack_require__(178);
  
  var _changebookingdate2 = _interopRequireDefault(_changebookingdate);
  
  var _managebooking = __webpack_require__(182);
  
  var _managebooking2 = _interopRequireDefault(_managebooking);
  
  var _providerhome = __webpack_require__(186);
  
  var _providerhome2 = _interopRequireDefault(_providerhome);
  
  var _providerlogout = __webpack_require__(187);
  
  var _providerlogout2 = _interopRequireDefault(_providerlogout);
  
  var _changeprovideremail = __webpack_require__(191);
  
  var _changeprovideremail2 = _interopRequireDefault(_changeprovideremail);
  
  var _changeproviderphone = __webpack_require__(195);
  
  var _changeproviderphone2 = _interopRequireDefault(_changeproviderphone);
  
  var _updateprovideremail = __webpack_require__(199);
  
  var _updateprovideremail2 = _interopRequireDefault(_updateprovideremail);
  
  var _updateproviderphone = __webpack_require__(203);
  
  var _updateproviderphone2 = _interopRequireDefault(_updateproviderphone);
  
  var _confirmOTP = __webpack_require__(207);
  
  var _confirmOTP2 = _interopRequireDefault(_confirmOTP);
  
  var _cateringbooking = __webpack_require__(211);
  
  var _cateringbooking2 = _interopRequireDefault(_cateringbooking);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // Child routes
  exports.default = {
  
    path: '/',
  
    children: [_home2.default, _searchprovider2.default, _logout2.default, _bookinglist2.default, _contact2.default, _login2.default, _providerlogin2.default, _providerhome2.default, _providerlogout2.default, _verifypass2.default, _verifyproviderlogin2.default, _forgotpass2.default, _changepassword2.default, _providerforgotpass2.default, _providerchangepassword2.default, _changeprovideremail2.default, _changeproviderphone2.default, _updatepass2.default, _updateproviderpass2.default, _updateprovideremail2.default, _confirmOTP2.default, _updateproviderphone2.default, _register2.default, _savecustomer2.default, _serviceprovider2.default, _saveprovider2.default, _booking2.default, _managebooking2.default, _cancelbooking2.default, _changebookingdate2.default, _providerlist2.default, _savebooking2.default, _linkprovider2.default, _cateringbooking2.default, _content2.default, _error2.default],
  
    action: function action(_ref) {
      var _this = this;
  
      var next = _ref.next,
          render = _ref.render,
          context = _ref.context;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var component;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return next();
  
              case 2:
                component = _context.sent;
  
                console.log("User: " + context.getUser('user'));
  
                if (!(component === undefined)) {
                  _context.next = 6;
                  break;
                }
  
                return _context.abrupt('return', component);
  
              case 6:
                return _context.abrupt('return', render(_react2.default.createElement(
                  _App2.default,
                  { context: context },
                  component
                )));
  
              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 19 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(21);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(22);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(23);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(24);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(25);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _emptyFunction = __webpack_require__(26);
  
  var _emptyFunction2 = _interopRequireDefault(_emptyFunction);
  
  var _App = __webpack_require__(27);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _Header = __webpack_require__(35);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Feedback = __webpack_require__(51);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  var _Footer = __webpack_require__(54);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var App = function (_Component) {
    (0, _inherits3.default)(App, _Component);
  
    function App() {
      (0, _classCallCheck3.default)(this, App);
      return (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(App, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var context = this.props.context;
        return {
          insertCss: context.insertCss || _emptyFunction2.default,
          setTitle: context.setTitle || _emptyFunction2.default,
          setUser: context.setUser || _emptyFunction2.default,
          setMeta: context.setMeta || _emptyFunction2.default,
          getUser: context.getUser || _emptyFunction2.default
        };
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        var insertCss = this.props.context.insertCss;
  
        this.removeCss = insertCss(_App2.default);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.removeCss();
      }
    }, {
      key: 'render',
      value: function render() {
  
        //console.log( "this.props: "+this.props);
        return !this.props.error ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_Header2.default, null),
          this.props.children,
          _react2.default.createElement(_Footer2.default, null)
        ) : this.props.children;
      }
    }]);
    return App;
  }(_react.Component);
  
  App.propTypes = {
    context: _react.PropTypes.shape({
      insertCss: _react.PropTypes.func,
      setTitle: _react.PropTypes.func,
      setUser: _react.PropTypes.func,
      setMeta: _react.PropTypes.func,
      getUser: _react.PropTypes.func
    }),
    children: _react.PropTypes.element.isRequired,
    error: _react.PropTypes.object
  };
  App.childContextTypes = {
    insertCss: _react.PropTypes.func.isRequired,
    setTitle: _react.PropTypes.func.isRequired,
    setUser: _react.PropTypes.func.isRequired,
    setMeta: _react.PropTypes.func.isRequired,
    getUser: _react.PropTypes.func.isRequired
  };
  exports.default = App;

/***/ },
/* 21 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 22 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 23 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 24 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 25 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 26 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/emptyFunction");

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(28);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./App.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./App.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */\r\n\r\n/**\r\n * 1. Change the default font family in all browsers (opinionated).\r\n * 2. Prevent adjustments of font size after orientation changes in IE and iOS.\r\n */\r\n\r\nhtml {\r\n  font-family: sans-serif; /* 1 */\r\n  -ms-text-size-adjust: 100%; /* 2 */\r\n  -webkit-text-size-adjust: 100%; /* 2 */\r\n}\r\n\r\n/**\r\n * Remove the margin in all browsers (opinionated).\r\n */\r\n\r\nbody {\r\n  margin: 0;\r\n}\r\n\r\n/* HTML5 display definitions\r\n   ========================================================================== */\r\n\r\n/**\r\n * Add the correct display in IE 9-.\r\n * 1. Add the correct display in Edge, IE, and Firefox.\r\n * 2. Add the correct display in IE.\r\n */\r\n\r\narticle,\r\naside,\r\ndetails, /* 1 */\r\nfigcaption,\r\nfigure,\r\nfooter,\r\nheader,\r\nmain, /* 2 */\r\nmenu,\r\nnav,\r\nsection,\r\nsummary { /* 1 */\r\n  display: block;\r\n}\r\n\r\n/**\r\n * Add the correct display in IE 9-.\r\n */\r\n\r\naudio,\r\ncanvas,\r\nprogress,\r\nvideo {\r\n  display: inline-block;\r\n}\r\n\r\n/**\r\n * Add the correct display in iOS 4-7.\r\n */\r\n\r\naudio:not([controls]) {\r\n  display: none;\r\n  height: 0;\r\n}\r\n\r\n/**\r\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\r\n */\r\n\r\nprogress {\r\n  vertical-align: baseline;\r\n}\r\n\r\n/**\r\n * Add the correct display in IE 10-.\r\n * 1. Add the correct display in IE.\r\n */\r\n\r\ntemplate, /* 1 */\r\n[hidden] {\r\n  display: none;\r\n}\r\n\r\n/* Links\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Remove the gray background on active links in IE 10.\r\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\r\n */\r\n\r\na {\r\n  background-color: transparent; /* 1 */\r\n  -webkit-text-decoration-skip: objects; /* 2 */\r\n}\r\n\r\n/**\r\n * Remove the outline on focused links when they are also active or hovered\r\n * in all browsers (opinionated).\r\n */\r\n\r\na:active,\r\na:hover {\r\n  outline-width: 0;\r\n}\r\n\r\n/* Text-level semantics\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Remove the bottom border in Firefox 39-.\r\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\r\n */\r\n\r\nabbr[title] {\r\n  border-bottom: none; /* 1 */\r\n  text-decoration: underline; /* 2 */\r\n  text-decoration: underline dotted; /* 2 */\r\n}\r\n\r\n/**\r\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\r\n */\r\n\r\nb,\r\nstrong {\r\n  font-weight: inherit;\r\n}\r\n\r\n/**\r\n * Add the correct font weight in Chrome, Edge, and Safari.\r\n */\r\n\r\nb,\r\nstrong {\r\n  font-weight: bolder;\r\n}\r\n\r\n/**\r\n * Add the correct font style in Android 4.3-.\r\n */\r\n\r\ndfn {\r\n  font-style: italic;\r\n}\r\n\r\n/**\r\n * Correct the font size and margin on `h1` elements within `section` and\r\n * `article` contexts in Chrome, Firefox, and Safari.\r\n */\r\n\r\nh1 {\r\n  font-size: 2em;\r\n  margin: 0.67em 0;\r\n}\r\n\r\n/**\r\n * Add the correct background and color in IE 9-.\r\n */\r\n\r\nmark {\r\n  background-color: #ff0;\r\n  color: #000;\r\n}\r\n\r\n/**\r\n * Add the correct font size in all browsers.\r\n */\r\n\r\nsmall {\r\n  font-size: 80%;\r\n}\r\n\r\n/**\r\n * Prevent `sub` and `sup` elements from affecting the line height in\r\n * all browsers.\r\n */\r\n\r\nsub,\r\nsup {\r\n  font-size: 75%;\r\n  line-height: 0;\r\n  position: relative;\r\n  vertical-align: baseline;\r\n}\r\n\r\nsub {\r\n  bottom: -0.25em;\r\n}\r\n\r\nsup {\r\n  top: -0.5em;\r\n}\r\n\r\n/* Embedded content\r\n   ========================================================================== */\r\n\r\n/**\r\n * Remove the border on images inside links in IE 10-.\r\n */\r\n\r\nimg {\r\n  border-style: none;\r\n}\r\n\r\n/**\r\n * Hide the overflow in IE.\r\n */\r\n\r\nsvg:not(:root) {\r\n  overflow: hidden;\r\n}\r\n\r\n/* Grouping content\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Correct the inheritance and scaling of font size in all browsers.\r\n * 2. Correct the odd `em` font sizing in all browsers.\r\n */\r\n\r\ncode,\r\nkbd,\r\npre,\r\nsamp {\r\n  font-family: monospace, monospace; /* 1 */\r\n  font-size: 1em; /* 2 */\r\n}\r\n\r\n/**\r\n * Add the correct margin in IE 8.\r\n */\r\n\r\nfigure {\r\n  margin: 1em 40px;\r\n}\r\n\r\n/**\r\n * 1. Add the correct box sizing in Firefox.\r\n * 2. Show the overflow in Edge and IE.\r\n */\r\n\r\nhr {\r\n  -webkit-box-sizing: content-box;\r\n          box-sizing: content-box; /* 1 */\r\n  height: 0; /* 1 */\r\n  overflow: visible; /* 2 */\r\n}\r\n\r\n/* Forms\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Change font properties to `inherit` in all browsers (opinionated).\r\n * 2. Remove the margin in Firefox and Safari.\r\n */\r\n\r\nbutton,\r\ninput,\r\nselect,\r\ntextarea {\r\n  font: inherit; /* 1 */\r\n  margin: 0; /* 2 */\r\n}\r\n\r\n/**\r\n * Restore the font weight unset by the previous rule.\r\n */\r\n\r\noptgroup {\r\n  font-weight: bold;\r\n}\r\n\r\n/**\r\n * Show the overflow in IE.\r\n * 1. Show the overflow in Edge.\r\n */\r\n\r\nbutton,\r\ninput { /* 1 */\r\n  overflow: visible;\r\n}\r\n\r\n/**\r\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\r\n * 1. Remove the inheritance of text transform in Firefox.\r\n */\r\n\r\nbutton,\r\nselect { /* 1 */\r\n  text-transform: none;\r\n}\r\n\r\n/**\r\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\r\n *    controls in Android 4.\r\n * 2. Correct the inability to style clickable types in iOS and Safari.\r\n */\r\n\r\nbutton,\r\nhtml [type=\"button\"], /* 1 */\r\n[type=\"reset\"],\r\n[type=\"submit\"] {\r\n  -webkit-appearance: button; /* 2 */\r\n}\r\n\r\n/**\r\n * Remove the inner border and padding in Firefox.\r\n */\r\n\r\nbutton::-moz-focus-inner,\r\n[type=\"button\"]::-moz-focus-inner,\r\n[type=\"reset\"]::-moz-focus-inner,\r\n[type=\"submit\"]::-moz-focus-inner {\r\n  border-style: none;\r\n  padding: 0;\r\n}\r\n\r\n/**\r\n * Restore the focus styles unset by the previous rule.\r\n */\r\n\r\nbutton:-moz-focusring,\r\n[type=\"button\"]:-moz-focusring,\r\n[type=\"reset\"]:-moz-focusring,\r\n[type=\"submit\"]:-moz-focusring {\r\n  outline: 1px dotted ButtonText;\r\n}\r\n\r\n/**\r\n * Change the border, margin, and padding in all browsers (opinionated).\r\n */\r\n\r\nfieldset {\r\n  border: 1px solid #c0c0c0;\r\n  margin: 0 2px;\r\n  padding: 0.35em 0.625em 0.75em;\r\n}\r\n\r\n/**\r\n * 1. Correct the text wrapping in Edge and IE.\r\n * 2. Correct the color inheritance from `fieldset` elements in IE.\r\n * 3. Remove the padding so developers are not caught out when they zero out\r\n *    `fieldset` elements in all browsers.\r\n */\r\n\r\nlegend {\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box; /* 1 */\r\n  color: inherit; /* 2 */\r\n  display: table; /* 1 */\r\n  max-width: 100%; /* 1 */\r\n  padding: 0; /* 3 */\r\n  white-space: normal; /* 1 */\r\n}\r\n\r\n/**\r\n * Remove the default vertical scrollbar in IE.\r\n */\r\n\r\ntextarea {\r\n  overflow: auto;\r\n}\r\n\r\n/**\r\n * 1. Add the correct box sizing in IE 10-.\r\n * 2. Remove the padding in IE 10-.\r\n */\r\n\r\n[type=\"checkbox\"],\r\n[type=\"radio\"] {\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box; /* 1 */\r\n  padding: 0; /* 2 */\r\n}\r\n\r\n/**\r\n * Correct the cursor style of increment and decrement buttons in Chrome.\r\n */\r\n\r\n[type=\"number\"]::-webkit-inner-spin-button,\r\n[type=\"number\"]::-webkit-outer-spin-button {\r\n  height: auto;\r\n}\r\n\r\n/**\r\n * 1. Correct the odd appearance in Chrome and Safari.\r\n * 2. Correct the outline style in Safari.\r\n */\r\n\r\n[type=\"search\"] {\r\n  -webkit-appearance: textfield; /* 1 */\r\n  outline-offset: -2px; /* 2 */\r\n}\r\n\r\n/**\r\n * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.\r\n */\r\n\r\n[type=\"search\"]::-webkit-search-cancel-button,\r\n[type=\"search\"]::-webkit-search-decoration {\r\n  -webkit-appearance: none;\r\n}\r\n\r\n/**\r\n * Correct the text style of placeholders in Chrome, Edge, and Safari.\r\n */\r\n\r\n::-webkit-input-placeholder {\r\n  color: inherit;\r\n  opacity: 0.54;\r\n}\r\n\r\n/**\r\n * 1. Correct the inability to style clickable types in iOS and Safari.\r\n * 2. Change font properties to `inherit` in Safari.\r\n */\r\n\r\n::-webkit-file-upload-button {\r\n  -webkit-appearance: button; /* 1 */\r\n  font: inherit; /* 2 */\r\n}\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n\r\n/*\r\n * Base styles\r\n * ========================================================================== */\r\n\r\nhtml {\r\n  color: #222;\r\n  font-weight: 100;\r\n  font-size: 1em; /* ~16px; */\r\n  font-family: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n  line-height: 1.375; /* ~22px */\r\n}\r\n\r\na {\r\n  color: #0074c2;\r\n}\r\n\r\n/*\r\n * Remove text-shadow in selection highlight:\r\n * https://twitter.com/miketaylr/status/12228805301\r\n *\r\n * These selection rule sets have to be separate.\r\n * Customize the background color to match your design.\r\n */\r\n\r\n::-moz-selection {\r\n  background: #b3d4fc;\r\n  text-shadow: none;\r\n}\r\n\r\n::selection {\r\n  background: #b3d4fc;\r\n  text-shadow: none;\r\n}\r\n\r\n/*\r\n * A better looking default horizontal rule\r\n */\r\n\r\nhr {\r\n  display: block;\r\n  height: 1px;\r\n  border: 0;\r\n  border-top: 1px solid #ccc;\r\n  margin: 1em 0;\r\n  padding: 0;\r\n}\r\n\r\n/*\r\n * Remove the gap between audio, canvas, iframes,\r\n * images, videos and the bottom of their containers:\r\n * https://github.com/h5bp/html5-boilerplate/issues/440\r\n */\r\n\r\naudio,\r\ncanvas,\r\niframe,\r\nimg,\r\nsvg,\r\nvideo {\r\n  vertical-align: middle;\r\n}\r\n\r\n/*\r\n * Remove default fieldset styles.\r\n */\r\n\r\nfieldset {\r\n  border: 0;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n/*\r\n * Allow only vertical resizing of textareas.\r\n */\r\n\r\ntextarea {\r\n  resize: vertical;\r\n}\r\n\r\n/*\r\n * Browser upgrade prompt\r\n * ========================================================================== */\r\n\r\n.browserupgrade {\r\n  margin: 0.2em 0;\r\n  background: #ccc;\r\n  color: #000;\r\n  padding: 0.2em 0;\r\n}\r\n\r\n/*\r\n * Print styles\r\n * Inlined to avoid the additional HTTP request:\r\n * http://www.phpied.com/delay-loading-your-print-css/\r\n * ========================================================================== */\r\n\r\n@media print {\r\n  *,\r\n  *::before,\r\n  *::after {\r\n    background: transparent !important;\r\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\r\n    -webkit-box-shadow: none !important;\r\n            box-shadow: none !important;\r\n    text-shadow: none !important;\r\n  }\r\n\r\n  a,\r\n  a:visited {\r\n    text-decoration: underline;\r\n  }\r\n\r\n  a[href]::after {\r\n    content: ' (' attr(href) ')';\r\n  }\r\n\r\n  abbr[title]::after {\r\n    content: ' (' attr(title) ')';\r\n  }\r\n\r\n  /*\r\n   * Don't show links that are fragment identifiers,\r\n   * or use the `javascript:` pseudo protocol\r\n   */\r\n\r\n  a[href^='#']::after,\r\n  a[href^='javascript:']::after {\r\n    content: '';\r\n  }\r\n\r\n  pre,\r\n  blockquote {\r\n    border: 1px solid #999;\r\n    page-break-inside: avoid;\r\n  }\r\n\r\n  /*\r\n   * Printing Tables:\r\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\r\n   */\r\n\r\n  thead {\r\n    display: table-header-group;\r\n  }\r\n\r\n  tr,\r\n  img {\r\n    page-break-inside: avoid;\r\n  }\r\n\r\n  img {\r\n    max-width: 100% !important;\r\n  }\r\n\r\n  p,\r\n  h2,\r\n  h3 {\r\n    orphans: 3;\r\n    widows: 3;\r\n  }\r\n\r\n  h2,\r\n  h3 {\r\n    page-break-after: avoid;\r\n  }\r\n}\r\n", "", {"version":3,"sources":["/../node_modules/normalize.css/normalize.css","/./components/variables.css","/./components/App/App.css"],"names":[],"mappings":"AAAA,4EAA4E;;AAE5E;;;GAGG;;AAEH;EACE,wBAAwB,CAAC,OAAO;EAChC,2BAA2B,CAAC,OAAO;EACnC,+BAA+B,CAAC,OAAO;CACxC;;AAED;;GAEG;;AAEH;EACE,UAAU;CACX;;AAED;gFACgF;;AAEhF;;;;GAIG;;AAEH;;;;;;;;;;;UAWU,OAAO;EACf,eAAe;CAChB;;AAED;;GAEG;;AAEH;;;;EAIE,sBAAsB;CACvB;;AAED;;GAEG;;AAEH;EACE,cAAc;EACd,UAAU;CACX;;AAED;;GAEG;;AAEH;EACE,yBAAyB;CAC1B;;AAED;;;GAGG;;AAEH;;EAEE,cAAc;CACf;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;EACE,8BAA8B,CAAC,OAAO;EACtC,sCAAsC,CAAC,OAAO;CAC/C;;AAED;;;GAGG;;AAEH;;EAEE,iBAAiB;CAClB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;EACE,oBAAoB,CAAC,OAAO;EAC5B,2BAA2B,CAAC,OAAO;EACnC,kCAAkC,CAAC,OAAO;CAC3C;;AAED;;GAEG;;AAEH;;EAEE,qBAAqB;CACtB;;AAED;;GAEG;;AAEH;;EAEE,oBAAoB;CACrB;;AAED;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;;;GAGG;;AAEH;EACE,eAAe;EACf,iBAAiB;CAClB;;AAED;;GAEG;;AAEH;EACE,uBAAuB;EACvB,YAAY;CACb;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;;EAEE,eAAe;EACf,eAAe;EACf,mBAAmB;EACnB,yBAAyB;CAC1B;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,YAAY;CACb;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;;;EAIE,kCAAkC,CAAC,OAAO;EAC1C,eAAe,CAAC,OAAO;CACxB;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;;GAGG;;AAEH;EACE,gCAAwB;UAAxB,wBAAwB,CAAC,OAAO;EAChC,UAAU,CAAC,OAAO;EAClB,kBAAkB,CAAC,OAAO;CAC3B;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;;;EAIE,cAAc,CAAC,OAAO;EACtB,UAAU,CAAC,OAAO;CACnB;;AAED;;GAEG;;AAEH;EACE,kBAAkB;CACnB;;AAED;;;GAGG;;AAEH;QACQ,OAAO;EACb,kBAAkB;CACnB;;AAED;;;GAGG;;AAEH;SACS,OAAO;EACd,qBAAqB;CACtB;;AAED;;;;GAIG;;AAEH;;;;EAIE,2BAA2B,CAAC,OAAO;CACpC;;AAED;;GAEG;;AAEH;;;;EAIE,mBAAmB;EACnB,WAAW;CACZ;;AAED;;GAEG;;AAEH;;;;EAIE,+BAA+B;CAChC;;AAED;;GAEG;;AAEH;EACE,0BAA0B;EAC1B,cAAc;EACd,+BAA+B;CAChC;;AAED;;;;;GAKG;;AAEH;EACE,+BAAuB;UAAvB,uBAAuB,CAAC,OAAO;EAC/B,eAAe,CAAC,OAAO;EACvB,eAAe,CAAC,OAAO;EACvB,gBAAgB,CAAC,OAAO;EACxB,WAAW,CAAC,OAAO;EACnB,oBAAoB,CAAC,OAAO;CAC7B;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;;EAEE,+BAAuB;UAAvB,uBAAuB,CAAC,OAAO;EAC/B,WAAW,CAAC,OAAO;CACpB;;AAED;;GAEG;;AAEH;;EAEE,aAAa;CACd;;AAED;;;GAGG;;AAEH;EACE,8BAA8B,CAAC,OAAO;EACtC,qBAAqB,CAAC,OAAO;CAC9B;;AAED;;GAEG;;AAEH;;EAEE,yBAAyB;CAC1B;;AAED;;GAEG;;AAEH;EACE,eAAe;EACf,cAAc;CACf;;AAED;;;GAGG;;AAEH;EACE,2BAA2B,CAAC,OAAO;EACnC,cAAc,CAAC,OAAO;CACvB;;AChaD;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;AChBD;;gFAEgF;;AAEhF;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe,CAAC,YAAY;EAC5B,2DAAqC;EACrC,mBAAmB,CAAC,WAAW;CAChC;;AAED;EACE,eAAe;CAChB;;AAED;;;;;;GAMG;;AAEH;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;;GAEG;;AAEH;EACE,eAAe;EACf,YAAY;EACZ,UAAU;EACV,2BAA2B;EAC3B,cAAc;EACd,WAAW;CACZ;;AAED;;;;GAIG;;AAEH;;;;;;EAME,uBAAuB;CACxB;;AAED;;GAEG;;AAEH;EACE,UAAU;EACV,UAAU;EACV,WAAW;CACZ;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;gFAEgF;;AAEhF;EACE,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;EACZ,iBAAiB;CAClB;;AAED;;;;gFAIgF;;AAEhF;EACE;;;IAGE,mCAAmC;IACnC,uBAAuB,CAAC,+DAA+D;IACvF,oCAA4B;YAA5B,4BAA4B;IAC5B,6BAA6B;GAC9B;;EAED;;IAEE,2BAA2B;GAC5B;;EAED;IACE,6BAA6B;GAC9B;;EAED;IACE,8BAA8B;GAC/B;;EAED;;;KAGG;;EAEH;;IAEE,YAAY;GACb;;EAED;;IAEE,uBAAuB;IACvB,yBAAyB;GAC1B;;EAED;;;KAGG;;EAEH;IACE,4BAA4B;GAC7B;;EAED;;IAEE,yBAAyB;GAC1B;;EAED;IACE,2BAA2B;GAC5B;;EAED;;;IAGE,WAAW;IACX,UAAU;GACX;;EAED;;IAEE,wBAAwB;GACzB;CACF","file":"App.css","sourcesContent":["/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */\r\n\r\n/**\r\n * 1. Change the default font family in all browsers (opinionated).\r\n * 2. Prevent adjustments of font size after orientation changes in IE and iOS.\r\n */\r\n\r\nhtml {\r\n  font-family: sans-serif; /* 1 */\r\n  -ms-text-size-adjust: 100%; /* 2 */\r\n  -webkit-text-size-adjust: 100%; /* 2 */\r\n}\r\n\r\n/**\r\n * Remove the margin in all browsers (opinionated).\r\n */\r\n\r\nbody {\r\n  margin: 0;\r\n}\r\n\r\n/* HTML5 display definitions\r\n   ========================================================================== */\r\n\r\n/**\r\n * Add the correct display in IE 9-.\r\n * 1. Add the correct display in Edge, IE, and Firefox.\r\n * 2. Add the correct display in IE.\r\n */\r\n\r\narticle,\r\naside,\r\ndetails, /* 1 */\r\nfigcaption,\r\nfigure,\r\nfooter,\r\nheader,\r\nmain, /* 2 */\r\nmenu,\r\nnav,\r\nsection,\r\nsummary { /* 1 */\r\n  display: block;\r\n}\r\n\r\n/**\r\n * Add the correct display in IE 9-.\r\n */\r\n\r\naudio,\r\ncanvas,\r\nprogress,\r\nvideo {\r\n  display: inline-block;\r\n}\r\n\r\n/**\r\n * Add the correct display in iOS 4-7.\r\n */\r\n\r\naudio:not([controls]) {\r\n  display: none;\r\n  height: 0;\r\n}\r\n\r\n/**\r\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\r\n */\r\n\r\nprogress {\r\n  vertical-align: baseline;\r\n}\r\n\r\n/**\r\n * Add the correct display in IE 10-.\r\n * 1. Add the correct display in IE.\r\n */\r\n\r\ntemplate, /* 1 */\r\n[hidden] {\r\n  display: none;\r\n}\r\n\r\n/* Links\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Remove the gray background on active links in IE 10.\r\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\r\n */\r\n\r\na {\r\n  background-color: transparent; /* 1 */\r\n  -webkit-text-decoration-skip: objects; /* 2 */\r\n}\r\n\r\n/**\r\n * Remove the outline on focused links when they are also active or hovered\r\n * in all browsers (opinionated).\r\n */\r\n\r\na:active,\r\na:hover {\r\n  outline-width: 0;\r\n}\r\n\r\n/* Text-level semantics\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Remove the bottom border in Firefox 39-.\r\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\r\n */\r\n\r\nabbr[title] {\r\n  border-bottom: none; /* 1 */\r\n  text-decoration: underline; /* 2 */\r\n  text-decoration: underline dotted; /* 2 */\r\n}\r\n\r\n/**\r\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\r\n */\r\n\r\nb,\r\nstrong {\r\n  font-weight: inherit;\r\n}\r\n\r\n/**\r\n * Add the correct font weight in Chrome, Edge, and Safari.\r\n */\r\n\r\nb,\r\nstrong {\r\n  font-weight: bolder;\r\n}\r\n\r\n/**\r\n * Add the correct font style in Android 4.3-.\r\n */\r\n\r\ndfn {\r\n  font-style: italic;\r\n}\r\n\r\n/**\r\n * Correct the font size and margin on `h1` elements within `section` and\r\n * `article` contexts in Chrome, Firefox, and Safari.\r\n */\r\n\r\nh1 {\r\n  font-size: 2em;\r\n  margin: 0.67em 0;\r\n}\r\n\r\n/**\r\n * Add the correct background and color in IE 9-.\r\n */\r\n\r\nmark {\r\n  background-color: #ff0;\r\n  color: #000;\r\n}\r\n\r\n/**\r\n * Add the correct font size in all browsers.\r\n */\r\n\r\nsmall {\r\n  font-size: 80%;\r\n}\r\n\r\n/**\r\n * Prevent `sub` and `sup` elements from affecting the line height in\r\n * all browsers.\r\n */\r\n\r\nsub,\r\nsup {\r\n  font-size: 75%;\r\n  line-height: 0;\r\n  position: relative;\r\n  vertical-align: baseline;\r\n}\r\n\r\nsub {\r\n  bottom: -0.25em;\r\n}\r\n\r\nsup {\r\n  top: -0.5em;\r\n}\r\n\r\n/* Embedded content\r\n   ========================================================================== */\r\n\r\n/**\r\n * Remove the border on images inside links in IE 10-.\r\n */\r\n\r\nimg {\r\n  border-style: none;\r\n}\r\n\r\n/**\r\n * Hide the overflow in IE.\r\n */\r\n\r\nsvg:not(:root) {\r\n  overflow: hidden;\r\n}\r\n\r\n/* Grouping content\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Correct the inheritance and scaling of font size in all browsers.\r\n * 2. Correct the odd `em` font sizing in all browsers.\r\n */\r\n\r\ncode,\r\nkbd,\r\npre,\r\nsamp {\r\n  font-family: monospace, monospace; /* 1 */\r\n  font-size: 1em; /* 2 */\r\n}\r\n\r\n/**\r\n * Add the correct margin in IE 8.\r\n */\r\n\r\nfigure {\r\n  margin: 1em 40px;\r\n}\r\n\r\n/**\r\n * 1. Add the correct box sizing in Firefox.\r\n * 2. Show the overflow in Edge and IE.\r\n */\r\n\r\nhr {\r\n  box-sizing: content-box; /* 1 */\r\n  height: 0; /* 1 */\r\n  overflow: visible; /* 2 */\r\n}\r\n\r\n/* Forms\r\n   ========================================================================== */\r\n\r\n/**\r\n * 1. Change font properties to `inherit` in all browsers (opinionated).\r\n * 2. Remove the margin in Firefox and Safari.\r\n */\r\n\r\nbutton,\r\ninput,\r\nselect,\r\ntextarea {\r\n  font: inherit; /* 1 */\r\n  margin: 0; /* 2 */\r\n}\r\n\r\n/**\r\n * Restore the font weight unset by the previous rule.\r\n */\r\n\r\noptgroup {\r\n  font-weight: bold;\r\n}\r\n\r\n/**\r\n * Show the overflow in IE.\r\n * 1. Show the overflow in Edge.\r\n */\r\n\r\nbutton,\r\ninput { /* 1 */\r\n  overflow: visible;\r\n}\r\n\r\n/**\r\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\r\n * 1. Remove the inheritance of text transform in Firefox.\r\n */\r\n\r\nbutton,\r\nselect { /* 1 */\r\n  text-transform: none;\r\n}\r\n\r\n/**\r\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\r\n *    controls in Android 4.\r\n * 2. Correct the inability to style clickable types in iOS and Safari.\r\n */\r\n\r\nbutton,\r\nhtml [type=\"button\"], /* 1 */\r\n[type=\"reset\"],\r\n[type=\"submit\"] {\r\n  -webkit-appearance: button; /* 2 */\r\n}\r\n\r\n/**\r\n * Remove the inner border and padding in Firefox.\r\n */\r\n\r\nbutton::-moz-focus-inner,\r\n[type=\"button\"]::-moz-focus-inner,\r\n[type=\"reset\"]::-moz-focus-inner,\r\n[type=\"submit\"]::-moz-focus-inner {\r\n  border-style: none;\r\n  padding: 0;\r\n}\r\n\r\n/**\r\n * Restore the focus styles unset by the previous rule.\r\n */\r\n\r\nbutton:-moz-focusring,\r\n[type=\"button\"]:-moz-focusring,\r\n[type=\"reset\"]:-moz-focusring,\r\n[type=\"submit\"]:-moz-focusring {\r\n  outline: 1px dotted ButtonText;\r\n}\r\n\r\n/**\r\n * Change the border, margin, and padding in all browsers (opinionated).\r\n */\r\n\r\nfieldset {\r\n  border: 1px solid #c0c0c0;\r\n  margin: 0 2px;\r\n  padding: 0.35em 0.625em 0.75em;\r\n}\r\n\r\n/**\r\n * 1. Correct the text wrapping in Edge and IE.\r\n * 2. Correct the color inheritance from `fieldset` elements in IE.\r\n * 3. Remove the padding so developers are not caught out when they zero out\r\n *    `fieldset` elements in all browsers.\r\n */\r\n\r\nlegend {\r\n  box-sizing: border-box; /* 1 */\r\n  color: inherit; /* 2 */\r\n  display: table; /* 1 */\r\n  max-width: 100%; /* 1 */\r\n  padding: 0; /* 3 */\r\n  white-space: normal; /* 1 */\r\n}\r\n\r\n/**\r\n * Remove the default vertical scrollbar in IE.\r\n */\r\n\r\ntextarea {\r\n  overflow: auto;\r\n}\r\n\r\n/**\r\n * 1. Add the correct box sizing in IE 10-.\r\n * 2. Remove the padding in IE 10-.\r\n */\r\n\r\n[type=\"checkbox\"],\r\n[type=\"radio\"] {\r\n  box-sizing: border-box; /* 1 */\r\n  padding: 0; /* 2 */\r\n}\r\n\r\n/**\r\n * Correct the cursor style of increment and decrement buttons in Chrome.\r\n */\r\n\r\n[type=\"number\"]::-webkit-inner-spin-button,\r\n[type=\"number\"]::-webkit-outer-spin-button {\r\n  height: auto;\r\n}\r\n\r\n/**\r\n * 1. Correct the odd appearance in Chrome and Safari.\r\n * 2. Correct the outline style in Safari.\r\n */\r\n\r\n[type=\"search\"] {\r\n  -webkit-appearance: textfield; /* 1 */\r\n  outline-offset: -2px; /* 2 */\r\n}\r\n\r\n/**\r\n * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.\r\n */\r\n\r\n[type=\"search\"]::-webkit-search-cancel-button,\r\n[type=\"search\"]::-webkit-search-decoration {\r\n  -webkit-appearance: none;\r\n}\r\n\r\n/**\r\n * Correct the text style of placeholders in Chrome, Edge, and Safari.\r\n */\r\n\r\n::-webkit-input-placeholder {\r\n  color: inherit;\r\n  opacity: 0.54;\r\n}\r\n\r\n/**\r\n * 1. Correct the inability to style clickable types in iOS and Safari.\r\n * 2. Change font properties to `inherit` in Safari.\r\n */\r\n\r\n::-webkit-file-upload-button {\r\n  -webkit-appearance: button; /* 1 */\r\n  font: inherit; /* 2 */\r\n}\r\n","\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n","\r\n@import '../../../node_modules/normalize.css/normalize.css';\r\n\r\n\r\n\r\n@import '../variables.css';\r\n\r\n/*\r\n * Base styles\r\n * ========================================================================== */\r\n\r\nhtml {\r\n  color: #222;\r\n  font-weight: 100;\r\n  font-size: 1em; /* ~16px; */\r\n  font-family: var(--font-family-base);\r\n  line-height: 1.375; /* ~22px */\r\n}\r\n\r\na {\r\n  color: #0074c2;\r\n}\r\n\r\n/*\r\n * Remove text-shadow in selection highlight:\r\n * https://twitter.com/miketaylr/status/12228805301\r\n *\r\n * These selection rule sets have to be separate.\r\n * Customize the background color to match your design.\r\n */\r\n\r\n::-moz-selection {\r\n  background: #b3d4fc;\r\n  text-shadow: none;\r\n}\r\n\r\n::selection {\r\n  background: #b3d4fc;\r\n  text-shadow: none;\r\n}\r\n\r\n/*\r\n * A better looking default horizontal rule\r\n */\r\n\r\nhr {\r\n  display: block;\r\n  height: 1px;\r\n  border: 0;\r\n  border-top: 1px solid #ccc;\r\n  margin: 1em 0;\r\n  padding: 0;\r\n}\r\n\r\n/*\r\n * Remove the gap between audio, canvas, iframes,\r\n * images, videos and the bottom of their containers:\r\n * https://github.com/h5bp/html5-boilerplate/issues/440\r\n */\r\n\r\naudio,\r\ncanvas,\r\niframe,\r\nimg,\r\nsvg,\r\nvideo {\r\n  vertical-align: middle;\r\n}\r\n\r\n/*\r\n * Remove default fieldset styles.\r\n */\r\n\r\nfieldset {\r\n  border: 0;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n/*\r\n * Allow only vertical resizing of textareas.\r\n */\r\n\r\ntextarea {\r\n  resize: vertical;\r\n}\r\n\r\n/*\r\n * Browser upgrade prompt\r\n * ========================================================================== */\r\n\r\n:global(.browserupgrade) {\r\n  margin: 0.2em 0;\r\n  background: #ccc;\r\n  color: #000;\r\n  padding: 0.2em 0;\r\n}\r\n\r\n/*\r\n * Print styles\r\n * Inlined to avoid the additional HTTP request:\r\n * http://www.phpied.com/delay-loading-your-print-css/\r\n * ========================================================================== */\r\n\r\n@media print {\r\n  *,\r\n  *::before,\r\n  *::after {\r\n    background: transparent !important;\r\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\r\n    box-shadow: none !important;\r\n    text-shadow: none !important;\r\n  }\r\n\r\n  a,\r\n  a:visited {\r\n    text-decoration: underline;\r\n  }\r\n\r\n  a[href]::after {\r\n    content: ' (' attr(href) ')';\r\n  }\r\n\r\n  abbr[title]::after {\r\n    content: ' (' attr(title) ')';\r\n  }\r\n\r\n  /*\r\n   * Don't show links that are fragment identifiers,\r\n   * or use the `javascript:` pseudo protocol\r\n   */\r\n\r\n  a[href^='#']::after,\r\n  a[href^='javascript:']::after {\r\n    content: '';\r\n  }\r\n\r\n  pre,\r\n  blockquote {\r\n    border: 1px solid #999;\r\n    page-break-inside: avoid;\r\n  }\r\n\r\n  /*\r\n   * Printing Tables:\r\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\r\n   */\r\n\r\n  thead {\r\n    display: table-header-group;\r\n  }\r\n\r\n  tr,\r\n  img {\r\n    page-break-inside: avoid;\r\n  }\r\n\r\n  img {\r\n    max-width: 100% !important;\r\n  }\r\n\r\n  p,\r\n  h2,\r\n  h3 {\r\n    orphans: 3;\r\n    widows: 3;\r\n  }\r\n\r\n  h2,\r\n  h3 {\r\n    page-break-after: avoid;\r\n  }\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ },
/* 29 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _assign = __webpack_require__(31);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _stringify = __webpack_require__(32);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _slicedToArray2 = __webpack_require__(33);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _getIterator2 = __webpack_require__(34);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var prefix = 's';
  var inserted = {};
  
  // Base64 encoding and decoding - The "Unicode Problem"
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }
  
  /**
   * Remove style/link elements for specified node IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
  
        if (--inserted[id] <= 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  
  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles, options) {
    var _Object$assign = (0, _assign2.default)({
      replace: false,
      prepend: false
    }, options);
  
    var replace = _Object$assign.replace;
    var prepend = _Object$assign.prepend;
  
  
    var ids = [];
    for (var i = 0; i < styles.length; i++) {
      var _styles$i = (0, _slicedToArray3.default)(styles[i], 4);
  
      var moduleId = _styles$i[0];
      var css = _styles$i[1];
      var media = _styles$i[2];
      var sourceMap = _styles$i[3];
  
      var id = moduleId + '-' + i;
  
      ids.push(id);
  
      if (inserted[id]) {
        if (!replace) {
          inserted[id]++;
          continue;
        }
      }
  
      inserted[id] = 1;
  
      var elem = document.getElementById(prefix + id);
      var create = false;
  
      if (!elem) {
        create = true;
  
        elem = document.createElement('style');
        elem.setAttribute('type', 'text/css');
        elem.id = prefix + id;
  
        if (media) {
          elem.setAttribute('media', media);
        }
      }
  
      var cssText = css;
      if (sourceMap) {
        cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
        cssText += '\n/*# sourceURL=' + sourceMap.file + '*/';
      }
  
      if ('textContent' in elem) {
        elem.textContent = cssText;
      } else {
        elem.styleSheet.cssText = cssText;
      }
  
      if (create) {
        if (prepend) {
          document.head.insertBefore(elem, document.head.childNodes[0]);
        } else {
          document.head.appendChild(elem);
        }
      }
    }
  
    return removeCss.bind(null, ids);
  }
  
  module.exports = insertCss;

/***/ },
/* 31 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/assign");

/***/ },
/* 32 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 33 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ },
/* 34 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Header = __webpack_require__(37);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Link = __webpack_require__(39);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Navigation = __webpack_require__(46);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var _bmf = __webpack_require__(50);
  
  var _bmf2 = _interopRequireDefault(_bmf);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Header() {
    //console.log("HTTP QUERY: "+query);
    return _react2.default.createElement(
      'div',
      { className: _Header2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Header2.default.container },
        _react2.default.createElement(
          _Link2.default,
          { className: _Header2.default.brand, to: '/' },
          _react2.default.createElement('img', { src: _bmf2.default, width: '38', height: '38', align: 'left', alt: 'React' }),
          _react2.default.createElement(
            'span',
            { className: _Header2.default.brandTxt },
            'Dream True Solutions'
          )
        ),
        _react2.default.createElement(_Navigation2.default, { className: _Header2.default.nav })
      )
    );
  }
  
  exports.default = (0, _withStyles2.default)(_Header2.default)(Header);

/***/ },
/* 36 */
/***/ function(module, exports) {

  module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(38);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Header.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Header.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n\r\n.Header_root_AA5 {\r\n  background: #008B8B;\r\n  color: #fff;\r\n}\r\n\r\n.Header_container_2Ar {\r\n  margin: 0 auto;\r\n  padding: 20px 0;\r\n  max-width: 1000px;\r\n}\r\n\r\n.Header_brand_w2l {\r\n  color: rgb(146, 229, 252);\r\n  text-decoration: none;\r\n  font-size: 1.10em; /* ~28px */\r\n}\r\n\r\n.Header_brandTxt_Qj7 {\r\n  margin-left: 1px;\r\n}\r\n\r\n.Header_nav_2n3 {\r\n  float: right;\r\n  margin-top: 2px;\r\n  margin-right: 0px;\r\n  padding-right: 2px;\r\n}\r\n\r\n.Header_banner_2t0 {\r\n  text-align: center;\r\n}\r\n\r\n.Header_bannerTitle_3Hr {\r\n  margin: 0;\r\n  padding: 5px;\r\n  font-weight: normal;\r\n  font-size: 2em;\r\n  line-height: 1em;\r\n}\r\n\r\n.Header_bannerDesc_32d {\r\n  padding: 0;\r\n  color: rgba(255, 255, 255, 0.5);\r\n  font-size: 1.25em;\r\n  margin: 0;\r\n}\r\n", "", {"version":3,"sources":["/./components/variables.css","/./components/Header/Header.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;AChBD;EACE,oBAAoB;EACpB,YAAY;CACb;;AAED;EACE,eAAe;EACf,gBAAgB;EAChB,kBAAoC;CACrC;;AAED;EACE,0BAAiD;EACjD,sBAAsB;EACtB,kBAAkB,CAAC,WAAW;CAC/B;;AAED;EACE,iBAAiB;CAClB;;AAED;EACE,aAAa;EACb,gBAAgB;EAChB,kBAAkB;EAClB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;CACpB;;AAED;EACE,UAAU;EACV,aAAa;EACb,oBAAoB;EACpB,eAAe;EACf,iBAAiB;CAClB;;AAED;EACE,WAAW;EACX,gCAAgC;EAChC,kBAAkB;EAClB,UAAU;CACX","file":"Header.css","sourcesContent":["\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n","\r\n@import '../variables.css';\r\n\r\n:root {\r\n  --brand-color: #61dafb;\r\n}\r\n\r\n.root {\r\n  background: #008B8B;\r\n  color: #fff;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 20px 0;\r\n  max-width: var(--max-content-width);\r\n}\r\n\r\n.brand {\r\n  color: color(var(--brand-color) lightness(+10%));\r\n  text-decoration: none;\r\n  font-size: 1.10em; /* ~28px */\r\n}\r\n\r\n.brandTxt {\r\n  margin-left: 1px;\r\n}\r\n\r\n.nav {\r\n  float: right;\r\n  margin-top: 2px;\r\n  margin-right: 0px;\r\n  padding-right: 2px;\r\n}\r\n\r\n.banner {\r\n  text-align: center;\r\n}\r\n\r\n.bannerTitle {\r\n  margin: 0;\r\n  padding: 5px;\r\n  font-weight: normal;\r\n  font-size: 2em;\r\n  line-height: 1em;\r\n}\r\n\r\n.bannerDesc {\r\n  padding: 0;\r\n  color: rgba(255, 255, 255, 0.5);\r\n  font-size: 1.25em;\r\n  margin: 0;\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Header_root_AA5",
  	"container": "Header_container_2Ar",
  	"brand": "Header_brand_w2l",
  	"brandTxt": "Header_brandTxt_Qj7",
  	"nav": "Header_nav_2n3",
  	"banner": "Header_banner_2t0",
  	"bannerTitle": "Header_bannerTitle_3Hr",
  	"bannerDesc": "Header_bannerDesc_32d"
  };

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(40);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _objectWithoutProperties2 = __webpack_require__(41);
  
  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
  
  var _getPrototypeOf = __webpack_require__(21);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(22);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(23);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(24);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(25);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _history = __webpack_require__(42);
  
  var _history2 = _interopRequireDefault(_history);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function isLeftClickEvent(event) {
    return event.button === 0;
  }
  
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  
  var Link = function (_Component) {
    (0, _inherits3.default)(Link, _Component);
  
    function Link() {
      var _ref;
  
      var _temp, _this, _ret;
  
      (0, _classCallCheck3.default)(this, Link);
  
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Link.__proto__ || (0, _getPrototypeOf2.default)(Link)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
        var allowTransition = true;
  
        if (_this.props.onClick) {
          _this.props.onClick(event);
        }
  
        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }
  
        if (event.defaultPrevented === true) {
          allowTransition = false;
        }
  
        event.preventDefault();
  
        if (allowTransition) {
          if (_this.props.to) {
            _history2.default.push(_this.props.to);
          } else {
            _history2.default.push({
              pathname: event.currentTarget.pathname,
              search: event.currentTarget.search
            });
          }
        }
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    } // eslint-disable-line react/prefer-stateless-function
  
    (0, _createClass3.default)(Link, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            to = _props.to,
            props = (0, _objectWithoutProperties3.default)(_props, ['to']); // eslint-disable-line no-use-before-define
  
        return _react2.default.createElement('a', (0, _extends3.default)({ href: _history2.default.createHref(to) }, props, { onClick: this.handleClick }));
      }
    }]);
    return Link;
  }(_react.Component);
  
  Link.propTypes = {
    to: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]).isRequired,
    onClick: _react.PropTypes.func
  };
  exports.default = Link;

/***/ },
/* 40 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 41 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _createBrowserHistory = __webpack_require__(43);
  
  var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
  
  var _createMemoryHistory = __webpack_require__(44);
  
  var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
  
  var _useQueries = __webpack_require__(45);
  
  var _useQueries2 = _interopRequireDefault(_useQueries);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var history = (0, _useQueries2.default)( false ? _createBrowserHistory2.default : _createMemoryHistory2.default)(); /**
                                                                                                                                    * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                                    *
                                                                                                                                    * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                                    *
                                                                                                                                    * This source code is licensed under the MIT license found in the
                                                                                                                                    * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                    */
  
  exports.default = history;

/***/ },
/* 43 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createBrowserHistory");

/***/ },
/* 44 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createMemoryHistory");

/***/ },
/* 45 */
/***/ function(module, exports) {

  module.exports = require("history/lib/useQueries");

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(47);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Navigation = __webpack_require__(48);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var _Link = __webpack_require__(39);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Navigation(_ref) {
    var className = _ref.className;
  
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(_Navigation2.default.root, className), role: 'navigation' },
      _react2.default.createElement(
        _Link2.default,
        { className: _Navigation2.default.link, to: '/about' },
        'About'
      ),
      _react2.default.createElement(
        'span',
        { className: _Navigation2.default.spacer },
        '|'
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: _Navigation2.default.link, to: '/contact' },
        'Contact'
      ),
      _react2.default.createElement(
        'span',
        { className: _Navigation2.default.spacer },
        ' | '
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: _Navigation2.default.link, to: '/login' },
        'Customer Log in'
      ),
      _react2.default.createElement(
        'span',
        { className: _Navigation2.default.spacer },
        '|'
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: _Navigation2.default.link, to: '/providerlogin' },
        'Service Provider Login'
      ),
      _react2.default.createElement(
        'span',
        { className: _Navigation2.default.spacer },
        '|'
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: (0, _classnames2.default)(_Navigation2.default.link, _Navigation2.default.highlight), to: '/register' },
        'Customer Sign up'
      ),
      _react2.default.createElement(
        'span',
        { className: _Navigation2.default.spacer },
        ' | '
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: _Navigation2.default.link, to: '/serviceprovider' },
        'Service Provider Registration'
      )
    );
  }
  
  Navigation.propTypes = {
    className: _react.PropTypes.string
  };
  
  exports.default = (0, _withStyles2.default)(_Navigation2.default)(Navigation);

/***/ },
/* 47 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(49);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Navigation.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Navigation.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "\r\n\r\n.Navigation_root_1XY {\r\n  margin: 0;\r\n}\r\n\r\n.Navigation_link_3AL {\r\n  display: inline-block;\r\n  padding: 3px 5px;\r\n  text-decoration: none;\r\n  font-size: 1.000em; /* ~18px */\r\n}\r\n\r\n.Navigation_link_3AL,\r\n.Navigation_link_3AL:active,\r\n.Navigation_link_3AL:visited {\r\n  color: rgba(255, 255, 255, 0.6);\r\n}\r\n\r\n.Navigation_link_3AL:hover {\r\n  color: rgba(255, 255, 255, 1);\r\n}\r\n\r\n.Navigation_highlight_2nH {\r\n  margin-right: 8px;\r\n  margin-left: 8px;\r\n  border-radius: 3px;\r\n  background: rgba(0, 0, 0, 0.15);\r\n  color: #fff;\r\n}\r\n\r\n.Navigation_highlight_2nH:hover {\r\n  background: rgba(0, 0, 0, 0.3);\r\n}\r\n\r\n.Navigation_spacer_3NE {\r\n  color: red;\r\n}\r\n", "", {"version":3,"sources":["/./components/Navigation/Navigation.css"],"names":[],"mappings":";;AAEA;EACE,UAAU;CACX;;AAED;EACE,sBAAsB;EACtB,iBAAiB;EACjB,sBAAsB;EACtB,mBAAmB,CAAC,WAAW;CAChC;;AAED;;;EAGE,gCAAgC;CACjC;;AAED;EACE,8BAA8B;CAC/B;;AAED;EACE,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,gCAAgC;EAChC,YAAY;CACb;;AAED;EACE,+BAA+B;CAChC;;AAED;EACE,WAAW;CACZ","file":"Navigation.css","sourcesContent":["\r\n\r\n.root {\r\n  margin: 0;\r\n}\r\n\r\n.link {\r\n  display: inline-block;\r\n  padding: 3px 5px;\r\n  text-decoration: none;\r\n  font-size: 1.000em; /* ~18px */\r\n}\r\n\r\n.link,\r\n.link:active,\r\n.link:visited {\r\n  color: rgba(255, 255, 255, 0.6);\r\n}\r\n\r\n.link:hover {\r\n  color: rgba(255, 255, 255, 1);\r\n}\r\n\r\n.highlight {\r\n  margin-right: 8px;\r\n  margin-left: 8px;\r\n  border-radius: 3px;\r\n  background: rgba(0, 0, 0, 0.15);\r\n  color: #fff;\r\n}\r\n\r\n.highlight:hover {\r\n  background: rgba(0, 0, 0, 0.3);\r\n}\r\n\r\n.spacer {\r\n  color: red;\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Navigation_root_1XY",
  	"link": "Navigation_link_3AL",
  	"highlight": "Navigation_highlight_2nH",
  	"spacer": "Navigation_spacer_3NE"
  };

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "components/Header/bmf.png?57f5265da114952432bfae3ba6c7da83";

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Feedback = __webpack_require__(52);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Feedback() {
    return _react2.default.createElement(
      'div',
      { className: _Feedback2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Feedback2.default.container },
        _react2.default.createElement(
          'a',
          {
            className: _Feedback2.default.link,
            href: 'https://gitter.im/kriasoft/react-starter-kit'
          },
          'Ask a question'
        ),
        _react2.default.createElement(
          'span',
          { className: _Feedback2.default.spacer },
          '|'
        ),
        _react2.default.createElement(
          'a',
          {
            className: _Feedback2.default.link,
            href: 'https://github.com/kriasoft/react-starter-kit/issues/new'
          },
          'Report an issue'
        )
      )
    );
  }
  
  exports.default = (0, _withStyles2.default)(_Feedback2.default)(Feedback);

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(53);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Feedback.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Feedback.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n\r\n.Feedback_root_2M- {\r\n  background: #f5f5f5;\r\n  color: #333;\r\n}\r\n\r\n.Feedback_container_2RO {\r\n  margin: 0 auto;\r\n  padding: 20px 8px;\r\n  max-width: 1000px;\r\n  text-align: center;\r\n  font-size: 1.5em; /* ~24px */\r\n}\r\n\r\n.Feedback_link_w25,\r\n.Feedback_link_w25:active,\r\n.Feedback_link_w25:hover,\r\n.Feedback_link_w25:visited {\r\n  color: #333;\r\n  text-decoration: none;\r\n}\r\n\r\n.Feedback_link_w25:hover {\r\n  text-decoration: underline;\r\n}\r\n\r\n.Feedback_spacer_1Ur {\r\n  padding-right: 15px;\r\n  padding-left: 15px;\r\n}\r\n", "", {"version":3,"sources":["/./components/variables.css","/./components/Feedback/Feedback.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,oBAAoB;EACpB,YAAY;CACb;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAoC;EACpC,mBAAmB;EACnB,iBAAiB,CAAC,WAAW;CAC9B;;AAED;;;;EAIE,YAAY;EACZ,sBAAsB;CACvB;;AAED;EACE,2BAA2B;CAC5B;;AAED;EACE,oBAAoB;EACpB,mBAAmB;CACpB","file":"Feedback.css","sourcesContent":["\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n","\r\n@import '../variables.css';\r\n\r\n.root {\r\n  background: #f5f5f5;\r\n  color: #333;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 20px 8px;\r\n  max-width: var(--max-content-width);\r\n  text-align: center;\r\n  font-size: 1.5em; /* ~24px */\r\n}\r\n\r\n.link,\r\n.link:active,\r\n.link:hover,\r\n.link:visited {\r\n  color: #333;\r\n  text-decoration: none;\r\n}\r\n\r\n.link:hover {\r\n  text-decoration: underline;\r\n}\r\n\r\n.spacer {\r\n  padding-right: 15px;\r\n  padding-left: 15px;\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Feedback_root_2M-",
  	"container": "Feedback_container_2RO",
  	"link": "Feedback_link_w25",
  	"spacer": "Feedback_spacer_1Ur"
  };

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Footer = __webpack_require__(55);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var _Link = __webpack_require__(39);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _fb = __webpack_require__(57);
  
  var _fb2 = _interopRequireDefault(_fb);
  
  var _twitter = __webpack_require__(58);
  
  var _twitter2 = _interopRequireDefault(_twitter);
  
  var _linkedin = __webpack_require__(59);
  
  var _linkedin2 = _interopRequireDefault(_linkedin);
  
  var _Navigation = __webpack_require__(46);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Footer() {
    return _react2.default.createElement(
      'div',
      { className: _Footer2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Footer2.default.container },
        _react2.default.createElement(
          _Link2.default,
          { className: _Footer2.default.brand, to: '/facebook' },
          _react2.default.createElement('img', { src: _fb2.default, width: '20', height: '20', alt: 'React' }),
          _react2.default.createElement(
            'span',
            { className: _Footer2.default.spacer },
            '   '
          )
        ),
        _react2.default.createElement(
          _Link2.default,
          { className: _Footer2.default.brand, to: '/twitter' },
          _react2.default.createElement('img', { src: _twitter2.default, width: '20', height: '20', alt: 'React' }),
          _react2.default.createElement(
            'span',
            { className: _Footer2.default.spacer },
            ' '
          )
        ),
        _react2.default.createElement(
          _Link2.default,
          { className: _Footer2.default.brand, to: '/linkedin' },
          _react2.default.createElement('img', { src: _linkedin2.default, width: '20', height: '20', alt: 'React' }),
          _react2.default.createElement(
            'span',
            { className: _Footer2.default.spacer },
            ' '
          )
        ),
        _react2.default.createElement(
          'span',
          { className: _Footer2.default.text },
          '\xA9 Dream True Soutions'
        ),
        _react2.default.createElement(
          'span',
          { className: _Footer2.default.spacer },
          '\xB7'
        ),
        _react2.default.createElement(
          _Link2.default,
          { className: _Footer2.default.link, to: '/' },
          'Home'
        ),
        _react2.default.createElement(
          'span',
          { className: _Footer2.default.spacer },
          '\xB7'
        ),
        _react2.default.createElement(
          _Link2.default,
          { className: _Footer2.default.link, to: '/privacy' },
          'Privacy'
        ),
        _react2.default.createElement(
          'span',
          { className: _Footer2.default.spacer },
          '\xB7'
        )
      )
    );
  }
  
  exports.default = (0, _withStyles2.default)(_Footer2.default)(Footer);

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(56);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Footer.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Footer.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n\r\n.Footer_root_3mW {\r\n  background: #446;\r\n  color: #fff;\r\n  \r\n}\r\n\r\n.Footer_container_3k8 {\r\n  margin: 0 auto;\r\n  padding: 20px 15px;\r\n  max-width: 1000px;\r\n  text-align: center;\r\n}\r\n\r\n.Footer_text_jeh {\r\n  color: rgba(255, 255, 255, 0.5);\r\n}\r\n\r\n.Footer_textMuted_1yA {\r\n  color: rgba(255, 255, 255, 0.3);\r\n}\r\n\r\n.Footer_spacer_2ei {\r\n  color: rgba(255, 255, 255, 0.3);\r\n}\r\n\r\n.Footer_text_jeh,\r\n.Footer_link_2Cg {\r\n  padding: 2px 5px;\r\n  font-size: 1em;\r\n}\r\n\r\n.Footer_link_2Cg,\r\n.Footer_link_2Cg:active,\r\n.Footer_link_2Cg:visited {\r\n  color: rgba(255, 255, 255, 0.6);\r\n  text-decoration: none;\r\n}\r\n\r\n.Footer_link_2Cg:hover {\r\n  color: rgba(255, 255, 255, 1);\r\n}\r\n\r\n.Footer_brand_17U {\r\n  color: rgb(146, 229, 252);\r\n  text-decoration: none;\r\n  font-size: 1.75em; /* ~28px */\r\n}", "", {"version":3,"sources":["/./components/variables.css","/./components/Footer/Footer.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,iBAAiB;EACjB,YAAY;;CAEb;;AAMD;EACE,eAAe;EACf,mBAAmB;EACnB,kBAAoC;EACpC,mBAAmB;CACpB;;AAED;EACE,gCAAgC;CACjC;;AAED;EAEE,gCAAgC;CACjC;;AAED;EACE,gCAAgC;CACjC;;AAED;;EAEE,iBAAiB;EACjB,eAAe;CAChB;;AAED;;;EAGE,gCAAgC;EAChC,sBAAsB;CACvB;;AAED;EACE,8BAA8B;CAC/B;;AACD;EACE,0BAAiD;EACjD,sBAAsB;EACtB,kBAAkB,CAAC,WAAW;CAC/B","file":"Footer.css","sourcesContent":["\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n","\r\n@import '../variables.css';\r\n\r\n.root {\r\n  background: #446;\r\n  color: #fff;\r\n  \r\n}\r\n\r\n:root {\r\n  --brand-color: #61dafb;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 20px 15px;\r\n  max-width: var(--max-content-width);\r\n  text-align: center;\r\n}\r\n\r\n.text {\r\n  color: rgba(255, 255, 255, 0.5);\r\n}\r\n\r\n.textMuted {\r\n  composes: text;\r\n  color: rgba(255, 255, 255, 0.3);\r\n}\r\n\r\n.spacer {\r\n  color: rgba(255, 255, 255, 0.3);\r\n}\r\n\r\n.text,\r\n.link {\r\n  padding: 2px 5px;\r\n  font-size: 1em;\r\n}\r\n\r\n.link,\r\n.link:active,\r\n.link:visited {\r\n  color: rgba(255, 255, 255, 0.6);\r\n  text-decoration: none;\r\n}\r\n\r\n.link:hover {\r\n  color: rgba(255, 255, 255, 1);\r\n}\r\n.brand {\r\n  color: color(var(--brand-color) lightness(+10%));\r\n  text-decoration: none;\r\n  font-size: 1.75em; /* ~28px */\r\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Footer_root_3mW",
  	"container": "Footer_container_3k8",
  	"text": "Footer_text_jeh",
  	"textMuted": "Footer_textMuted_1yA Footer_text_jeh",
  	"spacer": "Footer_spacer_2ei",
  	"link": "Footer_link_2Cg",
  	"brand": "Footer_brand_17U"
  };

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "public/fb.png?637b9a59e490ef651505c74a03122958";

/***/ },
/* 58 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGNzdGMTE3NDA3MjA2ODExOTk0Q0JDNjhBREQ3QkU0OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFODYxM0VGQUFGMkExMUUxOTBFOUZEM0JFQjVCNTNBRCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFODYxM0VGOUFGMkExMUUxOTBFOUZEM0JFQjVCNTNBRCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDM4MDExNzQwNzIwNjgxMThDMTRDQkRDMUUyOEQ1OEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Rjc3RjExNzQwNzIwNjgxMTk5NENCQzY4QUREN0JFNDkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5d82l2AAACE0lEQVR42mL8//8/AyWAiYFCwHLgwAEGx0OfBfbb8X7ApgAkB6TqgdgAiB8AcSNQ7QOonAIjQ+MmA0ZmlgX///5xQDcEpBkod+C/qJw+Awc3A8PvnwyMrx59/P/7x3ygtAM/D08bk7yYsOR/BV19oMILQA0GKM5jZU0CyTEISzEwcPMzMAiIMfxXNuBnkFAqYFYxVP7LxhXEpC/B/xRk+n9lQ3kgfR5oyHyQ00AGiEpIyYBtRgbMLAwgA1UEubZ/zjFvZBSbcMBNRMsw9dqnvyFgBR9eMTC8egR07o8HLOLyLH9EZGWwhc3/YEFVYPjdYVEQ4ft+6v7jELAzQQDoTDD+/VPhD46Q52NlvAPSDI7Gk9GG57UUZddgqGJlh2AsQPT/j9NwHzk4OPzi5Bd89ZWJjfH1z/8q/xgY2AjFfY7s/1zFX68fwhPSxQfPbly588D0z58/PIQ0K3Iz7WgyETsJjykQsTHE4C2Qivc5+iXk2ue/+ve//vPA5feJWsx1QP//QDEAKPAHGHV/xCRlWD6wcOsy8Ili1bzJgjPNXoz9/IF7SGkFqLEBSOcD41vg1R+gj3j5UNM6I8MXfQHmtb067AuBmg+DLEOWZwTmRoXjb39rTLn7y+Tml78qz7//V2ZnZvgixMb4Up2H+U6OMtsZS2HWG0C1T9A1wwyAeQWUaXigGKQQ5M8voKQF5WMFAAEGAPZkw8s7EntAAAAAAElFTkSuQmCC"

/***/ },
/* 59 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIFSURBVEhLzZY9SCNREMcnkQQ9cn4gWiiC5AqPEwUjWKhgYadWWlkodpYHOTitTkUEc8WW19gIYquFiCCIHhIxigqCXgQbPdKchXAqfkSzzsxO4kvc1S184A/+vHkzs++/b78STywWMyOLUZjbPQIddIdqYKizBTzdPwyTTMLfh6X0thg/J9nMA12DJpkYO3+l9LaEG6vYzEsTY/sEIJXSIl4bYSNIPegVYhk93D9X4hhgb9USxXY9boU47mik9ROYs+Msiu16XAtx3NFoTzuXCI5telwLcTZai3OJ4Nimx7UQfryh4ensVSoDfh4Tl3c8wuGmNRLFZQD+AoB/p5JAqmsBPnyUicLeihjVt0lGIb4lAfK5iQdzopdHYmo5ComLm6xL/OVrBP4k8wFKyiUj7P8Wo9oWyTxhTvZJhNsenuFRzTnREZmGpfM8mQkHUblH98nnUrHLOfBroCt7HTnO+T1CbpLWo6nmVIzVfVYa6vfl+bLXkePECF1zpWKTG13ahm/z6yyKs1DXkePk0qFrrlSUHJ01aWxhI5OnOLN7It2fFvLqjniBnByj9rqovXiPMryUc1l7H0b5PnkflFwGtVeplRYFbGvWC1uInxOd/D+THaXQVacQMZLfDV1C5B7hRKcQb3NFEcDtFX4x8c+EDuHa5OHtDwWhLuABuLvWIlq7PxSER722NIzBJCouAAAAAElFTkSuQmCC"

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Home = __webpack_require__(62);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _Login = __webpack_require__(65);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(17);
  
  var _util = __webpack_require__(70);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var sessionid = '';
  var email;
  
  exports.default = {
  
    path: '/home',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var body, bookinglist;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sessionid = query.sessionid;
                email = query.email;
                console.log("Sessionid - index.js - Home " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 10;
                  break;
                }
  
                _context.next = 6;
                return (0, _util.getSessionid)();
  
              case 6:
                body = _context.sent;
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: body }));
  
              case 10:
                _context.next = 12;
                return getBookingData();
  
              case 12:
                bookinglist = _context.sent;
                return _context.abrupt('return', _react2.default.createElement(_Home2.default, { sessionid: sessionid, bookinglist: bookinglist, email: email }));
  
              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  /*function getSessionid() {
    var request = require('request');
    console.log('Home - genSessionid - calling API');
    var url = `http://${apihost}/genSessionid`;
    console.log("getSeesionid - URL: " + url);
    
    return new Promise(function(resolve, reject) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('genSessionid - Response from API' + body);
        //sessionid = body;
        resolve(body);
      }
      else {
        
        console.log("genSessionid -API Server not running: "+error);
        return reject(error);
      }
      console.log("getSessionid - Returning from API call")
    });
  
   });
   
  }*/
  
  function getBookingData() {
    var request = __webpack_require__(71);
  
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/getBookingHistory?email=' + email;
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside getBookingData Response from API (body)' + body);
          resolve(body);
        } else {
          console.log("Error Object: " + error);
          return reject(error);
        }
      });
    });
  }

/***/ },
/* 61 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Home = __webpack_require__(63);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _Link = __webpack_require__(39);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _classnames = __webpack_require__(47);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Welcome to World of Opporunity'; /**
                                                 * React Starter Kit (https://www.reactstarterkit.com/)
                                                 *
                                                 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                 *
                                                 * This source code is licensed under the MIT license found in the
                                                 * LICENSE.txt file in the root directory of this source tree.
                                                 */
  
  var user = 'Customer';
  
  function Home(_ref, context) {
    var sessionid = _ref.sessionid,
        email = _ref.email,
        bookinglist = _ref.bookinglist;
  
    context.setTitle(title);
    context.setUser(user);
    // context.getUser('user');
    var logoutlink = "/logout?sessionid=" + sessionid;
    var bookinglink = "/booking?sessionid=" + sessionid + "&email=" + email;
    var cateringbookinglink = "/cateringbooking?sessionid=" + sessionid + "&email=" + email;
    var bookingdata = JSON.parse(bookinglist);
    var size = bookingdata.length;
    console.log("Size of the booking List: " + size);
    if (size == 0) {
      return _react2.default.createElement(
        'div',
        { className: _Home2.default.cards },
        _react2.default.createElement(
          'div',
          { className: _Home2.default.card },
          _react2.default.createElement(
            'header',
            null,
            _react2.default.createElement(
              'h2',
              null,
              'Search Provider'
            )
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'form',
            { name: 'searchform', method: 'get', action: 'searchprovider' },
            _react2.default.createElement('input', { type: 'text', id: 'category', name: 'category' }),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement('input', { type: 'radio', name: 'searchterm', value: 'pincode' }),
            'Pincode',
            _react2.default.createElement('br', null),
            _react2.default.createElement('input', { type: 'radio', name: 'searchterm', value: 'city' }),
            'City',
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'button',
              { className: _Home2.default.button, value: 'Search', type: 'submit' },
              'Search'
            ),
            _react2.default.createElement('input', { id: 'sessionid',
              type: 'hidden',
              name: 'sessionid',
              value: sessionid
            }),
            _react2.default.createElement('input', {
              id: 'email',
              type: 'hidden',
              name: 'email',
              value: email
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Home2.default.card },
          _react2.default.createElement(
            'header',
            null,
            _react2.default.createElement(
              'h2',
              null,
              'Service Booking'
            )
          ),
          _react2.default.createElement(
            _Link2.default,
            { className: _Home2.default.link, to: bookinglink },
            'Home Function'
          ),
          _react2.default.createElement(
            _Link2.default,
            { className: _Home2.default.link, to: '/contact' },
            'Astrology'
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            _Link2.default,
            { className: _Home2.default.link, to: '/' },
            'Marriage Services'
          ),
          _react2.default.createElement(
            _Link2.default,
            { className: _Home2.default.link, to: cateringbookinglink },
            'Catering'
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            _Link2.default,
            { className: _Home2.default.link, to: logoutlink },
            'Logout'
          ),
          _react2.default.createElement('input', {
            id: 'sessionid',
            type: 'hidden',
            name: 'sessionid',
            value: sessionid
          }),
          _react2.default.createElement('input', {
            id: 'email',
            type: 'hidden',
            name: 'email',
            value: email
          })
        ),
        _react2.default.createElement(
          'div',
          { className: _Home2.default.card },
          _react2.default.createElement(
            'header',
            null,
            _react2.default.createElement(
              'h2',
              null,
              'Booking History'
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'p',
              { className: _Home2.default.p },
              _react2.default.createElement(
                'b',
                null,
                ' No booking history available'
              ),
              ' '
            )
          )
        )
      );
    } else {
      return (
        //<div className={s.root}>
        // <div className={s.container}>
        //   <h1>{title}</h1>
  
        _react2.default.createElement(
          'div',
          { className: _Home2.default.cards },
          _react2.default.createElement(
            'div',
            { className: _Home2.default.card },
            _react2.default.createElement(
              'header',
              null,
              _react2.default.createElement(
                'h2',
                null,
                'Search Provider'
              )
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'form',
              { name: 'searchform', method: 'get', action: 'searchprovider' },
              _react2.default.createElement('input', { type: 'text', id: 'category', name: 'category' }),
              _react2.default.createElement('br', null),
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { type: 'radio', name: 'searchterm', value: 'pincode' }),
              'Pincode',
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { type: 'radio', name: 'searchterm', value: 'city' }),
              'City',
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'button',
                { className: _Home2.default.button, value: 'Search', type: 'submit' },
                'Search'
              ),
              _react2.default.createElement('input', { id: 'sessionid',
                type: 'hidden',
                name: 'sessionid',
                value: sessionid
              }),
              _react2.default.createElement('input', {
                id: 'email',
                type: 'hidden',
                name: 'email',
                value: email
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _Home2.default.card },
            _react2.default.createElement(
              'header',
              null,
              _react2.default.createElement(
                'h2',
                null,
                'Service Booking'
              )
            ),
            _react2.default.createElement(
              _Link2.default,
              { className: _Home2.default.link, to: bookinglink },
              'Home Function'
            ),
            _react2.default.createElement(
              _Link2.default,
              { className: _Home2.default.link, to: '/contact' },
              'Astrology'
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              _Link2.default,
              { className: _Home2.default.link, to: '/' },
              'Marriage Services'
            ),
            _react2.default.createElement(
              _Link2.default,
              { className: _Home2.default.link, to: cateringbookinglink },
              'Catering'
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              _Link2.default,
              { className: _Home2.default.link, to: logoutlink },
              'Logout'
            ),
            _react2.default.createElement('input', {
              id: 'sessionid',
              type: 'hidden',
              name: 'sessionid',
              value: sessionid
            }),
            _react2.default.createElement('input', {
              id: 'email',
              type: 'hidden',
              name: 'email',
              value: email
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Home2.default.card },
            _react2.default.createElement(
              'header',
              null,
              _react2.default.createElement(
                'h2',
                null,
                'Booking History'
              )
            ),
            _react2.default.createElement(
              'form',
              { name: 'form1', method: 'get', action: 'managebooking' },
              _react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                  'caption',
                  null,
                  'Your Booking'
                ),
                _react2.default.createElement(
                  'thead',
                  null,
                  _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'th',
                      null,
                      'Select'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Booking ID'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Booking Date'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Event Date'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Event'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'E-mail'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Phone'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Status'
                    )
                  )
                ),
                _react2.default.createElement(
                  'tbody',
                  null,
                  bookingdata.map(function (obj, index) {
                    return _react2.default.createElement(
                      'tr',
                      { key: index },
                      _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement('input', { type: 'radio', name: 'bookingid', value: obj.bookingid, checked: true }),
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.bookingid
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.dateofbooking
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.functiondate,
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.eventtype,
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.email,
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        obj.mobile
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.status
                      )
                    );
                  })
                )
              ),
              _react2.default.createElement('input', {
                id: 'sessionid',
                type: 'hidden',
                name: 'sessionid',
                value: sessionid
              }),
              _react2.default.createElement('input', {
                id: 'email',
                type: 'hidden',
                name: 'email',
                value: email
              }),
              _react2.default.createElement('br', null),
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { type: 'radio', name: 'manage', value: 'cancel', checked: true }),
              'Cancel',
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { type: 'radio', name: 'manage', value: 'changedate' }),
              'Changedate',
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'button',
                { value: 'change', type: 'submit' },
                'submit'
              )
            )
          )
        )
      );
    }
  }
  
  Home.contextTypes = { setTitle: _react.PropTypes.func.isRequired, setUser: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Home2.default)(Home);

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(64);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Home.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Home.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n\r\n.Home_root_3mf {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Home_container_2ac {\r\n  margin: 2cm 4cm 3cm 4cm auto;\r\n  padding: 10 10 100px;\r\n  max-width: 1000px;\r\n  \r\n}\r\n\r\n.Home_link_1qG {\r\n  display: -webkit-inline-box;\r\n  display: -webkit-inline-flex;\r\n  display: -ms-inline-flexbox;\r\n  display: inline-flex;\r\n  padding: 13px 13px;\r\n  text-decoration: none;\r\n  text-align: center;\r\n  font-size: 1.125em; /* ~18px */\r\n}\r\n\r\n.Home_link_1qG,\r\n.Home_link_1qG:active,\r\n.Home_link_1qG:visited {\r\n  color: rgba(0, 0, 255, 0.6);\r\n}\r\n\r\n.Home_link_1qG:hover {\r\n  color: rgba(0, 255, 0, 1);\r\n}\r\n\r\n.Home_highlight_30M {\r\n  margin-right: 8px;\r\n  margin-left: 8px;\r\n  border-radius: 3px;\r\n  background: rgba(0, 0, 0, 0.15);\r\n  color: #fff;\r\n}\r\n\r\n.Home_highlight_30M:hover {\r\n  background: rgba(0, 0, 0, 0.3);\r\n}\r\n\r\n.Home_spacer_3yS {\r\n  color: rgba(255, 255, 255, 0.3);\r\n}\r\n\r\n.Home_cards_2Jk {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  margin: 0 auto;\r\n  max-width: 1200px;\r\n\r\n}\r\n\r\n.Home_card_1uI {\r\n  margin: 0 5px;\r\n  -webkit-box-flex: 0;\r\n  -webkit-flex: 0 0 300px;\r\n      -ms-flex: 0 0 300px;\r\n          flex: 0 0 300px;\r\n}\r\n\r\nhtml {\r\n  -webkit-box-sizing: content-box;\r\n          box-sizing: content-box;\r\n}\r\n\r\n*, *:before, *:after {\r\n  -webkit-box-sizing: inherit;\r\n          box-sizing: inherit;\r\n}\r\n\r\nbody {\r\n  font: 1em/1.1 Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n  background-color: #fafafa;\r\n}\r\n\r\nimg {\r\n  max-width: 100%;\r\n}\r\n\r\n.Home_card_1uI {\r\n  background-color: #fff;\r\n  -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);\r\n          box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);\r\n}\r\n\r\n.Home_card_1uI header {\r\n  padding: 10px;\r\n  background-color: rgb(131,112,255);\r\n  color: #fff;\r\n}\r\n\r\n.Home_card_1uI header h2 {\r\n  font-size: 14.4px;\r\n  font-size: 0.9rem;\r\n  font-weight: normal;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n.Home_card_1uI .Home_body_14B {\r\n  padding: 5px;\r\n  font-size: 4.8px;\r\n  font-size: .3rem;\r\n  color: #757575;\r\n}\r\n\r\ntable, th, td {\r\n  border: 1px solid black;\r\n\r\n}\r\n\r\ntr:hover {background-color: #f5f5f5}\r\n\r\nth {\r\n  background-color: #4CAF50;\r\n  color: white;\r\n}\r\n\r\nth, td {\r\n    padding: 5px;\r\n    text-align: left;\r\n}\r\n\r\n.Home_p_1Zo {\r\n  color: red;\r\n}\r\n\r\nbutton {\r\n  \r\n  -webkit-box-sizing: border-box;\r\n  \r\n          box-sizing: border-box;\r\n  margin: 10px 6px;\r\n  padding: 5px 16px;\r\n  width: 30%;\r\n  outline: 10;\r\n  border: 4px solid #373277;\r\n\r\n  border-radius: 12px;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: inherit;\r\n  font-size: 12px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer; \r\n  float: inherit;\r\n  \r\n}\r\n\r\nbutton:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\nbutton:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/home/Home.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,6BAA6B;EAC7B,qBAAqB;EACrB,kBAAoC;;CAErC;;AAID;EACE,4BAAqB;EAArB,6BAAqB;EAArB,4BAAqB;EAArB,qBAAqB;EACrB,mBAAmB;EACnB,sBAAsB;EACtB,mBAAmB;EACnB,mBAAmB,CAAC,WAAW;CAChC;;AAED;;;EAGE,4BAA4B;CAC7B;;AAED;EACE,0BAA0B;CAC3B;;AAED;EACE,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,gCAAgC;EAChC,YAAY;CACb;;AAED;EACE,+BAA+B;CAChC;;AAED;EACE,gCAAgC;CACjC;;AAED;EACE,qBAAc;EAAd,sBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,eAAe;EACf,kBAAkB;;CAEnB;;AAED;EACE,cAAc;EACd,oBAAgB;EAAhB,wBAAgB;MAAhB,oBAAgB;UAAhB,gBAAgB;CACjB;;AAED;EACE,gCAAwB;UAAxB,wBAAwB;CACzB;;AACD;EACE,4BAAoB;UAApB,oBAAoB;CACrB;;AAED;EACE,qEAAqE;EACrE,0BAA0B;CAC3B;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,uBAAuB;EACvB,0GAAkG;UAAlG,kGAAkG;CACnG;;AAED;EACE,cAAc;EACd,mCAAmC;EACnC,YAAY;CACb;;AAED;EACE,kBAAkB;EAAlB,kBAAkB;EAClB,oBAAoB;EACpB,UAAU;EACV,WAAW;CACZ;;AAED;EACE,aAAa;EACb,iBAAiB;EAAjB,iBAAiB;EACjB,eAAe;CAChB;;AAED;EACE,wBAAwB;;CAEzB;;AACD,UAAU,yBAAyB,CAAC;;AACpC;EACE,0BAA0B;EAC1B,aAAa;CACd;;AACD;IACI,aAAa;IACb,iBAAiB;CACpB;;AAED;EACE,WAAW;CACZ;;AAED;;EAEE,+BAAuB;;UAAvB,uBAAuB;EACvB,iBAAiB;EACjB,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,0BAA0B;;EAE1B,oBAAoB;EACpB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,yBAAyB;EACzB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;EAChB,eAAe;;CAEhB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C","file":"Home.css","sourcesContent":["\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n","\r\n@import '../../components/variables.css';\r\n\r\n.root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 2cm 4cm 3cm 4cm auto;\r\n  padding: 10 10 100px;\r\n  max-width: var(--max-content-width);\r\n  \r\n}\r\n\r\n\r\n\r\n.link {\r\n  display: inline-flex;\r\n  padding: 13px 13px;\r\n  text-decoration: none;\r\n  text-align: center;\r\n  font-size: 1.125em; /* ~18px */\r\n}\r\n\r\n.link,\r\n.link:active,\r\n.link:visited {\r\n  color: rgba(0, 0, 255, 0.6);\r\n}\r\n\r\n.link:hover {\r\n  color: rgba(0, 255, 0, 1);\r\n}\r\n\r\n.highlight {\r\n  margin-right: 8px;\r\n  margin-left: 8px;\r\n  border-radius: 3px;\r\n  background: rgba(0, 0, 0, 0.15);\r\n  color: #fff;\r\n}\r\n\r\n.highlight:hover {\r\n  background: rgba(0, 0, 0, 0.3);\r\n}\r\n\r\n.spacer {\r\n  color: rgba(255, 255, 255, 0.3);\r\n}\r\n\r\n.cards {\r\n  display: flex;\r\n  margin: 0 auto;\r\n  max-width: 1200px;\r\n\r\n}\r\n\r\n.card {\r\n  margin: 0 5px;\r\n  flex: 0 0 300px;\r\n}\r\n\r\nhtml {\r\n  box-sizing: content-box;\r\n}\r\n*, *:before, *:after {\r\n  box-sizing: inherit;\r\n}\r\n\r\nbody {\r\n  font: 1em/1.1 Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n  background-color: #fafafa;\r\n}\r\n\r\nimg {\r\n  max-width: 100%;\r\n}\r\n\r\n.card {\r\n  background-color: #fff;\r\n  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);\r\n}\r\n\r\n.card header {\r\n  padding: 10px;\r\n  background-color: rgb(131,112,255);\r\n  color: #fff;\r\n}\r\n\r\n.card header h2 {\r\n  font-size: 0.9rem;\r\n  font-weight: normal;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n.card .body {\r\n  padding: 5px;\r\n  font-size: .3rem;\r\n  color: #757575;\r\n}\r\n\r\ntable, th, td {\r\n  border: 1px solid black;\r\n\r\n} \r\ntr:hover {background-color: #f5f5f5}\r\nth {\r\n  background-color: #4CAF50;\r\n  color: white;\r\n}\r\nth, td {\r\n    padding: 5px;\r\n    text-align: left;\r\n}\r\n\r\n.p {\r\n  color: red;\r\n}\r\n\r\nbutton {\r\n  \r\n  box-sizing: border-box;\r\n  margin: 10px 6px;\r\n  padding: 5px 16px;\r\n  width: 30%;\r\n  outline: 10;\r\n  border: 4px solid #373277;\r\n\r\n  border-radius: 12px;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: inherit;\r\n  font-size: 12px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer; \r\n  float: inherit;\r\n  \r\n}\r\n\r\nbutton:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\nbutton:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Home_root_3mf",
  	"container": "Home_container_2ac",
  	"link": "Home_link_1qG",
  	"highlight": "Home_highlight_30M",
  	"spacer": "Home_spacer_3yS",
  	"cards": "Home_cards_2Jk",
  	"card": "Home_card_1uI",
  	"body": "Home_body_14B",
  	"p": "Home_p_1Zo"
  };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = __webpack_require__(66);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Login = __webpack_require__(67);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _Link = __webpack_require__(39);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _formsyReact = __webpack_require__(69);
  
  var _formsyReact2 = _interopRequireDefault(_formsyReact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Entering Credentials';
  //var classNames = require('classnames');
  
  function Login(_ref, context) {
    var sessionid = _ref.sessionid,
        message = _ref.message;
  
    context.setTitle(title);
    console.log("Login.js-SessionId: " + sessionid);
    return _react2.default.createElement(
      'div',
      { className: _Login2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Login2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          { className: _Login2.default.lead },
          'Log in with your username or personal email address.'
        ),
        _react2.default.createElement(
          'div',
          { className: _Login2.default.formGroup },
          _react2.default.createElement(
            'a',
            { className: _Login2.default.facebook, href: '/login/facebook' },
            _react2.default.createElement(
              'svg',
              {
                className: _Login2.default.icon,
                width: '10',
                height: '10',
                viewBox: '0 0 10 10',
                xmlns: 'http://www.w3.org/2000/svg'
              },
              _react2.default.createElement('path', {
                d: 'M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z'
              })
            ),
            _react2.default.createElement(
              'span',
              null,
              'Log in with Facebook'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Login2.default.formGroup },
          _react2.default.createElement(
            'a',
            { className: _Login2.default.google, href: '/login/google' },
            _react2.default.createElement(
              'svg',
              {
                className: _Login2.default.icon,
                width: '30',
                height: '30',
                viewBox: '0 0 30 30',
                xmlns: 'http://www.w3.org/2000/svg'
              },
              _react2.default.createElement('path', {
                d: 'M30 13h-4V9h-2v4h-4v2h4v4h2v-4h4m-15 2s-2-1.15-2-2c0 0-.5-1.828 1-3 ' + '1.537-1.2 3-3.035 3-5 0-2.336-1.046-5-3-6h3l2.387-1H10C5.835 0 2 3.345 2 7c0 ' + '3.735 2.85 6.56 7.086 6.56.295 0 .58-.006.86-.025-.273.526-.47 1.12-.47 1.735 ' + '0 1.037.817 2.042 1.523 2.73H9c-5.16 0-9 2.593-9 6 0 3.355 4.87 6 10.03 6 5.882 ' + '0 9.97-3 9.97-7 0-2.69-2.545-4.264-5-6zm-4-4c-2.395 0-5.587-2.857-6-6C4.587 ' + '3.856 6.607.93 9 1c2.394.07 4.603 2.908 5.017 6.052C14.43 10.195 13 13 11 ' + '13zm-1 15c-3.566 0-7-1.29-7-4 0-2.658 3.434-5.038 7-5 .832.01 2 0 2 0 1 0 ' + '2.88.88 4 2 1 1 1 2.674 1 3 0 3-1.986 4-7 4z'
              })
            ),
            _react2.default.createElement(
              'span',
              null,
              'Log in with Google'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Login2.default.formGroup },
          _react2.default.createElement(
            'a',
            { className: _Login2.default.twitter, href: '/login/twitter' },
            _react2.default.createElement(
              'svg',
              {
                className: _Login2.default.icon,
                width: '30',
                height: '30',
                viewBox: '0 0 30 30',
                xmlns: 'http://www.w3.org/2000/svg'
              },
              _react2.default.createElement('path', {
                d: 'M30 6.708c-1.105.49-2.756 1.143-4 1.292 1.273-.762 2.54-2.56 ' + '3-4-.97.577-2.087 1.355-3.227 1.773L25 5c-1.12-1.197-2.23-2-4-2-3.398 0-6 ' + '2.602-6 6 0 .4.047.7.11.956L15 10C9 10 5.034 8.724 2 5c-.53.908-1 1.872-1 ' + '3 0 2.136 1.348 3.894 3 5-1.01-.033-2.17-.542-3-1 0 2.98 4.186 6.432 7 7-1 ' + '1-4.623.074-5 0 .784 2.447 3.31 3.95 6 4-2.105 1.648-4.647 2.51-7.53 2.51-.5 ' + '0-.988-.03-1.47-.084C2.723 27.17 6.523 28 10 28c11.322 0 17-8.867 17-17 ' + '0-.268.008-.736 0-1 1.2-.868 2.172-2.058 3-3.292z'
              })
            ),
            _react2.default.createElement(
              'span',
              null,
              'Log in with Twitter'
            )
          )
        ),
        _react2.default.createElement(
          'strong',
          { className: _Login2.default.lineThrough },
          'OR'
        ),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'get', action: 'verifypass' },
          _react2.default.createElement(
            'div',
            { className: _Login2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Login2.default.label, htmlFor: 'usernameOrEmail' },
              'Username or email address:'
            ),
            _react2.default.createElement('input', {
              className: _Login2.default.input,
              id: 'usernameOrEmail',
              type: 'email',
              name: 'usernameOrEmail',
              required: 'required',
              autoFocus: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Login2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Login2.default.label, htmlFor: 'password' },
              'Password:'
            ),
            _react2.default.createElement('input', {
              className: _Login2.default.input,
              id: 'password',
              type: 'password',
              name: 'password',
              required: 'required'
            }),
            _react2.default.createElement(
              'p',
              { className: _Login2.default.p },
              _react2.default.createElement(
                'b',
                null,
                ' ',
                message
              ),
              ' '
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _Login2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _Login2.default.button1, type: 'submit' },
              'Log in'
            ),
            _react2.default.createElement(
              _Link2.default,
              { to: '/forgotpass' },
              'Forgot Password'
            ),
            _react2.default.createElement(
              'span',
              { className: _Login2.default.spacer },
              ' | '
            ),
            _react2.default.createElement(
              _Link2.default,
              { to: '/register' },
              'Sign Up'
            ),
            _react2.default.createElement('input', {
              id: 'sessionid',
              type: 'hidden',
              name: 'sessionid',
              value: sessionid
            })
          )
        )
      )
    );
  }
  
  Login.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Login2.default)(Login);

/***/ },
/* 66 */
/***/ function(module, exports) {

  module.exports = require("react-dom");

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(68);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Login.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Login.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n\r\n.Login_root_AfB {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\nhtml {\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n}\r\n\r\n.Login_container_2g2 {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.Login_lead_ri6 {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.Login_formGroup_3_X {\r\n  margin-bottom: 15px;\r\n}\r\n\r\n.Login_label_2Z7 {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n.Login_input_PvY {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 26px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 0;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.Login_input_PvY:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Login_p_tti {\r\n  color: red;\r\n}\r\n\r\n.Login_button_10W {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 80%;\r\n  outline: 10;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.Login_button1_1E- {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 50%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373388;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 14px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.Login_button_10W:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.Login_button_10W:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Login_facebook_3CI {\r\n  border-color: #3b5998;\r\n  background: #3b5998;\r\n}\r\n\r\n.Login_facebook_3CI:hover {\r\n  background: #2d4373;\r\n}\r\n\r\n.Login_google_1Ig {\r\n  border-color: #dd4b39;\r\n  background: #dd4b39;\r\n}\r\n\r\n.Login_google_1Ig:hover {\r\n  background: #c23321;\r\n}\r\n\r\n.Login_twitter_3Vq {\r\n  border-color: #55acee;\r\n  background: #55acee;\r\n}\r\n\r\n.Login_twitter_3Vq:hover {\r\n  background: #2795e9;\r\n}\r\n\r\n.Login_icon_97U {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 10px;\r\n  height: 10px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.Login_lineThrough_3eY {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.Login_lineThrough_3eY::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.Login_lineThrough_3eY::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/login/Login.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,+BAAuB;UAAvB,uBAAuB;CACxB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,iBAAiB;EACjB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,WAAW;CACZ;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,WAAW;EACX,YAAY;EACZ,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AACD;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,WAAW;EACX,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"Login.css","sourcesContent":["\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n","\r\n@import '../../components/variables.css';\r\n\r\n.root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\nhtml {\r\n  box-sizing: border-box;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 15px;\r\n}\r\n\r\n.label {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 26px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 0;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.p {\r\n  color: red;\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 80%;\r\n  outline: 10;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n.button1 {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 50%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373388;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 14px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.facebook {\r\n  border-color: #3b5998;\r\n  background: #3b5998;\r\n  composes: button;\r\n}\r\n\r\n.facebook:hover {\r\n  background: #2d4373;\r\n}\r\n\r\n.google {\r\n  border-color: #dd4b39;\r\n  background: #dd4b39;\r\n  composes: button;\r\n}\r\n\r\n.google:hover {\r\n  background: #c23321;\r\n}\r\n\r\n.twitter {\r\n  border-color: #55acee;\r\n  background: #55acee;\r\n  composes: button;\r\n}\r\n\r\n.twitter:hover {\r\n  background: #2795e9;\r\n}\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 10px;\r\n  height: 10px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Login_root_AfB",
  	"container": "Login_container_2g2",
  	"lead": "Login_lead_ri6",
  	"formGroup": "Login_formGroup_3_X",
  	"label": "Login_label_2Z7",
  	"input": "Login_input_PvY",
  	"p": "Login_p_tti",
  	"button": "Login_button_10W",
  	"button1": "Login_button1_1E-",
  	"facebook": "Login_facebook_3CI Login_button_10W",
  	"google": "Login_google_1Ig Login_button_10W",
  	"twitter": "Login_twitter_3Vq Login_button_10W",
  	"icon": "Login_icon_97U",
  	"lineThrough": "Login_lineThrough_3eY"
  };

/***/ },
/* 69 */
/***/ function(module, exports) {

  module.exports = require("formsy-react");

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  exports.randomPassword = randomPassword;
  exports.getConnection = getConnection;
  exports.getSessionid = getSessionid;
  exports.checkSessionid = checkSessionid;
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function randomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
      var i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
    }
    return pass;
  }
  function getConnection(url) {
    var db;
  
    // Initialize DB connection once
    MongoClient.connect(url, function (err, database) {
      db = database;
  
      if (!err) {
        console.log("Listening on port 27107");
        return db;
      } else console.log(" Database Server not running");
      return err;
    });
  }
  
  function getSessionid() {
    var request = __webpack_require__(71);
    console.log('genSessionid - calling API');
    var url = "http://" + _config.apihost + "/genSessionid";
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          // sessionid = body;
          resolve(body);
        } else {
  
          console.log("genSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }
  
  function checkSessionid(sessionid) {
    var request = __webpack_require__(71);
    console.log('genSessionid - calling API');
    var url = "http://" + _config.apihost + "/getSessionid?sessionid=" + sessionid;
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('getSessionid - Response from API' + body);
          // sessionid = body;
          resolve(body);
        } else {
  
          console.log("getSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }

/***/ },
/* 71 */
/***/ function(module, exports) {

  module.exports = require("request");

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Searchprovider = __webpack_require__(73);
  
  var _Searchprovider2 = _interopRequireDefault(_Searchprovider);
  
  var _config = __webpack_require__(17);
  
  var _Providerlist = __webpack_require__(76);
  
  var _Providerlist2 = _interopRequireDefault(_Providerlist);
  
  var _Login = __webpack_require__(65);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _Home = __webpack_require__(62);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var providerlist;
  var sessionid;
  var category;
  
  exports.default = {
  
    path: '/searchprovider',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var customeremail, body, searchterm;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
  
                sessionid = query.sessionid;
                customeremail = query.email;
  
                console.log("Sessionid - index.js - SearchProvider " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 8;
                  break;
                }
  
                _context.next = 6;
                return getSessionid();
  
              case 6:
                body = _context.sent;
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: body }));
  
              case 8:
                searchterm = query.searchterm;
  
                category = query.category;
                console.log("Search Term: " + searchterm);
                console.log("Category: " + category);
  
                if (!(searchterm == 'pincode')) {
                  _context.next = 18;
                  break;
                }
  
                _context.next = 15;
                return getProviderDataByPincode(category);
  
              case 15:
                providerlist = _context.sent;
                _context.next = 21;
                break;
  
              case 18:
                _context.next = 20;
                return getProviderDataByCity(category);
  
              case 20:
                providerlist = _context.sent;
  
              case 21:
                // console.log("Body: "+providerlist);
  
                console.log("customer Email: " + customeremail);
                //console.log("Size:"+providerlist.length);
  
                return _context.abrupt('return', _react2.default.createElement(_Searchprovider2.default, { providerlist: providerlist, customeremail: customeremail, sessionid: sessionid }));
  
              case 23:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function getProviderDataByCity(searchterm) {
    var request = __webpack_require__(71);
  
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/searchbycity?city=' + category;
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside getProviderData Response from API (body)' + body);
          //providerlist = body;
          console.log("Providerlist: " + providerlist);
          resolve(body);
        } else {
          console.log("Error Object: " + error);
          return reject(error);
        }
      });
    });
  }
  
  function getProviderDataByPincode(searchterm) {
    var request = __webpack_require__(71);
  
    console.log('calling API - getProviderDataByPincode');
    var url = 'http://' + _config.apihost + '/searchbypincode?pincode=' + category;
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside getProviderData Response from API (body)' + body);
          providerlist = body;
          console.log("Providerlist: " + providerlist);
          resolve(body);
        } else {
          console.log("Error Object: " + error);
          return reject(error);
        }
      });
    });
  }
  function getSessionid() {
    var request = __webpack_require__(71);
    console.log('genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/genSessionid';
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("genSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Searchprovider = __webpack_require__(74);
  
  var _Searchprovider2 = _interopRequireDefault(_Searchprovider);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Service Provider Search'; /**
                                          * React Starter Kit (https://www.reactstarterkit.com/)
                                          *
                                          * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                          *
                                          * This source code is licensed under the MIT license found in the
                                          * LICENSE.txt file in the root directory of this source tree.
                                          */
  
  function Searchprovider(_ref, props, context) {
    var providerlist = _ref.providerlist,
        customeremail = _ref.customeremail,
        sessionid = _ref.sessionid;
  
    //context.setTitle(title);
  
    var providerdata = JSON.parse(providerlist);
    var size = providerdata.length;
    console.log("No. of providers: " + size);
    var message = ' ';
    if (size == 0) message = "No provervider for this search Criteria";
  
    console.log("Provider Data: " + providerdata);
    return _react2.default.createElement(
      'div',
      { className: _Searchprovider2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Searchprovider2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          'Service Provider Search'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'form',
            { name: 'form1', method: 'put', action: 'home' },
            _react2.default.createElement(
              'div',
              { className: _Searchprovider2.default.formGroup },
              _react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                  'caption',
                  null,
                  'Service Providers'
                ),
                _react2.default.createElement(
                  'thead',
                  null,
                  _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'th',
                      null,
                      'Email'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'First Name'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Last Name'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Address'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'City'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Phone'
                    )
                  )
                ),
                _react2.default.createElement(
                  'tbody',
                  null,
                  providerdata.map(function (obj, index) {
                    return _react2.default.createElement(
                      'tr',
                      { key: index },
                      _react2.default.createElement(
                        'td',
                        null,
                        obj.email
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.firstname
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.lname,
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.address
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.city
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        obj.phone
                      )
                    );
                  })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { type: 'hidden', name: 'email', value: customeremail }),
              _react2.default.createElement('input', { type: 'hidden', name: 'sessionid', value: sessionid }),
              _react2.default.createElement(
                'p',
                null,
                message
              ),
              _react2.default.createElement(
                'button',
                { className: _Searchprovider2.default.button, value: 'submit', type: 'submit' },
                'Home Page'
              )
            )
          )
        )
      )
    );
  }
  
  Searchprovider.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Searchprovider2.default)(Searchprovider);

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(75);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Searchprovider.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Searchprovider.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, " .Searchprovider_root_3jF {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Searchprovider_container_2TS {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n  max-height:100x\r\n}\r\n\r\nhtml {\r\n  min-height: 100%;\r\n}\r\n\r\nbody {\r\n  min-height: 100vh;\r\n}\r\n\r\ntable, th, td {\r\n  border: 1px solid black;\r\n}\r\n\r\ntr:hover {background-color: #f5f5f5}\r\n\r\nth {\r\n  background-color: #4CAF50;\r\n  color: white;\r\n}\r\n\r\n.Searchprovider_button_2VI {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 60%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.Searchprovider_button_2VI:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.Searchprovider_button_2VI:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\ndiv {\r\n  overflow-x:visible;\r\n   \r\n}\r\n\r\n.Searchprovider_formGroup_2-g {\r\n  margin-bottom: 15px;\r\n}", "", {"version":3,"sources":["/./routes/searchprovider/Searchprovider.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;CAChB;;AAID;EACE,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,wBAAwB;CACzB;;AACD,UAAU,yBAAyB,CAAC;;AACpC;EACE,0BAA0B;EAC1B,aAAa;CACd;;AACD;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,WAAW;EACX,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;EACE,mBAAmB;;CAEpB;;AAGD;EACE,oBAAoB;CACrB","file":"Searchprovider.css","sourcesContent":[" .root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n  max-height:100x\r\n}\r\n\r\n\r\n\r\nhtml {\r\n  min-height: 100%;\r\n}\r\n\r\nbody {\r\n  min-height: 100vh;\r\n}\r\n\r\ntable, th, td {\r\n  border: 1px solid black;\r\n} \r\ntr:hover {background-color: #f5f5f5}\r\nth {\r\n  background-color: #4CAF50;\r\n  color: white;\r\n}\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 60%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\ndiv {\r\n  overflow-x:visible;\r\n   \r\n}\r\n\r\n\r\n.formGroup {\r\n  margin-bottom: 15px;\r\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Searchprovider_root_3jF",
  	"container": "Searchprovider_container_2TS",
  	"button": "Searchprovider_button_2VI",
  	"formGroup": "Searchprovider_formGroup_2-g"
  };

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Providerlist = __webpack_require__(77);
  
  var _Providerlist2 = _interopRequireDefault(_Providerlist);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Service Provider Search'; /**
                                          * React Starter Kit (https://www.reactstarterkit.com/)
                                          *
                                          * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                          *
                                          * This source code is licensed under the MIT license found in the
                                          * LICENSE.txt file in the root directory of this source tree.
                                          */
  
  function Providerlist(_ref, props, context) {
    var providerlist = _ref.providerlist,
        customeremail = _ref.customeremail,
        sessionid = _ref.sessionid,
        bookingid = _ref.bookingid;
  
    //context.setTitle(title);
  
    var providerdata = JSON.parse(providerlist);
  
    console.log("Provider Data: " + providerdata);
    return _react2.default.createElement(
      'div',
      { className: _Providerlist2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Providerlist2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          'Service Provider Search'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Select Provider near by you'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'form',
            { name: 'form1', method: 'put', action: 'linkprovider' },
            _react2.default.createElement(
              'div',
              { className: _Providerlist2.default.formGroup },
              _react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                  'caption',
                  null,
                  'Service Providers'
                ),
                _react2.default.createElement(
                  'thead',
                  null,
                  _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'th',
                      null,
                      'Select'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Email'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'First Name'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Last Name'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Address'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'City'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Phone'
                    )
                  )
                ),
                _react2.default.createElement(
                  'tbody',
                  null,
                  providerdata.map(function (obj, index) {
                    return _react2.default.createElement(
                      'tr',
                      { key: index },
                      _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement('input', { type: 'radio', name: 'provideremail', value: obj.email }),
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        obj.email
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.firstname
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.lname,
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.address
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.city
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        obj.phone
                      )
                    );
                  })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { type: 'hidden', name: 'customeremail', value: customeremail }),
              _react2.default.createElement('input', { type: 'hidden', name: 'sessionid', value: sessionid }),
              _react2.default.createElement('input', { type: 'hidden', name: 'bookingid', value: bookingid }),
              _react2.default.createElement(
                'button',
                { className: _Providerlist2.default.button, type: 'submit' },
                'Submit'
              )
            )
          )
        )
      )
    );
  }
  
  Providerlist.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Providerlist2.default)(Providerlist);

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(78);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Providerlist.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Providerlist.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, " .Providerlist_root_2fr {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Providerlist_container_3Q4 {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n  max-height:100x\r\n}\r\n\r\nhtml {\r\n  min-height: 100%;\r\n}\r\n\r\nbody {\r\n  min-height: 100vh;\r\n}\r\n\r\ntable, th, td {\r\n  border: 1px solid black;\r\n}\r\n\r\ntr:hover {background-color: #f5f5f5}\r\n\r\nth {\r\n  background-color: #4CAF50;\r\n  color: white;\r\n}\r\n\r\n.Providerlist_button_Tyf {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 30%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.Providerlist_button_Tyf:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.Providerlist_button_Tyf:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\ndiv {\r\n  overflow-x:visible;\r\n   \r\n}\r\n\r\n.Providerlist_formGroup_2cf {\r\n  margin-bottom: 15px;\r\n}", "", {"version":3,"sources":["/./routes/providerlist/Providerlist.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;CAChB;;AAID;EACE,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,wBAAwB;CACzB;;AACD,UAAU,yBAAyB,CAAC;;AACpC;EACE,0BAA0B;EAC1B,aAAa;CACd;;AACD;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,WAAW;EACX,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;EACE,mBAAmB;;CAEpB;;AAGD;EACE,oBAAoB;CACrB","file":"Providerlist.css","sourcesContent":[" .root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n  max-height:100x\r\n}\r\n\r\n\r\n\r\nhtml {\r\n  min-height: 100%;\r\n}\r\n\r\nbody {\r\n  min-height: 100vh;\r\n}\r\n\r\ntable, th, td {\r\n  border: 1px solid black;\r\n} \r\ntr:hover {background-color: #f5f5f5}\r\nth {\r\n  background-color: #4CAF50;\r\n  color: white;\r\n}\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 30%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\ndiv {\r\n  overflow-x:visible;\r\n   \r\n}\r\n\r\n\r\n.formGroup {\r\n  margin-bottom: 15px;\r\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Providerlist_root_2fr",
  	"container": "Providerlist_container_3Q4",
  	"button": "Providerlist_button_Tyf",
  	"formGroup": "Providerlist_formGroup_2cf"
  };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Contact = __webpack_require__(80);
  
  var _Contact2 = _interopRequireDefault(_Contact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/contact',
  
    action: function action() {
      return _react2.default.createElement(_Contact2.default, null);
    }
  };

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Contact = __webpack_require__(81);
  
  var _Contact2 = _interopRequireDefault(_Contact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Contact Us';
  
  function Contact(props, context) {
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Contact2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Contact2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          '...'
        )
      )
    );
  }
  
  Contact.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Contact2.default)(Contact);

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(82);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Contact.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Contact.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n\r\n.Contact_root_sD4 {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Contact_container_PcA {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 1000px;\r\n}\r\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/contact/Contact.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAoC;CACrC","file":"Contact.css","sourcesContent":["\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n","\r\n@import '../../components/variables.css';\r\n\r\n.root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: var(--max-content-width);\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Contact_root_sD4",
  	"container": "Contact_container_PcA"
  };

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Login = __webpack_require__(65);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(17);
  
  var _util = __webpack_require__(70);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var sessionid = '';
  
  exports.default = {
  
    path: '/login',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var message;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _util.getSessionid)();
  
              case 2:
                sessionid = _context.sent;
                message = ' ';
  
                console.log("SessionId-Login: " + sessionid);
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: sessionid, message: message }));
  
              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Register = __webpack_require__(85);
  
  var _Register2 = _interopRequireDefault(_Register);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  exports.default = {
  
    path: '/register',
  
    action: function action() {
      return _react2.default.createElement(_Register2.default, null);
    }
  };

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Register = __webpack_require__(86);
  
  var _Register2 = _interopRequireDefault(_Register);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'New User Registration'; /**
                                        * React Starter Kit (https://www.reactstarterkit.com/)
                                        *
                                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                        *
                                        * This source code is licensed under the MIT license found in the
                                        * LICENSE.txt file in the root directory of this source tree.
                                        */
  
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var currentdate = day + '/' + month + '/' + year;
  console.log("Date: " + currentdate);
  
  function Register(props, context) {
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Register2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Register2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'put', action: 'savecustomer' },
          _react2.default.createElement(
            'div',
            { classname: _Register2.default.leftContainer },
            _react2.default.createElement('input', { id: 'modifieddate', type: 'hidden', value: currentdate, name: 'modifieddate' }),
            _react2.default.createElement(
              'label',
              { className: _Register2.default.label, htmlFor: 'firstname' },
              'User First Name:'
            ),
            _react2.default.createElement('input', {
              className: _Register2.default.input,
              id: 'firstname',
              type: 'text',
              name: 'firstname',
              autoFocus: true,
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            { classname: _Register2.default.rightContainer },
            _react2.default.createElement(
              'label',
              { className: _Register2.default.label, htmlFor: 'Last Name' },
              _react2.default.createElement(
                'span',
                null,
                'User Last Name: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Register2.default.input,
              id: 'lname',
              type: 'text',
              name: 'lname',
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'label',
              { className: _Register2.default.label, htmlFor: 'address' },
              _react2.default.createElement(
                'span',
                null,
                'User Address: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Register2.default.input,
              id: 'address',
              type: 'text',
              name: 'address',
              required: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Register2.default.label, htmlFor: 'city' },
              _react2.default.createElement(
                'span',
                null,
                'City: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Register2.default.input,
              id: 'city',
              type: 'text',
              name: 'city',
              required: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Register2.default.label, htmlFor: 'zipcode' },
              _react2.default.createElement(
                'span',
                null,
                'Zipcode: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Register2.default.input,
              id: 'zipcode',
              type: 'number',
              name: 'zipcode',
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Register2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Register2.default.label, htmlFor: 'email' },
              'E-mail:'
            ),
            _react2.default.createElement('input', {
              className: _Register2.default.input,
              id: 'email',
              type: 'email',
              name: 'email',
              required: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Register2.default.label, htmlFor: 'Phone' },
              'phone:'
            ),
            _react2.default.createElement('input', {
              className: _Register2.default.input,
              id: 'phone',
              type: 'text',
              name: 'phone',
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Register2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _Register2.default.button, value: 'submit', type: 'submit' },
              'Register'
            )
          )
        )
      )
    );
  }
  
  Register.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Register2.default)(Register);

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(87);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Register.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Register.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, " .Register_root_3RB {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Register_container_1Lf {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.Register_lead_2sJ {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.Register_formGroup_1Ge {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.Register_label_sr8 {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.Register_input_3So {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  size: 15;\r\n  max-width: 30; \r\n}\r\n\r\n.Register_input_3So:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Register_button_3Si {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.Register_button_3Si:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.Register_button_3Si:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Register_leftContainer_3EI {\r\n   float:left;\r\n}\r\n\r\n.Register_rightContainer_25i {\r\n   float:right;\r\n}\r\n\r\n.Register_icon_3KC {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.Register_lineThrough_2IJ {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.Register_lineThrough_2IJ::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.Register_lineThrough_2IJ::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n\r\n#Register_lastname_27Z{\r\n    max-width:100px;\r\n    float:left;\r\n}\r\n\r\n.Register_div_17d {\r\n  float:right;\r\n}", "", {"version":3,"sources":["/./routes/register/Register.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;EACzE,SAAS;EACT,cAAc;CACf;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;GACG,WAAW;CACb;;AAED;GACG,YAAY;CACd;;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb;;AACD;IACI,gBAAgB;IAChB,WAAW;CACd;;AAED;EACE,YAAY;CACb","file":"Register.css","sourcesContent":[" .root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.label {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  size: 15;\r\n  max-width: 30; \r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.leftContainer {\r\n   float:left;\r\n}\r\n\r\n.rightContainer {\r\n   float:right;\r\n}\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n#lastname{\r\n    max-width:100px;\r\n    float:left;\r\n}\r\n\r\n.div {\r\n  float:right;\r\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Register_root_3RB",
  	"container": "Register_container_1Lf",
  	"lead": "Register_lead_2sJ",
  	"formGroup": "Register_formGroup_1Ge",
  	"label": "Register_label_sr8",
  	"input": "Register_input_3So",
  	"button": "Register_button_3Si",
  	"leftContainer": "Register_leftContainer_3EI",
  	"rightContainer": "Register_rightContainer_25i",
  	"icon": "Register_icon_3KC",
  	"lineThrough": "Register_lineThrough_2IJ",
  	"lastname": "Register_lastname_27Z",
  	"div": "Register_div_17d"
  };

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Forgotpass = __webpack_require__(89);
  
  var _Forgotpass2 = _interopRequireDefault(_Forgotpass);
  
  var _Login = __webpack_require__(65);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var request = __webpack_require__(71);
  //import Providerlogin from '../providerlogin/Providerlogin'
  
  
  var status = 'false';
  var errormessage = '';
  //var user;
  var href;
  var message;
  var message1;
  
  exports.default = {
  
    path: '/forgotpass',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var email, validlogin, code, body, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = query.email;
                //user = query.user;
  
                console.log("Email ID:" + email);
                //console.log("User: "+user);
  
                if (!(typeof email === 'undefined')) {
                  _context.next = 6;
                  break;
                }
  
                return _context.abrupt('return', _react2.default.createElement(_Forgotpass2.default, null));
  
              case 6:
                _context.next = 8;
                return checkLogin(email);
  
              case 8:
                validlogin = _context.sent;
  
                console.log("ValidLogin:" + validlogin);
  
                if (!(validlogin == 'true')) {
                  _context.next = 20;
                  break;
                }
  
                code = passwordCode(6);
  
                console.log("Passcode: " + code);
                _context.next = 15;
                return sendEmail(email, code);
  
              case 15:
                body = _context.sent;
  
                if (!(body == 'true')) {
                  _context.next = 20;
                  break;
                }
  
                _context.next = 19;
                return storePasscode(email, code);
  
              case 19:
                result = _context.sent;
  
              case 20:
                console.log("Status: " + status);
  
                if (!(status == true)) {
                  _context.next = 26;
                  break;
                }
  
                console.log("Redirected to Login Page");
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, null));
  
              case 26:
                console.log("Error in Reseting password request");
                return _context.abrupt('return', _react2.default.createElement(_Forgotpass2.default, { errormessage: errormessage }));
  
              case 28:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function sendEmail(email, code) {
    console.log('calling API - sendEmail');
    var url = 'http://' + _config.apihost + '/sendmail';
    console.log("URL: " + url);
  
    var subject = "Your Password Reset";
    var href = 'http://' + _config.host + '/changepassword?code=' + code + '&userEmail=' + email;
    console.log("Href: " + href);
    var message = '<b>We received your request for password Reset. <a href="' + href + '" >Click here to reset password</a> ';
    var formdata = {
      tomail: email,
      subject: subject,
      message: message
    };
  
    console.log("Data: " + formdata);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: formdata }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendEmail - Response from API (body)' + body);
  
          if (body == 'true') status = true;else status = false;
          resolve(body);
        } else if (error) {
          console.log("Error in Sending Mail");
          status = false;
          return reject(error);
        }
      });
    });
  }
  
  function passwordCode(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
      var i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
    }
    return pass;
  }
  
  function storePasscode(email, code) {
  
    console.log("Inside storePasscode method email: " + email);
    console.log("Inside storePasscode method Code: " + code);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/storePasscode';
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: { email: email, code: code } }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside StorePasscode Response from API (body)' + body);
  
          if (body == 'true') status = true;
          resolve(body);
        } else {
          console.log("Error in storing passcode");
          status = false;
          return reject(error);
        }
      });
    });
  }
  
  function checkLogin(email) {
  
    console.log('calling API - checkLogin - forgotpass');
    var url = 'http://' + _config.apihost + '/findemail?email=' + email;
  
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Response from API: - Forgot Passwor - Cutomer' + body);
          if (body == 'true') status = true;
          resolve(body);
        } else {
          status = 'false';
          console.log("API Server not running: " + error);
          return reject(error);
        }
        console.log('Returning');
      });
    });
  }

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Forgotpass = __webpack_require__(90);
  
  var _Forgotpass2 = _interopRequireDefault(_Forgotpass);
  
  var _Link = __webpack_require__(39);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Changing Password';
  
  function Forgotpass(props, context) {
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Forgotpass2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Forgotpass2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'put', action: 'forgotpass' },
          _react2.default.createElement(
            'div',
            { className: _Forgotpass2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Forgotpass2.default.label, htmlFor: 'email' },
              'Email:'
            ),
            _react2.default.createElement('input', {
              className: _Forgotpass2.default.input,
              id: 'email',
              type: 'email',
              name: 'email',
              placeholder: 'Enter E-mail',
              required: 'required'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Forgotpass2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _Forgotpass2.default.button, type: 'submit' },
              'Send Reset Email'
            )
          )
        )
      )
    );
  }
  
  Forgotpass.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Forgotpass2.default)(Forgotpass);

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(91);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Forgotpass.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Forgotpass.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n\r\n.Forgotpass_root_2bx {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Forgotpass_container_2z1 {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.Forgotpass_lead_3Qz {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.Forgotpass_formGroup_xHr {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.Forgotpass_label_1Je {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n.Forgotpass_input_hyq {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.Forgotpass_input_hyq:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Forgotpass_button_7B_ {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.Forgotpass_button_7B_:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.Forgotpass_button_7B_:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Forgotpass_facebook_2eZ {\r\n  border-color: #3b5998;\r\n  background: #3b5998;\r\n}\r\n\r\n.Forgotpass_facebook_2eZ:hover {\r\n  background: #2d4373;\r\n}\r\n\r\n.Forgotpass_google_TMn {\r\n  border-color: #dd4b39;\r\n  background: #dd4b39;\r\n}\r\n\r\n.Forgotpass_google_TMn:hover {\r\n  background: #c23321;\r\n}\r\n\r\n.Forgotpass_twitter_XfU {\r\n  border-color: #55acee;\r\n  background: #55acee;\r\n}\r\n\r\n.Forgotpass_twitter_XfU:hover {\r\n  background: #2795e9;\r\n}\r\n\r\n.Forgotpass_icon_2y1 {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.Forgotpass_lineThrough_34a {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.Forgotpass_lineThrough_34a::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.Forgotpass_lineThrough_34a::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/forgotpass/Forgotpass.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"Forgotpass.css","sourcesContent":["\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n","\r\n@import '../../components/variables.css';\r\n\r\n.root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.label {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.facebook {\r\n  border-color: #3b5998;\r\n  background: #3b5998;\r\n  composes: button;\r\n}\r\n\r\n.facebook:hover {\r\n  background: #2d4373;\r\n}\r\n\r\n.google {\r\n  border-color: #dd4b39;\r\n  background: #dd4b39;\r\n  composes: button;\r\n}\r\n\r\n.google:hover {\r\n  background: #c23321;\r\n}\r\n\r\n.twitter {\r\n  border-color: #55acee;\r\n  background: #55acee;\r\n  composes: button;\r\n}\r\n\r\n.twitter:hover {\r\n  background: #2795e9;\r\n}\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Forgotpass_root_2bx",
  	"container": "Forgotpass_container_2z1",
  	"lead": "Forgotpass_lead_3Qz",
  	"formGroup": "Forgotpass_formGroup_xHr",
  	"label": "Forgotpass_label_1Je",
  	"input": "Forgotpass_input_hyq",
  	"button": "Forgotpass_button_7B_",
  	"facebook": "Forgotpass_facebook_2eZ Forgotpass_button_7B_",
  	"google": "Forgotpass_google_TMn Forgotpass_button_7B_",
  	"twitter": "Forgotpass_twitter_XfU Forgotpass_button_7B_",
  	"icon": "Forgotpass_icon_2y1",
  	"lineThrough": "Forgotpass_lineThrough_34a"
  };

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(32);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var sendSMS = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var url;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log('calling API - sendSMS method');
  
              url = 'http://' + _config.apihost + '/sendSMS?authkey=' + _config.smsAPIKey + '&mobiles=' + phone + '&message=' + SMSmessage + '&sender=DTSBMF&route=4&country=91';
  
              console.log("URL: " + url);
              return _context2.abrupt('return', new _promise2.default(function (resolve, reject) {
                request(url, function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                    console.log('Inside sendSMS - Response from API (body)' + body);
  
                    if (error) {
                      console.log("Error in Sending SMS");
                      status = false;
                      return reject(error);
                    }
  
                    if (body == 'true') status = true;
                    resolve(body);
                  }
                });
              }));
  
            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));
  
    return function sendSMS() {
      return _ref3.apply(this, arguments);
    };
  }();
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Savecustomer = __webpack_require__(93);
  
  var _Savecustomer2 = _interopRequireDefault(_Savecustomer);
  
  var _Login = __webpack_require__(96);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var request = __webpack_require__(71);
  var SMSmessage = 'Thanks for your Registration. Use your email id for login';
  
  var message = 'Sucessfully Registered. ';
  var href = 'http://' + _config.host + '/login';
  var message1 = 'Click here to login';
  var status = true;
  var fn;
  var ln;
  var address;
  var email;
  var phone;
  var zipcode;
  var password;
  
  exports.default = {
  
    path: '/savecustomer',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var body, customerdata, login, mail, sms;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Query String: " + (0, _stringify2.default)(query));
  
                path = '/';
                fn = query.firstname;
                console.log(fn);
                ln = query.lname;
                address = query.address;
                zipcode = query.zipcode;
                phone = query.phone;
                email = query.email;
                _context.next = 11;
                return checkDuplicate(email);
  
              case 11:
                body = _context.sent;
  
                console.log("Response: " + body);
  
                if (!(body == 'false')) {
                  _context.next = 36;
                  break;
                }
  
                _context.next = 16;
                return saveCustomerData(query);
  
              case 16:
                customerdata = _context.sent;
  
                console.log("Customerdata: " + customerdata);
                console.log("Status--saveCustomerData: " + status);
  
                if (!(customerdata == 'true')) {
                  _context.next = 36;
                  break;
                }
  
                _context.next = 22;
                return getPassword();
  
              case 22:
                password = _context.sent;
  
                console.log("generated Password: " + password);
                console.log("Status--getPassword: " + status);
                _context.next = 27;
                return saveLogin(password);
  
              case 27:
                login = _context.sent;
  
                console.log("Calling SendEmail");
                _context.next = 31;
                return sendEmail();
  
              case 31:
                mail = _context.sent;
  
                console.log("Calling sendSMS");
                _context.next = 35;
                return sendSMS();
  
              case 35:
                sms = _context.sent;
  
              case 36:
  
                if (!status) {
                  message = 'Error in Saving Customer Data';
                  href = 'http://' + _config.host + '/register';
  
                  message1 = 'Click here to Register.';
                }
                console.log("Href: " + href);
                return _context.abrupt('return', _react2.default.createElement(_Savecustomer2.default, { message: message, redirectlink: href, message1: message1 }));
  
              case 39:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function checkDuplicate(email) {
    var url = 'http://' + _config.apihost + '/getCustomer?email=' + email;
    console.log("URL: checkDuplicate " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Check duplicate - Response from API' + body);
  
          if (body == 'true') {
            message = 'Email id already register';
            status = 'false';
          } else {
            console.log("Customer email not exist");
            status = 'true';
          }
          resolve(body);
        } else {
  
          console.log("Check duplicate - Error in getting customer ") + error;
          return reject(error);
        }
      });
      console.log("Checkduplicate -- Returning");
    });
  }
  
  function saveCustomerData(data) {
    // var request = require('request');
    console.log('saveCustomerData -- calling API');
    //var request = require('request-promise');
    var url = 'http://' + _config.apihost + '/addNewCustomer';
    console.log("saveCustomerData -- URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: data }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside saveCustomerData Response from API (body)' + body);
  
          if (body == 'true') {
            status = true;
          }
          resolve(body);
        } else {
          console.log("saveCustomerData -- Error in storing customer data");
          status = false;
          return error;
        }
  
        console.log('saveCustomerData -- returning from API call');
      });
    });
  }
  
  function getPassword() {
    var url = 'http://' + _config.apihost + '/generatePass?length=6';
    console.log("getPassword -- URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('getPassword --  Response from API' + body);
          status = 'true';
          resolve(body);
        } else {
  
          console.log("getPassword -- API Server not running: " + error);
          status = 'false';
          return error;
        }
        console.log('getPassword -- returning from API call');
      });
    });
  }
  
  function saveLogin(password) {
    var data = { "userEmail": email, "password": password };
    console.log("Data: " + data);
    var url = 'http://' + _config.apihost + '/addcred';
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: data }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('saveLogin Password - Response from API' + body);
          status = true;
          resolve(body);
        } else {
          status = false;
          console.log("saveLoging -API Server not running: ") + error;
          return error;
        }
      });
    });
  }
  
  function sendEmail() {
    console.log('calling API - sendEmail');
    var url = 'http://' + _config.apihost + '/sendmail';
    console.log("URL: " + url);
  
    var subject = "Your Registration for our service";
    var message = "<b>Thank you for Register. </b> <br> <b> Assuring best service. Your password for login is: " + password + "<b> ";
    var formdata = {
      tomail: email,
      subject: subject,
      message: message
    };
  
    //data = JSON.stringify('{\"tomail\": \"'+email+'\", \"subject\": '+subject+'\", \"message\": \" '+message+'\"}');
    console.log("Data: " + formdata);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: formdata }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendEmail - Response from API (body)' + body);
  
          if (body == 'true') resolve(body);
          status = true;
        }
        if (error) {
          console.log("Error in Sending Mail");
          status = false;
          return reject(error);
        }
      });
    });
  }

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Savecustomer = __webpack_require__(94);
  
  var _Savecustomer2 = _interopRequireDefault(_Savecustomer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'New User Registration'; /**
                                        * React Starter Kit (https://www.reactstarterkit.com/)
                                        *
                                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                        *
                                        * This source code is licensed under the MIT license found in the
                                        * LICENSE.txt file in the root directory of this source tree.
                                        */
  
  function Savecustomer(_ref, context) {
    var message = _ref.message,
        redirectlink = _ref.redirectlink,
        message1 = _ref.message1;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Savecustomer2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Savecustomer2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          message
        ),
        _react2.default.createElement(
          'a',
          { href: redirectlink },
          message1,
          ' '
        )
      )
    );
  }
  
  Savecustomer.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Savecustomer2.default)(Savecustomer);

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(95);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Savecustomer.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Savecustomer.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, " .Savecustomer_root_1nS {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Savecustomer_container_lBN {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.Savecustomer_lead_EIt {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.Savecustomer_formGroup_3qk {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.Savecustomer_label_2Fo {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.Savecustomer_input_2C9 {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.Savecustomer_input_2C9:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Savecustomer_button_1Za {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.Savecustomer_button_1Za:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.Savecustomer_button_1Za:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.\r\n\r\n.Savecustomer_icon_2t6 {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.Savecustomer_lineThrough_1yJ {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.Savecustomer_lineThrough_1yJ::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.Savecustomer_lineThrough_1yJ::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n\r\n#Savecustomer_lastname_3YE{\r\n    max-width:100px;\r\n    float:left;\r\n}\r\n\r\n.Savecustomer_div_3UG {\r\n  float:right;\r\n}\r\n\r\n#Savecustomer_leftContainer_3RP {\r\n   float:left;\r\n}\r\n\r\n#Savecustomer_rightContainer_L4- {\r\n   float:right;\r\n}", "", {"version":3,"sources":["/./routes/savecustomer/Savecustomer.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;;;EAGE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb;;AACD;IACI,gBAAgB;IAChB,WAAW;CACd;;AAED;EACE,YAAY;CACb;;AAED;GACG,WAAW;CACb;;AAED;GACG,YAAY;CACd","file":"Savecustomer.css","sourcesContent":[" .root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.label {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n#lastname{\r\n    max-width:100px;\r\n    float:left;\r\n}\r\n\r\n.div {\r\n  float:right;\r\n}\r\n\r\n#leftContainer {\r\n   float:left;\r\n}\r\n\r\n#rightContainer {\r\n   float:right;\r\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Savecustomer_root_1nS",
  	"container": "Savecustomer_container_lBN",
  	"lead": "Savecustomer_lead_EIt",
  	"formGroup": "Savecustomer_formGroup_3qk",
  	"label": "Savecustomer_label_2Fo",
  	"input": "Savecustomer_input_2C9",
  	"button": "Savecustomer_button_1Za",
  	"icon": "Savecustomer_icon_2t6",
  	"lineThrough": "Savecustomer_lineThrough_1yJ",
  	"lastname": "Savecustomer_lastname_3YE",
  	"div": "Savecustomer_div_3UG",
  	"leftContainer": "Savecustomer_leftContainer_3RP",
  	"rightContainer": "Savecustomer_rightContainer_L4-"
  };

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Login = __webpack_require__(97);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(17);
  
  var _util = __webpack_require__(70);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var sessionid = '';
  
  exports.default = {
  
    path: '/login',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var message;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _util.getSessionid)();
  
              case 2:
                sessionid = _context.sent;
                message = ' ';
  
                console.log("SessionId-Login: " + sessionid);
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: sessionid, message: message }));
  
              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = __webpack_require__(66);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Login = __webpack_require__(98);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _Link = __webpack_require__(39);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _formsyReact = __webpack_require__(69);
  
  var _formsyReact2 = _interopRequireDefault(_formsyReact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Entering Credentials';
  //var classNames = require('classnames');
  
  function Login(_ref, context) {
    var sessionid = _ref.sessionid,
        message = _ref.message;
  
    context.setTitle(title);
    console.log("Login.js-SessionId: " + sessionid);
    return _react2.default.createElement(
      'div',
      { className: _Login2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Login2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          { className: _Login2.default.lead },
          'Log in with your username or personal email address.'
        ),
        _react2.default.createElement(
          'div',
          { className: _Login2.default.formGroup },
          _react2.default.createElement(
            'a',
            { className: _Login2.default.facebook, href: '/login/facebook' },
            _react2.default.createElement(
              'svg',
              {
                className: _Login2.default.icon,
                width: '10',
                height: '10',
                viewBox: '0 0 10 10',
                xmlns: 'http://www.w3.org/2000/svg'
              },
              _react2.default.createElement('path', {
                d: 'M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z'
              })
            ),
            _react2.default.createElement(
              'span',
              null,
              'Log in with Facebook'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Login2.default.formGroup },
          _react2.default.createElement(
            'a',
            { className: _Login2.default.google, href: '/login/google' },
            _react2.default.createElement(
              'svg',
              {
                className: _Login2.default.icon,
                width: '30',
                height: '30',
                viewBox: '0 0 30 30',
                xmlns: 'http://www.w3.org/2000/svg'
              },
              _react2.default.createElement('path', {
                d: 'M30 13h-4V9h-2v4h-4v2h4v4h2v-4h4m-15 2s-2-1.15-2-2c0 0-.5-1.828 1-3 ' + '1.537-1.2 3-3.035 3-5 0-2.336-1.046-5-3-6h3l2.387-1H10C5.835 0 2 3.345 2 7c0 ' + '3.735 2.85 6.56 7.086 6.56.295 0 .58-.006.86-.025-.273.526-.47 1.12-.47 1.735 ' + '0 1.037.817 2.042 1.523 2.73H9c-5.16 0-9 2.593-9 6 0 3.355 4.87 6 10.03 6 5.882 ' + '0 9.97-3 9.97-7 0-2.69-2.545-4.264-5-6zm-4-4c-2.395 0-5.587-2.857-6-6C4.587 ' + '3.856 6.607.93 9 1c2.394.07 4.603 2.908 5.017 6.052C14.43 10.195 13 13 11 ' + '13zm-1 15c-3.566 0-7-1.29-7-4 0-2.658 3.434-5.038 7-5 .832.01 2 0 2 0 1 0 ' + '2.88.88 4 2 1 1 1 2.674 1 3 0 3-1.986 4-7 4z'
              })
            ),
            _react2.default.createElement(
              'span',
              null,
              'Log in with Google'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Login2.default.formGroup },
          _react2.default.createElement(
            'a',
            { className: _Login2.default.twitter, href: '/login/twitter' },
            _react2.default.createElement(
              'svg',
              {
                className: _Login2.default.icon,
                width: '30',
                height: '30',
                viewBox: '0 0 30 30',
                xmlns: 'http://www.w3.org/2000/svg'
              },
              _react2.default.createElement('path', {
                d: 'M30 6.708c-1.105.49-2.756 1.143-4 1.292 1.273-.762 2.54-2.56 ' + '3-4-.97.577-2.087 1.355-3.227 1.773L25 5c-1.12-1.197-2.23-2-4-2-3.398 0-6 ' + '2.602-6 6 0 .4.047.7.11.956L15 10C9 10 5.034 8.724 2 5c-.53.908-1 1.872-1 ' + '3 0 2.136 1.348 3.894 3 5-1.01-.033-2.17-.542-3-1 0 2.98 4.186 6.432 7 7-1 ' + '1-4.623.074-5 0 .784 2.447 3.31 3.95 6 4-2.105 1.648-4.647 2.51-7.53 2.51-.5 ' + '0-.988-.03-1.47-.084C2.723 27.17 6.523 28 10 28c11.322 0 17-8.867 17-17 ' + '0-.268.008-.736 0-1 1.2-.868 2.172-2.058 3-3.292z'
              })
            ),
            _react2.default.createElement(
              'span',
              null,
              'Log in with Twitter'
            )
          )
        ),
        _react2.default.createElement(
          'strong',
          { className: _Login2.default.lineThrough },
          'OR'
        ),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'get', action: 'verifypass' },
          _react2.default.createElement(
            'div',
            { className: _Login2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Login2.default.label, htmlFor: 'usernameOrEmail' },
              'Username or email address:'
            ),
            _react2.default.createElement('input', {
              className: _Login2.default.input,
              id: 'usernameOrEmail',
              type: 'email',
              name: 'usernameOrEmail',
              required: 'required',
              autoFocus: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Login2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Login2.default.label, htmlFor: 'password' },
              'Password:'
            ),
            _react2.default.createElement('input', {
              className: _Login2.default.input,
              id: 'password',
              type: 'password',
              name: 'password',
              required: 'required'
            }),
            _react2.default.createElement(
              'p',
              { className: _Login2.default.p },
              _react2.default.createElement(
                'b',
                null,
                ' ',
                message
              ),
              ' '
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _Login2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _Login2.default.button1, type: 'submit' },
              'Log in'
            ),
            _react2.default.createElement(
              _Link2.default,
              { to: '/forgotpass' },
              'Forgot Password'
            ),
            _react2.default.createElement(
              'span',
              { className: _Login2.default.spacer },
              ' | '
            ),
            _react2.default.createElement(
              _Link2.default,
              { to: '/register' },
              'Sign Up'
            ),
            _react2.default.createElement('input', {
              id: 'sessionid',
              type: 'hidden',
              name: 'sessionid',
              value: sessionid
            })
          )
        )
      )
    );
  }
  
  Login.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Login2.default)(Login);

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(99);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Login.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Login.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n\r\n.Login_root_2w1 {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\nhtml {\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n}\r\n\r\n.Login_container__GI {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.Login_lead_1kn {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.Login_formGroup_1oM {\r\n  margin-bottom: 15px;\r\n}\r\n\r\n.Login_label_1Gy {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n.Login_input_3Hu {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 26px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 0;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.Login_input_3Hu:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Login_p_1Z5 {\r\n  color: red;\r\n}\r\n\r\n.Login_button_2e4 {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 80%;\r\n  outline: 10;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.Login_button1_Mej {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 50%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373388;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 14px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.Login_button_2e4:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.Login_button_2e4:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Login_facebook_1Zm {\r\n  border-color: #3b5998;\r\n  background: #3b5998;\r\n}\r\n\r\n.Login_facebook_1Zm:hover {\r\n  background: #2d4373;\r\n}\r\n\r\n.Login_google_U0z {\r\n  border-color: #dd4b39;\r\n  background: #dd4b39;\r\n}\r\n\r\n.Login_google_U0z:hover {\r\n  background: #c23321;\r\n}\r\n\r\n.Login_twitter_1C5 {\r\n  border-color: #55acee;\r\n  background: #55acee;\r\n}\r\n\r\n.Login_twitter_1C5:hover {\r\n  background: #2795e9;\r\n}\r\n\r\n.Login_icon_2K7 {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 10px;\r\n  height: 10px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.Login_lineThrough_1sW {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.Login_lineThrough_1sW::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.Login_lineThrough_1sW::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/Login/Login.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,+BAAuB;UAAvB,uBAAuB;CACxB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,iBAAiB;EACjB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,WAAW;CACZ;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,WAAW;EACX,YAAY;EACZ,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AACD;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,WAAW;EACX,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"Login.css","sourcesContent":["\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n","\r\n@import '../../components/variables.css';\r\n\r\n.root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\nhtml {\r\n  box-sizing: border-box;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 15px;\r\n}\r\n\r\n.label {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 26px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 0;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.p {\r\n  color: red;\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 80%;\r\n  outline: 10;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n.button1 {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 50%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373388;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 14px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.facebook {\r\n  border-color: #3b5998;\r\n  background: #3b5998;\r\n  composes: button;\r\n}\r\n\r\n.facebook:hover {\r\n  background: #2d4373;\r\n}\r\n\r\n.google {\r\n  border-color: #dd4b39;\r\n  background: #dd4b39;\r\n  composes: button;\r\n}\r\n\r\n.google:hover {\r\n  background: #c23321;\r\n}\r\n\r\n.twitter {\r\n  border-color: #55acee;\r\n  background: #55acee;\r\n  composes: button;\r\n}\r\n\r\n.twitter:hover {\r\n  background: #2795e9;\r\n}\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 10px;\r\n  height: 10px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Login_root_2w1",
  	"container": "Login_container__GI",
  	"lead": "Login_lead_1kn",
  	"formGroup": "Login_formGroup_1oM",
  	"label": "Login_label_1Gy",
  	"input": "Login_input_3Hu",
  	"p": "Login_p_1Z5",
  	"button": "Login_button_2e4",
  	"button1": "Login_button1_Mej",
  	"facebook": "Login_facebook_1Zm Login_button_2e4",
  	"google": "Login_google_U0z Login_button_2e4",
  	"twitter": "Login_twitter_1C5 Login_button_2e4",
  	"icon": "Login_icon_2K7",
  	"lineThrough": "Login_lineThrough_1sW"
  };

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(32);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Content = __webpack_require__(101);
  
  var _Content2 = _interopRequireDefault(_Content);
  
  var _fetch = __webpack_require__(104);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '*',
  
    action: function action(_ref) {
      var _this = this;
  
      var path = _ref.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var resp, _ref2, data;
  
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _fetch2.default)('/graphql', {
                  method: 'post',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: (0, _stringify2.default)({
                    query: '{content(path:"' + path + '"){path,title,content,component}}'
                  }),
                  credentials: 'include'
                });
  
              case 2:
                resp = _context.sent;
  
                if (!(resp.status !== 200)) {
                  _context.next = 5;
                  break;
                }
  
                throw new Error(resp.statusText);
  
              case 5:
                _context.next = 7;
                return resp.json();
  
              case 7:
                _ref2 = _context.sent;
                data = _ref2.data;
  
                if (!(!data || !data.content)) {
                  _context.next = 11;
                  break;
                }
  
                return _context.abrupt('return', undefined);
  
              case 11:
                return _context.abrupt('return', _react2.default.createElement(_Content2.default, data.content));
  
              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(21);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(22);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(23);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(24);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(25);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Content = __webpack_require__(102);
  
  var _Content2 = _interopRequireDefault(_Content);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Content = function (_Component) {
    (0, _inherits3.default)(Content, _Component);
  
    function Content() {
      (0, _classCallCheck3.default)(this, Content);
      return (0, _possibleConstructorReturn3.default)(this, (Content.__proto__ || (0, _getPrototypeOf2.default)(Content)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Content, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.setTitle(this.props.title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: _Content2.default.root },
          _react2.default.createElement(
            'div',
            { className: _Content2.default.container },
            this.props.path === '/' ? null : _react2.default.createElement(
              'h1',
              null,
              this.props.title
            ),
            _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.props.content || '' } })
          )
        );
      }
    }]);
    return Content;
  }(_react.Component);
  
  Content.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired
  };
  Content.propTypes = {
    path: _react.PropTypes.string.isRequired,
    content: _react.PropTypes.string.isRequired,
    title: _react.PropTypes.string
  };
  exports.default = (0, _withStyles2.default)(_Content2.default)(Content);

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(103);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Content.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Content.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n\r\n.Content_root_2X0 {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Content_container_20T {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 1000px;\r\n}\r\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/content/Content.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACnBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAoC;CACrC","file":"Content.css","sourcesContent":["\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n","\r\n\r\n@import '../../components/variables.css';\r\n\r\n.root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: var(--max-content-width);\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Content_root_2X0",
  	"container": "Content_container_20T"
  };

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Response = exports.Headers = exports.Request = exports.default = undefined;
  
  var _bluebird = __webpack_require__(105);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _nodeFetch = __webpack_require__(106);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _nodeFetch2.default.Promise = _bluebird2.default; /**
                                                     * React Starter Kit (https://www.reactstarterkit.com/)
                                                     *
                                                     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                     *
                                                     * This source code is licensed under the MIT license found in the
                                                     * LICENSE.txt file in the root directory of this source tree.
                                                     */
  
  _nodeFetch.Response.Promise = _bluebird2.default;
  
  function localUrl(url) {
    if (url.startsWith('//')) {
      return 'https:' + url;
    }
  
    if (url.startsWith('http')) {
      return url;
    }
  
    return 'http://' + _config.host + url;
  }
  
  function localFetch(url, options) {
    return (0, _nodeFetch2.default)(localUrl(url), options);
  }
  
  exports.default = localFetch;
  exports.Request = _nodeFetch.Request;
  exports.Headers = _nodeFetch.Headers;
  exports.Response = _nodeFetch.Response;

/***/ },
/* 105 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 106 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(20);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _ErrorPage = __webpack_require__(108);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/error',
  
    action: function action(_ref) {
      var render = _ref.render,
          context = _ref.context,
          error = _ref.error;
  
      return render(_react2.default.createElement(
        _App2.default,
        { context: context, error: error },
        _react2.default.createElement(_ErrorPage2.default, { error: error })
      ), error.status || 500);
    }
  };

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ErrorPage = __webpack_require__(109);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function ErrorPage(_ref, context) {
    var error = _ref.error;
  
    var title = 'Error';
    var content = 'Sorry, a critical error occurred on this page.';
    var errorMessage = null;
  
    if (error.status === 404) {
      title = 'Page Not Found';
      content = 'Sorry, the page you were trying to view does not exist.';
    } else if (true) {
      errorMessage = _react2.default.createElement(
        'pre',
        null,
        error.stack
      );
    }
  
    context.setTitle(title);
  
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        null,
        title
      ),
      _react2.default.createElement(
        'p',
        null,
        content
      ),
      errorMessage
    );
  }
  
  ErrorPage.propTypes = { error: _react.PropTypes.object.isRequired };
  ErrorPage.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_ErrorPage2.default)(ErrorPage);

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(110);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ErrorPage.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ErrorPage.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "\r\n* {\r\n  line-height: 1.2;\r\n  margin: 0;\r\n}\r\n\r\nhtml {\r\n  color: #888;\r\n  display: table;\r\n  font-family: sans-serif;\r\n  height: 100%;\r\n  text-align: center;\r\n  width: 100%;\r\n}\r\n\r\nbody {\r\n  display: table-cell;\r\n  vertical-align: middle;\r\n  /* stylelint-disable */\r\n  margin: 2em auto;\r\n  /* stylelint-enable */\r\n}\r\n\r\nh1 {\r\n  color: #555;\r\n  font-size: 2em;\r\n  font-weight: 400;\r\n}\r\n\r\np {\r\n  margin: 0 auto;\r\n  width: 280px;\r\n}\r\n\r\npre {\r\n  text-align: left;\r\n  margin-top: 32px;\r\n  margin-top: 2rem;\r\n}\r\n\r\n@media only screen and (max-width: 280px) {\r\n\r\n  body,\r\n  p {\r\n    width: 95%;\r\n  }\r\n\r\n  h1 {\r\n    font-size: 1.5em;\r\n    margin: 0 0 0.3em;\r\n  }\r\n\r\n}\r\n", "", {"version":3,"sources":["/./routes/error/ErrorPage.css"],"names":[],"mappings":";AACA;EACE,iBAAiB;EACjB,UAAU;CACX;;AAED;EACE,YAAY;EACZ,eAAe;EACf,wBAAwB;EACxB,aAAa;EACb,mBAAmB;EACnB,YAAY;CACb;;AAED;EACE,oBAAoB;EACpB,uBAAuB;EACvB,uBAAuB;EACvB,iBAAiB;EACjB,sBAAsB;CACvB;;AAED;EACE,YAAY;EACZ,eAAe;EACf,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,aAAa;CACd;;AAED;EACE,iBAAiB;EACjB,iBAAiB;EAAjB,iBAAiB;CAClB;;AAED;;EAEE;;IAEE,WAAW;GACZ;;EAED;IACE,iBAAiB;IACjB,kBAAkB;GACnB;;CAEF","file":"ErrorPage.css","sourcesContent":["\r\n* {\r\n  line-height: 1.2;\r\n  margin: 0;\r\n}\r\n\r\nhtml {\r\n  color: #888;\r\n  display: table;\r\n  font-family: sans-serif;\r\n  height: 100%;\r\n  text-align: center;\r\n  width: 100%;\r\n}\r\n\r\nbody {\r\n  display: table-cell;\r\n  vertical-align: middle;\r\n  /* stylelint-disable */\r\n  margin: 2em auto;\r\n  /* stylelint-enable */\r\n}\r\n\r\nh1 {\r\n  color: #555;\r\n  font-size: 2em;\r\n  font-weight: 400;\r\n}\r\n\r\np {\r\n  margin: 0 auto;\r\n  width: 280px;\r\n}\r\n\r\npre {\r\n  text-align: left;\r\n  margin-top: 2rem;\r\n}\r\n\r\n@media only screen and (max-width: 280px) {\r\n\r\n  body,\r\n  p {\r\n    width: 95%;\r\n  }\r\n\r\n  h1 {\r\n    font-size: 1.5em;\r\n    margin: 0 0 0.3em;\r\n  }\r\n\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Verifypass = __webpack_require__(112);
  
  var _Verifypass2 = _interopRequireDefault(_Verifypass);
  
  var _Login = __webpack_require__(65);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _ErrorPage = __webpack_require__(108);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  var _Home = __webpack_require__(62);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _config = __webpack_require__(17);
  
  var _util = __webpack_require__(70);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var request = __webpack_require__(71);
  
  var res;
  var userEmail;
  var password;
  var validLogin;
  var url;
  var page;
  var status;
  var sessionid;
  exports.default = {
  
    path: '/verifypass',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var newsessionid, body, bookinglist, message;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
  
                console.log("inside the verifypass");
  
                userEmail = query.usernameOrEmail;
                password = query.password;
                sessionid = query.sessionid;
                console.log(userEmail);
                console.log(password);
                console.log("SessionId: " + sessionid);
                //var sessionbody = await checkSessionid(sessionid);
                //console.log("Session Exist: "+sessionbody);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 13;
                  break;
                }
  
                _context.next = 10;
                return (0, _util.getSessionid)();
  
              case 10:
                newsessionid = _context.sent;
  
                console.log("inside the if");
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: newsessionid }));
  
              case 13:
  
                url = 'http://' + _config.apihost + '/checklogin?usernameOrEmail=' + userEmail + '&password=' + password;
  
                _context.next = 16;
                return verifylogin(url);
  
              case 16:
                validLogin = _context.sent;
  
                console.log("Result from API call: " + validLogin);
  
                if (!(validLogin == 'true')) {
                  _context.next = 29;
                  break;
                }
  
                _context.next = 21;
                return SaveSessionData();
  
              case 21:
                body = _context.sent;
  
                console.log(" Going to Home Page");
                _context.next = 25;
                return getBookingData();
  
              case 25:
                bookinglist = _context.sent;
                return _context.abrupt('return', _react2.default.createElement(_Home2.default, { sessionid: sessionid, email: userEmail, bookinglist: bookinglist }));
  
              case 29:
                message = "Invalid username or passowrd";
  
                console.log(" Invalid Credential return to Login Page");
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: sessionid, message: message }));
  
              case 32:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function verifylogin(url) {
    console.log("URL -- veriylogin: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Response from API' + body);
          validLogin = body;
          resolve(body);
        } else {
          console.log("Server not responding");
          validLogin = false;
        }
  
        console.log("ValidLogin status: " + validLogin);
      });
    });
  }
  
  function SaveSessionData() {
  
    console.log('calling API - SaveSessionData method');
    var url = 'http://' + _config.apihost + '/addSession';
    console.log("URL: " + url);
    var createdate = new Date();
    var data = {
      email: userEmail,
      sessionid: sessionid,
      creationdate: createdate
    };
    console.log("Data: " + data);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: data }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside SaveSessionData Response from API (body)' + body);
  
          if (body == 'true') status = true;
          resolve(body);
        }
        if (error) {
          console.log("Error in storing Session data");
          status = false;
          return reject(error);
        }
      });
  
      console.log('returning');
    });
  }
  
  function getBookingData() {
    var request = __webpack_require__(71);
  
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/getBookingHistory?email=' + userEmail;
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside getBookingData Response from API (body)' + body);
          resolve(body);
        } else {
          console.log("Error Object: " + error);
          return reject(error);
        }
      });
    });
  }

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _VerifyPass = __webpack_require__(113);
  
  var _VerifyPass2 = _interopRequireDefault(_VerifyPass);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  //import me from '../../data/queries/me.js';
  
  var title = 'Verify Credential';
  var user = 'Customer';
  
  function VerifyPass(_ref, props, context) {
    var message = _ref.message,
        sessionid = _ref.sessionid;
  
    context.setUser(user);
    context.setTitle(title);
  
    return _react2.default.createElement(
      'div',
      { className: _VerifyPass2.default.root },
      _react2.default.createElement(
        'div',
        { className: _VerifyPass2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          message
        ),
        _react2.default.createElement('input', {
          id: 'sessionid',
          type: 'hidden',
          name: 'sessionid',
          value: sessionid
        })
      )
    );
  }
  
  VerifyPass.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_VerifyPass2.default)(VerifyPass);

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(114);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./VerifyPass.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./VerifyPass.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n.VerifyPass_root_3U8 {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n.VerifyPass_container_270 {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n.VerifyPass_lead_M-y {\r\n  font-size: 1.25em;\r\n}\r\n.VerifyPass_formGroup_K23 {\r\n  margin-bottom: 20px;\r\n}\r\n.VerifyPass_label_1xU {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n.VerifyPass_input_3ir {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n.VerifyPass_input_3ir:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n.VerifyPass_button_YQ7 {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n.VerifyPass_button_YQ7:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n.VerifyPass_button_YQ7:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n.VerifyPass_facebook_3az {\r\n  border-color: #3b5998;\r\n  background: #3b5998;\r\n}\r\n.VerifyPass_facebook_3az:hover {\r\n  background: #2d4373;\r\n}\r\n.VerifyPass_google_2t1 {\r\n  border-color: #dd4b39;\r\n  background: #dd4b39;\r\n}\r\n.VerifyPass_google_2t1:hover {\r\n  background: #c23321;\r\n}\r\n.VerifyPass_twitter_3GY {\r\n  border-color: #55acee;\r\n  background: #55acee;\r\n}\r\n.VerifyPass_twitter_3GY:hover {\r\n  background: #2795e9;\r\n}\r\n.VerifyPass_icon_2IJ {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n.VerifyPass_lineThrough_1A5 {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n.VerifyPass_lineThrough_1A5::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n.VerifyPass_lineThrough_1A5::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n", "", {"version":3,"sources":["/./routes/verifypass/VerifyPass.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;ACLH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;ADbD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;AAED;EACE,kBAAkB;CACnB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;AAED;EACE,mCAAmC;CACpC;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"VerifyPass.css","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n@import '../../components/variables.css';\r\n\r\n.root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.label {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.facebook {\r\n  border-color: #3b5998;\r\n  background: #3b5998;\r\n  composes: button;\r\n}\r\n\r\n.facebook:hover {\r\n  background: #2d4373;\r\n}\r\n\r\n.google {\r\n  border-color: #dd4b39;\r\n  background: #dd4b39;\r\n  composes: button;\r\n}\r\n\r\n.google:hover {\r\n  background: #c23321;\r\n}\r\n\r\n.twitter {\r\n  border-color: #55acee;\r\n  background: #55acee;\r\n  composes: button;\r\n}\r\n\r\n.twitter:hover {\r\n  background: #2795e9;\r\n}\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n","\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "VerifyPass_root_3U8",
  	"container": "VerifyPass_container_270",
  	"lead": "VerifyPass_lead_M-y",
  	"formGroup": "VerifyPass_formGroup_K23",
  	"label": "VerifyPass_label_1xU",
  	"input": "VerifyPass_input_3ir",
  	"button": "VerifyPass_button_YQ7",
  	"facebook": "VerifyPass_facebook_3az VerifyPass_button_YQ7",
  	"google": "VerifyPass_google_2t1 VerifyPass_button_YQ7",
  	"twitter": "VerifyPass_twitter_3GY VerifyPass_button_YQ7",
  	"icon": "VerifyPass_icon_2IJ",
  	"lineThrough": "VerifyPass_lineThrough_1A5"
  };

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Changepassword = __webpack_require__(116);
  
  var _Changepassword2 = _interopRequireDefault(_Changepassword);
  
  var _Login = __webpack_require__(65);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var status = false;
  
  exports.default = {
  
    path: '/changepassword',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var email, code, startdate, body, enddate, difftime;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = query.userEmail;
                code = query.code;
  
                console.log("Email ID:" + email);
                startdate = new Date();
                _context.next = 6;
                return checkCode(code, email);
  
              case 6:
                body = _context.sent;
                enddate = new Date();
                difftime = enddate.getTime() - startdate.getTime();
  
                console.log("Execution Time:" + difftime);
  
                if (!status) {
                  _context.next = 14;
                  break;
                }
  
                return _context.abrupt('return', _react2.default.createElement(_Changepassword2.default, { email: email, passCode: code }));
  
              case 14:
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, null));
  
              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function checkCode(code, email) {
    var request = __webpack_require__(71);
    console.log('Check Code - calling API');
    var url = 'http://' + _config.apihost + '/getCode?code=' + code + '&userEmail=' + email;
    console.log("Checkcode - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Checkcode - Response from API' + body);
  
          if (body == 'true') status = true;else status = false;
          resolve(body);
        } else {
          status = false;
          console.log("checkCode -API Server not running: " + error);
          return reject(error);
        }
        console.log("Checkecode - Returning from API call");
      });
    });
  }

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _changepassword = __webpack_require__(117);
  
  var _changepassword2 = _interopRequireDefault(_changepassword);
  
  var _Link = __webpack_require__(39);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Changing Password';
  
  function Changepassword(_ref, context) {
    var email = _ref.email,
        passCode = _ref.passCode,
        message = _ref.message;
  
    console.log("Changepassword: " + email);
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _changepassword2.default.root },
      _react2.default.createElement(
        'div',
        { className: _changepassword2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement('script', { type: 'text/javascript', src: '../scripts/passwordmatch.js' }),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'put', action: 'updatepass' },
          _react2.default.createElement(
            'div',
            { className: _changepassword2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _changepassword2.default.label, htmlFor: 'password' },
              'New Password:'
            ),
            _react2.default.createElement('input', {
              className: _changepassword2.default.input,
              id: 'newpass',
              type: 'password',
              name: 'newpass',
              autoFocus: true,
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _changepassword2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _changepassword2.default.label, htmlFor: 'password' },
              'Confirm Password:'
            ),
            _react2.default.createElement('input', {
              className: _changepassword2.default.input,
              id: 'confirmpass',
              type: 'password',
              name: 'confirmpass'
            }),
            _react2.default.createElement(
              'label',
              { className: _changepassword2.default.label1, htmlFor: 'message' },
              message
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _changepassword2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _changepassword2.default.button, value: 'Change Password', type: 'submit' },
              'Change Password'
            ),
            _react2.default.createElement('input', {
              className: _changepassword2.default.input,
              id: 'email',
              type: 'hidden',
              name: 'email',
              value: email
            }),
            _react2.default.createElement('input', {
              id: 'code',
              type: 'hidden',
              name: 'code',
              value: passCode
            })
          ),
          _react2.default.createElement('script', null)
        )
      )
    );
  }
  
  Changepassword.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_changepassword2.default)(Changepassword);

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(118);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./changepassword.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./changepassword.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n\r\n.changepassword_root_2hw {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.changepassword_container_vd0 {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.changepassword_lead_337 {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.changepassword_formGroup_2cz {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.changepassword_label_1io {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n.changepassword_label1_2Xu {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 300;\r\n  color: #FF0000;\r\n}\r\n\r\n.changepassword_input_3LT {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.changepassword_input_3LT:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.changepassword_button_CSn {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.changepassword_button_CSn:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.changepassword_button_CSn:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/changepassword/changepassword.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,eAAe;CAChB;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C","file":"changepassword.css","sourcesContent":["\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n","\r\n@import '../../components/variables.css';\r\n\r\n.root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.label {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n.label1 {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 300;\r\n  color: #FF0000;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "changepassword_root_2hw",
  	"container": "changepassword_container_vd0",
  	"lead": "changepassword_lead_337",
  	"formGroup": "changepassword_formGroup_2cz",
  	"label": "changepassword_label_1io",
  	"label1": "changepassword_label1_2Xu",
  	"input": "changepassword_input_3LT",
  	"button": "changepassword_button_CSn"
  };

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Updatepass = __webpack_require__(120);
  
  var _Updatepass2 = _interopRequireDefault(_Updatepass);
  
  var _Changepassword = __webpack_require__(116);
  
  var _Changepassword2 = _interopRequireDefault(_Changepassword);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var status = true;
  var message = 'Password Sucessfully Updated';
  var href = 'http://' + _config.host + '/login';
  var message1 = 'Click here to login';
  var passcode;
  
  exports.default = {
  
    path: '/updatepass',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var email, newpass, confirmpass, body, deletecode;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = query.email;
                newpass = query.newpass;
                confirmpass = query.confirmpass;
  
                passcode = query.code;
                console.log("Email ID:" + email);
                console.log("New Password: " + newpass);
                console.log("Confirm Password: " + confirmpass);
                console.log("Passcode - Update Password module:" + passcode);
  
                if (!(newpass != confirmpass)) {
                  _context.next = 11;
                  break;
                }
  
                message = "Password Not matching";
                return _context.abrupt('return', _react2.default.createElement(_Changepassword2.default, { email: email, message: message }));
  
              case 11:
                _context.next = 13;
                return updatePassword(newpass, email);
  
              case 13:
                body = _context.sent;
  
                if (!(status = false)) {
                  _context.next = 18;
                  break;
                }
  
                message = ' Error in updating password';
                _context.next = 22;
                break;
  
              case 18:
                message = 'Password Sucessfully Updated';
                _context.next = 21;
                return deletePassCode();
  
              case 21:
                deletecode = _context.sent;
  
              case 22:
                return _context.abrupt('return', _react2.default.createElement(_Updatepass2.default, { message: message, message1: message1, redirectlink: href }));
  
              case 23:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function updatePassword(newpass, email) {
    var request = __webpack_require__(71);
    console.log("Inside updatePassword method email: " + email);
    console.log("Inside updatePassword method Password: " + newpass);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/updatecred?newpass=' + newpass + '&email=' + email;
    console.log("Update Password - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
  
      request.put(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Change Password - Response from API' + body);
          if (body == 'true') {
            status = true;
          } else {
            status = false;
            message = 'Error in updating password';
          }
          resolve(body);
        } else {
          status = false;
          console.log("Change Password -API Server not running: ") + error;
          return reject(error);
        }
      });
    });
  }
  
  function deletePassCode() {
    var request = __webpack_require__(71);
    console.log('Check Code - calling API');
    var url = 'http://' + _config.apihost + '/removeCode?code=' + passcode;
    console.log("deletePassCode - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request.delete(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('deletePassCode- Response from API' + body);
  
          if (body == 'true') status = true;else status = false;
          resolve(body);
        } else {
          status = false;
          console.log("deletePassCode -API Server not running: " + error);
          return reject(error);
        }
        console.log("deletePassCode - Returning from API call");
      });
    });
  }

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _updatepass = __webpack_require__(121);
  
  var _updatepass2 = _interopRequireDefault(_updatepass);
  
  var _Link = __webpack_require__(39);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var title = 'Update Password';
  
  function Updatepass(_ref, context) {
    var message = _ref.message,
        message1 = _ref.message1,
        redirectlink = _ref.redirectlink;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _updatepass2.default.root },
      _react2.default.createElement(
        'div',
        { className: _updatepass2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          message
        ),
        _react2.default.createElement(
          'a',
          { href: redirectlink },
          message1,
          ' '
        )
      )
    );
  }
  
  Updatepass.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_updatepass2.default)(Updatepass);

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(122);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./updatepass.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./updatepass.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n.updatepass_root_Q_n {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n.updatepass_container_n8c {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n.updatepass_lead_1Xi {\r\n  font-size: 1.25em;\r\n}\r\n.updatepass_formGroup_1Fj {\r\n  margin-bottom: 20px;\r\n}\r\n.updatepass_label_3lc {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n.updatepass_input_3tg {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n.updatepass_input_3tg:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n.updatepass_button_1mT {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n.updatepass_button_1mT:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n.updatepass_button_1mT:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n.updatepass_facebook_2jX {\r\n  border-color: #3b5998;\r\n  background: #3b5998;\r\n}\r\n.updatepass_facebook_2jX:hover {\r\n  background: #2d4373;\r\n}\r\n.updatepass_google_1WT {\r\n  border-color: #dd4b39;\r\n  background: #dd4b39;\r\n}\r\n.updatepass_google_1WT:hover {\r\n  background: #c23321;\r\n}\r\n.updatepass_twitter_3cW {\r\n  border-color: #55acee;\r\n  background: #55acee;\r\n}\r\n.updatepass_twitter_3cW:hover {\r\n  background: #2795e9;\r\n}\r\n.updatepass_icon_IAX {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n.updatepass_lineThrough_3LS {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n.updatepass_lineThrough_3LS::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n.updatepass_lineThrough_3LS::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n", "", {"version":3,"sources":["/./routes/updatepass/updatepass.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;ACLH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;ADbD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;AAED;EACE,kBAAkB;CACnB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;AAGD;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;AAED;EACE,mCAAmC;CACpC;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"updatepass.css","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n@import '../../components/variables.css';\r\n\r\n.root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.label {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.facebook {\r\n  border-color: #3b5998;\r\n  background: #3b5998;\r\n  composes: button;\r\n}\r\n\r\n.facebook:hover {\r\n  background: #2d4373;\r\n}\r\n\r\n.google {\r\n  border-color: #dd4b39;\r\n  background: #dd4b39;\r\n  composes: button;\r\n}\r\n\r\n.google:hover {\r\n  background: #c23321;\r\n}\r\n\r\n.twitter {\r\n  border-color: #55acee;\r\n  background: #55acee;\r\n  composes: button;\r\n}\r\n\r\n.twitter:hover {\r\n  background: #2795e9;\r\n}\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n","\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "updatepass_root_Q_n",
  	"container": "updatepass_container_n8c",
  	"lead": "updatepass_lead_1Xi",
  	"formGroup": "updatepass_formGroup_1Fj",
  	"label": "updatepass_label_3lc",
  	"input": "updatepass_input_3tg",
  	"button": "updatepass_button_1mT",
  	"facebook": "updatepass_facebook_2jX updatepass_button_1mT",
  	"google": "updatepass_google_1WT updatepass_button_1mT",
  	"twitter": "updatepass_twitter_3cW updatepass_button_1mT",
  	"icon": "updatepass_icon_IAX",
  	"lineThrough": "updatepass_lineThrough_3LS"
  };

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Serviceprovider = __webpack_require__(124);
  
  var _Serviceprovider2 = _interopRequireDefault(_Serviceprovider);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/serviceprovider',
  
    action: function action() {
      return _react2.default.createElement(_Serviceprovider2.default, null);
    }
  };

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Serviceprovider = __webpack_require__(125);
  
  var _Serviceprovider2 = _interopRequireDefault(_Serviceprovider);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Service Provider Registration'; /**
                                                * React Starter Kit (https://www.reactstarterkit.com/)
                                                *
                                                * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                *
                                                * This source code is licensed under the MIT license found in the
                                                * LICENSE.txt file in the root directory of this source tree.
                                                */
  
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var currentdate = day + '/' + month + '/' + year;
  
  function Serviceprovider(props, context) {
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Serviceprovider2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Serviceprovider2.default.container },
        _react2.default.createElement(
          'h2',
          null,
          title
        ),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'put', action: 'saveprovider' },
          _react2.default.createElement(
            'div',
            { className: _Serviceprovider2.default.leftContainer },
            _react2.default.createElement('input', { id: 'modifieddate', type: 'hidden', value: currentdate, name: 'modifieddate' }),
            _react2.default.createElement(
              'label',
              { className: _Serviceprovider2.default.label, htmlFor: 'firstname' },
              'User First Name:'
            ),
            _react2.default.createElement('input', {
              className: _Serviceprovider2.default.input,
              id: 'firstname',
              type: 'text',
              name: 'firstname',
              placeholder: 'First Name',
              autoFocus: true,
              required: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Serviceprovider2.default.label, htmlFor: 'Last Name' },
              _react2.default.createElement(
                'span',
                null,
                'User Last Name: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Serviceprovider2.default.input,
              id: 'lname',
              type: 'text',
              name: 'lname',
              placeholder: 'Last Name',
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'label',
              { className: _Serviceprovider2.default.label, htmlFor: 'address' },
              _react2.default.createElement(
                'span',
                null,
                'User Address: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Serviceprovider2.default.input,
              id: 'address',
              type: 'text',
              name: 'address',
              placeholder: 'Address',
              required: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Serviceprovider2.default.label, htmlFor: 'city' },
              _react2.default.createElement(
                'span',
                null,
                'City: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Serviceprovider2.default.input,
              id: 'city',
              type: 'text',
              name: 'city',
              placeholder: 'City',
              required: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Serviceprovider2.default.label, htmlFor: 'zipcode' },
              _react2.default.createElement(
                'span',
                null,
                'Zipcode: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Serviceprovider2.default.input,
              id: 'zipcode',
              type: 'number',
              name: 'zipcode',
              placeholder: 'Zipcode',
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Serviceprovider2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Serviceprovider2.default.label, htmlFor: 'email' },
              'E-mail:'
            ),
            _react2.default.createElement('input', {
              className: _Serviceprovider2.default.input,
              id: 'email',
              type: 'email',
              name: 'email',
              placeholder: 'Your E-mail',
              required: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Serviceprovider2.default.label, htmlFor: 'Phone' },
              'phone:'
            ),
            _react2.default.createElement('input', {
              className: _Serviceprovider2.default.input,
              id: 'phone',
              type: 'text',
              name: 'phone',
              placeholder: 'Mobile Number',
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Serviceprovider2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Serviceprovider2.default.label, htmlFor: 'servicetype' },
              'Service Type:'
            ),
            _react2.default.createElement('input', {
              className: _Serviceprovider2.default.input,
              id: 'servicetype',
              type: 'servicetype',
              name: 'servicetype',
              placeholder: 'Service Type Catering, Astrology etc.',
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'label',
              { className: _Serviceprovider2.default.label, htmlFor: 'serve' },
              'Serve Outside:'
            ),
            _react2.default.createElement('input', { className: _Serviceprovider2.default.squaredOne,
              id: 'serveoutside',
              type: 'checkbox',
              name: 'serveoutside'
  
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Serviceprovider2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _Serviceprovider2.default.button, value: 'submit', type: 'submit' },
              'Save'
            )
          )
        )
      )
    );
  }
  
  Serviceprovider.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Serviceprovider2.default)(Serviceprovider);

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(126);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Serviceprovider.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Serviceprovider.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, " .Serviceprovider_root_3Ll {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Serviceprovider_container_c6Z {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n  max-height:100x\r\n}\r\n\r\n.Serviceprovider_lead_35E {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.Serviceprovider_formGroup_3-S {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.Serviceprovider_label_15b {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.Serviceprovider_input_354 {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 26px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  size: 15;\r\n  max-width: 30; \r\n}\r\n\r\n.Serviceprovider_input_354:focus {\r\n  border-color: red;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Serviceprovider_button_vnx {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 50%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 14px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.Serviceprovider_button_vnx:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.Serviceprovider_button_vnx:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Serviceprovider_leftContainer_31v {\r\n   float:left;\r\n}\r\n\r\n.Serviceprovider_rightContainer_2M6 {\r\n   float:right;\r\n}\r\n\r\n.Serviceprovider_icon_1-O {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.Serviceprovider_lineThrough_2lM {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.Serviceprovider_lineThrough_2lM::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.Serviceprovider_lineThrough_2lM::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n\r\n.Serviceprovider_squaredOne_5rn {\r\n  width: 28px;\r\n  height: 28px;\r\n  position: relative;\r\n  margin: 20px auto;\r\n  background: #fcfff4;\r\n  background: -webkit-gradient(linear, left top, left bottom, from(#fcfff4), color-stop(40%, #dfe5d7), to(#b3bead));\r\n  background: -webkit-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\r\n  background: -o-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\r\n  background: linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\r\n  -webkit-box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\r\n          box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\r\n  label {\r\n    width: 20px;\r\n    height: 20px;\r\n    position: absolute;\r\n    top: 4px;\r\n    left: 4px;\r\n    cursor: pointer;\r\n    background: -webkit-gradient(linear, left top, left bottom, from(top), color-stop(0%, #222), to(#45484d));\r\n    background: -webkit-linear-gradient(top, #222 0%, #45484d 100%);\r\n    background: -o-linear-gradient(top, #222 0%, #45484d 100%);\r\n    background: linear-gradient(top, #222 0%, #45484d 100%);\r\n    -webkit-box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,1);\r\n            box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,1)\r\n  }\r\n  label:after {\r\n    content: '';\r\n    width: 16px;\r\n    height: 16px;\r\n    position: absolute;\r\n    top: 2px;\r\n    left: 2px;\r\n    background: $activeColor;\r\n    background: -webkit-gradient(linear, left top, left bottom, from($activeColor), to($darkenColor));\r\n    background: -webkit-linear-gradient(top, $activeColor 0%, $darkenColor 100%);\r\n    background: -o-linear-gradient(top, $activeColor 0%, $darkenColor 100%);\r\n    background: linear-gradient(top, $activeColor 0%, $darkenColor 100%);\r\n    -webkit-box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\r\n            box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\r\n    opacity: 0;\r\n  }\r\n  label:hover::after {\r\n    opacity: 0.3;\r\n  }\r\n  input[type=checkbox] {\r\n    visibility: hidden   \r\n  }\r\n  input[type=checkbox]:checked + label:after {\r\n    opacity: 1;\r\n  } \r\n}\r\n\r\nhtml {\r\n  min-height: 100%;\r\n}\r\n\r\nbody {\r\n  min-height: 100vh;\r\n}", "", {"version":3,"sources":["/./routes/serviceprovider/Serviceprovider.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;CAChB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;EACzE,SAAS;EACT,cAAc;CACf;;AAED;EACE,kBAAkB;EAClB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,WAAW;EACX,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;GACG,WAAW;CACb;;AAED;GACG,YAAY;CACd;;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb;;AAED;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,oBAAoB;EACpB,kHAAwE;EAAxE,gFAAwE;EAAxE,2EAAwE;EAAxE,wEAAwE;EACxE,yEAAiE;UAAjE,iEAAiE;EACjE;IACE,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,SAAS;IACT,UAAU;IACV,gBAAgB;IAChB,0GAAwD;IAAxD,gEAAwD;IAAxD,2DAAwD;IAAxD,wDAAwD;IACxD,uFAA+E;YAA/E,8EAA+E;GAgBhF;EAfC;IACE,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,SAAS;IACT,UAAU;IACV,yBAAyB;IACzB,kGAAqE;IAArE,6EAAqE;IAArE,wEAAqE;IAArE,qEAAqE;IACrE,yEAAiE;YAAjE,iEAAiE;IACjE,WAAW;GACZ;EACD;IACE,aAAa;GACd;EAEH;IACE,kBAAmB;GAIpB;EAHC;IACE,WAAW;GACZ;CAEJ;;AAED;EACE,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB","file":"Serviceprovider.css","sourcesContent":[" .root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n  max-height:100x\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.label {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 26px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  size: 15;\r\n  max-width: 30; \r\n}\r\n\r\n.input:focus {\r\n  border-color: red;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 50%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 14px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.leftContainer {\r\n   float:left;\r\n}\r\n\r\n.rightContainer {\r\n   float:right;\r\n}\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n\r\n.squaredOne {\r\n  width: 28px;\r\n  height: 28px;\r\n  position: relative;\r\n  margin: 20px auto;\r\n  background: #fcfff4;\r\n  background: linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\r\n  box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\r\n  label {\r\n    width: 20px;\r\n    height: 20px;\r\n    position: absolute;\r\n    top: 4px;\r\n    left: 4px;\r\n    cursor: pointer;\r\n    background: linear-gradient(top, #222 0%, #45484d 100%);\r\n    box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,1);\r\n    &:after {\r\n      content: '';\r\n      width: 16px;\r\n      height: 16px;\r\n      position: absolute;\r\n      top: 2px;\r\n      left: 2px;\r\n      background: $activeColor;\r\n      background: linear-gradient(top, $activeColor 0%, $darkenColor 100%);\r\n      box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\r\n      opacity: 0;\r\n    }\r\n    &:hover::after {\r\n      opacity: 0.3;\r\n    }\r\n  }\r\n  input[type=checkbox] {\r\n    visibility: hidden;\r\n    &:checked + label:after {\r\n      opacity: 1;\r\n    }   \r\n  } \r\n}\r\n\r\nhtml {\r\n  min-height: 100%;\r\n}\r\n\r\nbody {\r\n  min-height: 100vh;\r\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Serviceprovider_root_3Ll",
  	"container": "Serviceprovider_container_c6Z",
  	"lead": "Serviceprovider_lead_35E",
  	"formGroup": "Serviceprovider_formGroup_3-S",
  	"label": "Serviceprovider_label_15b",
  	"input": "Serviceprovider_input_354",
  	"button": "Serviceprovider_button_vnx",
  	"leftContainer": "Serviceprovider_leftContainer_31v",
  	"rightContainer": "Serviceprovider_rightContainer_2M6",
  	"icon": "Serviceprovider_icon_1-O",
  	"lineThrough": "Serviceprovider_lineThrough_2lM",
  	"squaredOne": "Serviceprovider_squaredOne_5rn"
  };

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(32);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Saveprovider = __webpack_require__(128);
  
  var _Saveprovider2 = _interopRequireDefault(_Saveprovider);
  
  var _Login = __webpack_require__(96);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var request = __webpack_require__(71);
  
  var message = 'Sucessfully Registered. <a href="http://' + _config.apihost + '/login" >Click here to login</a>';
  var status = true;
  /*var fn;
  var ln;
  var address;
  
  var phone;
  var zipcode;
  var type;
  var serve;*/
  
  var email;
  var message = 'Sucessfully Registered. ';
  var href = 'http://' + _config.host + '/providerlogin';
  var message1 = 'Click here to login';
  var password;
  
  exports.default = {
  
    path: '/saveprovider',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var result, savelogin, emailstatus;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Query String: " + (0, _stringify2.default)(query));
                path = '/';
                /*fn = query.firstname;
                console.log(fn);
                ln = query.lname;
                address = query.address;
                zipcode = query.zipcode;
                phone = query.phone;*/
                email = query.email;
  
                _context.next = 5;
                return SaveproviderData(query);
  
              case 5:
                result = _context.sent;
  
                console.log("Status -- SaveproviderData: " + status);
  
                if (!status) {
                  _context.next = 17;
                  break;
                }
  
                _context.next = 10;
                return getPassword();
  
              case 10:
                password = _context.sent;
  
                console.log("Status -- getPassword: " + status);
  
                if (!status) {
                  _context.next = 16;
                  break;
                }
  
                _context.next = 15;
                return saveLogin(password);
  
              case 15:
                savelogin = _context.sent;
  
              case 16:
                emailstatus = sendEmail();
  
              case 17:
                if (!status) {
                  message = 'Error in Provider Data';
                  href = 'http://' + _config.host + '/serviceprovider';
                  message1 = 'Click here to Register';
                }
                return _context.abrupt('return', _react2.default.createElement(_Saveprovider2.default, { message: message, href: href, message1: message1 }));
  
              case 19:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function SaveproviderData(data) {
    var request = __webpack_require__(71);
    //console.log("Inside storePasscode method email: " + email);
    // console.log("Inside storePasscode method Code: " + code);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/addNewProvider';
    console.log("URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: data }, function (error, response, body) {
  
        if (error) return reject(error);
        if (!error && response.statusCode == 200) {
          console.log('Inside SaveproviderData Response from API (body)' + body);
          if (body == 'true') {
            status = true;
          } else {
            console.log("Error in storing customer data");
            status = false;
          }
          resolve(body);
        }
        console.log('returning');
      });
    });
  }
  
  function getPassword() {
    var url = 'http://' + _config.apihost + '/generatePass?length=6';
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('generate Password - Response from API' + body);
          resolve(body);
        } else {
  
          console.log("Get Password - API Server not running: ") + error;
          return reject(error);
        }
      });
    });
  }
  
  function saveLogin(password) {
    var data = { "email": email, "password": password };
    console.log("Data: " + data);
    var url = 'http://' + _config.apihost + '/addlogin';
    //var url = `http://${apihost}/addproviderlogin';
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: data }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('saveLogin Password - Response from API' + body);
          status = true;
          resolve(body);
        } else {
          status = false;
          console.log("Change Password -API Server not running: ") + error;
          return reject(error);
        }
      });
    });
  }
  
  function sendEmail() {
    console.log('calling API - sendEmail');
    var url = 'http://' + _config.apihost + '/sendmail';
    console.log("URL: " + url);
  
    var subject = "Your Registration for our service";
    var message = "<b>Thank you for Register. </b> <br> <b> Assuring best service. Your password for login is: " + password + "<b> ";
    var formdata = {
      tomail: email,
      subject: subject,
      message: message
    };
  
    //data = JSON.stringify('{\"tomail\": \"'+email+'\", \"subject\": '+subject+'\", \"message\": \" '+message+'\"}');
    console.log("Data: " + formdata);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: formdata }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendEmail - Response from API (body)' + body);
  
          if (body == 'true') resolve(body);
          status = true;
        }
        if (error) {
          console.log("Error in Sending Mail");
          status = false;
          return reject(error);
        }
      });
    });
  }

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Saveprovider = __webpack_require__(129);
  
  var _Saveprovider2 = _interopRequireDefault(_Saveprovider);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'New Provider Registration'; /**
                                            * React Starter Kit (https://www.reactstarterkit.com/)
                                            *
                                            * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                            *
                                            * This source code is licensed under the MIT license found in the
                                            * LICENSE.txt file in the root directory of this source tree.
                                            */
  
  function Saveprovider(_ref, context) {
    var message = _ref.message,
        message1 = _ref.message1,
        href = _ref.href;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Saveprovider2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Saveprovider2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          message
        ),
        _react2.default.createElement(
          'a',
          { href: href },
          message1,
          ' '
        )
      )
    );
  }
  
  Saveprovider.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Saveprovider2.default)(Saveprovider);

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(130);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Saveprovider.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Saveprovider.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, " .Saveprovider_root_5OP {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Saveprovider_container_9Qm {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.Saveprovider_lead_3sp {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.Saveprovider_formGroup_3Mj {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.Saveprovider_label_CAg {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.Saveprovider_input_2b_ {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.Saveprovider_input_2b_:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Saveprovider_button_2yF {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.Saveprovider_button_2yF:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.Saveprovider_button_2yF:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.\r\n\r\n.Saveprovider_icon_JKA {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.Saveprovider_lineThrough_VeA {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.Saveprovider_lineThrough_VeA::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.Saveprovider_lineThrough_VeA::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n\r\n#Saveprovider_lastname_2oF{\r\n    max-width:100px;\r\n    float:left;\r\n}\r\n\r\n.Saveprovider_div_2ZK {\r\n  float:right;\r\n}\r\n\r\n#Saveprovider_leftContainer_142 {\r\n   float:left;\r\n}\r\n\r\n#Saveprovider_rightContainer_3H9 {\r\n   float:right;\r\n}", "", {"version":3,"sources":["/./routes/saveprovider/Saveprovider.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;;;EAGE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb;;AACD;IACI,gBAAgB;IAChB,WAAW;CACd;;AAED;EACE,YAAY;CACb;;AAED;GACG,WAAW;CACb;;AAED;GACG,YAAY;CACd","file":"Saveprovider.css","sourcesContent":[" .root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.label {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n#lastname{\r\n    max-width:100px;\r\n    float:left;\r\n}\r\n\r\n.div {\r\n  float:right;\r\n}\r\n\r\n#leftContainer {\r\n   float:left;\r\n}\r\n\r\n#rightContainer {\r\n   float:right;\r\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Saveprovider_root_5OP",
  	"container": "Saveprovider_container_9Qm",
  	"lead": "Saveprovider_lead_3sp",
  	"formGroup": "Saveprovider_formGroup_3Mj",
  	"label": "Saveprovider_label_CAg",
  	"input": "Saveprovider_input_2b_",
  	"button": "Saveprovider_button_2yF",
  	"icon": "Saveprovider_icon_JKA",
  	"lineThrough": "Saveprovider_lineThrough_VeA",
  	"lastname": "Saveprovider_lastname_2oF",
  	"div": "Saveprovider_div_2ZK",
  	"leftContainer": "Saveprovider_leftContainer_142",
  	"rightContainer": "Saveprovider_rightContainer_3H9"
  };

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Booking = __webpack_require__(132);
  
  var _Booking2 = _interopRequireDefault(_Booking);
  
  var _Login = __webpack_require__(65);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/booking',
  
    action: function action(_ref) {
      var _this = this;
  
      var query = _ref.query;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var date, currentdate, sessionid, email, customerrec, customermobile, body, bookingid;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                date = new Date();
                currentdate = date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear();
                sessionid = query.sessionid;
                email = query.email;
                _context.t0 = JSON;
                _context.next = 7;
                return getCustomerRecord(email);
  
              case 7:
                _context.t1 = _context.sent;
                customerrec = _context.t0.parse.call(_context.t0, _context.t1);
  
                console.log("booking Record: " + customerrec);
                customermobile = customerrec[0].phone;
  
                //console.log("Booking Id: "+bookingid);
  
                console.log("Sessionid - index.js - Booking : " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 20;
                  break;
                }
  
                _context.next = 15;
                return getSessionid();
  
              case 15:
                body = _context.sent;
  
                console.log("Sessionid: " + body);
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: body }));
  
              case 20:
                bookingid = Math.floor(1000000 + Math.random() * 9000000);
                return _context.abrupt('return', _react2.default.createElement(_Booking2.default, { sessionid: sessionid, bookingid: bookingid, email: email, phone: customermobile }));
  
              case 22:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function getSessionid() {
    var request = __webpack_require__(71);
    console.log('genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/genSessionid';
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          // sessionid = body;
          resolve(body);
        } else {
  
          console.log("genSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }
  
  function getCustomerRecord(email) {
    var request = __webpack_require__(71);
    console.log('getCustomerRecord - calling API');
    var url = 'http://' + _config.apihost + '/getCustomer?email=' + email;
    console.log("getCustomerRecord - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('getCustomerRecord - linkbooking - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("getCustomerRecord - linkbooking -API Server not running: " + error);
          return reject(error);
        }
        console.log("getCustomerRecord - Returning from API call");
      });
    });
  }

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Booking = __webpack_require__(133);
  
  var _Booking2 = _interopRequireDefault(_Booking);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'New Event Booking';
  
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var currentdate = day + '/' + month + '/' + year;
  
  function Booking(_ref, context) {
    var sessionid = _ref.sessionid,
        bookingid = _ref.bookingid,
        email = _ref.email,
        phone = _ref.phone;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Booking2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Booking2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'put', action: 'savebooking' },
          _react2.default.createElement(
            'div',
            { className: _Booking2.default.leftContainer },
            _react2.default.createElement('input', { id: 'status', type: 'hidden', value: 'booked', name: 'status' }),
            _react2.default.createElement(
              'label',
              { className: _Booking2.default.label, htmlFor: 'dateofbooking' },
              'Date of Booking:'
            ),
            _react2.default.createElement('input', {
              className: _Booking2.default.input,
              id: 'dateofbooking',
              type: 'text',
              name: 'dateofbooking',
              value: currentdate,
              autoFocus: true,
              readOnly: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Booking2.default.label, htmlFor: 'eventdate' },
              _react2.default.createElement(
                'span',
                null,
                'Event Date: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Booking2.default.input,
              id: 'functiondate',
              type: 'date',
              name: 'functiondate',
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'label',
              { className: _Booking2.default.label, htmlFor: 'email' },
              _react2.default.createElement(
                'span',
                null,
                'E-mail: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Booking2.default.input,
              id: 'email',
              type: 'email',
              name: 'email',
              value: email,
              readOnly: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Booking2.default.label, htmlFor: 'mobile' },
              _react2.default.createElement(
                'span',
                null,
                'Mobile Number: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Booking2.default.input,
              id: 'mobile',
              type: 'number',
              name: 'mobile',
              value: phone,
              readOnly: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Booking2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Booking2.default.label, htmlFor: 'catering' },
              'Need Catering:'
            ),
            _react2.default.createElement('input', {
              className: _Booking2.default.squaredOne,
              id: 'catering',
              type: 'checkbox',
              name: 'catering'
  
            }),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'label',
              { className: _Booking2.default.label, htmlFor: 'Travel' },
              'Need Travel Arrangment:'
            ),
            _react2.default.createElement('input', {
              className: _Booking2.default.squaredOne,
              id: 'travel',
              type: 'checkbox',
              name: 'travel'
  
            })
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'label',
              { className: _Booking2.default.label, htmlFor: 'Function' },
              _react2.default.createElement(
                'span',
                null,
                'Function: '
              )
            ),
            _react2.default.createElement(
              'select',
              { name: 'eventtype' },
              _react2.default.createElement(
                'option',
                { value: 'House Warming' },
                'House Warming'
              ),
              _react2.default.createElement(
                'option',
                { value: 'Ayush  Homam' },
                'Ayush  Homam'
              ),
              _react2.default.createElement(
                'option',
                { value: '60th Birthday' },
                '60th Birthday'
              ),
              _react2.default.createElement(
                'option',
                { value: '80th Birthday' },
                '80th Birthday'
              )
            ),
            _react2.default.createElement('input', {
              id: 'sessionid',
              type: 'hidden',
              name: 'sessionid',
              value: sessionid
            }),
            _react2.default.createElement('input', {
              id: 'bookingid',
              type: 'hidden',
              name: 'bookingid',
              value: bookingid
            }),
            _react2.default.createElement('input', {
              id: 'bookingtype',
              type: 'hidden',
              name: 'bookingtype',
              value: 'Pooja'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Booking2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _Booking2.default.button, value: 'submit', type: 'submit' },
              'Book Event'
            )
          )
        )
      )
    );
  }
  
  Booking.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Booking2.default)(Booking);

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(134);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Booking.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Booking.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, " .Booking_root_16d {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Booking_container_3w7 {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.Booking_lead_oXi {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.Booking_formGroup_1Wc {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.Booking_label_yqN {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.Booking_input_b9l {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  size: 15;\r\n  max-width: 30; \r\n  \r\n}\r\n\r\n.Booking_input_b9l:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Booking_button_1QB {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #483288;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor:  pointer;\r\n}\r\n\r\n.Booking_button_1QB:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.Booking_button_1QB:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Booking_leftContainer_3QX {\r\n   float:left;\r\n}\r\n\r\n.Booking_rightContainer_35N {\r\n   float:right;\r\n}\r\n\r\n.Booking_icon_1b7 {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.Booking_lineThrough_SuZ {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.Booking_lineThrough_SuZ::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.Booking_lineThrough_SuZ::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n\r\n#Booking_lastname_1vn{\r\n    max-width:100px;\r\n    float:left;\r\n}\r\n\r\n.Booking_squaredOne_2tF {\r\n  width: 28px;\r\n  height: 28px;\r\n  position: relative;\r\n  margin: 20px auto;\r\n  background: #fcfff4;\r\n  background: -webkit-gradient(linear, left top, left bottom, from(#fcfff4), color-stop(40%, #dfe5d7), to(#b3bead));\r\n  background: -webkit-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\r\n  background: -o-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\r\n  background: linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\r\n  -webkit-box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\r\n          box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\r\n  label {\r\n    width: 20px;\r\n    height: 20px;\r\n    position: absolute;\r\n    top: 4px;\r\n    left: 4px;\r\n    cursor: pointer;\r\n    background: -webkit-gradient(linear, left top, left bottom, from(top), color-stop(0%, #222), to(#45484d));\r\n    background: -webkit-linear-gradient(top, #222 0%, #45484d 100%);\r\n    background: -o-linear-gradient(top, #222 0%, #45484d 100%);\r\n    background: linear-gradient(top, #222 0%, #45484d 100%);\r\n    -webkit-box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,1);\r\n            box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,1)\r\n  }\r\n  label:after {\r\n    content: '';\r\n    width: 16px;\r\n    height: 16px;\r\n    position: absolute;\r\n    top: 2px;\r\n    left: 2px;\r\n    background: $activeColor;\r\n    background: -webkit-gradient(linear, left top, left bottom, from($activeColor), to($darkenColor));\r\n    background: -webkit-linear-gradient(top, $activeColor 0%, $darkenColor 100%);\r\n    background: -o-linear-gradient(top, $activeColor 0%, $darkenColor 100%);\r\n    background: linear-gradient(top, $activeColor 0%, $darkenColor 100%);\r\n    -webkit-box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\r\n            box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\r\n    opacity: 0;\r\n  }\r\n  label:hover::after {\r\n    opacity: 0.3;\r\n  }\r\n  input[type=checkbox] {\r\n    visibility: hidden   \r\n  }\r\n  input[type=checkbox]:checked + label:after {\r\n    opacity: 1;\r\n  } \r\n}", "", {"version":3,"sources":["/./routes/booking/Booking.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;EACzE,SAAS;EACT,cAAc;;CAEf;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,iBAAiB;CAClB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;GACG,WAAW;CACb;;AAED;GACG,YAAY;CACd;;AAGD;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb;;AACD;IACI,gBAAgB;IAChB,WAAW;CACd;;AAED;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,oBAAoB;EACpB,kHAAwE;EAAxE,gFAAwE;EAAxE,2EAAwE;EAAxE,wEAAwE;EACxE,yEAAiE;UAAjE,iEAAiE;EACjE;IACE,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,SAAS;IACT,UAAU;IACV,gBAAgB;IAChB,0GAAwD;IAAxD,gEAAwD;IAAxD,2DAAwD;IAAxD,wDAAwD;IACxD,uFAA+E;YAA/E,8EAA+E;GAgBhF;EAfC;IACE,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,SAAS;IACT,UAAU;IACV,yBAAyB;IACzB,kGAAqE;IAArE,6EAAqE;IAArE,wEAAqE;IAArE,qEAAqE;IACrE,yEAAiE;YAAjE,iEAAiE;IACjE,WAAW;GACZ;EACD;IACE,aAAa;GACd;EAEH;IACE,kBAAmB;GAIpB;EAHC;IACE,WAAW;GACZ;CAEJ","file":"Booking.css","sourcesContent":[" .root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.label {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  size: 15;\r\n  max-width: 30; \r\n  \r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #483288;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor:  pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.leftContainer {\r\n   float:left;\r\n}\r\n\r\n.rightContainer {\r\n   float:right;\r\n}\r\n\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n#lastname{\r\n    max-width:100px;\r\n    float:left;\r\n}\r\n\r\n.squaredOne {\r\n  width: 28px;\r\n  height: 28px;\r\n  position: relative;\r\n  margin: 20px auto;\r\n  background: #fcfff4;\r\n  background: linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\r\n  box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\r\n  label {\r\n    width: 20px;\r\n    height: 20px;\r\n    position: absolute;\r\n    top: 4px;\r\n    left: 4px;\r\n    cursor: pointer;\r\n    background: linear-gradient(top, #222 0%, #45484d 100%);\r\n    box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,1);\r\n    &:after {\r\n      content: '';\r\n      width: 16px;\r\n      height: 16px;\r\n      position: absolute;\r\n      top: 2px;\r\n      left: 2px;\r\n      background: $activeColor;\r\n      background: linear-gradient(top, $activeColor 0%, $darkenColor 100%);\r\n      box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\r\n      opacity: 0;\r\n    }\r\n    &:hover::after {\r\n      opacity: 0.3;\r\n    }\r\n  }\r\n  input[type=checkbox] {\r\n    visibility: hidden;\r\n    &:checked + label:after {\r\n      opacity: 1;\r\n    }   \r\n  } \r\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Booking_root_16d",
  	"container": "Booking_container_3w7",
  	"lead": "Booking_lead_oXi",
  	"formGroup": "Booking_formGroup_1Wc",
  	"label": "Booking_label_yqN",
  	"input": "Booking_input_b9l",
  	"button": "Booking_button_1QB",
  	"leftContainer": "Booking_leftContainer_3QX",
  	"rightContainer": "Booking_rightContainer_35N",
  	"icon": "Booking_icon_1b7",
  	"lineThrough": "Booking_lineThrough_SuZ",
  	"lastname": "Booking_lastname_1vn",
  	"squaredOne": "Booking_squaredOne_2tF"
  };

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(32);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Savebooking = __webpack_require__(136);
  
  var _Savebooking2 = _interopRequireDefault(_Savebooking);
  
  var _Providerlist = __webpack_require__(76);
  
  var _Providerlist2 = _interopRequireDefault(_Providerlist);
  
  var _Login = __webpack_require__(96);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var request = __webpack_require__(71);
  
  var message = 'Booking done Sucessfully  ';
  var href = 'http://' + _config.host + '/';
  var message1 = 'Click here to login';
  var status = true;
  var email;
  var phone;
  var bookingid;
  var providerlist;
  var sessionid;
  var bookingtype;
  
  exports.default = {
  
    path: '/savebooking',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var sessionbody, body;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Query String - index.js - Savebooking: " + (0, _stringify2.default)(query));
                phone = query.mobile;
                email = query.email;
                bookingtype = query.bookingtype;
                console.log("Bookingtype: " + bookingtype);
                console.log("Email: " + email);
                sessionid = query.sessionid;
                bookingid = query.bookingid;
                console.log("Sessionid - index.js - Savebooking " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 14;
                  break;
                }
  
                _context.next = 12;
                return getSessionid();
  
              case 12:
                sessionbody = _context.sent;
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: sessionbody }));
  
              case 14:
                _context.next = 16;
                return SavebookingData(query);
  
              case 16:
                body = _context.sent;
  
                console.log("Calling SendEmail");
                //var mail = await sendEmail();
                console.log("Calling sendSMS");
                // var sms = await sendSMS();
                console.log("Body: " + body);
  
                if (status) {
                  _context.next = 27;
                  break;
                }
  
                message = 'Unable to book the Event';
                href = 'http://' + _config.host + '/booking';
                message1 = 'Click here to Register.';
                return _context.abrupt('return', _react2.default.createElement(_Savebooking2.default, { message: message, redirectlink: href, message1: message1, sessionid: sessionid }));
  
              case 27:
                _context.next = 29;
                return getProviderData();
  
              case 29:
                providerlist = _context.sent;
  
                console.log("Service Provider List: " + providerlist);
                return _context.abrupt('return', _react2.default.createElement(_Providerlist2.default, { providerlist: providerlist, customeremail: email, sessionid: sessionid, bookingid: bookingid }));
  
              case 32:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function SavebookingData(data) {
  
    console.log('calling API - SavebookingData method');
    var url = 'http://' + _config.apihost + '/newBooking';
    console.log("URL: " + url);
    delete data.bookingtype;
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: data }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside SavebookingData Response from API (body)' + body);
  
          if (body == 'true') status = true;
          resolve(body);
          //sendSMS();
          //var result = await sendEmail();
        }
        if (error) {
          console.log("Error in storing customer data");
          status = false;
          return reject(error);
        }
      });
  
      console.log('returning');
    });
  }
  
  function sendSMS() {
    console.log('calling API - sendSMS method');
  
    var url = 'http://' + _config.apihost + '/sendSMS?authkey=' + _config.smsAPIKey + '&mobiles=' + phone + '&message=' + _config.SMSmessage + '&sender=DTSBMF&route=4&country=91';
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendSMS - Response from API (body)' + body);
  
          if (error) {
            console.log("Error in Sending SMS");
            status = false;
            return reject(error);
          }
  
          if (body == 'true') status = true;
          resolve(body);
        }
      });
    });
  }
  
  function sendEmail() {
    console.log('calling API - sendEmail');
    var url = 'http://' + _config.apihost + '/sendmail';
    console.log("URL: " + url);
  
    var subject = "Your booking for the event in BMY";
    var message = "<b>Thank you for booking and service provider will get in touch shortly. </b> <br> <b> Your Booking id is <b> " + bookingid;
    var formdata = {
      tomail: email,
      subject: subject,
      message: message
    };
  
    //data = JSON.stringify('{\"tomail\": \"'+email+'\", \"subject\": '+subject+'\", \"message\": \" '+message+'\"}');
    console.log("Data: " + formdata);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: formdata }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendEmail - Response from API (body)' + body);
  
          if (body == 'true') resolve(body);
          status = true;
        }
        if (error) {
          console.log("Error in Sending Mail");
          status = false;
          return reject(error);
        }
      });
    });
  }
  
  function getProviderData() {
    var request = __webpack_require__(71);
  
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/searchByType?servicetype=' + bookingtype;
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          //console.log('Inside getProviderData Response from API (body)' + body);
          providerlist = body;
          //console.log("Providerlist: "+providerlist);
          resolve(body);
        } else {
          return reject(body);
        }
      });
    });
  }
  
  function getSessionid() {
    var request = __webpack_require__(71);
    console.log('genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/genSessionid';
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("genSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Savebooking = __webpack_require__(137);
  
  var _Savebooking2 = _interopRequireDefault(_Savebooking);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'New Booking'; /**
                              * React Starter Kit (https://www.reactstarterkit.com/)
                              *
                              * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                              *
                              * This source code is licensed under the MIT license found in the
                              * LICENSE.txt file in the root directory of this source tree.
                              */
  
  function Savebooking(_ref, context) {
    var message = _ref.message,
        redirectlink = _ref.redirectlink,
        message1 = _ref.message1,
        sessionid = _ref.sessionid;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Savebooking2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Savebooking2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          message
        ),
        _react2.default.createElement(
          'a',
          { href: redirectlink },
          message1,
          ' '
        ),
        _react2.default.createElement('input', {
          id: 'sessionid',
          type: 'hidden',
          name: 'sessionid',
          value: sessionid
        })
      )
    );
  }
  
  Savebooking.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Savebooking2.default)(Savebooking);

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(138);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Savebooking.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Savebooking.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, " .Savebooking_root_1qY {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Savebooking_container_2d_ {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.Savebooking_lead_1N_ {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.Savebooking_formGroup_-cl {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.Savebooking_label_2o3 {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.Savebooking_input_TmP {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.Savebooking_input_TmP:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Savebooking_button_1_L {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.Savebooking_button_1_L:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.Savebooking_button_1_L:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Savebooking_icon_hHj {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.Savebooking_lineThrough_LPA {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.Savebooking_lineThrough_LPA::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.Savebooking_lineThrough_LPA::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n\r\n#Savebooking_lastname_3wM{\r\n    max-width:100px;\r\n    float:left;\r\n}\r\n\r\n.Savebooking_div_33s {\r\n  float:right;\r\n}\r\n\r\n#Savebooking_leftContainer_2Oo {\r\n   float:left;\r\n}\r\n\r\n#Savebooking_rightContainer_2aP {\r\n   float:right;\r\n}", "", {"version":3,"sources":["/./routes/savebooking/Savebooking.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAID;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb;;AACD;IACI,gBAAgB;IAChB,WAAW;CACd;;AAED;EACE,YAAY;CACb;;AAED;GACG,WAAW;CACb;;AAED;GACG,YAAY;CACd","file":"Savebooking.css","sourcesContent":[" .root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.label {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n#lastname{\r\n    max-width:100px;\r\n    float:left;\r\n}\r\n\r\n.div {\r\n  float:right;\r\n}\r\n\r\n#leftContainer {\r\n   float:left;\r\n}\r\n\r\n#rightContainer {\r\n   float:right;\r\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Savebooking_root_1qY",
  	"container": "Savebooking_container_2d_",
  	"lead": "Savebooking_lead_1N_",
  	"formGroup": "Savebooking_formGroup_-cl",
  	"label": "Savebooking_label_2o3",
  	"input": "Savebooking_input_TmP",
  	"button": "Savebooking_button_1_L",
  	"icon": "Savebooking_icon_hHj",
  	"lineThrough": "Savebooking_lineThrough_LPA",
  	"lastname": "Savebooking_lastname_3wM",
  	"div": "Savebooking_div_33s",
  	"leftContainer": "Savebooking_leftContainer_2Oo",
  	"rightContainer": "Savebooking_rightContainer_2aP"
  };

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _providerlogin = __webpack_require__(140);
  
  var _providerlogin2 = _interopRequireDefault(_providerlogin);
  
  var _util = __webpack_require__(70);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var sessionid = '';
  
  exports.default = {
  
    path: '/providerlogin',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var message;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _util.getSessionid)();
  
              case 2:
                sessionid = _context.sent;
                message = ' ';
  
                console.log("SessionId-Login: " + sessionid);
                return _context.abrupt('return', _react2.default.createElement(_providerlogin2.default, { sessionid: sessionid, message: message }));
  
              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = __webpack_require__(66);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Providerlogin = __webpack_require__(141);
  
  var _Providerlogin2 = _interopRequireDefault(_Providerlogin);
  
  var _Link = __webpack_require__(39);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Entering Credentials';
  
  function Providerlogin(_ref, context) {
    var sessionid = _ref.sessionid,
        message = _ref.message;
  
    console.log("ProviderLogin.js-SessionId: " + sessionid);
    context.setTitle(title);
  
    return _react2.default.createElement(
      'div',
      { className: _Providerlogin2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Providerlogin2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          { className: _Providerlogin2.default.lead },
          'Log in with your username or email address.'
        ),
        _react2.default.createElement(
          'div',
          { className: _Providerlogin2.default.formGroup },
          _react2.default.createElement(
            'form',
            { name: 'form1', method: 'get', action: 'verifyproviderlogin' },
            _react2.default.createElement(
              'div',
              { className: _Providerlogin2.default.formGroup },
              _react2.default.createElement(
                'label',
                { className: _Providerlogin2.default.label, htmlFor: 'usernameOrEmail' },
                'Username or email address:'
              ),
              _react2.default.createElement('input', {
                className: _Providerlogin2.default.input,
                id: 'email',
                type: 'email',
                name: 'email',
                required: 'required',
                autoFocus: true
              })
            ),
            _react2.default.createElement(
              'div',
              { className: _Providerlogin2.default.formGroup },
              _react2.default.createElement(
                'label',
                { className: _Providerlogin2.default.label, htmlFor: 'password' },
                'Password:'
              ),
              _react2.default.createElement('input', {
                className: _Providerlogin2.default.input,
                id: 'password',
                type: 'password',
                name: 'password',
                required: 'required'
              }),
              _react2.default.createElement(
                'p',
                { className: _Providerlogin2.default.p },
                _react2.default.createElement(
                  'b',
                  null,
                  ' ',
                  message
                ),
                ' '
              ),
              _react2.default.createElement('input', {
                id: 'sessionid',
                type: 'hidden',
                name: 'sessionid',
                value: sessionid
              })
            ),
            _react2.default.createElement(
              'div',
              { className: _Providerlogin2.default.formGroup },
              _react2.default.createElement(
                'button',
                { className: _Providerlogin2.default.button1, type: 'submit' },
                'Log in'
              ),
              _react2.default.createElement(
                _Link2.default,
                { to: '/providerforgotpass' },
                'Forgot Password'
              ),
              _react2.default.createElement(
                'span',
                { className: _Providerlogin2.default.spacer },
                ' | '
              ),
              _react2.default.createElement(
                _Link2.default,
                { to: '/serviceprovider' },
                'Sign Up'
              )
            )
          )
        )
      )
    );
  }
  
  Providerlogin.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Providerlogin2.default)(Providerlogin);

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(142);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Providerlogin.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Providerlogin.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n\r\n.Providerlogin_root_2kF {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Providerlogin_container_20Q {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n  max-height: 580px\r\n}\r\n\r\n.Providerlogin_lead_3Nd {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.Providerlogin_formGroup_lA5 {\r\n  margin-bottom: 15px;\r\n}\r\n\r\n.Providerlogin_p_2KA {\r\n  color: red;\r\n}\r\n\r\n.Providerlogin_label_15r {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n.Providerlogin_input_2Ay {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 26px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 0;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.Providerlogin_input_2Ay:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Providerlogin_button_2il {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 80%;\r\n  outline: 10;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.Providerlogin_button1_120 {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 50%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373388;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 14px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.Providerlogin_button_2il:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.Providerlogin_button_2il:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Providerlogin_facebook_1jW {\r\n  border-color: #3b5998;\r\n  background: #3b5998;\r\n}\r\n\r\n.Providerlogin_facebook_1jW:hover {\r\n  background: #2d4373;\r\n}\r\n\r\n.Providerlogin_google_1Ct {\r\n  border-color: #dd4b39;\r\n  background: #dd4b39;\r\n}\r\n\r\n.Providerlogin_google_1Ct:hover {\r\n  background: #c23321;\r\n}\r\n\r\n.Providerlogin_twitter_3bX {\r\n  border-color: #55acee;\r\n  background: #55acee;\r\n}\r\n\r\n.Providerlogin_twitter_3bX:hover {\r\n  background: #2795e9;\r\n}\r\n\r\n.Providerlogin_icon_3e1 {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.Providerlogin_lineThrough_1ur {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.Providerlogin_lineThrough_1ur::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.Providerlogin_lineThrough_1ur::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/providerlogin/Providerlogin.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;EACjB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,WAAW;CACZ;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,iBAAiB;EACjB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,WAAW;EACX,YAAY;EACZ,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AACD;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,WAAW;EACX,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"Providerlogin.css","sourcesContent":["\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n","\r\n@import '../../components/variables.css';\r\n\r\n.root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n  max-height: 580px\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 15px;\r\n}\r\n\r\n.p {\r\n  color: red;\r\n}\r\n\r\n.label {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 26px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 0;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 80%;\r\n  outline: 10;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n.button1 {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 50%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373388;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 14px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.facebook {\r\n  border-color: #3b5998;\r\n  background: #3b5998;\r\n  composes: button;\r\n}\r\n\r\n.facebook:hover {\r\n  background: #2d4373;\r\n}\r\n\r\n.google {\r\n  border-color: #dd4b39;\r\n  background: #dd4b39;\r\n  composes: button;\r\n}\r\n\r\n.google:hover {\r\n  background: #c23321;\r\n}\r\n\r\n.twitter {\r\n  border-color: #55acee;\r\n  background: #55acee;\r\n  composes: button;\r\n}\r\n\r\n.twitter:hover {\r\n  background: #2795e9;\r\n}\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Providerlogin_root_2kF",
  	"container": "Providerlogin_container_20Q",
  	"lead": "Providerlogin_lead_3Nd",
  	"formGroup": "Providerlogin_formGroup_lA5",
  	"p": "Providerlogin_p_2KA",
  	"label": "Providerlogin_label_15r",
  	"input": "Providerlogin_input_2Ay",
  	"button": "Providerlogin_button_2il",
  	"button1": "Providerlogin_button1_120",
  	"facebook": "Providerlogin_facebook_1jW Providerlogin_button_2il",
  	"google": "Providerlogin_google_1Ct Providerlogin_button_2il",
  	"twitter": "Providerlogin_twitter_3bX Providerlogin_button_2il",
  	"icon": "Providerlogin_icon_3e1",
  	"lineThrough": "Providerlogin_lineThrough_1ur"
  };

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Providerforgotpass = __webpack_require__(144);
  
  var _Providerforgotpass2 = _interopRequireDefault(_Providerforgotpass);
  
  var _Providerlogin = __webpack_require__(147);
  
  var _Providerlogin2 = _interopRequireDefault(_Providerlogin);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var request = __webpack_require__(71);
  
  var status = 'false';
  var errormessage = '';
  //var user;
  
  exports.default = {
  
    path: '/providerforgotpass',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var email, validlogin, code, body, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = query.email;
                // user = query.user;
  
                console.log("Email ID:" + email);
                // console.log("User: "+user);
  
                if (!(typeof email === 'undefined')) {
                  _context.next = 6;
                  break;
                }
  
                return _context.abrupt('return', _react2.default.createElement(_Providerforgotpass2.default, null));
  
              case 6:
                _context.next = 8;
                return checkLogin(email);
  
              case 8:
                validlogin = _context.sent;
  
                console.log("ValidLogin:" + validlogin);
  
                if (!(validlogin == 'true')) {
                  _context.next = 20;
                  break;
                }
  
                code = passwordCode(6);
  
                console.log("Passcode: " + code);
                _context.next = 15;
                return sendEmail(email, code);
  
              case 15:
                body = _context.sent;
  
                if (!(body == 'true')) {
                  _context.next = 20;
                  break;
                }
  
                _context.next = 19;
                return storePasscode(email, code);
  
              case 19:
                result = _context.sent;
  
              case 20:
                console.log("Status: " + status);
  
                if (!(status == true)) {
                  _context.next = 26;
                  break;
                }
  
                console.log("Redirected to Login Page");
                return _context.abrupt('return', _react2.default.createElement(_Providerlogin2.default, null));
  
              case 26:
                console.log("Error in Reseting password request");
                return _context.abrupt('return', _react2.default.createElement(_Providerforgotpass2.default, { errormessage: errormessage }));
  
              case 28:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function sendEmail(email, code) {
    console.log('calling API - sendEmail');
    var url = 'http://' + _config.apihost + '/sendmail';
    console.log("URL: " + url);
  
    var subject = "Your Password Reset";
    var href = 'http://' + _config.host + '/providerchangepassword?code=' + code + '&userEmail=' + email;
    console.log("Href: " + href);
    var message = '<b>We received your request for password Reset. <a href="' + href + '" >Click here to reset password</a> ';
    var formdata = {
      tomail: email,
      subject: subject,
      message: message
    };
  
    console.log("Data: " + formdata);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: formdata }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendEmail - Response from API (body)' + body);
  
          if (body == 'true') status = true;else status = false;
          resolve(body);
        } else if (error) {
          console.log("Error in Sending Mail");
          status = false;
          return reject(error);
        }
      });
    });
  }
  
  function passwordCode(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
      var i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
    }
    return pass;
  }
  
  function storePasscode(email, code) {
  
    console.log("Inside storePasscode method email: " + email);
    console.log("Inside storePasscode method Code: " + code);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/storePasscode';
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: { email: email, code: code } }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside StorePasscode Response from API (body)' + body);
  
          if (body == 'true') status = true;
          resolve(body);
        } else {
          console.log("Error in storing passcode");
          status = false;
          return reject(error);
        }
      });
    });
  }
  
  function checkLogin(email) {
  
    console.log('calling API');
  
    var url = 'http://' + _config.apihost + '/checkemail?email=' + email;
    console.log("URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Response from API: ' + body);
          if (body == 'true') status = true;
          resolve(body);
        } else {
          status = 'false';
          console.log("API Server not running: " + error);
          return reject(error);
        }
        console.log('Returning');
      });
    });
  }

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Providerforgotpass = __webpack_require__(145);
  
  var _Providerforgotpass2 = _interopRequireDefault(_Providerforgotpass);
  
  var _Link = __webpack_require__(39);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Changing Provider Password';
  
  function Providerforgotpass(props, context) {
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Providerforgotpass2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Providerforgotpass2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'put', action: 'providerforgotpass' },
          _react2.default.createElement(
            'div',
            { className: _Providerforgotpass2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Providerforgotpass2.default.label, htmlFor: 'email' },
              'Email:'
            ),
            _react2.default.createElement('input', {
              className: _Providerforgotpass2.default.input,
              id: 'email',
              type: 'email',
              name: 'email',
              placeholder: 'Enter E-mail',
              required: 'required'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Providerforgotpass2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _Providerforgotpass2.default.button, type: 'submit' },
              'Send Reset Email'
            )
          )
        )
      )
    );
  }
  
  Providerforgotpass.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Providerforgotpass2.default)(Providerforgotpass);

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(146);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Providerforgotpass.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Providerforgotpass.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n\r\n.Providerforgotpass_root_grr {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Providerforgotpass_container_1G4 {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.Providerforgotpass_lead_71y {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.Providerforgotpass_formGroup_2IW {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.Providerforgotpass_label_3Ln {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n.Providerforgotpass_input_3Iq {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.Providerforgotpass_input_3Iq:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Providerforgotpass_button_1XQ {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.Providerforgotpass_button_1XQ:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.Providerforgotpass_button_1XQ:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Providerforgotpass_facebook_37u {\r\n  border-color: #3b5998;\r\n  background: #3b5998;\r\n}\r\n\r\n.Providerforgotpass_facebook_37u:hover {\r\n  background: #2d4373;\r\n}\r\n\r\n.Providerforgotpass_google_20Z {\r\n  border-color: #dd4b39;\r\n  background: #dd4b39;\r\n}\r\n\r\n.Providerforgotpass_google_20Z:hover {\r\n  background: #c23321;\r\n}\r\n\r\n.Providerforgotpass_twitter_311 {\r\n  border-color: #55acee;\r\n  background: #55acee;\r\n}\r\n\r\n.Providerforgotpass_twitter_311:hover {\r\n  background: #2795e9;\r\n}\r\n\r\n.Providerforgotpass_icon_qg2 {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.Providerforgotpass_lineThrough_3Y6 {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.Providerforgotpass_lineThrough_3Y6::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.Providerforgotpass_lineThrough_3Y6::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/providerforgotpass/Providerforgotpass.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"Providerforgotpass.css","sourcesContent":["\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n","\r\n@import '../../components/variables.css';\r\n\r\n.root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.label {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.facebook {\r\n  border-color: #3b5998;\r\n  background: #3b5998;\r\n  composes: button;\r\n}\r\n\r\n.facebook:hover {\r\n  background: #2d4373;\r\n}\r\n\r\n.google {\r\n  border-color: #dd4b39;\r\n  background: #dd4b39;\r\n  composes: button;\r\n}\r\n\r\n.google:hover {\r\n  background: #c23321;\r\n}\r\n\r\n.twitter {\r\n  border-color: #55acee;\r\n  background: #55acee;\r\n  composes: button;\r\n}\r\n\r\n.twitter:hover {\r\n  background: #2795e9;\r\n}\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Providerforgotpass_root_grr",
  	"container": "Providerforgotpass_container_1G4",
  	"lead": "Providerforgotpass_lead_71y",
  	"formGroup": "Providerforgotpass_formGroup_2IW",
  	"label": "Providerforgotpass_label_3Ln",
  	"input": "Providerforgotpass_input_3Iq",
  	"button": "Providerforgotpass_button_1XQ",
  	"facebook": "Providerforgotpass_facebook_37u Providerforgotpass_button_1XQ",
  	"google": "Providerforgotpass_google_20Z Providerforgotpass_button_1XQ",
  	"twitter": "Providerforgotpass_twitter_311 Providerforgotpass_button_1XQ",
  	"icon": "Providerforgotpass_icon_qg2",
  	"lineThrough": "Providerforgotpass_lineThrough_3Y6"
  };

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactDom = __webpack_require__(66);
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Providerlogin = __webpack_require__(141);
  
  var _Providerlogin2 = _interopRequireDefault(_Providerlogin);
  
  var _Link = __webpack_require__(39);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Entering Credentials';
  
  function Providerlogin(_ref, context) {
    var sessionid = _ref.sessionid,
        message = _ref.message;
  
    console.log("ProviderLogin.js-SessionId: " + sessionid);
    context.setTitle(title);
  
    return _react2.default.createElement(
      'div',
      { className: _Providerlogin2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Providerlogin2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          { className: _Providerlogin2.default.lead },
          'Log in with your username or email address.'
        ),
        _react2.default.createElement(
          'div',
          { className: _Providerlogin2.default.formGroup },
          _react2.default.createElement(
            'form',
            { name: 'form1', method: 'get', action: 'verifyproviderlogin' },
            _react2.default.createElement(
              'div',
              { className: _Providerlogin2.default.formGroup },
              _react2.default.createElement(
                'label',
                { className: _Providerlogin2.default.label, htmlFor: 'usernameOrEmail' },
                'Username or email address:'
              ),
              _react2.default.createElement('input', {
                className: _Providerlogin2.default.input,
                id: 'email',
                type: 'email',
                name: 'email',
                required: 'required',
                autoFocus: true
              })
            ),
            _react2.default.createElement(
              'div',
              { className: _Providerlogin2.default.formGroup },
              _react2.default.createElement(
                'label',
                { className: _Providerlogin2.default.label, htmlFor: 'password' },
                'Password:'
              ),
              _react2.default.createElement('input', {
                className: _Providerlogin2.default.input,
                id: 'password',
                type: 'password',
                name: 'password',
                required: 'required'
              }),
              _react2.default.createElement(
                'p',
                { className: _Providerlogin2.default.p },
                _react2.default.createElement(
                  'b',
                  null,
                  ' ',
                  message
                ),
                ' '
              ),
              _react2.default.createElement('input', {
                id: 'sessionid',
                type: 'hidden',
                name: 'sessionid',
                value: sessionid
              })
            ),
            _react2.default.createElement(
              'div',
              { className: _Providerlogin2.default.formGroup },
              _react2.default.createElement(
                'button',
                { className: _Providerlogin2.default.button1, type: 'submit' },
                'Log in'
              ),
              _react2.default.createElement(
                _Link2.default,
                { to: '/providerforgotpass' },
                'Forgot Password'
              ),
              _react2.default.createElement(
                'span',
                { className: _Providerlogin2.default.spacer },
                ' | '
              ),
              _react2.default.createElement(
                _Link2.default,
                { to: '/serviceprovider' },
                'Sign Up'
              )
            )
          )
        )
      )
    );
  }
  
  Providerlogin.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Providerlogin2.default)(Providerlogin);

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Providerchangepassword = __webpack_require__(149);
  
  var _Providerchangepassword2 = _interopRequireDefault(_Providerchangepassword);
  
  var _Providerlogin = __webpack_require__(147);
  
  var _Providerlogin2 = _interopRequireDefault(_Providerlogin);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var status = false;
  
  exports.default = {
  
    path: '/providerchangepassword',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var email, code, startdate, body, enddate, difftime;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = query.userEmail;
                code = query.code;
  
                console.log("Email ID:" + email);
                startdate = new Date();
                _context.next = 6;
                return checkCode(code, email);
  
              case 6:
                body = _context.sent;
                enddate = new Date();
                difftime = enddate.getTime() - startdate.getTime();
  
                console.log("Execution Time:" + difftime);
  
                if (!status) {
                  _context.next = 14;
                  break;
                }
  
                return _context.abrupt('return', _react2.default.createElement(_Providerchangepassword2.default, { email: email, passCode: code }));
  
              case 14:
                return _context.abrupt('return', _react2.default.createElement(_Providerlogin2.default, null));
  
              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function checkCode(code, email) {
    var request = __webpack_require__(71);
    console.log('Check Code - calling API');
    var url = 'http://' + _config.apihost + '/getCode?code=' + code + '&userEmail=' + email;
    console.log("Checkcode - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Checkcode - Response from API' + body);
  
          if (body == 'true') status = true;else status = false;
          resolve(body);
        } else {
          status = false;
          console.log("checkCode -API Server not running: " + error);
          return reject(error);
        }
        console.log("Checkecode - Returning from API call");
      });
    });
  }

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _providerchangepassword = __webpack_require__(150);
  
  var _providerchangepassword2 = _interopRequireDefault(_providerchangepassword);
  
  var _Link = __webpack_require__(39);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Changing Password';
  
  function Changepassword(_ref, context) {
    var email = _ref.email,
        passCode = _ref.passCode,
        message = _ref.message;
  
    console.log("Changepassword: " + email);
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _providerchangepassword2.default.root },
      _react2.default.createElement(
        'div',
        { className: _providerchangepassword2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement('script', { type: 'text/javascript', src: '../scripts/passwordmatch.js' }),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'put', action: 'updateproviderpass' },
          _react2.default.createElement(
            'div',
            { className: _providerchangepassword2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _providerchangepassword2.default.label, htmlFor: 'password' },
              'New Password:'
            ),
            _react2.default.createElement('input', {
              className: _providerchangepassword2.default.input,
              id: 'newpass',
              type: 'password',
              name: 'newpass',
              autoFocus: true,
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _providerchangepassword2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _providerchangepassword2.default.label, htmlFor: 'password' },
              'Confirm Password:'
            ),
            _react2.default.createElement('input', {
              className: _providerchangepassword2.default.input,
              id: 'confirmpass',
              type: 'password',
              name: 'confirmpass'
            }),
            _react2.default.createElement(
              'label',
              { className: _providerchangepassword2.default.label1, htmlFor: 'message' },
              message
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _providerchangepassword2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _providerchangepassword2.default.button, value: 'Change Password', type: 'submit' },
              'Change Password'
            ),
            _react2.default.createElement('input', {
              className: _providerchangepassword2.default.input,
              id: 'email',
              type: 'hidden',
              name: 'email',
              value: email
            }),
            _react2.default.createElement('input', {
              id: 'code',
              type: 'hidden',
              name: 'code',
              value: passCode
            })
          ),
          _react2.default.createElement('script', null)
        )
      )
    );
  }
  
  Changepassword.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_providerchangepassword2.default)(Changepassword);

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(151);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./providerchangepassword.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./providerchangepassword.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n\r\n.providerchangepassword_root_27E {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.providerchangepassword_container_33R {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.providerchangepassword_lead_1Ha {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.providerchangepassword_formGroup_3eo {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.providerchangepassword_label_1SW {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n.providerchangepassword_label1_1FM {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 300;\r\n  color: #FF0000;\r\n}\r\n\r\n.providerchangepassword_input_164 {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.providerchangepassword_input_164:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.providerchangepassword_button_2Bt {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.providerchangepassword_button_2Bt:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.providerchangepassword_button_2Bt:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/providerchangepassword/providerchangepassword.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,eAAe;CAChB;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C","file":"providerchangepassword.css","sourcesContent":["\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n","\r\n@import '../../components/variables.css';\r\n\r\n.root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.label {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n.label1 {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 300;\r\n  color: #FF0000;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "providerchangepassword_root_27E",
  	"container": "providerchangepassword_container_33R",
  	"lead": "providerchangepassword_lead_1Ha",
  	"formGroup": "providerchangepassword_formGroup_3eo",
  	"label": "providerchangepassword_label_1SW",
  	"label1": "providerchangepassword_label1_1FM",
  	"input": "providerchangepassword_input_164",
  	"button": "providerchangepassword_button_2Bt"
  };

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Updateproviderpass = __webpack_require__(153);
  
  var _Updateproviderpass2 = _interopRequireDefault(_Updateproviderpass);
  
  var _Providerchangepassword = __webpack_require__(149);
  
  var _Providerchangepassword2 = _interopRequireDefault(_Providerchangepassword);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var status = true;
  var message = 'Password Sucessfully Updated';
  var href = 'http://' + _config.host + '/providerlogin';
  var message1 = 'Click here to login';
  var passcode;
  
  exports.default = {
  
    path: '/updateproviderpass',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var email, newpass, confirmpass, body, deletecode;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = query.email;
                newpass = query.newpass;
                confirmpass = query.confirmpass;
  
                passcode = query.code;
                console.log("Email ID:" + email);
                console.log("New Password: " + newpass);
                console.log("Confirm Password: " + confirmpass);
                console.log("Passcode - Update Password module:" + passcode);
  
                if (!(newpass != confirmpass)) {
                  _context.next = 11;
                  break;
                }
  
                message = "Password Not matching";
                return _context.abrupt('return', _react2.default.createElement(_Providerchangepassword2.default, { email: email, message: message }));
  
              case 11:
                _context.next = 13;
                return updatePassword(newpass, email);
  
              case 13:
                body = _context.sent;
  
                if (!(status = false)) {
                  _context.next = 18;
                  break;
                }
  
                message = ' Error in updating password';
                _context.next = 22;
                break;
  
              case 18:
                message = 'Password Sucessfully Updated';
                _context.next = 21;
                return deletePassCode();
  
              case 21:
                deletecode = _context.sent;
  
              case 22:
                return _context.abrupt('return', _react2.default.createElement(_Updateproviderpass2.default, { message: message, message1: message1, redirectlink: href }));
  
              case 23:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function updatePassword(newpass, email) {
    var request = __webpack_require__(71);
    console.log("Inside Updateproviderpassword method email: " + email);
    console.log("Inside Updateproviderpassword method Password: " + newpass);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/updatelogin?newpass=' + newpass + '&email=' + email;
    console.log("Update Updateproviderpass Password - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
  
      request.put(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Change Password - Updateproviderpass - Response from API' + body);
          if (body == 'true') {
            status = true;
          } else {
            status = false;
            message = 'Error in updating password';
          }
          resolve(body);
        } else {
          status = false;
          console.log("Updateproviderpass - API Server not running: ") + error;
          return reject(error);
        }
      });
    });
  }
  
  function deletePassCode() {
    var request = __webpack_require__(71);
    console.log('Check Code - calling API');
    var url = 'http://' + _config.apihost + '/removeCode?code=' + passcode;
    console.log("deletePassCode - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request.delete(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('deletePassCode- Response from API' + body);
  
          if (body == 'true') status = true;else status = false;
          resolve(body);
        } else {
          status = false;
          console.log("deletePassCode -API Server not running: " + error);
          return reject(error);
        }
        console.log("deletePassCode - Returning from API call");
      });
    });
  }

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Updateproviderpass = __webpack_require__(154);
  
  var _Updateproviderpass2 = _interopRequireDefault(_Updateproviderpass);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  //import Link from '../../components/Link'
  
  var title = 'Update Provider Password'; /**
                                           * React Starter Kit (https://www.reactstarterkit.com/)
                                           *
                                           * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                           *
                                           * This source code is licensed under the MIT license found in the
                                           * LICENSE.txt file in the root directory of this source tree.
                                           */
  
  function Updateproviderpass(_ref, context) {
    var message = _ref.message,
        message1 = _ref.message1,
        redirectlink = _ref.redirectlink;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Updateproviderpass2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Updateproviderpass2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          message
        ),
        _react2.default.createElement(
          'a',
          { href: redirectlink },
          message1,
          ' '
        )
      )
    );
  }
  
  Updateproviderpass.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Updateproviderpass2.default)(Updateproviderpass);

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(155);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Updateproviderpass.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Updateproviderpass.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n.Updateproviderpass_root_3O- {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n.Updateproviderpass_container_2GD {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n.Updateproviderpass_lead_1Os {\r\n  font-size: 1.25em;\r\n}\r\n.Updateproviderpass_formGroup_ru8 {\r\n  margin-bottom: 20px;\r\n}\r\n.Updateproviderpass_label_3cK {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n.Updateproviderpass_input_1PN {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n.Updateproviderpass_input_1PN:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n.Updateproviderpass_button_1pi {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n.Updateproviderpass_button_1pi:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n.Updateproviderpass_button_1pi:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n.Updateproviderpass_facebook_1Vn {\r\n  border-color: #3b5998;\r\n  background: #3b5998;\r\n}\r\n.Updateproviderpass_facebook_1Vn:hover {\r\n  background: #2d4373;\r\n}\r\n.Updateproviderpass_google_25L {\r\n  border-color: #dd4b39;\r\n  background: #dd4b39;\r\n}\r\n.Updateproviderpass_google_25L:hover {\r\n  background: #c23321;\r\n}\r\n.Updateproviderpass_twitter_3wf {\r\n  border-color: #55acee;\r\n  background: #55acee;\r\n}\r\n.Updateproviderpass_twitter_3wf:hover {\r\n  background: #2795e9;\r\n}\r\n.Updateproviderpass_icon_3bF {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n.Updateproviderpass_lineThrough_3HX {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n.Updateproviderpass_lineThrough_3HX::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n.Updateproviderpass_lineThrough_3HX::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n", "", {"version":3,"sources":["/./routes/updateproviderpass/Updateproviderpass.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;ACLH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;ADbD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;AAED;EACE,kBAAkB;CACnB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;AAGD;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;AAED;EACE,mCAAmC;CACpC;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"Updateproviderpass.css","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n@import '../../components/variables.css';\r\n\r\n.root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.label {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.facebook {\r\n  border-color: #3b5998;\r\n  background: #3b5998;\r\n  composes: button;\r\n}\r\n\r\n.facebook:hover {\r\n  background: #2d4373;\r\n}\r\n\r\n.google {\r\n  border-color: #dd4b39;\r\n  background: #dd4b39;\r\n  composes: button;\r\n}\r\n\r\n.google:hover {\r\n  background: #c23321;\r\n}\r\n\r\n.twitter {\r\n  border-color: #55acee;\r\n  background: #55acee;\r\n  composes: button;\r\n}\r\n\r\n.twitter:hover {\r\n  background: #2795e9;\r\n}\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n","\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Updateproviderpass_root_3O-",
  	"container": "Updateproviderpass_container_2GD",
  	"lead": "Updateproviderpass_lead_1Os",
  	"formGroup": "Updateproviderpass_formGroup_ru8",
  	"label": "Updateproviderpass_label_3cK",
  	"input": "Updateproviderpass_input_1PN",
  	"button": "Updateproviderpass_button_1pi",
  	"facebook": "Updateproviderpass_facebook_1Vn Updateproviderpass_button_1pi",
  	"google": "Updateproviderpass_google_25L Updateproviderpass_button_1pi",
  	"twitter": "Updateproviderpass_twitter_3wf Updateproviderpass_button_1pi",
  	"icon": "Updateproviderpass_icon_3bF",
  	"lineThrough": "Updateproviderpass_lineThrough_3HX"
  };

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(32);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _LinkProvider = __webpack_require__(157);
  
  var _LinkProvider2 = _interopRequireDefault(_LinkProvider);
  
  var _config = __webpack_require__(17);
  
  var _Login = __webpack_require__(65);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var message = 'Booking done Sucessfully  ';
  var href = 'http://' + _config.host + '/';
  var message1 = 'Click here to Home Page';
  var status = true;
  var bookingid;
  
  exports.default = {
  
    path: '/linkprovider',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var provideremail, customeremail, providerphone, bookingid, sessionid, providerrec, body, url, result, mail;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Query String - index.js - linkprovider: " + (0, _stringify2.default)(query));
                provideremail = query.provideremail;
                customeremail = query.customeremail;
                bookingid = query.bookingid;
                sessionid = query.sessionid;
                _context.t0 = JSON;
                _context.next = 8;
                return getProviderRecord(provideremail);
  
              case 8:
                _context.t1 = _context.sent;
                providerrec = _context.t0.parse.call(_context.t0, _context.t1);
  
                console.log("Provider Record: " + providerrec);
                providerphone = providerrec[0].phone;
                console.log("Provider Phone: " + providerphone);
                console.log("Sessionid - index.js - Home " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 19;
                  break;
                }
  
                _context.next = 17;
                return getSessionid();
  
              case 17:
                body = _context.sent;
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: body }));
  
              case 19:
                url = 'http://' + _config.apihost + '/updateProviderLink?provideremail=' + provideremail + '&email=' + customeremail + '&phone=' + providerphone + '&bookingid=' + bookingid;
  
                console.log("Link Provider - Provider Email: " + provideremail);
                console.log("Link Provider - Customer Email: " + customeremail);
                console.log("URL: " + url);
                _context.next = 25;
                return LinkProviderData(url);
  
              case 25:
                result = _context.sent;
  
                console.log("Return from LinkProviderData");
                if (!status) {
                  message = 'Error in Saving Booking Data';
                  href = 'http://' + _config.host + '/booking';
                  message1 = 'Click here to Re-booking';
                } else {
                  mail = sendEmail(customeremail, provideremail, bookingid);
  
                  href = 'http://' + _config.host + '/home?sessionid=' + sessionid + '&email=' + customeremail;
                }
                return _context.abrupt('return', _react2.default.createElement(_LinkProvider2.default, { message: message, redirectlink: href, message1: message1, sessionid: sessionid }));
  
              case 29:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function LinkProviderData(url) {
    var request = __webpack_require__(71);
    // console.log("APIHOST: "+apihost);
    console.log('calling API - LinkProviderData method');
    //console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request.put(url, function (error, response, body) {
        if (error) {
          console.log("Error in storing provider data");
          status = false;
          return reject(error);
        }
  
        if (body == 'true') {
          console.log('Inside LinkProviderData Response from API (body)' + body);
          status = true;
          resolve(body);
        }
      });
      console.log('returning');
    });
  }
  
  function getSessionid(email) {
    var request = __webpack_require__(71);
    console.log('genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/genSessionid';
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("genSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }
  
  function getProviderRecord(email) {
    var request = __webpack_require__(71);
    console.log('getProviderRecord - linkProvider - calling API');
    var url = 'http://' + _config.apihost + '/getProvider?email=' + email;
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('getProviderRecord - linkProvider - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("getProviderRecord - linkProvider -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }
  
  function sendEmail(email, provideremail, bookingid) {
    var request = __webpack_require__(71);-console.log('calling API - sendEmail');
    var url = 'http://' + _config.apihost + '/sendmail';
    console.log("URL: " + url);
  
    var subject = "Your booking for the event in BMY";
    var message = "<b>Thank you for booking and service provider will get in touch shortly. </b> <br> <b> Your Booking id is <b> " + bookingid;
    var formdata = {
      tomail: email + ' ,' + provideremail,
      subject: subject,
      message: message
    };
  
    //data = JSON.stringify('{\"tomail\": \"'+email+'\", \"subject\": '+subject+'\", \"message\": \" '+message+'\"}');
    console.log("Data: " + formdata);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: formdata }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendEmail - Response from API (body)' + body);
  
          if (body == 'true') resolve(body);
          status = true;
        }
        if (error) {
          console.log("Error in Sending Mail");
          status = false;
          return reject(error);
        }
      });
    });
  }

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _LinkProvider = __webpack_require__(158);
  
  var _LinkProvider2 = _interopRequireDefault(_LinkProvider);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'New Boooking';
  
  function LinkProvider(_ref, context) {
    var message = _ref.message,
        redirectlink = _ref.redirectlink,
        message1 = _ref.message1,
        sessionid = _ref.sessionid;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _LinkProvider2.default.root },
      _react2.default.createElement(
        'div',
        { className: _LinkProvider2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          message
        ),
        _react2.default.createElement(
          'a',
          { href: redirectlink },
          message1,
          ' '
        ),
        _react2.default.createElement('input', { type: 'hidden', name: 'sessionid', value: sessionid })
      )
    );
  }
  
  LinkProvider.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_LinkProvider2.default)(LinkProvider);

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(159);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./LinkProvider.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./LinkProvider.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, " .LinkProvider_root_r-g {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.LinkProvider_container_3Z8 {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.LinkProvider_lead_102 {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.LinkProvider_formGroup_2xX {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.LinkProvider_label_1tq {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.LinkProvider_input_3Aq {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.LinkProvider_input_3Aq:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.LinkProvider_button_296 {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.LinkProvider_button_296:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.LinkProvider_button_296:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.LinkProvider_icon_2pS {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.LinkProvider_lineThrough_2QD {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.LinkProvider_lineThrough_2QD::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.LinkProvider_lineThrough_2QD::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n\r\n#LinkProvider_lastname_3Uq{\r\n    max-width:100px;\r\n    float:left;\r\n}\r\n\r\n.LinkProvider_div_314 {\r\n  float:right;\r\n}\r\n\r\n#LinkProvider_leftContainer_1J2 {\r\n   float:left;\r\n}\r\n\r\n#LinkProvider_rightContainer_3SK {\r\n   float:right;\r\n}", "", {"version":3,"sources":["/./routes/linkprovider/LinkProvider.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAID;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb;;AACD;IACI,gBAAgB;IAChB,WAAW;CACd;;AAED;EACE,YAAY;CACb;;AAED;GACG,WAAW;CACb;;AAED;GACG,YAAY;CACd","file":"LinkProvider.css","sourcesContent":[" .root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.label {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n#lastname{\r\n    max-width:100px;\r\n    float:left;\r\n}\r\n\r\n.div {\r\n  float:right;\r\n}\r\n\r\n#leftContainer {\r\n   float:left;\r\n}\r\n\r\n#rightContainer {\r\n   float:right;\r\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "LinkProvider_root_r-g",
  	"container": "LinkProvider_container_3Z8",
  	"lead": "LinkProvider_lead_102",
  	"formGroup": "LinkProvider_formGroup_2xX",
  	"label": "LinkProvider_label_1tq",
  	"input": "LinkProvider_input_3Aq",
  	"button": "LinkProvider_button_296",
  	"icon": "LinkProvider_icon_2pS",
  	"lineThrough": "LinkProvider_lineThrough_2QD",
  	"lastname": "LinkProvider_lastname_3Uq",
  	"div": "LinkProvider_div_314",
  	"leftContainer": "LinkProvider_leftContainer_1J2",
  	"rightContainer": "LinkProvider_rightContainer_3SK"
  };

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(32);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Providerlogin = __webpack_require__(147);
  
  var _Providerlogin2 = _interopRequireDefault(_Providerlogin);
  
  var _Providerhome = __webpack_require__(161);
  
  var _Providerhome2 = _interopRequireDefault(_Providerhome);
  
  var _ErrorPage = __webpack_require__(108);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  //import Verifyproviderlogn from './Verifyproviderlogin';
  var request = __webpack_require__(71);
  
  var res;
  var userEmail;
  var password;
  var validLogin = true;
  var url;
  var bookinglist;
  var sessionid;
  
  exports.default = {
  
    path: '/verifyproviderlogin',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var validlogin, sessiondatastatus, bookinglist, message;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
  
                console.log("inside the Verifyproviderlogin");
                console.log((0, _stringify2.default)(query));
                console.log("Request query: " + query);
                userEmail = query.email;
                password = query.password;
                sessionid = query.sessionid;
                console.log(userEmail);
                console.log(password);
                console.log("Session Id: " + sessionid);
  
                console.log('calling checkLogin');
                _context.next = 12;
                return checklogin();
  
              case 12:
                validlogin = _context.sent;
  
                console.log("Result from API call: " + validLogin);
  
                if (!(validLogin == 'true')) {
                  _context.next = 25;
                  break;
                }
  
                _context.next = 17;
                return SaveSessionData();
  
              case 17:
                sessiondatastatus = _context.sent;
  
                console.log(" Going to Provider Home Page");
                _context.next = 21;
                return getBookingData();
  
              case 21:
                bookinglist = _context.sent;
                return _context.abrupt('return', _react2.default.createElement(_Providerhome2.default, { sessionid: sessionid, email: userEmail, bookinglist: bookinglist }));
  
              case 25:
                console.log(" Invalid Credential return to Login Page");
                message = "Invalid username or passowrd";
                return _context.abrupt('return', _react2.default.createElement(_Providerlogin2.default, { sessionid: sessionid, message: message }));
  
              case 28:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function checklogin() {
    url = 'http://' + _config.apihost + '/verifylogin?email=' + userEmail + '&password=' + password;
    console.log("API Endpoing - checklogin : " + url);
  
    return new _promise2.default(function (resolve, reject) {
      var results = request(url, function (error, response, query) {
        if (!error && response.statusCode == 200) {
          console.log('Response from API - checklogin ' + query);
          validLogin = query;
          resolve(query);
        } else {
          console.log("Server not responding - checklogin");
          validLogin = false;
        }
      });
      console.log("ValidLogin status: - checklogin" + validLogin);
    });
  }
  
  function SaveSessionData() {
  
    console.log('calling API - SaveSessionData method');
    var url = 'http://' + _config.apihost + '/addSession';
    console.log("URL: " + url);
    var createdate = new Date();
    var data = {
      email: userEmail,
      sessionid: sessionid,
      creationdate: createdate
    };
    console.log("Data: " + data);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: data }, function (error, response, query) {
        if (!error && response.statusCode == 200) {
          console.log('Inside SaveSessionData Response from API (query)' + query);
  
          if (query == 'true')
            //status = true;
            resolve(query);
        }
        if (error) {
          console.log("Error in storing Session data");
          // status = false;
          return reject(error);
        }
      });
  
      console.log('returning');
    });
  }
  
  function getBookingData() {
    var request = __webpack_require__(71);
  
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/getbookingrecbyprovider?email=' + userEmail;
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, query) {
        if (!error && response.statusCode == 200) {
          console.log('Inside getBookingData Response from API (query)' + query);
          resolve(query);
        } else {
          console.log("Error Object: " + error);
          return reject(error);
        }
      });
    });
  }

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Providerhome = __webpack_require__(162);
  
  var _Providerhome2 = _interopRequireDefault(_Providerhome);
  
  var _Link = __webpack_require__(39);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _classnames = __webpack_require__(47);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Welcome to World of Opporunity'; /**
                                                 * React Starter Kit (https://www.reactstarterkit.com/)
                                                 *
                                                 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                 *
                                                 * This source code is licensed under the MIT license found in the
                                                 * LICENSE.txt file in the root directory of this source tree.
                                                 */
  
  var user = 'Customer';
  
  function Providerhome(_ref, context) {
    var sessionid = _ref.sessionid,
        bookinglist = _ref.bookinglist,
        email = _ref.email,
        provider = _ref.provider;
  
    context.setTitle(title);
    context.setUser(user);
    // context.getUser('user');
    var logoutlink = "/providerlogout?sessionid=" + sessionid;
    var updateEmail = "/changeprovideremail?sessionid=" + sessionid + "&email=" + email;
    var updatePhone = "/changeproviderphone?sessionid=" + sessionid + "&email=" + email;
    var bookingdata = JSON.parse(bookinglist);
    var size = bookingdata.length;
    console.log("Size of the booking List: " + size);
    if (size == 0) {
      return _react2.default.createElement(
        'div',
        { className: _Providerhome2.default.cards },
        _react2.default.createElement(
          'div',
          { className: _Providerhome2.default.card },
          _react2.default.createElement(
            'header',
            null,
            _react2.default.createElement(
              'h2',
              null,
              'Search Provider'
            )
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'form',
            { name: 'searchform', method: 'get', action: 'searchprovider' },
            _react2.default.createElement('input', { type: 'text', id: 'category', name: 'category' }),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement('input', { type: 'radio', name: 'searchterm', value: 'pincode' }),
            'Pincode',
            _react2.default.createElement('br', null),
            _react2.default.createElement('input', { type: 'radio', name: 'searchterm', value: 'city' }),
            'City',
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'button',
              { className: _Providerhome2.default.button, value: 'Search', type: 'submit' },
              'Search'
            ),
            _react2.default.createElement('input', { id: 'sessionid',
              type: 'hidden',
              name: 'sessionid',
              value: sessionid
            }),
            _react2.default.createElement('input', {
              id: 'email',
              type: 'hidden',
              name: 'email',
              value: email
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Providerhome2.default.card },
          _react2.default.createElement(
            'header',
            null,
            _react2.default.createElement(
              'h2',
              null,
              'Service Booking'
            )
          ),
          _react2.default.createElement(
            _Link2.default,
            { className: _Providerhome2.default.link, to: updateEmail },
            'Change E-mail'
          ),
          _react2.default.createElement(
            _Link2.default,
            { className: _Providerhome2.default.link, to: updatePhone },
            'Change Mobile No'
          ),
          _react2.default.createElement(
            _Link2.default,
            { className: _Providerhome2.default.link, to: '/contact' },
            'Add New Service'
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            _Link2.default,
            { className: _Providerhome2.default.link, to: logoutlink },
            'Logout'
          ),
          _react2.default.createElement('input', {
            id: 'sessionid',
            type: 'hidden',
            name: 'sessionid',
            value: sessionid
          }),
          _react2.default.createElement('input', {
            id: 'email',
            type: 'hidden',
            name: 'email',
            value: email
          })
        ),
        _react2.default.createElement(
          'div',
          { className: _Providerhome2.default.card },
          _react2.default.createElement(
            'header',
            null,
            _react2.default.createElement(
              'h2',
              null,
              'Booking History'
            )
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'p',
              { className: _Providerhome2.default.p },
              _react2.default.createElement(
                'b',
                null,
                ' No booking history available'
              ),
              ' '
            )
          )
        )
      );
    } else {
      return (
        //<div className={s.root}>
        //<div className={s.container}>
        //   <h1>{title}</h1>
  
        _react2.default.createElement(
          'div',
          { className: _Providerhome2.default.cards },
          _react2.default.createElement(
            'div',
            { className: _Providerhome2.default.card },
            _react2.default.createElement(
              'header',
              null,
              _react2.default.createElement(
                'h2',
                null,
                'Search Provider'
              )
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'form',
              { name: 'searchform', method: 'get', action: 'searchprovider' },
              _react2.default.createElement('input', { type: 'text', id: 'category', name: 'category' }),
              _react2.default.createElement('br', null),
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { type: 'radio', name: 'searchterm', value: 'pincode' }),
              'Pincode',
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { type: 'radio', name: 'searchterm', value: 'city' }),
              'City',
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'button',
                { className: _Providerhome2.default.button, value: 'Search', type: 'submit' },
                'Search'
              ),
              _react2.default.createElement('input', { id: 'sessionid',
                type: 'hidden',
                name: 'sessionid',
                value: sessionid
              }),
              _react2.default.createElement('input', {
                id: 'email',
                type: 'hidden',
                name: 'email',
                value: email
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _Providerhome2.default.card },
            _react2.default.createElement(
              'header',
              null,
              _react2.default.createElement(
                'h2',
                null,
                'Service Booking'
              )
            ),
            _react2.default.createElement(
              _Link2.default,
              { className: _Providerhome2.default.link, to: updateEmail },
              'Change E-mail'
            ),
            _react2.default.createElement(
              _Link2.default,
              { className: _Providerhome2.default.link, to: updatePhone },
              'Change Mobile No'
            ),
            _react2.default.createElement(
              _Link2.default,
              { className: _Providerhome2.default.link, to: '/contact' },
              'Add New Service'
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              _Link2.default,
              { className: _Providerhome2.default.link, to: logoutlink },
              'Logout'
            ),
            _react2.default.createElement('input', {
              id: 'sessionid',
              type: 'hidden',
              name: 'sessionid',
              value: sessionid
            }),
            _react2.default.createElement('input', {
              id: 'email',
              type: 'hidden',
              name: 'email',
              value: email
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Providerhome2.default.card },
            _react2.default.createElement(
              'header',
              null,
              _react2.default.createElement(
                'h2',
                null,
                'Booking History'
              )
            ),
            _react2.default.createElement(
              'form',
              { name: 'form1', method: 'get', action: 'managebooking' },
              _react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                  'caption',
                  null,
                  'Your Booking'
                ),
                _react2.default.createElement(
                  'thead',
                  null,
                  _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'th',
                      null,
                      'Select'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Booking ID'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Booking Date'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Event Date'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Event'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Customer E-mail'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Customer Mobile'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Status'
                    )
                  )
                ),
                _react2.default.createElement(
                  'tbody',
                  null,
                  bookingdata.map(function (obj, index) {
                    return _react2.default.createElement(
                      'tr',
                      { key: index },
                      _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement('input', { type: 'radio', name: 'bookingid', value: obj.bookingid, checked: true }),
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.bookingid
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.dateofbooking
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.functiondate,
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.eventtype,
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.email,
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        obj.mobile
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.status
                      )
                    );
                  })
                )
              ),
              _react2.default.createElement('input', {
                id: 'sessionid',
                type: 'hidden',
                name: 'sessionid',
                value: sessionid
              }),
              _react2.default.createElement('input', {
                id: 'email',
                type: 'hidden',
                name: 'email',
                value: email
              }),
              _react2.default.createElement('input', { type: 'hidden', name: 'provider', value: 'provider' }),
              _react2.default.createElement('br', null),
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { type: 'radio', name: 'manage', value: 'cancel', checked: true }),
              'Cancel',
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { type: 'radio', name: 'manage', value: 'close' }),
              'Close Booking',
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'button',
                { value: 'change', type: 'submit' },
                'submit'
              )
            )
          )
        )
      );
    }
  }
  
  Providerhome.contextTypes = { setTitle: _react.PropTypes.func.isRequired, setUser: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Providerhome2.default)(Providerhome);

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(163);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Providerhome.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Providerhome.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n\r\n.Providerhome_root_3Mh {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Providerhome_container_2b2 {\r\n  margin: 2cm 4cm 3cm 4cm auto;\r\n  padding: 10 10 100px;\r\n  max-width: 1000px;\r\n  \r\n}\r\n\r\n.Providerhome_link_ZJC {\r\n  display: -webkit-inline-box;\r\n  display: -webkit-inline-flex;\r\n  display: -ms-inline-flexbox;\r\n  display: inline-flex;\r\n  padding: 13px 13px;\r\n  text-decoration: none;\r\n  text-align: center;\r\n  font-size: 1.125em; /* ~18px */\r\n}\r\n\r\n.Providerhome_link_ZJC,\r\n.Providerhome_link_ZJC:active,\r\n.Providerhome_link_ZJC:visited {\r\n  color: rgba(0, 0, 255, 0.6);\r\n}\r\n\r\n.Providerhome_link_ZJC:hover {\r\n  color: rgba(0, 255, 0, 1);\r\n}\r\n\r\n.Providerhome_highlight_2__ {\r\n  margin-right: 8px;\r\n  margin-left: 8px;\r\n  border-radius: 3px;\r\n  background: rgba(0, 0, 0, 0.15);\r\n  color: #fff;\r\n}\r\n\r\n.Providerhome_highlight_2__:hover {\r\n  background: rgba(0, 0, 0, 0.3);\r\n}\r\n\r\n.Providerhome_spacer_3mE {\r\n  color: rgba(255, 255, 255, 0.3);\r\n}\r\n\r\n.Providerhome_cards_1__ {\r\n  display: -webkit-box;\r\n  display: -webkit-flex;\r\n  display: -ms-flexbox;\r\n  display: flex;\r\n  margin: 0 auto;\r\n  max-width: 1200px;\r\n\r\n}\r\n\r\n.Providerhome_card_2Yr {\r\n  margin: 0 5px;\r\n  -webkit-box-flex: 0;\r\n  -webkit-flex: 0 0 300px;\r\n      -ms-flex: 0 0 300px;\r\n          flex: 0 0 300px;\r\n}\r\n\r\nhtml {\r\n  -webkit-box-sizing: content-box;\r\n          box-sizing: content-box;\r\n}\r\n\r\n*, *:before, *:after {\r\n  -webkit-box-sizing: inherit;\r\n          box-sizing: inherit;\r\n}\r\n\r\nbody {\r\n  font: 1em/1.1 Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n  background-color: #fafafa;\r\n}\r\n\r\nimg {\r\n  max-width: 100%;\r\n}\r\n\r\n.Providerhome_card_2Yr {\r\n  background-color: #fff;\r\n  -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);\r\n          box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);\r\n}\r\n\r\n.Providerhome_card_2Yr header {\r\n  padding: 10px;\r\n  background-color: rgb(131,112,255);\r\n  color: #fff;\r\n}\r\n\r\n.Providerhome_card_2Yr header h2 {\r\n  font-size: 14.4px;\r\n  font-size: 0.9rem;\r\n  font-weight: normal;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n.Providerhome_card_2Yr .Providerhome_body_oXJ {\r\n  padding: 5px;\r\n  font-size: 4.8px;\r\n  font-size: .3rem;\r\n  color: #757575;\r\n}\r\n\r\ntable, th, td {\r\n  border: 1px solid black;\r\n\r\n}\r\n\r\ntr:hover {background-color: #f5f5f5}\r\n\r\nth {\r\n  background-color: #4CAF50;\r\n  color: white;\r\n}\r\n\r\nth, td {\r\n    padding: 5px;\r\n    text-align: left;\r\n}\r\n\r\nbutton {\r\n  \r\n  -webkit-box-sizing: border-box;\r\n  \r\n          box-sizing: border-box;\r\n  margin: 10px 6px;\r\n  padding: 5px 16px;\r\n  width: 30%;\r\n  outline: 10;\r\n  border: 4px solid #373277;\r\n\r\n  border-radius: 12px;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: inherit;\r\n  font-size: 12px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer; \r\n  float: inherit;\r\n  \r\n}\r\n\r\nbutton:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\nbutton:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/providerhome/Providerhome.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,6BAA6B;EAC7B,qBAAqB;EACrB,kBAAoC;;CAErC;;AAED;EACE,4BAAqB;EAArB,6BAAqB;EAArB,4BAAqB;EAArB,qBAAqB;EACrB,mBAAmB;EACnB,sBAAsB;EACtB,mBAAmB;EACnB,mBAAmB,CAAC,WAAW;CAChC;;AAED;;;EAGE,4BAA4B;CAC7B;;AAED;EACE,0BAA0B;CAC3B;;AAED;EACE,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,gCAAgC;EAChC,YAAY;CACb;;AAED;EACE,+BAA+B;CAChC;;AAED;EACE,gCAAgC;CACjC;;AAED;EACE,qBAAc;EAAd,sBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,eAAe;EACf,kBAAkB;;CAEnB;;AAED;EACE,cAAc;EACd,oBAAgB;EAAhB,wBAAgB;MAAhB,oBAAgB;UAAhB,gBAAgB;CACjB;;AAED;EACE,gCAAwB;UAAxB,wBAAwB;CACzB;;AACD;EACE,4BAAoB;UAApB,oBAAoB;CACrB;;AAED;EACE,qEAAqE;EACrE,0BAA0B;CAC3B;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,uBAAuB;EACvB,0GAAkG;UAAlG,kGAAkG;CACnG;;AAED;EACE,cAAc;EACd,mCAAmC;EACnC,YAAY;CACb;;AAED;EACE,kBAAkB;EAAlB,kBAAkB;EAClB,oBAAoB;EACpB,UAAU;EACV,WAAW;CACZ;;AAED;EACE,aAAa;EACb,iBAAiB;EAAjB,iBAAiB;EACjB,eAAe;CAChB;;AAED;EACE,wBAAwB;;CAEzB;;AACD,UAAU,yBAAyB,CAAC;;AACpC;EACE,0BAA0B;EAC1B,aAAa;CACd;;AACD;IACI,aAAa;IACb,iBAAiB;CACpB;;AAED;;EAEE,+BAAuB;;UAAvB,uBAAuB;EACvB,iBAAiB;EACjB,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,0BAA0B;;EAE1B,oBAAoB;EACpB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,yBAAyB;EACzB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;EAChB,eAAe;;CAEhB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C","file":"Providerhome.css","sourcesContent":["\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n","\r\n@import '../../components/variables.css';\r\n\r\n.root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 2cm 4cm 3cm 4cm auto;\r\n  padding: 10 10 100px;\r\n  max-width: var(--max-content-width);\r\n  \r\n}\r\n\r\n.link {\r\n  display: inline-flex;\r\n  padding: 13px 13px;\r\n  text-decoration: none;\r\n  text-align: center;\r\n  font-size: 1.125em; /* ~18px */\r\n}\r\n\r\n.link,\r\n.link:active,\r\n.link:visited {\r\n  color: rgba(0, 0, 255, 0.6);\r\n}\r\n\r\n.link:hover {\r\n  color: rgba(0, 255, 0, 1);\r\n}\r\n\r\n.highlight {\r\n  margin-right: 8px;\r\n  margin-left: 8px;\r\n  border-radius: 3px;\r\n  background: rgba(0, 0, 0, 0.15);\r\n  color: #fff;\r\n}\r\n\r\n.highlight:hover {\r\n  background: rgba(0, 0, 0, 0.3);\r\n}\r\n\r\n.spacer {\r\n  color: rgba(255, 255, 255, 0.3);\r\n}\r\n\r\n.cards {\r\n  display: flex;\r\n  margin: 0 auto;\r\n  max-width: 1200px;\r\n\r\n}\r\n\r\n.card {\r\n  margin: 0 5px;\r\n  flex: 0 0 300px;\r\n}\r\n\r\nhtml {\r\n  box-sizing: content-box;\r\n}\r\n*, *:before, *:after {\r\n  box-sizing: inherit;\r\n}\r\n\r\nbody {\r\n  font: 1em/1.1 Roboto, \"Helvetica Neue\", Helvetica, Arial, sans-serif;\r\n  background-color: #fafafa;\r\n}\r\n\r\nimg {\r\n  max-width: 100%;\r\n}\r\n\r\n.card {\r\n  background-color: #fff;\r\n  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);\r\n}\r\n\r\n.card header {\r\n  padding: 10px;\r\n  background-color: rgb(131,112,255);\r\n  color: #fff;\r\n}\r\n\r\n.card header h2 {\r\n  font-size: 0.9rem;\r\n  font-weight: normal;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n.card .body {\r\n  padding: 5px;\r\n  font-size: .3rem;\r\n  color: #757575;\r\n}\r\n\r\ntable, th, td {\r\n  border: 1px solid black;\r\n\r\n} \r\ntr:hover {background-color: #f5f5f5}\r\nth {\r\n  background-color: #4CAF50;\r\n  color: white;\r\n}\r\nth, td {\r\n    padding: 5px;\r\n    text-align: left;\r\n}\r\n\r\nbutton {\r\n  \r\n  box-sizing: border-box;\r\n  margin: 10px 6px;\r\n  padding: 5px 16px;\r\n  width: 30%;\r\n  outline: 10;\r\n  border: 4px solid #373277;\r\n\r\n  border-radius: 12px;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: inherit;\r\n  font-size: 12px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer; \r\n  float: inherit;\r\n  \r\n}\r\n\r\nbutton:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\nbutton:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Providerhome_root_3Mh",
  	"container": "Providerhome_container_2b2",
  	"link": "Providerhome_link_ZJC",
  	"highlight": "Providerhome_highlight_2__",
  	"spacer": "Providerhome_spacer_3mE",
  	"cards": "Providerhome_cards_1__",
  	"card": "Providerhome_card_2Yr",
  	"body": "Providerhome_body_oXJ"
  };

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Providerlist = __webpack_require__(76);
  
  var _Providerlist2 = _interopRequireDefault(_Providerlist);
  
  var _config = __webpack_require__(17);
  
  var _Login = __webpack_require__(65);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var providerlist;
  var sessionid;
  
  exports.default = {
  
    path: '/providerlist',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var body, customeremail;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
  
                sessionid = query.sessionid;
                console.log("Sessionid - index.js - Providerlist " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 7;
                  break;
                }
  
                _context.next = 5;
                return getSessionid();
  
              case 5:
                body = _context.sent;
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: body }));
  
              case 7:
                _context.next = 9;
                return getProviderData();
  
              case 9:
                body = _context.sent;
  
                //console.log("Body: "+body);
                customeremail = query.customeremail;
  
                console.log("customer Email: " + customeremail);
                return _context.abrupt('return', _react2.default.createElement(_Providerlist2.default, { providerlist: providerlist, customeremail: customeremail, sessionid: sessionid }));
  
              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function getProviderData() {
    var request = __webpack_require__(71);
  
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/searchByType?servicetype=Pooja';
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside getProviderData Response from API (body)' + body);
          providerlist = body;
          console.log("Providerlist: " + providerlist);
          resolve(body);
        } else {
          console.log("Error Object: " + error);
          return reject(error);
        }
      });
    });
  }
  
  function getSessionid() {
    var request = __webpack_require__(71);
    console.log('genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/genSessionid';
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("genSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Logout = __webpack_require__(166);
  
  var _Logout2 = _interopRequireDefault(_Logout);
  
  var _Login = __webpack_require__(65);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var message = 'Thanks for visiting our website. You have Sucessfully Logged out ';
  var message1 = 'Click here to login';
  var href = 'http://' + _config.host + '/login';
  var status;
  var sessionid;
  
  exports.default = {
  
    path: '/logout',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var body;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sessionid = query.sessionid;
                console.log("Logout - index.js - Sessionid: " + sessionid);
                _context.next = 4;
                return deleteSession();
  
              case 4:
                body = _context.sent;
  
                console.log("Session deleted");
                return _context.abrupt('return', _react2.default.createElement(_Logout2.default, { message: message, redirectlink: href, message1: message1 }));
  
              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function deleteSession() {
    var request = __webpack_require__(71);
    console.log('calling API - DeleteSession method');
    var url = 'http://' + _config.apihost + '/deleteSession?sessionid=' + sessionid;
    console.log("URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request.put(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside Logout - index.js - deleteSession Response from API (body)' + body);
  
          if (body == 'true') status = true;
          resolve(body);
        }
        if (error) {
          console.log("Error in deleting session data");
          status = false;
          return reject(error);
        }
        console.log('returning from deleteSession API call');
      });
    });
  }

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Logout = __webpack_require__(167);
  
  var _Logout2 = _interopRequireDefault(_Logout);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Logout';
  
  function Logout(_ref, context) {
    var message = _ref.message,
        redirectlink = _ref.redirectlink,
        message1 = _ref.message1;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Logout2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Logout2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          message
        ),
        _react2.default.createElement(
          'a',
          { href: redirectlink },
          message1
        )
      )
    );
  }
  
  Logout.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Logout2.default)(Logout);

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(168);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Logout.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Logout.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, " .Logout_root_3lw {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Logout_container_Wra {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.Logout_lead_RHc {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.Logout_formGroup_2i2 {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.Logout_label_3-A {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n", "", {"version":3,"sources":["/./routes/logout/Logout.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb","file":"Logout.css","sourcesContent":[" .root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.label {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Logout_root_3lw",
  	"container": "Logout_container_Wra",
  	"lead": "Logout_lead_RHc",
  	"formGroup": "Logout_formGroup_2i2",
  	"label": "Logout_label_3-A"
  };

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Bookinglist = __webpack_require__(170);
  
  var _Bookinglist2 = _interopRequireDefault(_Bookinglist);
  
  var _config = __webpack_require__(17);
  
  var _Login = __webpack_require__(65);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var sessionid;
  var email;
  
  exports.default = {
  
    path: '/bookinglist',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var body, bookingdata;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
  
                sessionid = query.sessionid;
                console.log("Sessionid - index.js - Home " + sessionid);
  
                email = query.email;
                console.log("customer Email: " + email);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 9;
                  break;
                }
  
                _context.next = 7;
                return getSessionid();
  
              case 7:
                body = _context.sent;
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: body }));
  
              case 9:
                _context.next = 11;
                return getBookingData();
  
              case 11:
                bookingdata = _context.sent;
                return _context.abrupt('return', _react2.default.createElement(_Bookinglist2.default, { Bookingdata: bookingdata, customeremail: email, sessionid: sessionid }));
  
              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function getBookingData() {
    var request = __webpack_require__(71);
  
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/getBookingHistory?email=' + email;
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside getBookingData Response from API (body)' + body);
          //Bookinglist = body;
          // console.log("Bookinglist: "+Bookinglist);
          resolve(body);
        } else {
          console.log("Error Object: " + error);
          return reject(error);
        }
      });
    });
  }
  
  function getSessionid() {
    var request = __webpack_require__(71);
    console.log('genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/genSessionid';
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("genSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Bookinglist = __webpack_require__(171);
  
  var _Bookinglist2 = _interopRequireDefault(_Bookinglist);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Service booking Search';
  
  function Bookinglist(_ref, props, context) {
    var Bookingdata = _ref.Bookingdata,
        customeremail = _ref.customeremail,
        sessionid = _ref.sessionid;
  
    //context.setTitle(title);
  
    var bookingdata = JSON.parse(Bookingdata);
  
    console.log("booking Data: " + bookingdata);
    return _react2.default.createElement(
      'div',
      { className: _Bookinglist2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Bookinglist2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          'My Booking'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'form',
            { name: 'form1' },
            _react2.default.createElement(
              'div',
              { className: _Bookinglist2.default.formGroup },
              _react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                  'caption',
                  null,
                  'Service Providers'
                ),
                _react2.default.createElement(
                  'thead',
                  null,
                  _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'th',
                      null,
                      'Email'
                    ),
                    _react2.default.createElement('th', null),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Booking Date'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Function Date'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Mobile'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Status'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Event Type'
                    )
                  )
                ),
                _react2.default.createElement(
                  'tbody',
                  null,
                  bookingdata.map(function (obj, index) {
                    return _react2.default.createElement(
                      'tr',
                      { key: index },
                      _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement('input', { type: 'radio', name: 'customeremail', value: obj.email }),
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        _react2.default.createElement('input', { id: 'email', type: 'hidden', value: obj.email }),
                        obj.email,
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.bookingdate
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.functiondate
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.mobile,
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.status
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.eventtype
                      )
                    );
                  })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { type: 'hidden', name: 'customeremail', value: customeremail }),
              _react2.default.createElement('input', { type: 'hidden', name: 'sessionid', value: sessionid })
            )
          )
        )
      )
    );
  }
  
  Bookinglist.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Bookinglist2.default)(Bookinglist);

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(172);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Bookinglist.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Bookinglist.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, " .Bookinglist_root_W57 {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Bookinglist_container_27i {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n  max-height:100x\r\n}\r\n\r\nhtml {\r\n  min-height: 100%;\r\n}\r\n\r\nbody {\r\n  min-height: 100vh;\r\n}\r\n\r\ntable, th, td {\r\n  border: 1px solid black;\r\n}\r\n\r\ntr:hover {background-color: #f5f5f5}\r\n\r\nth {\r\n  background-color: #4CAF50;\r\n  color: white;\r\n}\r\n\r\n.Bookinglist_button_2HE {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 30%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.Bookinglist_button_2HE:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.Bookinglist_button_2HE:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\ndiv {\r\n  overflow-x:visible;\r\n   \r\n}\r\n\r\n.Bookinglist_formGroup_2hT {\r\n  margin-bottom: 15px;\r\n}", "", {"version":3,"sources":["/./routes/bookinglist/Bookinglist.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;EACjB,eAAe;CAChB;;AAID;EACE,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,wBAAwB;CACzB;;AACD,UAAU,yBAAyB,CAAC;;AACpC;EACE,0BAA0B;EAC1B,aAAa;CACd;;AACD;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,WAAW;EACX,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;EACE,mBAAmB;;CAEpB;;AAGD;EACE,oBAAoB;CACrB","file":"Bookinglist.css","sourcesContent":[" .root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n  max-height:100x\r\n}\r\n\r\n\r\n\r\nhtml {\r\n  min-height: 100%;\r\n}\r\n\r\nbody {\r\n  min-height: 100vh;\r\n}\r\n\r\ntable, th, td {\r\n  border: 1px solid black;\r\n} \r\ntr:hover {background-color: #f5f5f5}\r\nth {\r\n  background-color: #4CAF50;\r\n  color: white;\r\n}\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 30%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\ndiv {\r\n  overflow-x:visible;\r\n   \r\n}\r\n\r\n\r\n.formGroup {\r\n  margin-bottom: 15px;\r\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Bookinglist_root_W57",
  	"container": "Bookinglist_container_27i",
  	"button": "Bookinglist_button_2HE",
  	"formGroup": "Bookinglist_formGroup_2hT"
  };

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(32);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Cancelbooking = __webpack_require__(174);
  
  var _Cancelbooking2 = _interopRequireDefault(_Cancelbooking);
  
  var _bookinglist = __webpack_require__(177);
  
  var _bookinglist2 = _interopRequireDefault(_bookinglist);
  
  var _util = __webpack_require__(70);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var sessionid = '';
  
  var message = 'Booking done Sucessfully  ';
  var href = 'http://' + _config.host + '/';
  var message1 = 'Click here to login';
  var status = true;
  var email;
  var phone;
  var providermobile;
  var providermail;
  var sessionid;
  var id;
  
  exports.default = {
  
    path: '/cancelbooking',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Query String - index.js - Cancelbooking: " + (0, _stringify2.default)(query));
                message = 'Sucessfully canceled  the Event';
                sessionid = query.sessionid;
                href = href = 'http://' + _config.host + '/home?sessionid=' + sessionid + '&email=' + email;
                message1 = 'Click here to Home Page.';
                return _context.abrupt('return', _react2.default.createElement(_Cancelbooking2.default, { message: message, redirectlink: href, message1: message1, sessionid: sessionid }));
  
              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Cancelbooking = __webpack_require__(175);
  
  var _Cancelbooking2 = _interopRequireDefault(_Cancelbooking);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Cancel Booking'; /**
                                 * React Starter Kit (https://www.reactstarterkit.com/)
                                 *
                                 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                 *
                                 * This source code is licensed under the MIT license found in the
                                 * LICENSE.txt file in the root directory of this source tree.
                                 */
  
  function Cancelbooking(_ref, context) {
    var message = _ref.message,
        redirectlink = _ref.redirectlink,
        message1 = _ref.message1,
        sessionid = _ref.sessionid;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Cancelbooking2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Cancelbooking2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          message
        ),
        _react2.default.createElement('script', null),
        _react2.default.createElement(
          'a',
          { href: redirectlink },
          message1,
          ' '
        ),
        _react2.default.createElement('input', {
          id: 'sessionid',
          type: 'hidden',
          name: 'sessionid',
          value: sessionid
        })
      )
    );
  }
  
  Cancelbooking.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Cancelbooking2.default)(Cancelbooking);

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(176);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Cancelbooking.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Cancelbooking.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, " .Cancelbooking_root_3yO {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Cancelbooking_container_3Po {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.Cancelbooking_lead_2Lq {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.Cancelbooking_formGroup_275 {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.Cancelbooking_label_2u_ {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.Cancelbooking_input_oj0 {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.Cancelbooking_input_oj0:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Cancelbooking_button_Cpv {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.Cancelbooking_button_Cpv:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.Cancelbooking_button_Cpv:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Cancelbooking_icon_1XT {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.Cancelbooking_lineThrough_30u {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.Cancelbooking_lineThrough_30u::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.Cancelbooking_lineThrough_30u::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n\r\n#Cancelbooking_lastname_poF{\r\n    max-width:100px;\r\n    float:left;\r\n}\r\n\r\n.Cancelbooking_div_1WF {\r\n  float:right;\r\n}\r\n\r\n#Cancelbooking_leftContainer_3ka {\r\n   float:left;\r\n}\r\n\r\n#Cancelbooking_rightContainer_72a {\r\n   float:right;\r\n}", "", {"version":3,"sources":["/./routes/cancelbooking/Cancelbooking.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAID;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb;;AACD;IACI,gBAAgB;IAChB,WAAW;CACd;;AAED;EACE,YAAY;CACb;;AAED;GACG,WAAW;CACb;;AAED;GACG,YAAY;CACd","file":"Cancelbooking.css","sourcesContent":[" .root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.label {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n#lastname{\r\n    max-width:100px;\r\n    float:left;\r\n}\r\n\r\n.div {\r\n  float:right;\r\n}\r\n\r\n#leftContainer {\r\n   float:left;\r\n}\r\n\r\n#rightContainer {\r\n   float:right;\r\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Cancelbooking_root_3yO",
  	"container": "Cancelbooking_container_3Po",
  	"lead": "Cancelbooking_lead_2Lq",
  	"formGroup": "Cancelbooking_formGroup_275",
  	"label": "Cancelbooking_label_2u_",
  	"input": "Cancelbooking_input_oj0",
  	"button": "Cancelbooking_button_Cpv",
  	"icon": "Cancelbooking_icon_1XT",
  	"lineThrough": "Cancelbooking_lineThrough_30u",
  	"lastname": "Cancelbooking_lastname_poF",
  	"div": "Cancelbooking_div_1WF",
  	"leftContainer": "Cancelbooking_leftContainer_3ka",
  	"rightContainer": "Cancelbooking_rightContainer_72a"
  };

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Bookinglist = __webpack_require__(171);
  
  var _Bookinglist2 = _interopRequireDefault(_Bookinglist);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Service booking Search';
  
  function Bookinglist(_ref, props, context) {
    var Bookingdata = _ref.Bookingdata,
        customeremail = _ref.customeremail,
        sessionid = _ref.sessionid;
  
    //context.setTitle(title);
  
    var bookingdata = JSON.parse(Bookingdata);
  
    console.log("booking Data: " + bookingdata);
    return _react2.default.createElement(
      'div',
      { className: _Bookinglist2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Bookinglist2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          'My Booking'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'form',
            { name: 'form1' },
            _react2.default.createElement(
              'div',
              { className: _Bookinglist2.default.formGroup },
              _react2.default.createElement(
                'table',
                null,
                _react2.default.createElement(
                  'caption',
                  null,
                  'Service Providers'
                ),
                _react2.default.createElement(
                  'thead',
                  null,
                  _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'th',
                      null,
                      'Email'
                    ),
                    _react2.default.createElement('th', null),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Booking Date'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Function Date'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Mobile'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Status'
                    ),
                    _react2.default.createElement(
                      'th',
                      null,
                      'Event Type'
                    )
                  )
                ),
                _react2.default.createElement(
                  'tbody',
                  null,
                  bookingdata.map(function (obj, index) {
                    return _react2.default.createElement(
                      'tr',
                      { key: index },
                      _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement('input', { type: 'radio', name: 'customeremail', value: obj.email }),
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        _react2.default.createElement('input', { id: 'email', type: 'hidden', value: obj.email }),
                        obj.email,
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.bookingdate
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.functiondate
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.mobile,
                        ' '
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.status
                      ),
                      _react2.default.createElement(
                        'td',
                        null,
                        ' ',
                        obj.eventtype
                      )
                    );
                  })
                )
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement('br', null),
              _react2.default.createElement('input', { type: 'hidden', name: 'customeremail', value: customeremail }),
              _react2.default.createElement('input', { type: 'hidden', name: 'sessionid', value: sessionid })
            )
          )
        )
      )
    );
  }
  
  Bookinglist.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Bookinglist2.default)(Bookinglist);

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(32);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var sendSMS = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var url;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log('calling API - sendSMS method');
  
              url = 'http://' + _config.apihost + '/sendSMS?authkey=' + _config.smsAPIKey + '&mobiles=' + phone + '&message=' + _config.SMSmessage + '&sender=DTSBMF&route=4&country=91';
  
              console.log("URL: " + url);
              return _context2.abrupt('return', new _promise2.default(function (resolve, reject) {
                request(url, function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                    console.log('Inside sendSMS - Response from API (body)' + body);
  
                    if (error) {
                      console.log("Error in Sending SMS");
                      status = false;
                      return reject(error);
                    }
  
                    if (body == 'true') status = true;
                    resolve(body);
                  }
                });
              }));
  
            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));
  
    return function sendSMS() {
      return _ref3.apply(this, arguments);
    };
  }();
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Changebookingdate = __webpack_require__(179);
  
  var _Changebookingdate2 = _interopRequireDefault(_Changebookingdate);
  
  var _Login = __webpack_require__(65);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var request = __webpack_require__(71);
  
  var message = 'Booking done Sucessfully  ';
  var href = 'http://' + _config.host + '/';
  var message1 = 'Click here to login';
  var status = true;
  var changeddate;
  var sessionid;
  var id;
  var email;
  
  exports.default = {
  
    path: '/changebookingdate',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var sessionbody, body;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Query String - index.js - Changebookingdate: " + (0, _stringify2.default)(query));
                sessionid = query.sessionid;
                console.log("Sessionid - index.js - Changebookingdate " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 8;
                  break;
                }
  
                _context.next = 6;
                return getSessionid();
  
              case 6:
                sessionbody = _context.sent;
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: sessionbody }));
  
              case 8:
  
                id = query.bookingid;
                console.log("Booking Id: " + id);
                changeddate = query.newdate;
  
                _context.next = 13;
                return Changedate();
  
              case 13:
                body = _context.sent;
  
                /*console.log("Calling SendEmail");
                var mail = await sendEmail();
                console.log("Calling sendSMS");
                var sms = await sendSMS();
                console.log("Body: "+body);*/
                if (!status) {
                  message = 'Unable to Change booking date  the Event';
                  href = 'http://' + _config.host + '/home';
                  message1 = 'Click here to Register.';
                } else {
                  message = 'Sucessfully changed booking date for  the Event';
                  href = 'http://' + _config.host + '/home?sessionid=' + sessionid + '&email=' + email;
                  message1 = 'Click here to Home Page.';
                }
                return _context.abrupt('return', _react2.default.createElement(_Changebookingdate2.default, { message: message, redirectlink: href, message1: message1, sessionid: sessionid }));
  
              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function Changedate() {
  
    console.log('calling API - SavebookingData method');
    var url = 'http://' + _config.apihost + '/changedate?id=' + id + '&date=' + changeddate;
    console.log("URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request.put(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside Changebookingdate Response from API (body)' + body);
  
          if (body == 'true') status = true;else status = false;
          resolve(body);
          //sendSMS();
          //var result = await sendEmail();
        }
        if (error) {
          console.log("Error in storing customer data");
          status = false;
          return reject(error);
        }
      });
  
      console.log('returning');
    });
  }
  
  function sendEmail() {
    console.log('calling API - sendEmail');
    var url = 'http://' + _config.apihost + '/sendmail';
    console.log("URL: " + url);
  
    var subject = "Your booking for the event in BMY";
    var message = "<b>Thank you for booking and service provider will get in touch shortly. </b> <br> <b> Your Booking id is <b> ";
    var formdata = {
      tomail: email,
      subject: subject,
      message: message
    };
  
    //data = JSON.stringify('{\"tomail\": \"'+email+'\", \"subject\": '+subject+'\", \"message\": \" '+message+'\"}');
    console.log("Data: " + formdata);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: formdata }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendEmail - Response from API (body)' + body);
  
          if (body == 'true') resolve(body);
          status = true;
        }
        if (error) {
          console.log("Error in Sending Mail");
          status = false;
          return reject(error);
        }
      });
    });
  }
  
  function getSessionid() {
    var request = __webpack_require__(71);
    console.log('genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/genSessionid';
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("genSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }
  
  function getBookingRecord() {
    var request = __webpack_require__(71);
    console.log('getBookingRecord - linkbooking - calling API');
    var url = 'http://' + _config.apihost + '/getbookingrec?email=' + email + '&bookingid=' + id;
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('getBookingRecord - linkbooking - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("getBookingRecord - linkbooking -API Server not running: " + error);
          return reject(error);
        }
        console.log("getBookingRecord - Returning from API call");
      });
    });
  }

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Changebookingdate = __webpack_require__(180);
  
  var _Changebookingdate2 = _interopRequireDefault(_Changebookingdate);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Change Booking Date'; /**
                                      * React Starter Kit (https://www.reactstarterkit.com/)
                                      *
                                      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                      *
                                      * This source code is licensed under the MIT license found in the
                                      * LICENSE.txt file in the root directory of this source tree.
                                      */
  
  function Changebookingdate(_ref, context) {
    var message = _ref.message,
        redirectlink = _ref.redirectlink,
        message1 = _ref.message1,
        sessionid = _ref.sessionid;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Changebookingdate2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Changebookingdate2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          message
        ),
        _react2.default.createElement(
          'a',
          { href: redirectlink },
          message1,
          ' '
        ),
        _react2.default.createElement('input', {
          id: 'sessionid',
          type: 'hidden',
          name: 'sessionid',
          value: sessionid
        })
      )
    );
  }
  
  Changebookingdate.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Changebookingdate2.default)(Changebookingdate);

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(181);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Changebookingdate.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Changebookingdate.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, " .Changebookingdate_root_2cu {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Changebookingdate_container_YVr {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.Changebookingdate_lead_31T {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.Changebookingdate_formGroup_2VX {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.Changebookingdate_label_2a0 {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.Changebookingdate_input_3Bm {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.Changebookingdate_input_3Bm:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Changebookingdate_button_1ma {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.Changebookingdate_button_1ma:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.Changebookingdate_button_1ma:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Changebookingdate_icon_3HY {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.Changebookingdate_lineThrough_tyl {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.Changebookingdate_lineThrough_tyl::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.Changebookingdate_lineThrough_tyl::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n\r\n#Changebookingdate_lastname_KfY{\r\n    max-width:100px;\r\n    float:left;\r\n}\r\n\r\n.Changebookingdate_div_2Ly {\r\n  float:right;\r\n}\r\n\r\n#Changebookingdate_leftContainer_uyC {\r\n   float:left;\r\n}\r\n\r\n#Changebookingdate_rightContainer_2Ko {\r\n   float:right;\r\n}", "", {"version":3,"sources":["/./routes/changebookingdate/Changebookingdate.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAID;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb;;AACD;IACI,gBAAgB;IAChB,WAAW;CACd;;AAED;EACE,YAAY;CACb;;AAED;GACG,WAAW;CACb;;AAED;GACG,YAAY;CACd","file":"Changebookingdate.css","sourcesContent":[" .root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.label {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n#lastname{\r\n    max-width:100px;\r\n    float:left;\r\n}\r\n\r\n.div {\r\n  float:right;\r\n}\r\n\r\n#leftContainer {\r\n   float:left;\r\n}\r\n\r\n#rightContainer {\r\n   float:right;\r\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Changebookingdate_root_2cu",
  	"container": "Changebookingdate_container_YVr",
  	"lead": "Changebookingdate_lead_31T",
  	"formGroup": "Changebookingdate_formGroup_2VX",
  	"label": "Changebookingdate_label_2a0",
  	"input": "Changebookingdate_input_3Bm",
  	"button": "Changebookingdate_button_1ma",
  	"icon": "Changebookingdate_icon_3HY",
  	"lineThrough": "Changebookingdate_lineThrough_tyl",
  	"lastname": "Changebookingdate_lastname_KfY",
  	"div": "Changebookingdate_div_2Ly",
  	"leftContainer": "Changebookingdate_leftContainer_uyC",
  	"rightContainer": "Changebookingdate_rightContainer_2Ko"
  };

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(32);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var sendSMS = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      var mobiles, SMSmessage, url;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log('calling API - sendSMS method');
              mobiles = phone + ',' + providermobile;
  
              console.log("Mobiles: " + mobiles);
              SMSmessage = 'We cancelled your booking with id ' + id + ', booking please login to view the details';
              url = 'http://' + _config.apihost + '/sendSMS?authkey=' + _config.smsAPIKey + '&mobiles=' + mobiles + '&message=' + SMSmessage + '&sender=DTSBMF&route=4&country=91';
  
              console.log("URL: " + url);
              return _context2.abrupt('return', new _promise2.default(function (resolve, reject) {
                request(url, function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                    console.log('Inside sendSMS - Response from API (body)' + body);
  
                    if (error) {
                      console.log("Error in Sending SMS");
                      status = false;
                      return reject(error);
                    }
  
                    if (body == 'true') status = true;
                    resolve(body);
                  }
                });
              }));
  
            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));
  
    return function sendSMS() {
      return _ref3.apply(this, arguments);
    };
  }();
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Managebooking = __webpack_require__(183);
  
  var _Managebooking2 = _interopRequireDefault(_Managebooking);
  
  var _Login = __webpack_require__(65);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _Cancelbooking = __webpack_require__(174);
  
  var _Cancelbooking2 = _interopRequireDefault(_Cancelbooking);
  
  var _config = __webpack_require__(17);
  
  var _util = __webpack_require__(70);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var request = __webpack_require__(71);
  
  var message = 'Booking done Sucessfully  ';
  var href = 'http://' + _config.host + '/';
  var message1 = 'Click here to login';
  var status = true;
  var email;
  var phone;
  var providermobile;
  var providermail;
  var sessionid;
  var id;
  var bookingstatus;
  var provider;
  
  exports.default = {
  
    path: '/managebooking',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var sessionbody, bookingrec, eventdate, body, mail;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Query String - index.js - Managebooking: " + (0, _stringify2.default)(query));
  
                sessionid = query.sessionid;
                console.log("Sessionid - index.js - Manage Booking " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 8;
                  break;
                }
  
                _context.next = 6;
                return (0, _util.getSessionid)();
  
              case 6:
                sessionbody = _context.sent;
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: sessionbody }));
  
              case 8:
  
                email = query.email;
                id = query.bookingid;
                provider = query.provider;
                console.log("Provider - Manageing Booking: " + provider);
  
                console.log("Email: " + email);
  
                _context.t0 = JSON;
                _context.next = 16;
                return getBookingRecord();
  
              case 16:
                _context.t1 = _context.sent;
                bookingrec = _context.t0.parse.call(_context.t0, _context.t1);
  
                if (!(query.manage == 'changedate')) {
                  _context.next = 22;
                  break;
                }
  
                console.log("Inside the changedate");
                eventdate = bookingrec[0].functiondate;
                return _context.abrupt('return', _react2.default.createElement(_Managebooking2.default, { sessionid: sessionid, bookingid: id, eventdate: eventdate }));
  
              case 22:
  
                if (query.manage == 'close') bookingstatus = "closed";else bookingstatus = "canceled";
  
                //var bookingrec = JSON.parse(await getBookingRecord());
                console.log("booking Record: " + bookingrec);
                providermobile = bookingrec[0].providerphone;
                phone = bookingrec[0].mobile;
                console.log("Customer Mobile: " + phone);
                providermail = bookingrec[0].provideremail;
  
                console.log("Provider Phone: " + providermobile);
                console.log("Provider Email: " + providermail);
  
                _context.next = 32;
                return updatebookingstatus();
  
              case 32:
                body = _context.sent;
  
                console.log("Calling SendEmail");
                _context.next = 36;
                return sendEmail();
  
              case 36:
                mail = _context.sent;
  
                // console.log("Calling sendSMS");
                //var sms = await sendSMS();
                console.log("Body: " + body);
                if (!status) {
  
                  if (bookingstatus == "canceled") message = 'Unable to cancelling  the Event';else message = 'Unable to close  the Event';
                  href = 'http://' + _config.host + '/';
                  message1 = 'Click here to Register.';
                } else {
                  if (bookingstatus == "canceled") message = 'Sucessfully canceled  the booking';else message = 'Sucessfully closed the booking';
                  if (provider != undefined) href = href = 'http://' + _config.host + '/providerhome?sessionid=' + sessionid + '&email=' + email;else href = href = 'http://' + _config.host + '/home?sessionid=' + sessionid + '&email=' + email;
                  message1 = 'Click here to Home Page.';
                }
                return _context.abrupt('return', _react2.default.createElement(_Cancelbooking2.default, { message: message, redirectlink: href, message1: message1, sessionid: sessionid }));
  
              case 40:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function updatebookingstatus() {
  
    console.log('calling API - updatebookingstatus method');
    var url = 'http://' + _config.apihost + '/updatebookinstatus?id=' + id + '&status=' + bookingstatus;
    console.log("URL - updatebookingstatus: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request.put(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside updatebookingstatus Response from API (body)' + body);
  
          if (body == 'true') status = true;else status = false;
          resolve(body);
          //sendSMS();
          //var result = await sendEmail();
        }
        if (error) {
          console.log("Error in  update event status");
          status = false;
          return reject(error);
        }
      });
  
      console.log('returning');
    });
  }
  
  function sendEmail() {
    console.log('calling API - sendEmail');
    var url = 'http://' + _config.apihost + '/sendmail';
    console.log("URL: " + url);
  
    var subject = "Your booking for the event with id: " + id + " has been cancelled";
    var message = "<b>Your booking for the event Cancelled as per your requst. Thank you for the booking and We continue to provide our best service. ";
    var formdata = {
      tomail: email + ' ,' + providermail,
      subject: subject,
      message: message
    };
  
    //data = JSON.stringify('{\"tomail\": \"'+email+'\", \"subject\": '+subject+'\", \"message\": \" '+message+'\"}');
    console.log("Data: " + formdata);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: formdata }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendEmail - Response from API (body)' + body);
  
          if (body == 'true') resolve(body);
          status = true;
        }
        if (error) {
          console.log("Error in Sending Mail");
          status = false;
          return reject(error);
        }
      });
    });
  }
  
  /*function getSessionid() {
    var request = require('request');
    console.log('genSessionid - calling API');
    var url = `http://${apihost}/genSessionid`;
    console.log("getSeesionid - URL: " + url);
    
    return new Promise(function(resolve, reject) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('genSessionid - Response from API' + body);
        //sessionid = body;
        resolve(body);
      }
      else {
        
        console.log("genSessionid -API Server not running: "+error);
        return reject(error);
      }
      console.log("getSessionid - Returning from API call")
    });
  
   });
   
  }*/
  
  function getBookingRecord() {
    var request = __webpack_require__(71);
    console.log('getBookingRecord - linkbooking - calling API');
    var url = 'http://' + _config.apihost + '/getbookingrec?bookingid=' + id;
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('getBookingRecord - linkbooking - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("getBookingRecord - linkbooking -API Server not running: " + error);
          return reject(error);
        }
        console.log("getBookingRecord - Returning from API call");
      });
    });
  }

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Managebooking = __webpack_require__(184);
  
  var _Managebooking2 = _interopRequireDefault(_Managebooking);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Manage Booking';
  
  function Managebooking(_ref, context) {
    var sessionid = _ref.sessionid,
        bookingid = _ref.bookingid,
        eventdate = _ref.eventdate;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Managebooking2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Managebooking2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'put', action: 'changebookingdate' },
          _react2.default.createElement(
            'div',
            { className: _Managebooking2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Managebooking2.default.label, htmlFor: 'currentdate' },
              'Current Event Date:'
            ),
            _react2.default.createElement('input', {
              className: _Managebooking2.default.input,
              id: 'currentdate',
              type: 'text',
              name: 'currentdate',
              value: eventdate,
              readOnly: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Managebooking2.default.label, htmlFor: 'newdate' },
              'Select New Date:'
            ),
            _react2.default.createElement('input', {
              className: _Managebooking2.default.input,
              id: 'newdate',
              type: 'date',
              name: 'newdate'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Managebooking2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _Managebooking2.default.button, value: 'Change Date', type: 'submit' },
              'Change Event Date'
            )
          ),
          _react2.default.createElement('input', {
            id: 'sessionid',
            type: 'hidden',
            name: 'sessionid',
            value: sessionid
          }),
          _react2.default.createElement('input', {
            id: 'bookingid',
            type: 'hidden',
            name: 'bookingid',
            value: bookingid
          })
        )
      )
    );
  }
  
  Managebooking.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Managebooking2.default)(Managebooking);

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(185);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Managebooking.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Managebooking.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, " .Managebooking_root_27M {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Managebooking_container_3Uw {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.Managebooking_lead_30e {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.Managebooking_formGroup_kwf {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.Managebooking_label_r7C {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.Managebooking_input_3a8 {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.Managebooking_input_3a8:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Managebooking_button_1aK {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.Managebooking_button_1aK:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.Managebooking_button_1aK:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Managebooking_icon_295 {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.Managebooking_lineThrough_Akf {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.Managebooking_lineThrough_Akf::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.Managebooking_lineThrough_Akf::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n\r\n#Managebooking_lastname_1GH{\r\n    max-width:100px;\r\n    float:left;\r\n}\r\n\r\n.Managebooking_div_2m2 {\r\n  float:right;\r\n}\r\n\r\n#Managebooking_leftContainer_2zl {\r\n   float:left;\r\n}\r\n\r\n#Managebooking_rightContainer_CfR {\r\n   float:right;\r\n}", "", {"version":3,"sources":["/./routes/managebooking/Managebooking.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAID;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb;;AACD;IACI,gBAAgB;IAChB,WAAW;CACd;;AAED;EACE,YAAY;CACb;;AAED;GACG,WAAW;CACb;;AAED;GACG,YAAY;CACd","file":"Managebooking.css","sourcesContent":[" .root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.label {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n#lastname{\r\n    max-width:100px;\r\n    float:left;\r\n}\r\n\r\n.div {\r\n  float:right;\r\n}\r\n\r\n#leftContainer {\r\n   float:left;\r\n}\r\n\r\n#rightContainer {\r\n   float:right;\r\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Managebooking_root_27M",
  	"container": "Managebooking_container_3Uw",
  	"lead": "Managebooking_lead_30e",
  	"formGroup": "Managebooking_formGroup_kwf",
  	"label": "Managebooking_label_r7C",
  	"input": "Managebooking_input_3a8",
  	"button": "Managebooking_button_1aK",
  	"icon": "Managebooking_icon_295",
  	"lineThrough": "Managebooking_lineThrough_Akf",
  	"lastname": "Managebooking_lastname_1GH",
  	"div": "Managebooking_div_2m2",
  	"leftContainer": "Managebooking_leftContainer_2zl",
  	"rightContainer": "Managebooking_rightContainer_CfR"
  };

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Providerhome = __webpack_require__(161);
  
  var _Providerhome2 = _interopRequireDefault(_Providerhome);
  
  var _Providerlogin = __webpack_require__(147);
  
  var _Providerlogin2 = _interopRequireDefault(_Providerlogin);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var sessionid;
  var email;
  var provider = "provider";
  
  exports.default = {
  
    path: '/providerhome',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var body, bookinglist;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sessionid = query.sessionid;
                email = query.email;
  
                console.log("Sessionid - index.js - Providerhome " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 10;
                  break;
                }
  
                _context.next = 6;
                return getSessionid();
  
              case 6:
                body = _context.sent;
                return _context.abrupt('return', _react2.default.createElement(_Providerlogin2.default, { sessionid: body }));
  
              case 10:
                _context.next = 12;
                return getBookingData();
  
              case 12:
                bookinglist = _context.sent;
                return _context.abrupt('return', _react2.default.createElement(_Providerhome2.default, { sessionid: sessionid, bookinglist: bookinglist, email: email, provider: provider }));
  
              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function getSessionid() {
    var request = __webpack_require__(71);
    console.log('Home - genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/genSessionid';
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("genSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }
  
  function getBookingData() {
    var request = __webpack_require__(71);
  
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/getbookingrecbyprovider?email=' + email;
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside getBookingData Response from API (body)' + body);
          resolve(body);
        } else {
          console.log("Error Object: " + error);
          return reject(error);
        }
      });
    });
  }

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Providerlogout = __webpack_require__(188);
  
  var _Providerlogout2 = _interopRequireDefault(_Providerlogout);
  
  var _Providerlogin = __webpack_require__(147);
  
  var _Providerlogin2 = _interopRequireDefault(_Providerlogin);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var message = 'Thanks for visiting our website. You have Sucessfully Logged out ';
  var message1 = 'Click here to login';
  var href = 'http://' + _config.host + '/providerlogin';
  var status;
  var sessionid;
  
  exports.default = {
  
    path: '/providerlogout',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var body;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sessionid = query.sessionid;
                console.log("Logout - index.js - Sessionid: " + sessionid);
                _context.next = 4;
                return deleteSession();
  
              case 4:
                body = _context.sent;
  
                console.log("Session deleted");
                return _context.abrupt('return', _react2.default.createElement(_Providerlogout2.default, { message: message, redirectlink: href, message1: message1 }));
  
              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function deleteSession() {
    var request = __webpack_require__(71);
    console.log('calling API - DeleteSession method');
    var url = 'http://' + _config.apihost + '/deleteSession?sessionid=' + sessionid;
    console.log("URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request.put(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside Logout - index.js - deleteSession Response from API (body)' + body);
  
          if (body == 'true') status = true;
          resolve(body);
        }
        if (error) {
          console.log("Error in deleting session data");
          status = false;
          return reject(error);
        }
        console.log('returning from deleteSession API call');
      });
    });
  }

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Providerlogout = __webpack_require__(189);
  
  var _Providerlogout2 = _interopRequireDefault(_Providerlogout);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Provider Logout';
  
  function Logout(_ref, context) {
    var message = _ref.message,
        redirectlink = _ref.redirectlink,
        message1 = _ref.message1;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Providerlogout2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Providerlogout2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          message
        ),
        _react2.default.createElement(
          'a',
          { href: redirectlink },
          message1
        )
      )
    );
  }
  
  Logout.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Providerlogout2.default)(Logout);

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(190);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Providerlogout.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Providerlogout.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, " .Providerlogout_root_2RH {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Providerlogout_container_3St {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n  max-height: 800px;\r\n}\r\n\r\n.Providerlogout_lead_2Mx {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.Providerlogout_formGroup_324 {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.Providerlogout_label_2d_ {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n", "", {"version":3,"sources":["/./routes/providerlogout/Providerlogout.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;EACjB,kBAAkB;CACnB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb","file":"Providerlogout.css","sourcesContent":[" .root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n  max-height: 800px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.label {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Providerlogout_root_2RH",
  	"container": "Providerlogout_container_3St",
  	"lead": "Providerlogout_lead_2Mx",
  	"formGroup": "Providerlogout_formGroup_324",
  	"label": "Providerlogout_label_2d_"
  };

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Changeprovideremail = __webpack_require__(192);
  
  var _Changeprovideremail2 = _interopRequireDefault(_Changeprovideremail);
  
  var _Login = __webpack_require__(65);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var status = false;
  var code;
  
  exports.default = {
  
    path: '/changeprovideremail',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var email, sessionid;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = query.email;
                sessionid = query.sessionid;
  
                console.log("Email ID:" + email);
                //var body = await checkCode(code, email);
  
                code = "verify";
                return _context.abrupt('return', _react2.default.createElement(_Changeprovideremail2.default, { email: email, passCode: code, sessionid: sessionid }));
  
              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Changeprovideremail = __webpack_require__(193);
  
  var _Changeprovideremail2 = _interopRequireDefault(_Changeprovideremail);
  
  var _Link = __webpack_require__(39);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Change Email';
  
  function Changeprovideremail(_ref, context) {
    var email = _ref.email,
        passCode = _ref.passCode,
        sessionid = _ref.sessionid;
  
    console.log("Changeprovideremail: " + email);
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Changeprovideremail2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Changeprovideremail2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'put', action: 'updateprovideremail' },
          _react2.default.createElement(
            'div',
            { className: _Changeprovideremail2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Changeprovideremail2.default.label, htmlFor: 'oldemail' },
              'Current E-mail:'
            ),
            _react2.default.createElement('input', {
              className: _Changeprovideremail2.default.input,
              id: 'oldemail',
              type: 'text',
              name: 'oldemail',
              value: email,
              readOnly: true
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Changeprovideremail2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _Changeprovideremail2.default.label, htmlFor: 'newemail' },
              'New E-mail:'
            ),
            _react2.default.createElement('input', {
              className: _Changeprovideremail2.default.input,
              id: 'newemail',
              type: 'email',
              name: 'newemail'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Changeprovideremail2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _Changeprovideremail2.default.button, value: 'Change Email', type: 'submit' },
              'Change Password'
            ),
            _react2.default.createElement('input', {
              id: 'email',
              type: 'hidden',
              name: 'email',
              value: email
            })
          ),
          _react2.default.createElement('script', null)
        )
      )
    );
  }
  
  Changeprovideremail.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Changeprovideremail2.default)(Changeprovideremail);

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(194);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Changeprovideremail.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Changeprovideremail.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n\r\n.Changeprovideremail_root_3wA {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Changeprovideremail_container_2KF {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.Changeprovideremail_lead_321 {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.Changeprovideremail_formGroup_MrA {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.Changeprovideremail_label_2fZ {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n.Changeprovideremail_label1_2BG {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 300;\r\n  color: #FF0000;\r\n}\r\n\r\n.Changeprovideremail_input_1l3 {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.Changeprovideremail_input_1l3:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Changeprovideremail_button_xve {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.Changeprovideremail_button_xve:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.Changeprovideremail_button_xve:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/changeprovideremail/Changeprovideremail.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,eAAe;CAChB;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C","file":"Changeprovideremail.css","sourcesContent":["\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n","\r\n@import '../../components/variables.css';\r\n\r\n.root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.label {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n.label1 {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 300;\r\n  color: #FF0000;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Changeprovideremail_root_3wA",
  	"container": "Changeprovideremail_container_2KF",
  	"lead": "Changeprovideremail_lead_321",
  	"formGroup": "Changeprovideremail_formGroup_MrA",
  	"label": "Changeprovideremail_label_2fZ",
  	"label1": "Changeprovideremail_label1_2BG",
  	"input": "Changeprovideremail_input_1l3",
  	"button": "Changeprovideremail_button_xve"
  };

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(32);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Changeproviderphone = __webpack_require__(196);
  
  var _Changeproviderphone2 = _interopRequireDefault(_Changeproviderphone);
  
  var _Login = __webpack_require__(65);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var status = false;
  
  var email;
  
  exports.default = {
  
    path: '/changeproviderphone',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var providerRecord, phone;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
  
                console.log("Query - Changeproviderphone: " + (0, _stringify2.default)(query));
                email = query.email;
                _context.t0 = JSON;
                _context.next = 5;
                return getProvider();
  
              case 5:
                _context.t1 = _context.sent;
                providerRecord = _context.t0.parse.call(_context.t0, _context.t1);
  
                console.log("Provider Record: " + providerRecord);
                phone = providerRecord[0].phone;
  
  
                console.log("Provider Email: " + email);
                console.log("Provider Old Phone:" + phone);
  
                return _context.abrupt('return', _react2.default.createElement(_Changeproviderphone2.default, { email: email, phone: phone }));
  
              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function getProvider() {
    var request = __webpack_require__(71);
    console.log('genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/getProvider?email=' + email;
    console.log("getProvider - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('getProvider - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("getProvider -API Server not running: " + error);
          return reject(error);
        }
        console.log("getProvider - Returning from API call");
      });
    });
  }

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _changeproviderphone = __webpack_require__(197);
  
  var _changeproviderphone2 = _interopRequireDefault(_changeproviderphone);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Changing Provider Phone';
  
  function Changeproviderphone(_ref, context) {
    var email = _ref.email,
        phone = _ref.phone;
  
    console.log("Changeproviderphone: " + email);
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _changeproviderphone2.default.root },
      _react2.default.createElement(
        'div',
        { className: _changeproviderphone2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'put', action: 'confirmOTP' },
          _react2.default.createElement(
            'div',
            { className: _changeproviderphone2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _changeproviderphone2.default.label, htmlFor: 'phone' },
              'Current phone:'
            ),
            _react2.default.createElement('input', {
              className: _changeproviderphone2.default.input,
              id: 'oldphone',
              type: 'text',
              name: 'oldphone',
              value: phone,
              readOnly: true
            }),
            _react2.default.createElement(
              'label',
              { className: _changeproviderphone2.default.label, htmlFor: 'newphone' },
              'New phone:'
            ),
            _react2.default.createElement('input', {
              className: _changeproviderphone2.default.input,
              id: 'newphone',
              type: 'text',
              name: 'newphone'
            }),
            _react2.default.createElement('input', {
              id: 'email',
              type: 'hidden',
              name: 'email',
              value: email
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _changeproviderphone2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _changeproviderphone2.default.button, value: 'Change phone', type: 'submit' },
              'Change phone'
            )
          ),
          _react2.default.createElement('script', null)
        )
      )
    );
  }
  
  Changeproviderphone.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_changeproviderphone2.default)(Changeproviderphone);

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(198);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./changeproviderphone.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./changeproviderphone.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n\r\n.changeproviderphone_root_1jO {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.changeproviderphone_container_jN2 {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.changeproviderphone_lead_3O1 {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.changeproviderphone_formGroup_2U1 {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.changeproviderphone_label_3Ia {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n.changeproviderphone_label1_2pd {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 300;\r\n  color: #FF0000;\r\n}\r\n\r\n.changeproviderphone_input_IjB {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.changeproviderphone_input_IjB:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.changeproviderphone_button_1PG {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.changeproviderphone_button_1PG:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.changeproviderphone_button_1PG:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/changeproviderphone/changeproviderphone.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,eAAe;CAChB;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C","file":"changeproviderphone.css","sourcesContent":["\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n","\r\n@import '../../components/variables.css';\r\n\r\n.root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.label {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n.label1 {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 300;\r\n  color: #FF0000;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "changeproviderphone_root_1jO",
  	"container": "changeproviderphone_container_jN2",
  	"lead": "changeproviderphone_lead_3O1",
  	"formGroup": "changeproviderphone_formGroup_2U1",
  	"label": "changeproviderphone_label_3Ia",
  	"label1": "changeproviderphone_label1_2pd",
  	"input": "changeproviderphone_input_IjB",
  	"button": "changeproviderphone_button_1PG"
  };

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Updateprovideremail = __webpack_require__(200);
  
  var _Updateprovideremail2 = _interopRequireDefault(_Updateprovideremail);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var status = true;
  var message = 'Email Sucessfully Updated';
  var href;
  var message1 = 'Click here to login';
  var passcode;
  var request = __webpack_require__(71);
  
  exports.default = {
  
    path: '/updateprovideremail',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var email, newemail, body, login, mail;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Query: " + query);
                email = query.oldemail;
                newemail = query.newemail;
  
                passcode = query.code;
  
                console.log("Current Email: " + email);
                console.log("New Email: " + newemail);
                console.log("Passcode - Update Email module:" + passcode);
  
                if (!(passcode == "activate")) {
                  _context.next = 19;
                  break;
                }
  
                _context.next = 10;
                return updateEmail(email, newemail);
  
              case 10:
                body = _context.sent;
                _context.next = 13;
                return updatelogin(email, newemail);
  
              case 13:
                login = _context.sent;
  
                if (status == false) message = ' Error in updating email';else {
                  message = 'Email  Sucessfully Updated';
                }
                message1 = 'click here to login with new email';
                href = 'http://' + _config.host + '/providerlogin';
                _context.next = 27;
                break;
  
              case 19:
                href = 'http://' + _config.host + '/updateprovideremail?code=activate&newemail=' + newemail + '&oldemail=' + email;
                console.log("Verify: href:" + href);
                _context.next = 23;
                return sendEmail(newemail);
  
              case 23:
                mail = _context.sent;
  
                message = "Confirmation mail sent to your new email. ";
                message1 = "Click here to relogin";
                href = 'http://' + _config.host + '/providerlogin';
  
              case 27:
                return _context.abrupt('return', _react2.default.createElement(_Updateprovideremail2.default, { message: message, message1: message1, redirectlink: href }));
  
              case 28:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function updateEmail(email, newemail) {
  
    console.log("Inside Updateprovideremailword method email: " + email);
    console.log("Inside Updateprovideremailword method New Email: " + newemail);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/updateEmail?email=' + email + '&newemail=' + newemail;
    console.log("Update Updateprovideremail updateEmail - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
  
      request.put(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Update Email - Updateprovideremail - Response from API' + body);
          if (body == 'true') {
            status = true;
          } else {
            status = false;
            message = 'Error in updating email';
          }
          resolve(body);
        } else {
          status = false;
          console.log("Updateprovideremail - API Server not running: ") + error;
          return reject(error);
        }
      });
    });
  }
  
  function sendEmail(email) {
    console.log('calling API - sendEmail');
    var url = 'http://' + _config.apihost + '/sendmail';
    console.log("URL: " + url);
  
    var subject = "Your request for change Email";
    var message = "<b>You have requested for email change . Click below link to verify to activate email </b> <br> <b> <a href='" + href + "' >Please click the link to activate email</a>  <b> ";
    var formdata = {
      tomail: email,
      subject: subject,
      message: message
    };
  
    //data = JSON.stringify('{\"tomail\": \"'+email+'\", \"subject\": '+subject+'\", \"message\": \" '+message+'\"}');
    console.log("Data: " + formdata);
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: formdata }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendEmail - Response from API (body)' + body);
  
          if (body == 'true') resolve(body);
          status = true;
        }
        if (error) {
          console.log("Error in Sending Mail");
          status = false;
          return reject(error);
        }
      });
    });
  }
  
  function updatelogin(email, newemail) {
  
    console.log("Inside updatelogin method email: " + email);
    console.log("Inside updatelogin method New Email: " + newemail);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/updatelogin?email=' + email + '&newemail=' + newemail;
    console.log("Update Updateprovideremail updatelogin - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
  
      request.put(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Update Login - Updateprovideremail - Response from API' + body);
          if (body == 'true') {
            status = true;
          } else {
            status = false;
            message = 'Error in updating password';
          }
          resolve(body);
        } else {
          status = false;
          console.log("Updateprovideremail - updatelogin - API Server not running: ") + error;
          return reject(error);
        }
      });
    });
  }

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Updateprovideremail = __webpack_require__(201);
  
  var _Updateprovideremail2 = _interopRequireDefault(_Updateprovideremail);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  //import Link from '../../components/Link'
  
  var title = 'Update Provider Password';
  
  function Updateprovideremail(_ref, context) {
    var message = _ref.message,
        message1 = _ref.message1,
        redirectlink = _ref.redirectlink;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Updateprovideremail2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Updateprovideremail2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          message
        ),
        _react2.default.createElement(
          'a',
          { href: redirectlink },
          message1,
          ' '
        )
      )
    );
  }
  
  Updateprovideremail.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Updateprovideremail2.default)(Updateprovideremail);

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(202);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Updateprovideremail.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Updateprovideremail.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n.Updateprovideremail_root_zUx {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n.Updateprovideremail_container_1yU {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n.Updateprovideremail_lead_ddn {\r\n  font-size: 1.25em;\r\n}\r\n.Updateprovideremail_formGroup_3pr {\r\n  margin-bottom: 20px;\r\n}\r\n.Updateprovideremail_label_2xq {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n.Updateprovideremail_input_1Hg {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n.Updateprovideremail_input_1Hg:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n.Updateprovideremail_button_1by {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n.Updateprovideremail_button_1by:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n.Updateprovideremail_button_1by:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n.Updateprovideremail_facebook_1fZ {\r\n  border-color: #3b5998;\r\n  background: #3b5998;\r\n}\r\n.Updateprovideremail_facebook_1fZ:hover {\r\n  background: #2d4373;\r\n}\r\n.Updateprovideremail_google_1ls {\r\n  border-color: #dd4b39;\r\n  background: #dd4b39;\r\n}\r\n.Updateprovideremail_google_1ls:hover {\r\n  background: #c23321;\r\n}\r\n.Updateprovideremail_twitter_1Eh {\r\n  border-color: #55acee;\r\n  background: #55acee;\r\n}\r\n.Updateprovideremail_twitter_1Eh:hover {\r\n  background: #2795e9;\r\n}\r\n.Updateprovideremail_icon_3Kd {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n.Updateprovideremail_lineThrough_3Tb {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n.Updateprovideremail_lineThrough_3Tb::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n.Updateprovideremail_lineThrough_3Tb::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n", "", {"version":3,"sources":["/./routes/updateprovideremail/Updateprovideremail.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;ACLH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;ADbD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;AAED;EACE,kBAAkB;CACnB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;AAGD;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;AAED;EACE,mCAAmC;CACpC;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"Updateprovideremail.css","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n@import '../../components/variables.css';\r\n\r\n.root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.label {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.facebook {\r\n  border-color: #3b5998;\r\n  background: #3b5998;\r\n  composes: button;\r\n}\r\n\r\n.facebook:hover {\r\n  background: #2d4373;\r\n}\r\n\r\n.google {\r\n  border-color: #dd4b39;\r\n  background: #dd4b39;\r\n  composes: button;\r\n}\r\n\r\n.google:hover {\r\n  background: #c23321;\r\n}\r\n\r\n.twitter {\r\n  border-color: #55acee;\r\n  background: #55acee;\r\n  composes: button;\r\n}\r\n\r\n.twitter:hover {\r\n  background: #2795e9;\r\n}\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n","\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Updateprovideremail_root_zUx",
  	"container": "Updateprovideremail_container_1yU",
  	"lead": "Updateprovideremail_lead_ddn",
  	"formGroup": "Updateprovideremail_formGroup_3pr",
  	"label": "Updateprovideremail_label_2xq",
  	"input": "Updateprovideremail_input_1Hg",
  	"button": "Updateprovideremail_button_1by",
  	"facebook": "Updateprovideremail_facebook_1fZ Updateprovideremail_button_1by",
  	"google": "Updateprovideremail_google_1ls Updateprovideremail_button_1by",
  	"twitter": "Updateprovideremail_twitter_1Eh Updateprovideremail_button_1by",
  	"icon": "Updateprovideremail_icon_3Kd",
  	"lineThrough": "Updateprovideremail_lineThrough_3Tb"
  };

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _stringify = __webpack_require__(32);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Updateproviderphone = __webpack_require__(204);
  
  var _Updateproviderphone2 = _interopRequireDefault(_Updateproviderphone);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var status = true;
  var message = '';
  var href = 'http://' + _config.host + '/providerlogin';
  var message1 = '';
  var code;
  var request = __webpack_require__(71);
  var phone;
  var newphone;
  var email;
  var otp;
  
  exports.default = {
  
    path: '/updateproviderphone',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var otpres, deleteres, updatestatus;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Query: " + (0, _stringify2.default)(query));
  
                newphone = query.newphone;
                email = query.email;
                otp = query.otp;
                console.log("OTP: " + otp);
                console.log("New phone: " + newphone);
                console.log("Email: " + email);
  
                _context.next = 9;
                return searchOTP();
  
              case 9:
                otpres = _context.sent;
  
                if (!(otpres == 'true')) {
                  _context.next = 17;
                  break;
                }
  
                _context.next = 13;
                return updatephone();
  
              case 13:
                updatestatus = _context.sent;
                _context.next = 16;
                return deleteOTP();
  
              case 16:
                deleteres = _context.sent;
  
              case 17:
                console.log("Status: " + status);
                if (status) {
                  console.log("Inside the true");
                  message = " Phone sucessfully updated";
                  message1 = "Click here to home page";
                } else {
                  message = " Phone details not updated. An error occured";
                  message1 = "Click here to relogin";
                }
  
                return _context.abrupt('return', _react2.default.createElement(_Updateproviderphone2.default, { message: message, message1: message1, redirectlink: href }));
  
              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function updatephone() {
  
    console.log("Inside Updateproviderphone - updatephone method email: " + email);
    console.log("Inside Updateprovider- updatephone method New phone: " + newphone);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/updatephone?email=' + email + '&newphone=' + newphone;
    console.log("Update Updateproviderphone updatephone - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
  
      request.put(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Update phone - Updateproviderphone - Response from API' + body);
          if (body == 'true') {
            status = true;
          } else {
            status = false;
            message = 'Error in updating phone';
          }
          resolve(body);
        } else {
          status = false;
          console.log("Updateproviderphone - API Server not running: ") + error;
          return reject(error);
        }
      });
    });
  }
  
  function searchOTP() {
  
    console.log("Inside searchOTP method email: " + email);
    console.log("Inside searchOTP method Code: " + otp);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/findOTP?email=' + email + '&otp=' + otp;
    console.log("URL - searchOTP: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
  
        if (error) return reject(error);
        if (!error && response.statusCode == 200) {
          console.log('Inside searchOTP Response from API (body)' + body);
          if (body == 'true') {
            status = true;
          } else {
            console.log("Error in searching OTP data");
            status = false;
          }
          resolve(body);
        }
        console.log('returning');
      });
    });
  }
  
  function deleteOTP() {
  
    console.log("Inside deleteOTP method email: " + email);
    console.log("Inside deleteOTP method Code: " + otp);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/deleteOTP?otp=' + otp;
    console.log("URL - deleteOTP: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request.delete(url, function (error, response, body) {
  
        if (error) return reject(error);
        if (!error && response.statusCode == 200) {
          console.log('Inside deleteOTP Response from API (body)' + body);
          if (body == 'true') {
            console.log("Successfully deleted the OTP");
            status = true;
          } else {
            console.log("Error in deleteing  OTP data");
            status = false;
          }
          resolve(body);
        }
        console.log('returning');
      });
    });
  }

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Updateproviderphone = __webpack_require__(205);
  
  var _Updateproviderphone2 = _interopRequireDefault(_Updateproviderphone);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  //import Link from '../../components/Link'
  
  var title = 'Update Provider Moblie';
  
  function Updateproviderphone(_ref, context) {
    var message = _ref.message,
        message1 = _ref.message1,
        redirectlink = _ref.redirectlink;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Updateproviderphone2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Updateproviderphone2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          message
        ),
        _react2.default.createElement(
          'a',
          { href: redirectlink },
          message1,
          ' '
        )
      )
    );
  }
  
  Updateproviderphone.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Updateproviderphone2.default)(Updateproviderphone);

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(206);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Updateproviderphone.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Updateproviderphone.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n.Updateproviderphone_root_3ep {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n.Updateproviderphone_container_3hP {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n.Updateproviderphone_lead_33S {\r\n  font-size: 1.25em;\r\n}\r\n.Updateproviderphone_formGroup_F0o {\r\n  margin-bottom: 20px;\r\n}\r\n.Updateproviderphone_label_3vs {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n.Updateproviderphone_input_2_M {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n.Updateproviderphone_input_2_M:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n.Updateproviderphone_button_2b4 {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n.Updateproviderphone_button_2b4:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n.Updateproviderphone_button_2b4:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n.Updateproviderphone_facebook_115 {\r\n  border-color: #3b5998;\r\n  background: #3b5998;\r\n}\r\n.Updateproviderphone_facebook_115:hover {\r\n  background: #2d4373;\r\n}\r\n.Updateproviderphone_google_2Go {\r\n  border-color: #dd4b39;\r\n  background: #dd4b39;\r\n}\r\n.Updateproviderphone_google_2Go:hover {\r\n  background: #c23321;\r\n}\r\n.Updateproviderphone_twitter_2CY {\r\n  border-color: #55acee;\r\n  background: #55acee;\r\n}\r\n.Updateproviderphone_twitter_2CY:hover {\r\n  background: #2795e9;\r\n}\r\n.Updateproviderphone_icon_2Lv {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n.Updateproviderphone_lineThrough_2DY {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n.Updateproviderphone_lineThrough_2DY::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n.Updateproviderphone_lineThrough_2DY::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n", "", {"version":3,"sources":["/./routes/updateproviderphone/Updateproviderphone.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;ACLH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;ADbD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;AAED;EACE,kBAAkB;CACnB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;AAGD;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;AAED;EACE,mCAAmC;CACpC;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"Updateproviderphone.css","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n@import '../../components/variables.css';\r\n\r\n.root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.label {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.facebook {\r\n  border-color: #3b5998;\r\n  background: #3b5998;\r\n  composes: button;\r\n}\r\n\r\n.facebook:hover {\r\n  background: #2d4373;\r\n}\r\n\r\n.google {\r\n  border-color: #dd4b39;\r\n  background: #dd4b39;\r\n  composes: button;\r\n}\r\n\r\n.google:hover {\r\n  background: #c23321;\r\n}\r\n\r\n.twitter {\r\n  border-color: #55acee;\r\n  background: #55acee;\r\n  composes: button;\r\n}\r\n\r\n.twitter:hover {\r\n  background: #2795e9;\r\n}\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n","\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Updateproviderphone_root_3ep",
  	"container": "Updateproviderphone_container_3hP",
  	"lead": "Updateproviderphone_lead_33S",
  	"formGroup": "Updateproviderphone_formGroup_F0o",
  	"label": "Updateproviderphone_label_3vs",
  	"input": "Updateproviderphone_input_2_M",
  	"button": "Updateproviderphone_button_2b4",
  	"facebook": "Updateproviderphone_facebook_115 Updateproviderphone_button_2b4",
  	"google": "Updateproviderphone_google_2Go Updateproviderphone_button_2b4",
  	"twitter": "Updateproviderphone_twitter_2CY Updateproviderphone_button_2b4",
  	"icon": "Updateproviderphone_icon_2Lv",
  	"lineThrough": "Updateproviderphone_lineThrough_2DY"
  };

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ConfirmOTP = __webpack_require__(208);
  
  var _ConfirmOTP2 = _interopRequireDefault(_ConfirmOTP);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var request = __webpack_require__(71);
  var status = true;
  var message = 'Password Sucessfully Updated';
  var href = 'http://' + _config.host + '/providerlogin';
  var message1 = 'Click here to login';
  var otp;
  var SMSmessage;
  var email;
  
  exports.default = {
  
    path: '/confirmOTP',
  
    action: function action(_ref, _ref2) {
      var _this = this;
  
      var query = _ref.query;
      var path = _ref2.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var oldphone, newphone, OTP;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
  
                email = query.email;
                oldphone = query.oldphone;
                newphone = query.newphone;
  
  
                otp = Math.floor(1000000 + Math.random() * 9000000);
                console.log("OTP - Update phone module:" + otp);
  
                SMSmessage = " You are requested for mobile number change. Use this OTP " + otp;
  
                //var SMS = await sendSMS(newphone);
                _context.next = 8;
                return saveOTP();
  
              case 8:
                OTP = _context.sent;
                return _context.abrupt('return', _react2.default.createElement(_ConfirmOTP2.default, { email: email, newphone: newphone }));
  
              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function sendSMS(newphone) {
    console.log('calling API - sendSMS method');
  
    var url = 'http://' + _config.apihost + '/sendSMS?authkey=' + _config.smsAPIKey + '&mobiles=' + newphone + '&message=' + SMSmessage + '&sender=DTSBMF&route=4&country=91';
    console.log("URL: " + url);
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Inside sendSMS - Response from API (body)' + body);
  
          if (error) {
            console.log("Error in Sending SMS");
            status = false;
            return reject(error);
          }
  
          if (body == 'true') status = true;
          resolve(body);
        }
      });
    });
  }
  
  function saveOTP() {
  
    console.log("Inside saveOTP method email: " + email);
    console.log("Inside saveOTP method Code: " + otp);
    console.log('calling API');
    var url = 'http://' + _config.apihost + '/addOTP';
    console.log("URL - saveOTP: " + url);
  
    var formdata = {
      email: email,
      otp: otp
    };
  
    return new _promise2.default(function (resolve, reject) {
      request.post(url, { form: formdata }, function (error, response, body) {
  
        if (error) return reject(error);
        if (!error && response.statusCode == 200) {
          console.log('Inside saveOTP Response from API (body)' + body);
          if (body == 'true') {
            status = true;
          } else {
            console.log("Error in storing OTP data");
            status = false;
          }
          resolve(body);
        }
        console.log('returning');
      });
    });
  }

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ConfirmOTP = __webpack_require__(209);
  
  var _ConfirmOTP2 = _interopRequireDefault(_ConfirmOTP);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  //import Link from '../../components/Link'
  
  var title = 'Enter the OTP to validate the phone';
  
  function ConfirmOTP(_ref, context) {
    var email = _ref.email,
        newphone = _ref.newphone;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _ConfirmOTP2.default.root },
      _react2.default.createElement(
        'div',
        { className: _ConfirmOTP2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'put', action: 'updateproviderphone' },
          _react2.default.createElement(
            'div',
            { className: _ConfirmOTP2.default.formGroup },
            _react2.default.createElement(
              'label',
              { className: _ConfirmOTP2.default.label, htmlFor: 'otp' },
              'OTP:'
            ),
            _react2.default.createElement('input', {
              className: _ConfirmOTP2.default.input,
              id: 'otp',
              type: 'text',
              name: 'otp',
              placeholder: 'Enter OTP',
              required: 'required'
            }),
            _react2.default.createElement('input', {
              id: 'email',
              type: 'hidden',
              name: 'email',
              value: email
            }),
            _react2.default.createElement('input', {
              className: _ConfirmOTP2.default.input,
              id: 'newphone',
              type: 'hidden',
              name: 'newphone',
              value: newphone
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _ConfirmOTP2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _ConfirmOTP2.default.button, type: 'submit' },
              'Confirm OTP'
            )
          )
        )
      )
    );
  }
  
  ConfirmOTP.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_ConfirmOTP2.default)(ConfirmOTP);

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(210);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ConfirmOTP.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./ConfirmOTP.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, "\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\r\n}\r\n\r\n.ConfirmOTP_root_Rvw {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.ConfirmOTP_container_L7d {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.ConfirmOTP_formGroup_1mi {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.ConfirmOTP_label_1fQ {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n.ConfirmOTP_input_7ie {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.ConfirmOTP_input_7ie:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.ConfirmOTP_button_3SF {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.ConfirmOTP_button_3SF:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.ConfirmOTP_button_3SF:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.ConfirmOTP_lineThrough_28B {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.ConfirmOTP_lineThrough_28B::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.ConfirmOTP_lineThrough_28B::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n", "", {"version":3,"sources":["/./components/variables.css","/./routes/confirmOTP/ConfirmOTP.css"],"names":[],"mappings":";;AAEA;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ACpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAGD;EACE,oBAAoB;CACrB;;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;;AAGD;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAGD;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"ConfirmOTP.css","sourcesContent":["\r\n\r\n:root {\r\n  /*\r\n   * Typography\r\n   * ======================================================================== */\r\n\r\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n  /*\r\n   * Layout\r\n   * ======================================================================== */\r\n\r\n  --max-content-width: 1000px;\r\n\r\n  /*\r\n   * Media queries breakpoints\r\n   * ======================================================================== */\r\n\r\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\r\n  --screen-sm-min: 768px;  /* Small screen / tablet */\r\n  --screen-md-min: 992px;  /* Medium screen / desktop */\r\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\r\n}\r\n","\r\n@import '../../components/variables.css';\r\n\r\n.root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.label {\r\n  display: inline-block;\r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n}\r\n\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #373277;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor: pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "ConfirmOTP_root_Rvw",
  	"container": "ConfirmOTP_container_L7d",
  	"formGroup": "ConfirmOTP_formGroup_1mi",
  	"label": "ConfirmOTP_label_1fQ",
  	"input": "ConfirmOTP_input_7ie",
  	"button": "ConfirmOTP_button_3SF",
  	"lineThrough": "ConfirmOTP_lineThrough_28B"
  };

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _promise = __webpack_require__(61);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(2);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Cateringbooking = __webpack_require__(212);
  
  var _Cateringbooking2 = _interopRequireDefault(_Cateringbooking);
  
  var _Login = __webpack_require__(65);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/cateringbooking',
  
    action: function action(_ref) {
      var _this = this;
  
      var query = _ref.query;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var date, currentdate, sessionid, email, customerrec, customermobile, body, bookingid;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                date = new Date();
                currentdate = date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear();
                sessionid = query.sessionid;
                email = query.email;
                _context.t0 = JSON;
                _context.next = 7;
                return getCustomerRecord(email);
  
              case 7:
                _context.t1 = _context.sent;
                customerrec = _context.t0.parse.call(_context.t0, _context.t1);
  
                console.log("Cateringbooking Record: " + customerrec);
                customermobile = customerrec[0].phone;
  
                //console.log("Cateringbooking Id: "+Cateringbookingid);
  
                console.log("Sessionid - index.js - Booking : " + sessionid);
  
                if (!(sessionid === undefined || sessionid == '')) {
                  _context.next = 20;
                  break;
                }
  
                _context.next = 15;
                return getSessionid();
  
              case 15:
                body = _context.sent;
  
                console.log("Sessionid: " + body);
                return _context.abrupt('return', _react2.default.createElement(_Login2.default, { sessionid: body }));
  
              case 20:
                bookingid = Math.floor(1000000 + Math.random() * 9000000);
                return _context.abrupt('return', _react2.default.createElement(_Cateringbooking2.default, { sessionid: sessionid, bookingid: bookingid, email: email, phone: customermobile }));
  
              case 22:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
  
  
  function getSessionid() {
    var request = __webpack_require__(71);
    console.log('genSessionid - calling API');
    var url = 'http://' + _config.apihost + '/genSessionid';
    console.log("getSeesionid - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('genSessionid - Response from API' + body);
          // sessionid = body;
          resolve(body);
        } else {
  
          console.log("genSessionid -API Server not running: " + error);
          return reject(error);
        }
        console.log("getSessionid - Returning from API call");
      });
    });
  }
  
  function getCustomerRecord(email) {
    var request = __webpack_require__(71);
    console.log('getCustomerRecord - calling API');
    var url = 'http://' + _config.apihost + '/getCustomer?email=' + email;
    console.log("getCustomerRecord - URL: " + url);
  
    return new _promise2.default(function (resolve, reject) {
      request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('getCustomerRecord - linkbooking - Response from API' + body);
          //sessionid = body;
          resolve(body);
        } else {
  
          console.log("getCustomerRecord - linkbooking -API Server not running: " + error);
          return reject(error);
        }
        console.log("getCustomerRecord - Returning from API call");
      });
    });
  }

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(19);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(36);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Cateringbooking = __webpack_require__(213);
  
  var _Cateringbooking2 = _interopRequireDefault(_Cateringbooking);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'New Event Booking';
  
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var currentdate = day + '/' + month + '/' + year;
  
  function Cateringbooking(_ref, context) {
    var sessionid = _ref.sessionid,
        bookingid = _ref.bookingid,
        email = _ref.email,
        phone = _ref.phone;
  
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      { className: _Cateringbooking2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Cateringbooking2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'form',
          { name: 'form1', method: 'put', action: 'savebooking' },
          _react2.default.createElement(
            'div',
            { className: _Cateringbooking2.default.leftContainer },
            _react2.default.createElement('input', { id: 'status', type: 'hidden', value: 'booked', name: 'status' }),
            _react2.default.createElement(
              'label',
              { className: _Cateringbooking2.default.label, htmlFor: 'dateofbooking' },
              'Date of Booking:'
            ),
            _react2.default.createElement('input', {
              className: _Cateringbooking2.default.input,
              id: 'dateofbooking',
              type: 'text',
              name: 'dateofbooking',
              value: currentdate,
              autoFocus: true,
              readOnly: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Cateringbooking2.default.label, htmlFor: 'eventdate' },
              _react2.default.createElement(
                'span',
                null,
                'Event Date: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Cateringbooking2.default.input,
              id: 'functiondate',
              type: 'date',
              name: 'functiondate',
              required: true
            })
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'label',
              { className: _Cateringbooking2.default.label, htmlFor: 'email' },
              _react2.default.createElement(
                'span',
                null,
                'E-mail: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Cateringbooking2.default.input,
              id: 'email',
              type: 'email',
              name: 'email',
              value: email,
              readOnly: true
            }),
            _react2.default.createElement(
              'label',
              { className: _Cateringbooking2.default.label, htmlFor: 'mobile' },
              _react2.default.createElement(
                'span',
                null,
                'Mobile Number: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Cateringbooking2.default.input,
              id: 'mobile',
              type: 'number',
              name: 'mobile',
              value: phone,
              readOnly: true
            })
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'label',
              { className: _Cateringbooking2.default.label, htmlFor: 'Function' },
              _react2.default.createElement(
                'span',
                null,
                'Service: '
              )
            ),
            _react2.default.createElement('input', {
              className: _Cateringbooking2.default.input,
              id: 'eventtype',
              type: 'text',
              name: 'eventtype',
              value: 'Catering',
              readOnly: true
            }),
            _react2.default.createElement('input', {
              id: 'sessionid',
              type: 'hidden',
              name: 'sessionid',
              value: sessionid
            }),
            _react2.default.createElement('input', {
              id: 'bookingid',
              type: 'hidden',
              name: 'bookingid',
              value: bookingid
            }),
            _react2.default.createElement('input', {
              id: 'bookingtype',
              type: 'hidden',
              name: 'bookingtype',
              value: 'Catering'
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _Cateringbooking2.default.formGroup },
            _react2.default.createElement(
              'button',
              { className: _Cateringbooking2.default.button, value: 'submit', type: 'submit' },
              'Book Event'
            )
          )
        )
      )
    );
  }
  
  Cateringbooking.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Cateringbooking2.default)(Cateringbooking);

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(214);
      var insertCss = __webpack_require__(30);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Cateringbooking.css", function() {
          content = require("!!./../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!./../../../node_modules/postcss-loader/index.js?pack=default!./Cateringbooking.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(29)();
  // imports
  
  
  // module
  exports.push([module.id, " .Cateringbooking_root_1Q_ {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Cateringbooking_container_23u {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.Cateringbooking_lead_1Z7 {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.Cateringbooking_formGroup_1r6 {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.Cateringbooking_label_3Y1 {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.Cateringbooking_input_3_y {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\r\n  size: 15;\r\n  max-width: 30; \r\n  \r\n}\r\n\r\n.Cateringbooking_input_3_y:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Cateringbooking_button_tVd {\r\n  display: block;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #483288;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor:  pointer;\r\n}\r\n\r\n.Cateringbooking_button_tVd:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.Cateringbooking_button_tVd:focus {\r\n  border-color: #0074c2;\r\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.Cateringbooking_leftContainer_L21 {\r\n   float:left;\r\n}\r\n\r\n.Cateringbooking_rightContainer_1uZ {\r\n   float:right;\r\n}\r\n\r\n.Cateringbooking_icon_22O {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.Cateringbooking_lineThrough_1jF {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.Cateringbooking_lineThrough_1jF::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.Cateringbooking_lineThrough_1jF::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n\r\n#Cateringbooking_lastname_167{\r\n    max-width:100px;\r\n    float:left;\r\n}\r\n\r\n.Cateringbooking_squaredOne_2bf {\r\n  width: 28px;\r\n  height: 28px;\r\n  position: relative;\r\n  margin: 20px auto;\r\n  background: #fcfff4;\r\n  background: -webkit-gradient(linear, left top, left bottom, from(top), color-stop(0%, #fcfff4), color-stop(40%, #dfe5d7), to(#b3bead));\r\n  background: -webkit-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\r\n  background: -o-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\r\n  background: linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\r\n  -webkit-box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\r\n          box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\r\n  label {\r\n    width: 20px;\r\n    height: 20px;\r\n    position: absolute;\r\n    top: 4px;\r\n    left: 4px;\r\n    cursor: pointer;\r\n    background: -webkit-gradient(linear, left top, left bottom, from(#222), to(#45484d));\r\n    background: -webkit-linear-gradient(top, #222 0%, #45484d 100%);\r\n    background: -o-linear-gradient(top, #222 0%, #45484d 100%);\r\n    background: linear-gradient(top, #222 0%, #45484d 100%);\r\n    -webkit-box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,1);\r\n            box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,1)\r\n  }\r\n  label:after {\r\n    content: '';\r\n    width: 16px;\r\n    height: 16px;\r\n    position: absolute;\r\n    top: 2px;\r\n    left: 2px;\r\n    background: $activeColor;\r\n    background: -webkit-gradient(linear, left top, left bottom, from(top), color-stop(0%, $activeColor), to($darkenColor));\r\n    background: -webkit-linear-gradient(top, $activeColor 0%, $darkenColor 100%);\r\n    background: -o-linear-gradient(top, $activeColor 0%, $darkenColor 100%);\r\n    background: linear-gradient(top, $activeColor 0%, $darkenColor 100%);\r\n    -webkit-box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\r\n            box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\r\n    opacity: 0;\r\n  }\r\n  label:hover::after {\r\n    opacity: 0.3;\r\n  }\r\n  input[type=checkbox] {\r\n    visibility: hidden   \r\n  }\r\n  input[type=checkbox]:checked + label:after {\r\n    opacity: 1;\r\n  } \r\n}", "", {"version":3,"sources":["/./routes/cateringbooking/Cateringbooking.css"],"names":[],"mappings":"CAAC;EACC,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,oBAAoB;;CAErB;;AAED;;EAEE,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;EACzE,SAAS;EACT,cAAc;;CAEf;;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,iBAAiB;CAClB;;AAED;EACE,mCAAmC;CACpC;;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;;AAED;GACG,WAAW;CACb;;AAED;GACG,YAAY;CACd;;AAGD;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb;;AACD;IACI,gBAAgB;IAChB,WAAW;CACd;;AAED;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,oBAAoB;EACpB,uIAAwE;EAAxE,gFAAwE;EAAxE,2EAAwE;EAAxE,wEAAwE;EACxE,yEAAiE;UAAjE,iEAAiE;EACjE;IACE,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,SAAS;IACT,UAAU;IACV,gBAAgB;IAChB,qFAAwD;IAAxD,gEAAwD;IAAxD,2DAAwD;IAAxD,wDAAwD;IACxD,uFAA+E;YAA/E,8EAA+E;GAgBhF;EAfC;IACE,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,SAAS;IACT,UAAU;IACV,yBAAyB;IACzB,uHAAqE;IAArE,6EAAqE;IAArE,wEAAqE;IAArE,qEAAqE;IACrE,yEAAiE;YAAjE,iEAAiE;IACjE,WAAW;GACZ;EACD;IACE,aAAa;GACd;EAEH;IACE,kBAAmB;GAIpB;EAHC;IACE,WAAW;GACZ;CAEJ","file":"Cateringbooking.css","sourcesContent":[" .root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 380px;\r\n}\r\n\r\n.lead {\r\n  font-size: 1.25em;\r\n}\r\n\r\n.formGroup {\r\n  margin-bottom: 20px;\r\n  \r\n}\r\n\r\n.label {\r\n  \r\n  margin-bottom: 5px;\r\n  max-width: 100%;\r\n  font-weight: 700;\r\n  float: left;\r\n}\r\n\r\n.input {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  height: 46px;\r\n  outline: 0;\r\n  border: 1px solid #ccc;\r\n  border-radius: 10;\r\n  background: #fff;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\r\n  color: #616161;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\r\n  size: 15;\r\n  max-width: 30; \r\n  \r\n}\r\n\r\n.input:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.button {\r\n  display: block;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 10px 16px;\r\n  width: 100%;\r\n  outline: 0;\r\n  border: 1px solid #373277;\r\n  border-radius: 0;\r\n  background: #483288;\r\n  color: #fff;\r\n  text-align: center;\r\n  text-decoration: none;\r\n  font-size: 18px;\r\n  line-height: 1.3333333;\r\n  cursor:  pointer;\r\n}\r\n\r\n.button:hover {\r\n  background: rgba(54, 50, 119, 0.8);\r\n}\r\n\r\n.button:focus {\r\n  border-color: #0074c2;\r\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\r\n}\r\n\r\n.leftContainer {\r\n   float:left;\r\n}\r\n\r\n.rightContainer {\r\n   float:right;\r\n}\r\n\r\n\r\n.icon {\r\n  display: inline-block;\r\n  margin: -2px 12px -2px 0;\r\n  width: 20px;\r\n  height: 20px;\r\n  vertical-align: middle;\r\n  fill: currentColor;\r\n}\r\n\r\n.lineThrough {\r\n  position: relative;\r\n  z-index: 1;\r\n  display: block;\r\n  margin-bottom: 15px;\r\n  width: 100%;\r\n  color: #757575;\r\n  text-align: center;\r\n  font-size: 80%;\r\n}\r\n\r\n.lineThrough::before {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: -1;\r\n  margin-top: -5px;\r\n  margin-left: -20px;\r\n  width: 40px;\r\n  height: 10px;\r\n  background-color: #fff;\r\n  content: '';\r\n}\r\n\r\n.lineThrough::after {\r\n  position: absolute;\r\n  top: 49%;\r\n  z-index: -2;\r\n  display: block;\r\n  width: 100%;\r\n  border-bottom: 1px solid #ddd;\r\n  content: '';\r\n}\r\n#lastname{\r\n    max-width:100px;\r\n    float:left;\r\n}\r\n\r\n.squaredOne {\r\n  width: 28px;\r\n  height: 28px;\r\n  position: relative;\r\n  margin: 20px auto;\r\n  background: #fcfff4;\r\n  background: linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #b3bead 100%);\r\n  box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\r\n  label {\r\n    width: 20px;\r\n    height: 20px;\r\n    position: absolute;\r\n    top: 4px;\r\n    left: 4px;\r\n    cursor: pointer;\r\n    background: linear-gradient(top, #222 0%, #45484d 100%);\r\n    box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,1);\r\n    &:after {\r\n      content: '';\r\n      width: 16px;\r\n      height: 16px;\r\n      position: absolute;\r\n      top: 2px;\r\n      left: 2px;\r\n      background: $activeColor;\r\n      background: linear-gradient(top, $activeColor 0%, $darkenColor 100%);\r\n      box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0,0,0,0.5);\r\n      opacity: 0;\r\n    }\r\n    &:hover::after {\r\n      opacity: 0.3;\r\n    }\r\n  }\r\n  input[type=checkbox] {\r\n    visibility: hidden;\r\n    &:checked + label:after {\r\n      opacity: 1;\r\n    }   \r\n  } \r\n}"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Cateringbooking_root_1Q_",
  	"container": "Cateringbooking_container_23u",
  	"lead": "Cateringbooking_lead_1Z7",
  	"formGroup": "Cateringbooking_formGroup_1r6",
  	"label": "Cateringbooking_label_3Y1",
  	"input": "Cateringbooking_input_3_y",
  	"button": "Cateringbooking_button_tVd",
  	"leftContainer": "Cateringbooking_leftContainer_L21",
  	"rightContainer": "Cateringbooking_rightContainer_1uZ",
  	"icon": "Cateringbooking_icon_22O",
  	"lineThrough": "Cateringbooking_lineThrough_1jF",
  	"lastname": "Cateringbooking_lastname_167",
  	"squaredOne": "Cateringbooking_squaredOne_2bf"
  };

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

  var extend = __webpack_require__(216);
  
  function Assets(options) {
    if (!(this instanceof Assets)) {
      return new Assets(options);
    }
  
    this.options = extend({}, options);
    Object.freeze(this);
  }
  
  ['data', 'path', 'size', 'url'].forEach(function (resolver) {
    Assets[resolver] = __webpack_require__(217)("./" + resolver);
    Assets.prototype[resolver] = function (path, callback) {
      return Assets[resolver](path, this.options, callback);
    };
  });
  
  module.exports = Assets;


/***/ },
/* 216 */
/***/ function(module, exports) {

  module.exports = require("lodash/object/extend");

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

  var map = {
  	"./__utils__/composeAbsolutePathname": 218,
  	"./__utils__/composeAbsolutePathname.js": 218,
  	"./__utils__/composeQueryString": 222,
  	"./__utils__/composeQueryString.js": 222,
  	"./__utils__/composeRelativePathname": 223,
  	"./__utils__/composeRelativePathname.js": 223,
  	"./__utils__/convertPathToUrl": 219,
  	"./__utils__/convertPathToUrl.js": 219,
  	"./__utils__/defaultCachebuster": 224,
  	"./__utils__/defaultCachebuster.js": 224,
  	"./__utils__/encodeBuffer": 226,
  	"./__utils__/encodeBuffer.js": 226,
  	"./__utils__/ensureTrailingSlash": 220,
  	"./__utils__/ensureTrailingSlash.js": 220,
  	"./__utils__/exists": 227,
  	"./__utils__/exists.js": 227,
  	"./data": 228,
  	"./data.js": 228,
  	"./index": 215,
  	"./index.js": 215,
  	"./path": 230,
  	"./path.js": 230,
  	"./size": 234,
  	"./size.js": 234,
  	"./url": 236,
  	"./url.js": 236
  };
  function webpackContext(req) {
  	return __webpack_require__(webpackContextResolve(req));
  };
  function webpackContextResolve(req) {
  	return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
  };
  webpackContext.keys = function webpackContextKeys() {
  	return Object.keys(map);
  };
  webpackContext.resolve = webpackContextResolve;
  module.exports = webpackContext;
  webpackContext.id = 217;


/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

  var convertPathToUrl = __webpack_require__(219);
  var ensureTrailingSlash = __webpack_require__(220);
  var path = __webpack_require__(4);
  var url = __webpack_require__(221);
  
  module.exports = function (baseUrl, basePath, resolvedPath) {
    var from = ensureTrailingSlash(baseUrl);
    var to = path.relative(basePath, resolvedPath);
    return url.resolve(from, convertPathToUrl(to));
  };


/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

  var sep = __webpack_require__(4).sep;
  
  module.exports = function (path) {
    return path.split(sep).join('/');
  };


/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

  var convertPathToUrl = __webpack_require__(219);
  var path = __webpack_require__(4);
  var url = __webpack_require__(221);
  
  module.exports = function (urlStr) {
    var urlObj = url.parse(urlStr);
    urlObj.pathname = convertPathToUrl(path.join(urlObj.pathname, path.sep));
    return url.format(urlObj);
  };


/***/ },
/* 221 */
/***/ function(module, exports) {

  module.exports = require("url");

/***/ },
/* 222 */
/***/ function(module, exports) {

  module.exports = function (current, addon) {
    if (current) {
      return current + '&' + addon;
    }
    return '?' + addon;
  };


/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

  var convertPathToUrl = __webpack_require__(219);
  var path = __webpack_require__(4);
  
  module.exports = function (basePath, relativeTo, resolvedPath) {
    var from = path.resolve(basePath, relativeTo);
    var relativePath = path.relative(from, resolvedPath);
    return convertPathToUrl(relativePath);
  };


/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

  var fs = __webpack_require__(225);
  
  module.exports = function (resolvedPath) {
    var mtime = fs.statSync(resolvedPath).mtime;
    return mtime.getTime().toString(16);
  };


/***/ },
/* 225 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 226 */
/***/ function(module, exports) {

  module.exports = function (buffer, mediaType) {
    if (mediaType === 'image/svg+xml') {
      return 'charset=utf-8,' + encodeURIComponent(buffer.toString('utf8').trim());
    }
    return 'base64,' + buffer.toString('base64');
  };


/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

  var fs = __webpack_require__(225);
  
  module.exports = function (filePath, callback) {
    fs.stat(filePath, function (err) {
      callback(err === null);
    });
  };


/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

  var encodeBuffer = __webpack_require__(226);
  var extend = __webpack_require__(216);
  var fs = __webpack_require__(225);
  var mime = __webpack_require__(229);
  var Promise = __webpack_require__(105);
  var resolvePath = __webpack_require__(230);
  var url = __webpack_require__(221);
  
  var preadFile = Promise.promisify(fs.readFile);
  
  module.exports = function (to, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
  
    options = extend({
      basePath: '.',
      loadPaths: []
    }, options);
  
    var toUrl = url.parse(to);
  
    return resolvePath(toUrl.pathname, options)
      .then(function (resolvedPath) {
        var mediaType = mime.lookup(resolvedPath);
        return preadFile(resolvedPath)
          .then(function (buffer) {
            var data = encodeBuffer(buffer, mediaType);
            return 'data:' + mediaType + ';' + data + (toUrl.hash || '');
          });
      })
      .nodeify(callback);
  };


/***/ },
/* 229 */
/***/ function(module, exports) {

  module.exports = require("mime");

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

  var async = __webpack_require__(231);
  var exists = __webpack_require__(227);
  var extend = __webpack_require__(216);
  var flatten = __webpack_require__(232);
  var glob = __webpack_require__(233);
  var path = __webpack_require__(4);
  var Promise = __webpack_require__(105);
  
  var pglob = Promise.promisify(glob);
  
  module.exports = function (to, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
  
    options = extend({
      basePath: '.',
      loadPaths: []
    }, options);
  
    var loadPaths = [].concat(options.loadPaths);
  
    return Promise.map(loadPaths, function (loadPath) {
      return pglob(loadPath, {
        cwd: options.basePath
      })
        .then(function (matchedPaths) {
          return matchedPaths.map(function (matchedPath) {
            return path.resolve(options.basePath, matchedPath, to);
          });
        });
    })
      .then(function (filePaths) {
        filePaths = flatten(filePaths);
        filePaths.unshift(path.resolve(options.basePath, to));
  
        return new Promise(function (resolve, reject) {
          async.detectSeries(filePaths, exists, function (resolvedPath) {
            if (resolvedPath) return resolve(resolvedPath);
            reject(new Error('Asset not found or unreadable: ' + to));
          });
        });
      })
      .nodeify(callback);
  };


/***/ },
/* 231 */
/***/ function(module, exports) {

  module.exports = require("async");

/***/ },
/* 232 */
/***/ function(module, exports) {

  module.exports = require("lodash/array/flatten");

/***/ },
/* 233 */
/***/ function(module, exports) {

  module.exports = require("glob");

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

  var calipers = __webpack_require__(235)('webp', 'png', 'jpeg', 'gif', 'svg');
  var Promise = __webpack_require__(105);
  var resolvePath = __webpack_require__(230);
  
  module.exports = function (to, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
  
    return resolvePath(to, options)
      .then(function (resolvedPath) {
        return calipers.measure(resolvedPath)
          .then(function (result) {
            return result.pages[0];
          })
          .catch(function (err) {
            return Promise.reject(new Error(err.message + ': ' + resolvedPath));
          });
      })
      .nodeify(callback);
  };


/***/ },
/* 235 */
/***/ function(module, exports) {

  module.exports = require("calipers");

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

  var composeAbsolutePathname = __webpack_require__(218);
  var composeQueryString = __webpack_require__(222);
  var composeRelativePathname = __webpack_require__(223);
  var defaultCachebuster = __webpack_require__(224);
  var extend = __webpack_require__(216);
  var resolvePath = __webpack_require__(230);
  var url = __webpack_require__(221);
  
  module.exports = function (to, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
  
    options = extend({
      basePath: '.',
      baseUrl: '/',
      cachebuster: false,
      relativeTo: false
    }, options);
  
    if (options.cachebuster === true) {
      options.cachebuster = defaultCachebuster;
    }
  
    var toUrl = url.parse(to);
  
    return resolvePath(decodeURI(toUrl.pathname), options)
      .then(function (resolvedPath) {
        if (options.relativeTo) {
          toUrl.pathname = composeRelativePathname(options.basePath, options.relativeTo, resolvedPath);
        } else {
          toUrl.pathname = composeAbsolutePathname(options.baseUrl, options.basePath, resolvedPath);
        }
        if (options.cachebuster) {
          var cachebusterOutput = options.cachebuster(resolvedPath, toUrl.pathname);
          if (cachebusterOutput) {
            if (typeof cachebusterOutput !== 'object') {
              toUrl.search = composeQueryString(toUrl.search, String(cachebusterOutput));
            } else {
              if (cachebusterOutput.pathname) {
                toUrl.pathname = cachebusterOutput.pathname;
              }
              if (cachebusterOutput.query) {
                toUrl.search = composeQueryString(toUrl.search, cachebusterOutput.query);
              }
            }
          }
        }
        return url.format(toUrl);
      })
      .nodeify(callback);
  };


/***/ },
/* 237 */
/***/ function(module, exports) {

  module.exports = require("mongodb");

/***/ },
/* 238 */
/***/ function(module, exports) {

  module.exports = require("express-session");

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(240);
  
  module.exports = function template(locals) {
  var jade_debug = [ new jade.DebugItem( 1, "C:\\dtsolutions\\bmfapp\\src\\views\\index.jade" ) ];
  try {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (body, css, description, entry, title, trackingId) {
  jade_debug.unshift(new jade.DebugItem( 0, "C:\\dtsolutions\\bmfapp\\src\\views\\index.jade" ));
  jade_debug.unshift(new jade.DebugItem( 1, "C:\\dtsolutions\\bmfapp\\src\\views\\index.jade" ));
  buf.push("<!DOCTYPE html>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 2, "C:\\dtsolutions\\bmfapp\\src\\views\\index.jade" ));
  buf.push("<html lang=\"\" class=\"no-js\">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 3, "C:\\dtsolutions\\bmfapp\\src\\views\\index.jade" ));
  buf.push("<head>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 4, "C:\\dtsolutions\\bmfapp\\src\\views\\index.jade" ));
  buf.push("<meta charset=\"utf-8\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 5, "C:\\dtsolutions\\bmfapp\\src\\views\\index.jade" ));
  buf.push("<meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 6, "C:\\dtsolutions\\bmfapp\\src\\views\\index.jade" ));
  buf.push("<title>" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</title>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 7, "C:\\dtsolutions\\bmfapp\\src\\views\\index.jade" ));
  buf.push("<meta name=\"description\"" + (jade.attr("description", description, true, true)) + ">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 8, "C:\\dtsolutions\\bmfapp\\src\\views\\index.jade" ));
  buf.push("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 9, "C:\\dtsolutions\\bmfapp\\src\\views\\index.jade" ));
  buf.push("<link rel=\"apple-touch-icon\" href=\"apple-touch-icon.png\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 10, "C:\\dtsolutions\\bmfapp\\src\\views\\index.jade" ));
  buf.push("<style id=\"css\">" + (null == (jade_interp = css) ? "" : jade_interp));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</style>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</head>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 11, "C:\\dtsolutions\\bmfapp\\src\\views\\index.jade" ));
  buf.push("<body>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 12, "C:\\dtsolutions\\bmfapp\\src\\views\\index.jade" ));
  buf.push("<div id=\"app\">" + (null == (jade_interp = body) ? "" : jade_interp));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</div>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 13, "C:\\dtsolutions\\bmfapp\\src\\views\\index.jade" ));
  buf.push("<script" + (jade.attr("src", entry, true, true)) + ">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</script>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 14, "C:\\dtsolutions\\bmfapp\\src\\views\\index.jade" ));
  buf.push("<script>");
  jade_debug.unshift(new jade.DebugItem( 16, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 16, jade_debug[0].filename ));
  buf.push("window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 16, jade_debug[0].filename ));
  buf.push("ga('create','" + (jade.escape((jade_interp = trackingId) == null ? '' : jade_interp)) + "','auto');ga('send','pageview')");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</script>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 17, "C:\\dtsolutions\\bmfapp\\src\\views\\index.jade" ));
  if ( trackingId)
  {
  jade_debug.unshift(new jade.DebugItem( 18, "C:\\dtsolutions\\bmfapp\\src\\views\\index.jade" ));
  jade_debug.unshift(new jade.DebugItem( 18, "C:\\dtsolutions\\bmfapp\\src\\views\\index.jade" ));
  buf.push("<script src=\"https://www.google-analytics.com/analytics.js\" async defer>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</script>");
  jade_debug.shift();
  jade_debug.shift();
  }
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</body>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</html>");
  jade_debug.shift();
  jade_debug.shift();}.call(this,"body" in locals_for_with?locals_for_with.body:typeof body!=="undefined"?body:undefined,"css" in locals_for_with?locals_for_with.css:typeof css!=="undefined"?css:undefined,"description" in locals_for_with?locals_for_with.description:typeof description!=="undefined"?description:undefined,"entry" in locals_for_with?locals_for_with.entry:typeof entry!=="undefined"?entry:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"trackingId" in locals_for_with?locals_for_with.trackingId:typeof trackingId!=="undefined"?trackingId:undefined));;return buf.join("");
  } catch (err) {
    jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "doctype html\r\nhtml(class=\"no-js\", lang=\"\")\r\n  head\r\n    meta(charset=\"utf-8\")\r\n    meta(http-equiv=\"x-ua-compatible\", content=\"ie=edge\")\r\n    title= title\r\n    meta(name=\"description\", description=description)\r\n    meta(name=\"viewport\", content=\"width=device-width, initial-scale=1\")\r\n    link(rel=\"apple-touch-icon\", href=\"apple-touch-icon.png\")\r\n    style#css!= css\r\n  body\r\n    #app!= body\r\n    script(src=entry)\r\n    script.\r\n      window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;\r\n      ga('create','#{trackingId}','auto');ga('send','pageview')\r\n    if trackingId\r\n      script(src=\"https://www.google-analytics.com/analytics.js\", async=true, defer=true)\r\n");
  }
  }

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  /**
   * Merge two attribute objects giving precedence
   * to values in object `b`. Classes are special-cased
   * allowing for arrays and merging/joining appropriately
   * resulting in a string.
   *
   * @param {Object} a
   * @param {Object} b
   * @return {Object} a
   * @api private
   */
  
  exports.merge = function merge(a, b) {
    if (arguments.length === 1) {
      var attrs = a[0];
      for (var i = 1; i < a.length; i++) {
        attrs = merge(attrs, a[i]);
      }
      return attrs;
    }
    var ac = a['class'];
    var bc = b['class'];
  
    if (ac || bc) {
      ac = ac || [];
      bc = bc || [];
      if (!Array.isArray(ac)) ac = [ac];
      if (!Array.isArray(bc)) bc = [bc];
      a['class'] = ac.concat(bc).filter(nulls);
    }
  
    for (var key in b) {
      if (key != 'class') {
        a[key] = b[key];
      }
    }
  
    return a;
  };
  
  /**
   * Filter null `val`s.
   *
   * @param {*} val
   * @return {Boolean}
   * @api private
   */
  
  function nulls(val) {
    return val != null && val !== '';
  }
  
  /**
   * join array as classes.
   *
   * @param {*} val
   * @return {String}
   */
  exports.joinClasses = joinClasses;
  function joinClasses(val) {
    return (Array.isArray(val) ? val.map(joinClasses) :
      (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
      [val]).filter(nulls).join(' ');
  }
  
  /**
   * Render the given classes.
   *
   * @param {Array} classes
   * @param {Array.<Boolean>} escaped
   * @return {String}
   */
  exports.cls = function cls(classes, escaped) {
    var buf = [];
    for (var i = 0; i < classes.length; i++) {
      if (escaped && escaped[i]) {
        buf.push(exports.escape(joinClasses([classes[i]])));
      } else {
        buf.push(joinClasses(classes[i]));
      }
    }
    var text = joinClasses(buf);
    if (text.length) {
      return ' class="' + text + '"';
    } else {
      return '';
    }
  };
  
  
  exports.style = function (val) {
    if (val && typeof val === 'object') {
      return Object.keys(val).map(function (style) {
        return style + ':' + val[style];
      }).join(';');
    } else {
      return val;
    }
  };
  /**
   * Render the given attribute.
   *
   * @param {String} key
   * @param {String} val
   * @param {Boolean} escaped
   * @param {Boolean} terse
   * @return {String}
   */
  exports.attr = function attr(key, val, escaped, terse) {
    if (key === 'style') {
      val = exports.style(val);
    }
    if ('boolean' == typeof val || null == val) {
      if (val) {
        return ' ' + (terse ? key : key + '="' + key + '"');
      } else {
        return '';
      }
    } else if (0 == key.indexOf('data') && 'string' != typeof val) {
      if (JSON.stringify(val).indexOf('&') !== -1) {
        console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                     'will be escaped to `&amp;`');
      };
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will eliminate the double quotes around dates in ' +
                     'ISO form after 2.0.0');
      }
      return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
    } else if (escaped) {
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will stringify dates in ISO form after 2.0.0');
      }
      return ' ' + key + '="' + exports.escape(val) + '"';
    } else {
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will stringify dates in ISO form after 2.0.0');
      }
      return ' ' + key + '="' + val + '"';
    }
  };
  
  /**
   * Render the given attributes object.
   *
   * @param {Object} obj
   * @param {Object} escaped
   * @return {String}
   */
  exports.attrs = function attrs(obj, terse){
    var buf = [];
  
    var keys = Object.keys(obj);
  
    if (keys.length) {
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i]
          , val = obj[key];
  
        if ('class' == key) {
          if (val = joinClasses(val)) {
            buf.push(' ' + key + '="' + val + '"');
          }
        } else {
          buf.push(exports.attr(key, val, false, terse));
        }
      }
    }
  
    return buf.join('');
  };
  
  /**
   * Escape the given string of `html`.
   *
   * @param {String} html
   * @return {String}
   * @api private
   */
  
  var jade_encode_html_rules = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  };
  var jade_match_html = /[&<>"]/g;
  
  function jade_encode_char(c) {
    return jade_encode_html_rules[c] || c;
  }
  
  exports.escape = jade_escape;
  function jade_escape(html){
    var result = String(html).replace(jade_match_html, jade_encode_char);
    if (result === '' + html) return html;
    else return result;
  };
  
  /**
   * Re-throw the given `err` in context to the
   * the jade in `filename` at the given `lineno`.
   *
   * @param {Error} err
   * @param {String} filename
   * @param {String} lineno
   * @api private
   */
  
  exports.rethrow = function rethrow(err, filename, lineno, str){
    if (!(err instanceof Error)) throw err;
    if ((typeof window != 'undefined' || !filename) && !str) {
      err.message += ' on line ' + lineno;
      throw err;
    }
    try {
      str = str || __webpack_require__(225).readFileSync(filename, 'utf8')
    } catch (ex) {
      rethrow(err, null, lineno)
    }
    var context = 3
      , lines = str.split('\n')
      , start = Math.max(lineno - context, 0)
      , end = Math.min(lines.length, lineno + context);
  
    // Error context
    var context = lines.slice(start, end).map(function(line, i){
      var curr = i + start + 1;
      return (curr == lineno ? '  > ' : '    ')
        + curr
        + '| '
        + line;
    }).join('\n');
  
    // Alter exception message
    err.path = filename;
    err.message = (filename || 'Jade') + ':' + lineno
      + '\n' + context + '\n\n' + err.message;
    throw err;
  };
  
  exports.DebugItem = function DebugItem(lineno, filename) {
    this.lineno = lineno;
    this.filename = filename;
  }


/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(240);
  
  module.exports = function template(locals) {
  var jade_debug = [ new jade.DebugItem( 1, "C:\\dtsolutions\\bmfapp\\src\\views\\error.jade" ) ];
  try {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (stack) {
  jade_debug.unshift(new jade.DebugItem( 0, "C:\\dtsolutions\\bmfapp\\src\\views\\error.jade" ));
  jade_debug.unshift(new jade.DebugItem( 1, "C:\\dtsolutions\\bmfapp\\src\\views\\error.jade" ));
  buf.push("<!DOCTYPE html>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 2, "C:\\dtsolutions\\bmfapp\\src\\views\\error.jade" ));
  buf.push("<html lang=\"en\">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 3, "C:\\dtsolutions\\bmfapp\\src\\views\\error.jade" ));
  buf.push("<head>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 4, "C:\\dtsolutions\\bmfapp\\src\\views\\error.jade" ));
  buf.push("<meta charset=\"utf-8\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 5, "C:\\dtsolutions\\bmfapp\\src\\views\\error.jade" ));
  buf.push("<title>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 5, jade_debug[0].filename ));
  buf.push("Internal Server Error");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</title>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 6, "C:\\dtsolutions\\bmfapp\\src\\views\\error.jade" ));
  buf.push("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 7, "C:\\dtsolutions\\bmfapp\\src\\views\\error.jade" ));
  buf.push("<style>");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("* {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  line-height: 1.2;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  margin: 0;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("html {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  color: #888;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  display: table;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  font-family: sans-serif;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  height: 100%;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  text-align: center;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  width: 100%;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("body {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  display: table-cell;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  vertical-align: middle;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  margin: 2em auto;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("h1 {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  color: #555;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  font-size: 2em;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  font-weight: 400;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("p {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  margin: 0 auto;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  width: 280px;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("pre {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  text-align: left;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  margin-top: 2rem;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("@media only screen and (max-width: 280px) {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  body, p {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("    width: 95%;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  }");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  h1 {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("    font-size: 1.5em;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("    margin: 0 0 0.3em;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("  }");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 56, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</style>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</head>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 57, "C:\\dtsolutions\\bmfapp\\src\\views\\error.jade" ));
  buf.push("<body>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 58, "C:\\dtsolutions\\bmfapp\\src\\views\\error.jade" ));
  buf.push("<h1>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("Internal Server Error");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</h1>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 59, "C:\\dtsolutions\\bmfapp\\src\\views\\error.jade" ));
  buf.push("<p>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 59, jade_debug[0].filename ));
  buf.push("Sorry, something went wrong.");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</p>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 60, "C:\\dtsolutions\\bmfapp\\src\\views\\error.jade" ));
  buf.push("<pre>" + (jade.escape(null == (jade_interp = stack) ? "" : jade_interp)));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</pre>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</body>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</html>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 61, "C:\\dtsolutions\\bmfapp\\src\\views\\error.jade" ));
  buf.push("<!-- IE needs 512+ bytes: http://blogs.msdn.com/b/ieinternals/archive/2010/08/19/http-error-pages-in-internet-explorer.aspx-->");
  jade_debug.shift();
  jade_debug.shift();}.call(this,"stack" in locals_for_with?locals_for_with.stack:typeof stack!=="undefined"?stack:undefined));;return buf.join("");
  } catch (err) {
    jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "doctype html\r\nhtml(lang=\"en\")\r\n  head\r\n    meta(charset=\"utf-8\")\r\n    title Internal Server Error\r\n    meta(name=\"viewport\", content=\"width=device-width, initial-scale=1\")\r\n    style.\r\n      * {\r\n        line-height: 1.2;\r\n        margin: 0;\r\n      }\r\n\r\n      html {\r\n        color: #888;\r\n        display: table;\r\n        font-family: sans-serif;\r\n        height: 100%;\r\n        text-align: center;\r\n        width: 100%;\r\n      }\r\n\r\n      body {\r\n        display: table-cell;\r\n        vertical-align: middle;\r\n        margin: 2em auto;\r\n      }\r\n\r\n      h1 {\r\n        color: #555;\r\n        font-size: 2em;\r\n        font-weight: 400;\r\n      }\r\n\r\n      p {\r\n        margin: 0 auto;\r\n        width: 280px;\r\n      }\r\n\r\n      pre {\r\n        text-align: left;\r\n        margin-top: 2rem;\r\n      }\r\n\r\n      @media only screen and (max-width: 280px) {\r\n\r\n        body, p {\r\n          width: 95%;\r\n        }\r\n\r\n        h1 {\r\n          font-size: 1.5em;\r\n          margin: 0 0 0.3em;\r\n        }\r\n\r\n      }\r\n\r\n  body\r\n    h1 Internal Server Error\r\n    p Sorry, something went wrong.\r\n    pre= stack\r\n// IE needs 512+ bytes: http://blogs.msdn.com/b/ieinternals/archive/2010/08/19/http-error-pages-in-internet-explorer.aspx\r\n");
  }
  }

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map