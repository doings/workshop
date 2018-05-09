
var mongoose = require('mongoose');
var sha1 = require('sha1');
var jwt = require('jwt-simple');
var validator = require('validator');

var UserModel = require('./../models/user.model');

var config = require('./../config/database');

var cleanUser = function(user) {
  user.password = undefined;
  user._id = undefined;
  user.__v = undefined;
  delete user._id;
  delete user.__v;
  return user;
}

exports.cleanUser = function(user) {
  return cleanUser(user);
}

exports.signIn = function(req, res) {

  UserModel
    .findOne({
      username: req.body.username
    }, {_id: 0, __v: 0},
    function(err, user) {
      if (err) throw err;
      if (!user) {
        res.json({
          success: false,
          msg: 'User not found.'
        });
      } else {
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            var token = jwt.encode(cleanUser(user), config.secret);
            res.json({
              success: true,
              token: token
            });
          } else {
            res.json({
              success: false,
              msg: 'Wrong password.'
            });
          }
        });
      }
    });
};

exports.signUp = function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({
      success: false,
      msg: 'Please pass username and password.'
    });
  } else {

    let regexp = /^[a-zA-Z0-9-_]+$/;
    if (!req.body.username  || req.body.username.length < 5 || req.body.username.length > 20 || req.body.username.search(regexp) == -1) {
      return res.json({
        success: false,
        msg: 'Username must be an alphanumeric between 5 and 20 characters.'
      });
    }
    if (!validator.isLength(req.body.password, {
        min: 5,
        max: 40
      })) {
      return res.json({
        success: false,
        msg: 'Your password must be between 5 and 40 characters.'
      });
    }

    // create uuid
    var uuid = sha1(Date.now() + req.body.username)

    // create user
    var newUser = new UserModel(req.body);
    newUser.user_uuid = uuid;

    newUser.save(function(err, data) {
      if (err) {
        return res.json({
          success: false,
          msg: 'Username already exists. Try again.'
        });
      }
      newUser = cleanUser(newUser);
      req.user = newUser;

      var token = jwt.encode(newUser, config.secret);
      res.json({
        success: true,
        token: token
      });

    });
  }
};

exports.loginRequired = function(req, res, next) {
  var authorization = req.headers.authorization;
  try {
    var token = authorization.split(' ')[1];
    var payload = jwt.decode(token, config.secret);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).send('unauthorized');
  }
};
