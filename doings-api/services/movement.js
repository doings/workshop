
var MovementCtrl = require('./../controllers/movement.controller');

module.exports = function(app) {

  app.route('/movement')
    .get(
      MovementCtrl.getMovements
    )
    .post(
      MovementCtrl.saveMovement
    )
    .put(
      MovementCtrl.updateMovement
    )

  app.route('/movement/:movement_uuid')
    .delete(
      MovementCtrl.deleteMovement
    )
}

