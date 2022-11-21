import { Request, Response } from 'express';
import { AppDataSource } from '../../main';
import { Course } from '../entities/Course';
import { success, error } from '../utils/response';
import { CoursesEntity } from '@demo-nx/interfaces';
import { validate } from 'class-validator';

export default class CourseController {
  static listAll = async (req: Request, res: Response) => {
    console.log('test');
    const newRepository = await AppDataSource.getRepository(Course);
    try {
      const list = await newRepository
        .createQueryBuilder('Course')
        // .where("User.role = :role", { role })
        .getMany();
      res.status(200).json(success('OK', { data: list }, res.statusCode));
    } catch (err) {
      res.status(500).json(error('Something went wrong.', res.statusCode));
    }
  };

  static addCourse = async (req: Request, res: Response) => {
    const courseparam: CoursesEntity = req.body;
    const course = new Course();
    course.contact = courseparam.contact;
    course.courseCode = courseparam.courseCode;
    course.courseDetail = courseparam.courseDetail;
    course.courseName = courseparam.courseName;
    course.coursePrice = courseparam.coursePrice;
    course.maxStudent = courseparam.maxStudent;
    course.professorDetail = courseparam.professorDetail;
    course.startDate = courseparam.startDate;
    course.timeLength = courseparam.timeLength;

    console.log(course);
    const errors = await validate(course);
    console.log('errors', errors);
    if (errors.length > 0) {
      res.status(400).json(error('Invalid Course Details!.', res.statusCode));
      return;
    }

    const newRepository = await AppDataSource.getRepository(Course);
    try {
      courseparam.id !== ''
        ? await newRepository.update(courseparam.id, course)
        : await newRepository.save(course);
      res.status(200).json(success('OK', { data: course }, res.statusCode));
      return;
    } catch (err) {
      res.status(500).json(error('Invalid Course Details!.', res.statusCode));
      return;
    }
  };

  static updateCourse = async (req: Request, res: Response) => {
    const id = req.params.id;
    const courseparam: CoursesEntity = req.body;
    console.log('courseparam', courseparam);

    const newRepository = await AppDataSource.getRepository(Course);

    const courseToUpdate = await newRepository.findOneBy({
      id: Number(id),
    });
    courseToUpdate.contact = courseparam.contact;
    courseToUpdate.courseCode = courseparam.courseCode;
    courseToUpdate.courseDetail = courseparam.courseDetail;
    courseToUpdate.courseName = courseparam.courseName;
    courseToUpdate.coursePrice = courseparam.coursePrice;
    courseToUpdate.maxStudent = courseparam.maxStudent;
    courseToUpdate.professorDetail = courseparam.professorDetail;
    courseToUpdate.startDate = courseparam.startDate;
    courseToUpdate.timeLength = courseparam.timeLength;

    console.log(courseToUpdate);
    const errors = await validate(courseToUpdate);
    console.log('errors', errors);
    if (errors.length > 0) {
      res.status(400).json(error('Invalid Course Details!.', res.statusCode));
      return;
    }

    try {
      newRepository.save(courseToUpdate);
      res
        .status(200)
        .json(success('OK', { data: courseToUpdate }, res.statusCode));
      return;
    } catch (err) {
      res.status(500).json(error('Invalid Course Details!.', res.statusCode));
      return;
    }
  };

  static deleteCourse = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = Number(req.params.id);

    const newRepository = await AppDataSource.getRepository(Course);
    try {
      const courseToUpdate = await newRepository.findOneByOrFail({
        id: Number(id),
      });
      if (courseToUpdate) {
        newRepository.delete(id);
        res
          .status(200)
          .json(success('OK', { data: courseToUpdate }, res.statusCode));
        return;
      }
    } catch (error) {
      res.status(404).send('Course not found');
      return;
    }

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
}
