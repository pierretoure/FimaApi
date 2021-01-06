var mongoose = require('mongoose');

// Setup schema
var shopItemSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
	},
    user: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'
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

// Export ShopItem model
var ShopItem = module.exports = mongoose.model('ShopItem', shopItemSchema);
module.exports.get = function (callback, limit) {
    ShopItem.find(callback).limit(limit);
}