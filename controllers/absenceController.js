Absence = require('../models/absenceModel');



exports.getAll = function (req, res) {
	Absence.get(function (err, absences) {
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

exports.getOne = function (req, res) {
	Absence.findById(req.params.absence_id, function (err, absence) {
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

exports.new = function (req, res) {
    var absence = new Absence();
	absence.user = req.body.user_id;
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

exports.update = function (req, res) {
	Absence.findById(req.params.absence_id, function (err, absence) {
        if (err)
			res.send(err);
		else {
			absence.user = req.body.user_id ? req.body.user_id : absence.user;
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

exports.delete = function (req, res) {
	Absence.deleteOne({_id: req.params.absence_id}, function (err, absence) {
        if (err)
			res.send(err);
		else res.json({
			status: 'success',
			message: `Absence deleted.`
		});
	});
};
