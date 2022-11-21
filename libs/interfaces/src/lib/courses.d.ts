/**
 * Interface for the 'Courses' data
 */
export interface CoursesEntity {
  id: string; // Primary ID
  courseName: string;
  courseCode: string;
  courseDetail: string;
  coursePrice: number;
  startDate: Date;
  professorDetail: string;
  timeLength: string;
  maxStudent: number;
  contact: string;
}
