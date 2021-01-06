Service = require('../models/serviceModel');
Task = require('../models/taskModel');
User = require('../models/userModel');

// exports.getAll = function (req, res) {
//     Service.get(function (err, services) {
//         if (err) {
//             res.json({
//                 status: "error",
//                 message: err,
//             });
//         }
//         res.json({
//             status: "success",
//             message: "Services retrieved successfully",
//             data: services
//         });
//     });
// };

// exports.new = function (req, res) {
//     var service = new Service();
//     service.title = req.body.title;
//     service.category = req.body.category;
//     if (req.body.contributions !== null) service.contributions = req.body.contributions;
//     if (req.body.delegated_user !== null) service.delegated_user = req.body.delegated_user;
//     if (req.body.done !== null) service.done = req.body.done;
//     service.save(function (err) {
//         if (err)
//             res.send(err);
// 		res.json({
//             message: 'New service created!',
//             data: service
//         });
//     });
// };

// exports.getOne = function (req, res) {
//     Service.findById(req.params.service_id, function (err, service) {
//         if (err)
//             res.send(err);
//         res.json({
//             message: 'Service details loading..',
//             data: service
//         });
//     });
// };

// Todo: rewrite function
// exports.update = function (req, res) {
// 	Service.findById(req.params.service_id, function (err, service) {
//         if (err)
//             res.send(err);
// 		service.users = req.body.users ? req.body.users : service.users;
// 		service.delegated_user = req.body.delegated_user ? req.body.delegated_user : service.delegated_user;
// 		service.done = req.body.done !== null ? req.body.done : service.done;
//         service.save(function (err) {
//             if (err)
//                 res.json(err);
//             res.json({
//                 message: 'Service Info updated',
//                 data: service
//             });
//         });
//     });
// };

// exports.delete = function (req, res) {
//     Service.deleteOne({
//         _id: req.params.service_id
//     }, function (err, service) {
//         if (err)
//             res.send(err);
// 			res.json({
//             status: "success",
//             message: 'Service deleted'
//         });
//     });
// };

exports.getAllTasks = function (req, res) {
	Task.find({service: req.params.service_id})
	.populate({
		path: 'user',
		select: 'name'
	})
	.exec(function (err, tasks) {
		if (err)
			res.send(err);
		res.json({
			status: 'success',
			message: "Service's tasks retrieved successfully",
			data: tasks
		});
	});
};

exports.newTask = function (req, res) {
	var task = new Task();
	task.user = req.body.user_id;
	task.service = req.params.service_id;
	task.meal = new Date().getHours() < 17 
		? 'LUNCH' 
		: 'DINNER';
    task.save(function (err) {
        if (err)
            res.send(err);
		res.json({
            message: 'New task created!',
            data: task
        });
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
			message: 'Task details loading..',
			data: task
		});
	});
};

exports.updateTask = function (req, res) {
    Task.find({
		service: req.params.service_id, 
		_id: req.params.task_id
	})
	.populate({
		path: 'user',
		select: 'name'})
	.exec(function (err, service) {
        if (err)
            res.send(err);
        res.json({
            status: 'success',
			message: "Task retrieved successfully",
            data: service
        });
    });
};

exports.deleteTask = function (req, res) {
    Task.find({
		service: req.params.service_id, 
		_id: req.params.task_id
	}, function (err, service) {
        if (err)
            res.send(err);
        res.json({
            status: 'success',
			message: "Task retrieved successfully",
            data: service
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
		res.json({
            message: 'New user created!',
            data: user
        });
    });
};

exports.getOne = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User details loading..',
            data: user
        });
    });
};

exports.update = function (req, res) {
	User.findById(req.params.user_id, function (err, user) {
        if (err)
			res.send(err);
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
