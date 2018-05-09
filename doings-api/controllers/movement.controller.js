
var mongoose = require('mongoose');
var sha1 = require('sha1');

var MovementModel = require('./../models/movement.model');
var UserModel = require('./../models/user.model');

exports.getMovements = function(req, res, next) {

  var user_uuid = req.user.user_uuid;

  MovementModel.find({
    user_uuid: user_uuid
  }, {
      _id: 0,
      __v: 0
    },
    function(err, movements) {
      if (err) throw err;
      if (!movements) {
        res.json({
          success: false,
          msg: 'Movements not found.'
        });
      } else {
        res.json({
          success: true,
          movements: movements
        });
      }
    });
};

exports.saveMovement = function(req, res, next) {

  if (!req.body.concept) {
    res.json({
      success: false,
      msg: 'Please insert the movement concept.'
    });
  } else {

    var user_uuid = req.user.user_uuid;

    UserModel
      .findOne({
        user_uuid: user_uuid
    }, {},
    function(err, user) {
      if (err || !user) {
        res.json({
          success: false,
          msg: 'User not found.'
        });
        return;
      }
      // create uuid
      var uuid = sha1(Date.now() + user_uuid + req.body.amount + req.body.concept)

      var newMovement = new MovementModel(req.body);
      newMovement.user_uuid = user_uuid;
      newMovement.movement_uuid = uuid;
      newMovement.save(function(err) {
        if (err) {
          return res.json({
            success: false,
            msg: 'Movement save error'
          });
        }
        user.movements.push(newMovement);
        user.save(function(err, data) {
          newMovement._id = undefined;
          newMovement.__v = undefined;
          res.json({
            success: true,
            movement: newMovement
          });
        });
      });
    });
  }
};

exports.updateMovement = function(req, res, next) {

  var user_uuid = req.user.user_uuid;

  MovementModel
    .findOne({
      movement_uuid: req.body.movement_uuid,
      user_uuid: user_uuid
    }, {},
    function(err, movement) {
      if (err || !movement) {
        res.json({
          success: false,
          msg: 'Movement not found.'
        });
      } else {
        movement.concept = req.body.concept,
        movement.type = req.body.type,
        movement.date = req.body.date,
        movement.amount = req.body.amount
        movement.save(function(err, data) {
          res.json({
            success: true,
            movement: movement
          });
        });
      }
    });
};

exports.deleteMovement = function(req, res, next) {

  var user_uuid = req.user.user_uuid;

  MovementModel.findOneAndRemove({
    movement_uuid: req.params.movement_uuid,
    user_uuid: user_uuid
  }, {},
  function(err, deleted) {
    UserModel.findOneAndUpdate(
      {
        user_uuid: user_uuid
      },
      // no _id it is array of objectId not object with _ids
      { $pull: { movements: deleted.id  } },
      { new: true },
      function(err, removedFromUser) {
        if (err) { console.error(err) }
        res.status(200).send(removedFromUser)
      })
  });

};