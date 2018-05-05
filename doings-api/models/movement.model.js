
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movementSchema = new Schema({
  movement_uuid: {
    type: String,
    unique: true,
    required: true
  },
  concept: String,
  // balance - income - outcome
  type: String,
  date: Date,
  amount: Number,
  created_at: Date,
  updated_at: Date
});
movementSchema.index({
  movement_uuid: 1,
  type: 1
});

movementSchema.pre('save', function(next) {
  var movement = this;
  const currentDate = new Date();

  this.updated_at = currentDate;
  this.amount = movement.amount ? movement.amount : 0;

  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

module.exports = mongoose.model('Movement', movementSchema);