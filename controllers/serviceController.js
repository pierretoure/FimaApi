Service = require('../models/serviceModel');
Task = require('../models/taskModel');
User = require('../models/userModel');

function areSameDay(d1, d2) {
	return d1.getFullYear() === d2.getFullYear() &&
	  d1.getMonth() === d2.getMonth() &&
	  d1.getDate() === d2.getDate();
}


exports.getAll = function (req, res) {
	Service.get(function (err, services) {
        if (err)
			res.send(err);
		else {
			res.json({
				status: 'success',
				message: 'Services retrieved successfully',
				data: services
			});
		}
	});
};

exports.getOne = function (req, res) {
	Service.find({category: req.params.service_id}, function (err, service) {
        if (err)
			res.send(err);
		else {
			res.json({
				status: 'success',
				message: 'Service retrieved successfully',
				data: service
			});
		}
	});
};

exports.new = function (req, res) {
	console.log('new service');
    var service = new Service();
	service.title = req.body.title;
	service.category = req.body.category;
	service.users = req.body.users ? req.body.users : [];
    service.save(function (err) {
        if (err)
            res.send(err);
		else res.json({
			status: 'success',
            message: 'New service created!',
            data: service
        });
    });
};

exports.update = function (req, res) {
	Service.findOne({category: req.params.service_id}, function (err, service) {
        if (err)
			res.send(err);
		else {
			service.title = req.body.title ? req.body.title : service.title;
			var bodyUsers = JSON.parse(req.body.users);
			if (bodyUsers != null) {
				User.find({_id: { "$in" : bodyUsers} }, (err, _users) => {
					if (err) res.send(err);
					else {
						service.users = _users.map((_user) => _user._id);
						service.save(function (err) {
							if (err)
								res.json(err);
							else
								res.json({
									status: 'success',
									message: 'Service updated',
									data: service
								});
						});	
					}
				});
			} else {
				service.save(function (err) {
					if (err)
						res.json(err);
					else
						res.json({
							status: 'success',
							message: 'Service updated',
							data: service
						});
				});
			}
		}
    });
};

exports.delete = function (req, res) {
	Service.deleteOne({category: req.params.service_id}, function (err, service) {
        if (err)
			res.send(err);
		else res.json({
			status: 'success',
			message: `Service deleted.`
		});
	});
};




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


areSameMeal = (a, b) => 
	areSameDay(a.date, b.date) 
		&& a.meal === b.meal;


exports.getDelegatedUser = function (req, res) {
	Service.findOne({category: req.params.service_id}, (err, service) => {
		if (err) req.send(err);
		else {
			// set contributions
			var contributions = service.users.map((_user) => { return {
				user: _user._id,
				contribution: 0
			}});

			Task.find({service: req.params.service_id}, (err, tasks) => {
				if (err) req.send(err);
				else {
					Absence.find({}, (err, _absences) => {
						if (err) req.send(err);
						else {
							var absences = _absences;
							
							// for each task, create a userCount
							tasks.forEach((_task) => {
								var userCount = contributions.length;

								// for each absences, if correspond to task, add 1 to user absent contribution
								// remove 1 to userCount and remove absence from all absences
								absences = absences.filter((_absence) => {
									if (areSameMeal(_absence, _task)){
										contributions.find((_c) => _c.user.equals(_absence.user)).contribution += 1;
										userCount -= 1;
										return false;
									}
									return true;
								});
								// add userCount to task user contribution
								contributions.find((_c) => _c.user.equals(_task.user)).contribution += userCount;
							});
							
							// remove task count to contribution of all users
							contributions.forEach((_c) => _c.contribution -= tasks.length);

							// sort and filters users to keep the one with lower contribution
							contributions.sort((a, b) => a.contribution - b.contribution);

							// get delegated user (lower contribution and present at this day / meal)
							var delegatedUser = contributions.find((_c) => {
								var now = new Absence();
								now.date = Date.now();
								now.meal = now.date.getHours() < 17
									? 'LUNCH'
									: 'DINNER';
								if (service.category === 1) return absences.filter((_absence) => _absence.user.equals(_c.user))
									.every((_absence) => !areSameMeal(now, _absence));
								else return absences.filter((_absence) => _absence.user.equals(_c.user))
									.every((_absence) => !areSameDay(now.date, _absence.date));
							});

							delegatedUser = delegatedUser.user;
							
							// Populate and send user
							User.findById(delegatedUser, (err, delegedUser) => {
								if (err) req.send(err);
								else 
								res.json({
									status: 'success',
									message: `Deleged user retrieved successfully`,
									data: delegedUser
								});
							});
						}
					});
				}
			})
		}
	})
};
