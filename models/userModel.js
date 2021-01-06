var mongoose = require('mongoose');
Absence = require('./absenceModel');

// Setup schema
var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
	},
	color: {
		type: String,
		default: '#cfcfcf'
	},
    absences: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Absence'
	}],
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export User model
var User = module.exports = mongoose.model('User', userSchema);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}