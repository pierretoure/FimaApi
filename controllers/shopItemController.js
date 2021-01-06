ShopItem = require('../models/shopItemModel');

exports.getAll = function (req, res) {
    ShopItem.get(function (err, shopItems) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "ShopItems retrieved successfully",
            data: shopItems
        });
    });
};

exports.new = function (req, res) {
    var shopItem = new ShopItem();
	shopItem.title = req.body.title;
	if (req.body.user_id !== null) shopItem.user = req.body.user_id;
    shopItem.save(function (err) {
        if (err)
            res.send(err);
		res.json({
            message: 'New shopItem created!',
            data: shopItem
        });
    });
};

exports.getOne = function (req, res) {
    ShopItem.findById(req.params.shopitem_id, function (err, shopItem) {
        if (err)
            res.send(err);
        res.json({
            message: 'ShopItem details loading..',
            data: shopItem
        });
    });
};

exports.update = function (req, res) {
	ShopItem.findById(req.params.shopitem_id, function (err, shopItem) {
        if (err)
			res.send(err);
		if (req.body.title != null) shopItem.title = req.body.title;
		shopItem.last_update = Date.now();
        shopItem.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'ShopItem Info updated',
                data: shopItem
            });
        });
    });
};

exports.delete = function (req, res) {
    ShopItem.deleteOne({
        _id: req.params.shopitem_id
    }, function (err, shopItem) {
        if (err)
            res.send(err);
			res.json({
            status: "success",
            message: 'ShopItem deleted'
        });
    });
};
