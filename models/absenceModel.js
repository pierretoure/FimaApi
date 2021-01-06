var mongoose = require('mongoose');

var absenceSchema = mongoose.Schema({
	date: {
		type: Date,
		required: true
	},
	meal: {
		type: String,
		enum : ['LUNCH', 'DINNER'],
		default: 'LUNCH',
		required: true
	}
});
// Export User model
var Absence = module.exports = mongoose.model('Absence', absenceSchema);
module.exports.get = function (callback, limit) {
    Absence.find(callback).limit(limit);
}