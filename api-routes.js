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
 *       - name: name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: color
 *         in: formData
 *         type: string
 *       - name: abscences
 *         in: formData
 *         type: array
 *         items: 
 *           type: object
 *           $ref: '#/definitions/Abscence'
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
 *       - name: name
 *         in: formData
 *         type: string
 *       - name: color
 *         in: formData
 *         type: string
 *       - name: abscences
 *         in: formData
 *         type: array
 *         items: 
 *           type: object
 *           $ref: '#/definitions/Abscence'
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
 *       - name: name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: color
 *         in: formData
 *         type: string
 *       - name: abscences
 *         in: formData
 *         type: array
 *         items: 
 *           type: object
 *           $ref: '#/definitions/Abscence'
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
 *       - name: date
 *         in: formData
 *         schema:
 *           type: string
 *           format: date
 *       - name: meal
 *         in: formData
 *         schema:
 *           type: string
 *           enum: [LUNCH, DINNER]
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