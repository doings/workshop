
var MovementCtrl = require('./../controllers/movement.controller');

module.exports = function(app) {

  app.route('/movement')
    .get(function (req, res) {
      res.send('Get Movements')
    })
    .post(
      MovementCtrl.saveMovement
    )
    .put(function (req, res) {
      res.send('Put Movement: ' + JSON.stringify(req.body))
    })

  app.route('/movement/:movement_uuid')
    .delete(function (req, res) {
      res.send('Delete Movement: ' + JSON.stringify(req.params.movement_uuid))
    })

}