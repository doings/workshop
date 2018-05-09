
var MovementCtrl = require('./../controllers/movement.controller');
var UserCtrl = require('./../controllers/user.controller');

module.exports = function(app) {

  app.route('/movement')
    .get(
      UserCtrl.loginRequired,
      MovementCtrl.getMovements
    )
    .post(
      UserCtrl.loginRequired,
      MovementCtrl.saveMovement
    )
    .put(
      UserCtrl.loginRequired,
      MovementCtrl.updateMovement
    )

  app.route('/movement/:movement_uuid')
    .delete(
      UserCtrl.loginRequired,
      MovementCtrl.deleteMovement
    )
}

