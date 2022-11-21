import { Router } from 'express';
import CourseController from '../controllers/CourseController';

const router = Router();

//Get all users
router.get('/', CourseController.listAll);

//Create a new
router.post('/add', CourseController.addCourse);

// Update
router.patch('/update/:id([0-9]+)', CourseController.updateCourse);

//Delete
router.delete('/delete/:id([0-9]+)', CourseController.deleteCourse);

export default router;
