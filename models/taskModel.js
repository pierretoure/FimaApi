var mongoose = require('mongoose');

// Setup schema
var taskSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	service: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		default: Date.now,
		required: true
	},
	meal: {
		type: String,
		enum : ['LUNCH', 'DINNER'],
		default: 'LUNCH',
		required: true
	},
    create_date: {
        type: Date,
        default: Date.now
    },
    last_update: {
        type: Date,
        default: Date.now
    }
});
// Export User model
var Task = module.exports = mongoose.model('Task', taskSchema);
module.exports.get = function (callback, limit) {
    Task.find(callback).limit(limit);
}