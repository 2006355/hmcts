import express from 'express';
import taskController from './taskControllor.js';
const router = express.Router();

router.route('/task')
    .post(taskController.create)
    .get(taskController.list);
router.route('/task/:id')
    .get(taskController.read)
    .put(taskController.update)
    .delete(taskController.remove);

router.param('id', taskController.taskByID);

export default router;