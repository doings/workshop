
var mongoose = require('mongoose');
var sha1 = require('sha1');

var MovementModel = require('./../models/movement.model');

exports.getMovements = function(req, res, next) {

  MovementModel.find({}, {
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

    // create uuid
    var uuid = sha1(Date.now() + req.body.amount + req.body.concept)

    var newMovement = new MovementModel(req.body);
    newMovement.movement_uuid = uuid;
    newMovement.save(function(err) {
      if (err) {
        return res.json({
          success: false,
          msg: 'Uuid already exists. Try again.'
        });
      }
      newMovement._id = undefined;
      newMovement.__v = undefined;
      res.json({
        success: true,
        movement: newMovement
      });
    });
  }
};

exports.updateMovement = function(req, res, next) {

  MovementModel
    .findOne({
      movement_uuid: req.body.movement_uuid
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

  MovementModel.findOneAndRemove({
    movement_uuid: req.params.movement_uuid
  }, {},
  function(err, deleted) {
    res.json({
      success: true,
      deleted: deleted
    });
  })
};