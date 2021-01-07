Task = require('../models/taskModel');
Counter = require('../models/taskModel');

exports.getAll = function (req, res) {
	Task.find()
		.populate({
			path: 'user'
		})
		.exec(function (err, tasks) {
			if (err) {
				res.json({
					status: "error",
					message: err,
				});
			}
			else res.json({
				status: "success",
				message: "Tasks retrieved successfully",
				data: tasks
			});
		});
};

exports.new = function (req, res) {
	var task = new Task();
	task.user = req.body.user_id;
	task.service = req.body.service_id;
	task.meal = new Date().getHours() < 17 
		? 'LUNCH' 
		: 'DINNER';
    task.save(function (err) {
        if (err)
            res.send(err);
		else res.json({
			status: 'success',
            message: 'New task created!',
            data: task
        });
    });
};

exports.getOne = function (req, res) {
	Task.findById(req.params.task_id)
		.populate('user')
		.exec(function (err, task) {
			if (err)
				res.send(err);
			else res.json({
				status: 'success',
				message: 'Task details loading..',
				data: task
			});
		});
};

// Todo: rewrite function
exports.update = function (req, res) {
	Task.findById(req.params.task_id, function (err, task) {
        if (err)
            res.send(err);
		task.user = req.body.user_id ? req.body.user_id : task.user;
		task.service = req.body.service_id ? req.body.service_id : task.service;
		task.meal = req.body.meal !== null ? req.body.meal : task.meal;
        task.save(function (err) {
            if (err)
                res.json(err);
            else res.json({
				status: 'success',
                message: 'Task Info updated',
                data: task
            });
        });
    });
};

exports.delete = function (req, res) {
    Task.deleteOne({
        _id: req.params.task_id
    }, function (err, task) {
        if (err)
            res.send(err);
		else res.json({
            status: "success",
            message: 'Task deleted'
        });
    });
};