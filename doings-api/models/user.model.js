
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  user_uuid: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: String,
  lang: String,
  created_at: Date,
  updated_at: Date,
  movements: [{
    type: Schema.Types.ObjectId,
    ref: 'Movement'
  }]
});
userSchema.pre('save', function(next) {
  var user = this;
  const currentDate = new Date();

  user.updated_at = currentDate;

  if (!user.created_at)
    user.created_at = currentDate;

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return ext(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function(passw, cb) {
  bcrypt.compare(passw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);