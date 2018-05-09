
var UserCtrl = require('./../controllers/user.controller');

module.exports = function(app) {

  app.route('/user/signin')
    .post(
      UserCtrl.signIn
    )

  app.route('/user/signup')
    .post(
      UserCtrl.signUp
    )

}

