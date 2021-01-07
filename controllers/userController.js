User = require('../models/userModel');

exports.getAll = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        else res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};

exports.new = function (req, res) {
    var user = new User();
	user.name = req.body.name ? req.body.name : user.name;
	user.color = req.body.color;
    user.absences = req.body.absences;
    user.save(function (err) {
        if (err)
            res.send(err);
		else res.json({
			status: 'success',
            message: 'New user created!',
            data: user
        });
    });
};

exports.getOne = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        else res.json({
			status: 'success',
            message: 'User details loading..',
            data: user
        });
    });
};

exports.update = function (req, res) {
	User.findById(req.params.user_id, function (err, user) {
        if (err)
			res.send(err);
		else {
			user.color = req.body.color ? req.body.color : (user.color ? user.color : "#000000");
			user.absences = req.body.absences ? req.body.absences : (user.absences ? user.absences : null);
			user.save(function (err) {
				if (err)
					res.json(err);
				else
					res.json({
						status: 'success',
						message: 'User Info updated',
						data: user
					});
			});
		}
    });
};

exports.delete = function (req, res) {
    User.deleteOne({
        _id: req.params.user_id
    }, function (err, user) {
        if (err)
            res.send(err);
		else res.json({
			status: "success",
			message: `User deleted.`
        });
    });
};

exports.addAbsence = function (req, res) {
	User.findById(req.params.user_id, function (err, user) {
        if (err)
			res.send(err);
		else {
			user.absences = [...user.absences, req.body];
			user.save(function (err) {
				if (err)
					res.json(err);
				res.json({
					status: 'success',
					message: 'Added absence for user',
					data: user
				});
			});
		}
	});
};

exports.deleteAbsence = function (req, res) {
	User.findById(req.params.user_id, function (err, user) {
        if (err)
			res.send(err);
		else {
			user.absences = user.absences.filter((absence) => !absence._id.equals(req.params.absence_id));
			user.save(function (err) {
				if (err)
					res.json(err);
				res.json({
					status: 'success',
					message: 'Absence deleted for user',
					data: user
				});
			});
		}
	});
};
