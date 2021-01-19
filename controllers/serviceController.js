Service = require('../models/serviceModel');
Task = require('../models/taskModel');
User = require('../models/userModel');

function areSameDay(d1, d2) {
	return d1.getFullYear() === d2.getFullYear() &&
	  d1.getMonth() === d2.getMonth() &&
	  d1.getDate() === d2.getDate();
}

exports.getAllTasks = function (req, res) {
	Task.find({service: req.params.service_id})
	.populate({path: 'user'})
	.exec(function (err, tasks) {
		if (err)
			res.send(err);
		else res.json({
			status: 'success',
			message: "Service's tasks retrieved successfully",
			data: tasks.sort((_a, _b) => {
				let a = new Date(_a.date);
				let b = new Date(_b.date);
				if (!areSameDay(a, b)) return b.getTime()-a.getTime();
				return _a.meal === 'DINNER' ? -1 : 1;
			})
		});
	});
};

exports.newTask = function (req, res) {
	var task = new Task();
	task.user = req.body.user_id;
	task.service = req.params.service_id;
	task.meal = req.body.meal
	? req.body.meal
	: new Date().getHours() < 17 
		? 'LUNCH' 
		: 'DINNER';
	task.date = req.body.date
	? new Date(req.body.date)
	: new Date();
    task.save(function (err) {
        if (err)
            res.send(err);
		else Task.populate(task, {
			path: 'user'
		}, function(err, task) {
			if (err)
				res.send(err)
			else res.json({
				status: 'success',
				message: 'New task created!',
				data: task
			});
		})
    });
};

exports.getOneTask = function (req, res) {
    Task.find({
		service: req.params.service_id, 
		_id: req.params.task_id})
	.populate({
		path: 'user',
		select: 'name'})
	.exec(function (err, task) {
		if (err)
			res.send(err);
		res.json({
			status: 'success',
			message: 'Task details loading..',
			data: task
		});
	});
};

exports.updateTask = function (req, res) {
    Task.find({
		service: req.params.service_id, 
		_id: req.params.task_id
	}, function (err, task) {
		task.user = req.body.user_id ? req.body.user_id : task.user;
		task.meal = req.body.meal ? req.body.meal : task.meal;
		task.date = req.body.date ? req.body.date : task.date;
		task.save(function (err) {
			if (err)
				res.json(err);
			else
				res.json({
					status: 'success',
					message: 'Task Info updated',
					data: task.populate('user')
				});
		});
	});
};

exports.deleteTask = function (req, res) {
    Task.deleteOne({
		service: req.params.service_id, 
		_id: req.params.task_id
	}, function (err, service) {
        if (err)
            res.send(err);
        res.json({
            status: 'success',
			message: `Task deleted.`
        });
    });
};


exports.getDelegatedUser = function (req, res) {
    Task.aggregate(
		[
			{ $match: { service: parseInt(req.params.service_id) }},
			{ $group: { _id: "$user", count: { $sum: 1 } } },
			{ $sort: { count: 1, _id: 1 } },
			{ $unset: "count" },
			{ $limit: 1 }
		],
		function(err, result) {
			if (err) {
				res.send(err);
			} else {
				User.findById(result[0]['_id'], function (err, user) {
					if (err)
						res.send(err);
					res.json({
						status: 'success',
						message: 'Delegated user loaded',
						data: user
					});
				});
			}
		}
	);
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
			if (req.body.color != null) user.color = req.body.color;
			if (req.body.absences != null) user.absences = req.body.absences;
			user.save(function (err) {
				if (err)
					res.json(err);
				else
					res.json({
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









// TODO: rewrite task done
// exports.addTask = function (req, res) {
//     Service.findById(req.params.service_id, function (err, service) {
//         if (err)
//             res.send(err);
// 		service.populate('users');

// 		// Get additional user (when table is set, it means every user present excuded the delegated one)
// 		let additional_users = service.users.filter((user) => 
// 			(user._id !== req.params.user_id 
// 			&& !user.absence.some((absence) => 
// 				absence.date === Date.now 
// 				&& ((Date.now.getHours() < 17 && absence.meal === 'LUNCH')
// 					| (Date.now.getHours() >= 17 && absence.meal === 'DINNER')))));
		
// 		// Add value of n_additional_users to delegated user counter
// 		Counter.findOne({user: req.params.user_id}, function (err, user) {
// 			if (err)
// 				res.send(err);
// 			counter.value += additional_users.length;
// 			counter.save(function (err) {
// 				if (err)
// 					res.json(err);
// 			});
// 		});

// 		// Remove 1 to present users's counter
// 		additional_users.forEach((user) => 
// 			Counter.findOne({user: user._id, service: service._id}, function (err, counter) {
// 				if (err)
// 					res.send(err);
// 				counter.value -= 1;
// 				counter.save(function (err) {
// 					if (err)
// 						res.json(err);
// 				});
// 			}));
		
// 		// Set new delegated user depends on their counter value
// 		Counter.get(function (err, counters) {
// 			if (err)
// 				res.json(err);
// 			service.delegated_user = counters.sort((a, b) => a.value - b.value)[0].user;
// 			service.save(function (err) {
// 				if (err)
// 					res.json(err);
// 				res.json({
// 					message: 'Task done!',
// 					data: service
// 				});
// 			});
// 		});
//     });
// };
