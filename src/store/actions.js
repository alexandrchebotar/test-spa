import {
  ADD_NEW_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
  CHANGE_COURCES_NUMBER_ON_PAGE,
  ADD_NEW_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
  CHANGE_STUDENTS_NUMBER_ON_PAGE,
} from '../common/constants';
import {createAction} from 'redux-actions';
// import coursesJSON from './courses.json';
// import studentsJSON from './students.json';

export const addNewCourse = createAction(ADD_NEW_COURSE, courseData => ({courseData}));
export const updateCourse = createAction(UPDATE_COURSE, courseData => ({courseData}));
export const deleteCourse = createAction(DELETE_COURSE, courseId => ({courseId}));
export const changeCourcesNumberOnPage = createAction(CHANGE_COURCES_NUMBER_ON_PAGE, rowsOnPage => ({rowsOnPage}));
export const addNewStudent = createAction(ADD_NEW_STUDENT, studentData => ({studentData}));
export const updateStudent = createAction(UPDATE_STUDENT, studentData => ({studentData}));
export const deleteStudent = createAction(DELETE_STUDENT, studentId => ({studentId}));
export const changeStudentsNumberOnPage = createAction(CHANGE_STUDENTS_NUMBER_ON_PAGE, rowsOnPage => ({rowsOnPage}));


// export const updateCourse = createAction(EDIT_COURSE, ({data}) => ({
//   courses: {
//     data,
//   },
// }));
// export const deleteCourse = createAction(DELETE_COURSE, (courceData) => ({
//   courses: {
//     data: [courceData],
//   },
// }));
// export const clearSearch = createAction(CLEAR_SEARCH, () => ({
//   search: {clubs: [], players: []},
// }));
// export const clearSearchFilter = createAction(CLEAR_SEARCH_FILTER, () => ({
//   search: {filter: []},
// }));
// export const markNews = createAction(MARK_NEWS, (news) => ({
//   currentClub: {news},
// }));

// export const initApp = () => {
//   return (dispatch, getState) => {
//     // thunk initApp

//     // get menu data

//     // send all init data to store  
//     dispatch(getInitData({
//       courses: {
//         lastID: 'C10',
//         rowsOnPage: 50,
//         data: [1,2,3],
//       },
//       students: {
//         lastID: 'S100',
//         rowsOnPage: 10,
//         data: [1,2,3],
//       },
//     }));

//   };
// };
