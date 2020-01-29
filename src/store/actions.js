import {
  ADD_NEW_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,

  ADD_COURSES_DATA,
  REPLACE_COURSES_DATA,
  ADD_COURSE,
  // END_SEARCH_PLAYERS,
  // CLEAR_SEARCH,
  // CLEAR_SEARCH_FILTER,
  // MARK_NEWS,
} from '../common/constants';
import {createAction} from 'redux-actions';
// import coursesJSON from './courses.json';
// import studentsJSON from './students.json';

export const addNewCourse = createAction(ADD_NEW_COURSE, courseData => ({courseData}));
export const updateCourse = createAction(UPDATE_COURSE, courseData => ({courseData}));
export const deleteCourse = createAction(DELETE_COURSE, courseId => ({courseId}));


export const addCoursesData = createAction(ADD_COURSES_DATA, courses => ({courses}));
export const replaceCoursesData = createAction(REPLACE_COURSES_DATA, courses => ({courses}));


export const addCourse = createAction(ADD_COURSE, ({data, lastId}) => ({
  courses: {
    data,
    lastId,
  },
}));
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
