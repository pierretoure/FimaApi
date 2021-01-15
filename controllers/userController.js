User = require('../models/userModel');
Absence = require('../models/absenceModel');

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

exports.getAllAbsences = function (req, res) {
	Absence.find({user: req.params.user_id}, function (err, absences) {
        if (err)
			res.send(err);
		else {
			res.json({
				status: 'success',
				message: 'Absences retrieved successfully',
				data: absences
			});
		}
	});
};

exports.getOneAbsence = function (req, res) {
	Absence.find({
		_id: req.params.absence_id,
		user: req.params.user_id
	}, function (err, absence) {
        if (err)
			res.send(err);
		else {
			res.json({
				status: 'success',
				message: 'Absence retrieved successfully',
				data: absence
			});
		}
	});
};

exports.newAbsence = function (req, res) {
    var absence = new Absence();
	absence.user = req.params.user_id;
	absence.date = req.body.date;
	absence.meal = req.body.meal 
		? req.body.meal 
		: new Date(date).getHours() < 17 
			? 'LUNCH' 
			: 'DINNER';
    absence.save(function (err) {
        if (err)
            res.send(err);
		else res.json({
			status: 'success',
            message: 'New absence created!',
            data: absence
        });
    });
};

exports.newAbsences = function (req, res) {
	console.log(req.body);
	var newAbsences = JSON.parse(req.body.absences).map((_absence) => {
		var absence = new Absence();
		absence.user = req.params.user_id;
		absence.date = _absence.date;
		absence.meal = _absence.meal
			? _absence.meal 
			: new Date(absence.date).getHours() < 17 
				? 'LUNCH' 
				: 'DINNER';
		absence.save(function (err) {
			if (err)
				res.send(err);
			else newAbsences.push(absence);
		});
		return absence;
	});
	res.json({
		status: 'success',
		message: 'Multiple absences created!',
		data: newAbsences
	});
};

exports.updateAbsence = function (req, res) {
	Absence.find({
		_id: req.params.absence_id,
		user: req.params.user_id
	}, function (err, absence) {
        if (err)
			res.send(err);
		else {
			absence.date = req.body.date ? req.body.date : absence.date;
			absence.meal = req.body.meal ? req.body.meal : absence.meal;
			absence.save(function (err) {
				if (err)
					res.json(err);
				else
					res.json({
						status: 'success',
						message: 'Absence updated',
						data: absence
					});
			});
		}
    });
};

exports.deleteAbsence = function (req, res) {
	Absence.deleteOne({
		_id: req.params.absence_id,
		user: req.params.user_id
	}, function (err, absence) {
        if (err)
			res.send(err);
		else res.json({
			status: 'success',
			message: `Absence deleted.`
		});
	});
};

exports.deleteAbsences = function (req, res) {
	Absence.deleteMany({
		_id: {
			$in: JSON.parse(req.query.absences)
		},
		user: req.params.user_id
	}, function (err, absence) {
        if (err)
			res.send(err);
		else res.json({
			status: 'success',
			message: `Absences deleted.`
		});
	});
};
