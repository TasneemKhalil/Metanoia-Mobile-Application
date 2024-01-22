const { Router } = require('express');
const router = Router();
const tasksController = require('../controllers/tasksController');




router.get('/tasks', tasksController.tasks_get );
router.post('/taskDoneUndone', tasksController.setTask_Done_Undone_post);
router.post('/AddNewTask', tasksController.AddNewTask_post);
router.post('/updateTask', tasksController.UpdateTask_post);
// router.get('/registor', authController.registor_get);updateTask
// router.post('/registor', authController.registor_post);


module.exports = router;