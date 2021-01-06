var mongoose = require('mongoose');

// Setup schema
var serviceSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
    category: {
        type: Number,
        required: true
	},
	contributions: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			},
			counter: {
				type: Number,
				default: 0
			}
		}
	],
	delegated_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	done: {
		type: Boolean,
		default: false
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
var Service = module.exports = mongoose.model('Service', serviceSchema);
module.exports.get = function (callback, limit) {
    Service.find(callback).limit(limit);
}