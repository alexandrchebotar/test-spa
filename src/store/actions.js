import {
  ADD_NEW_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
  CHANGE_COURCES_NUMBER_ON_PAGE,
  ADD_NEW_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
  CHANGE_STUDENTS_NUMBER_ON_PAGE,
  ADD_COURSES_TO_STUDENT,
  ADD_STUDENTS_TO_COURSE,
  DELETE_STUDENT_FROM_COURSE,
  DELETE_COURSE_FROM_STUDENT,
} from '../constants';
import {createAction} from 'redux-actions';

export const addNewCourse = createAction(ADD_NEW_COURSE, courseData => ({courseData}));
export const updateCourse = createAction(UPDATE_COURSE, courseData => ({courseData}));
export const deleteCourse = createAction(DELETE_COURSE, courseId => ({courseId}));
export const changeCourcesNumberOnPage = createAction(CHANGE_COURCES_NUMBER_ON_PAGE, rowsOnPage => ({rowsOnPage}));
export const addNewStudent = createAction(ADD_NEW_STUDENT, studentData => ({studentData}));
export const updateStudent = createAction(UPDATE_STUDENT, studentData => ({studentData}));
export const deleteStudent = createAction(DELETE_STUDENT, studentId => ({studentId}));
export const changeStudentsNumberOnPage = createAction(CHANGE_STUDENTS_NUMBER_ON_PAGE, rowsOnPage => ({rowsOnPage}));
export const addCourseToStudent = createAction(ADD_COURSES_TO_STUDENT);
export const addStudentToCourse = createAction(ADD_STUDENTS_TO_COURSE);
export const deleteStudentFromCourse = createAction(DELETE_STUDENT_FROM_COURSE);
export const deleteCourseFromStudent = createAction(DELETE_COURSE_FROM_STUDENT);
