import {
  ADD_COURSE,
  EDIT_COURSE,
  DELETE_COURSE,
  // END_SEARCH_PLAYERS,
  // CLEAR_SEARCH,
  // CLEAR_SEARCH_FILTER,
  // MARK_NEWS,
} from '../common/constants';
import {createAction} from 'redux-actions';
// import coursesJSON from './courses.json';
// import studentsJSON from './students.json';

// export const getInitData = createAction(GET_INIT_DATA);

export const addCourse = createAction(ADD_COURSE, ({data, lastId}) => ({
  courses: {
    data,
    lastId,
  },
}));
export const updateCourse = createAction(EDIT_COURSE, (courceData) => ({
  cources: {
    data: [courceData],
  },
}));
export const deleteCourse = createAction(DELETE_COURSE, (courceData) => ({
  cources: {
    data: [courceData],
  },
}));
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
