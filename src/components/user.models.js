const mongoose = require('mongoose');
const bcrypt =  require('bcrypt')
SALT_WORK_FACTOR = 10

// create a model

const UserSchema = new mongoose.Schema({
	name : { type : 'string'},
	address : { type : 'string'},})


// UserSchema.methods.comparePin = function(candidatePin, cb) {
//   bcrypt.compare(candidatePin, this.pin, function(err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

module.exports = mongoose.model('User', UserSchema);