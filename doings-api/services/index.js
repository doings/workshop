
module.exports = function(app) {

  app.route('/')
    .get(function (req, res) {
      res.send('Get World!')
    })
    .post(function (req, res) {
      res.send('Post World!')
    })
    .put(function (req, res) {
      res.send('Put World!')
    })
    .delete(function (req, res) {
      res.send('Delete World!')
    })
}