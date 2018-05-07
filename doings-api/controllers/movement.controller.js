
var mongoose = require('mongoose');
var sha1 = require('sha1');

var MovementModel = require('./../models/movement.model');

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
