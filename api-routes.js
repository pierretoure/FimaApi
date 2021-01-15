// Initialize express router
let router = require('express').Router();

/**
 * @swagger
 *
 * /api:
 *   get:
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 */
router.get('/', function (req, res) {
    res.json({
        status: 'success',
        message: 'FIMA Api is alive!',
    });
});

/**
 * !! Users
 */
var userController = require('./controllers/userController');

/**
 * @swagger
 *
 * /api/users:
 * 
 *   get:
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/definitions/User'
 *     tags: [Users]
 * 
 * 
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/name'
 *       - $ref: '#/parameters/color'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/User'
 *     tags: [Users]
 */
router.route('/users')
    .get(userController.getAll)
	.post(userController.new);

/**
 * @swagger
 *
 * /api/users/{user_id}:
 * 
 *   get:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/user_id'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/User'
 *     tags: [Users]
 * 
 * 
 *   patch:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/user_id'
 *       - $ref: '#/parameters/name'
 *       - $ref: '#/parameters/color'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/User'
 *     tags: [Users]
 * 
 * 
 *   put:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/user_id'
 *       - $ref: '#/parameters/name'
 *       - $ref: '#/parameters/color'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/User'
 *     tags: [Users]
 * 
 * 
 *   delete:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/user_id'
 *     responses:
 *       200:
 *         description: success
 *     tags: [Users]
 * 
 */
router.route('/users/:user_id')
    .get(userController.getOne)
    .patch(userController.update)
    .put(userController.update)
	.delete(userController.delete);

/**
 * @swagger
 *
 * /api/users/{user_id}/absences:
 * 
 *   get:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/user_id'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/definitions/Absence'
 *     tags: [Users]
 * 
 * 
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/user_id'
 *       - $ref: '#/parameters/date'
 *       - $ref: '#/parameters/meal'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/Absence'
 *     tags: [Users]
 */
router.route('/users/:user_id/absences')
	.get(userController.getAllAbsences)
	.post(userController.newAbsence);

/**
 * @swagger
 *
 * /api/users/{user_id}/absences-collection:
 * 
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/user_id'
 *       - name: absences
 *         in: formData
 *         required: true
 *         type: array
 *         items:
 *           type: object
 *           $ref: '#/definitions/Absence'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/Absence'
 *     tags: [Users]
 * 
 *   delete:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/user_id'
 *       - $ref: '#/parameters/absences'
 *     responses:
 *       200:
 *         description: success
 *     tags: [Users]
 */
router.route('/users/:user_id/absences-collection')
	.post(userController.newAbsences)
	.delete(userController.deleteAbsences);

/**
 * @swagger
 *
 * /api/users/{user_id}/absences/{absence_id}:
 * 
 *   get:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/user_id'
 *       - $ref: '#/parameters/absence_id'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/Absence'
 *     tags: [Users]
 * 
 * 
 *   patch:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/user_id'
 *       - $ref: '#/parameters/absence_id'
 *       - $ref: '#/parameters/date'
 *       - $ref: '#/parameters/meal'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/User'
 *     tags: [Users]
 * 
 * 
 *   put:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/user_id'
 *       - $ref: '#/parameters/absence_id'
 *       - $ref: '#/parameters/date'
 *       - $ref: '#/parameters/meal'
 *       - name: name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: color
 *         in: formData
 *         type: string
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/User'
 *     tags: [Users]
 * 
 * 
 *   delete:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/user_id'
 *       - $ref: '#/parameters/absence_id'
 *     responses:
 *       200:
 *         description: success
 *     tags: [Users]
 * 
 */
router.route('/users/:user_id/absences/:absence_id')
	.get(userController.getOneAbsence)
	.patch(userController.updateAbsence)
	.put(userController.updateAbsence)
	.delete(userController.deleteAbsence);

/**
 * !! Absences
 */
var absenceController = require('./controllers/absenceController');

/**
 * @swagger
 *
 * /api/absences:
 * 
 *   get:
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/definitions/Absence'
 *     tags: [Absences]
 * 
 * 
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/user_id_in_body'
 *       - $ref: '#/parameters/date'
 *       - $ref: '#/parameters/color'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/Absence'
 *     tags: [Absences]
 */
router.route('/absences')
	.get(absenceController.getAll)
	.post(absenceController.new);

/**
 * @swagger
 *
 * /api/absences/{absence_id}:
 * 
 *   get:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/absence_id'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/Absence'
 *     tags: [Absences]
 * 
 * 
 *   patch:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/absence_id'
 *       - $ref: '#/parameters/user_id_in_body_not_required'
 *       - $ref: '#/parameters/date'
 *       - $ref: '#/parameters/meal'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/Absence'
 *     tags: [Absences]
 * 
 * 
 *   put:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/absence_id'
 *       - $ref: '#/parameters/user_id_in_body'
 *       - $ref: '#/parameters/date'
 *       - $ref: '#/parameters/meal'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/Absence'
 *     tags: [Absences]
 * 
 * 
 *   delete:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/absence_id'
 *     responses:
 *       200:
 *         description: success
 *     tags: [Absences]
 * 
 */
router.route('/absences/:absence_id')
	.get(absenceController.getOne)
	.patch(absenceController.update)
	.put(absenceController.update)
	.delete(absenceController.delete);

/**
 * !! Services
 */
var serviceController = require('./controllers/serviceController');

/**
 * @swagger
 *
 * /api/services/{service_id}/tasks:
 * 
 *   get:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/service_id'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: array
 *           items: 
 *             type: object
 *             $ref: '#/definitions/Task'
 *     tags: [Services]
 * 
 * 
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/service_id'
 *       - $ref: '#/parameters/user_id_in_body'
 *       - $ref: '#/parameters/date'
 *       - $ref: '#/parameters/meal'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/Task'
 *     tags: [Services]
 */
router.route('/services/:service_id/tasks')
	.get(serviceController.getAllTasks)
	.post(serviceController.newTask);

/**
 * @swagger
 *
 * /api/services/{service_id}/tasks/{task_id}:
 * 
 *   get:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/service_id'
 *       - $ref: '#/parameters/task_id'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/Task'
 *     tags: [Services]
 * 
 * 
 *   patch:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/service_id'
 *       - $ref: '#/parameters/task_id'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/Task'
 *     tags: [Services]
 * 
 * 
 *   put:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/service_id'
 *       - $ref: '#/parameters/task_id'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/Task'
 *     tags: [Services]
 * 
 * 
 *   delete:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/service_id'
 *       - $ref: '#/parameters/task_id'
 *     responses:
 *       200:
 *         description: success
 *     tags: [Services]
 */
router.route('/services/:service_id/tasks/:task_id')
	.get(serviceController.getOneTask)
	.patch(serviceController.updateTask)
	.put(serviceController.updateTask)
	.delete(serviceController.deleteTask);

/**
 * @swagger
 *
 * /api/services/{service_id}/delegatedUser:
 *   get:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/service_id'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/User'
 *     tags: [Services]
 */
router.route('/services/:service_id/delegatedUser')
	.get(serviceController.getDelegatedUser);

/**
 * !! Tasks
 */
var taskController = require('./controllers/taskController');

/**
 * @swagger
 *
 * /api/tasks:
 *   get:
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/definitions/Task'
 *     tags: [Tasks]
 *   post:
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/Task'
 *     tags: [Tasks]
 */
router.route('/tasks')
	.get(taskController.getAll)
	.post(taskController.new);

/**
 * @swagger
 *
 * /api/tasks/{task_id}:
 *   get:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/task_id'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/Task'
 *     tags: [Tasks]
 *   patch:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/task_id'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/Task'
 *     tags: [Tasks]
 *   put:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/task_id'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/Task'
 *     tags: [Tasks]
 *   delete:
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/task_id'
 *     responses:
 *       200:
 *         description: success
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/Task'
 *     tags: [Tasks]
 */
router.route('/tasks/:task_id')
	.get(taskController.getOne)
	.patch(taskController.update)
	.put(taskController.update)
	.delete(taskController.delete);

/**
 * !! ShopItem
 */

// TODO: implements ShopItem routes

// Export API routes
module.exports = router;