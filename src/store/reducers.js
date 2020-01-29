import {
  ADD_NEW_COURSE,
  ADD_COURSES_DATA,
  REPLACE_COURSES_DATA,
  // ADD_COURSE,
  // EDIT_COURSE,
  // DELETE_COURSE,
  // END_SEARCH_PLAYERS,
  // CLEAR_SEARCH,
  // CLEAR_SEARCH_FILTER,
  // MARK_NEWS,
} from '../common/constants';
import {combineReducers} from 'redux'; 
import {handleActions, combineActions} from 'redux-actions';
// import defaultState from './defaultState';

const courses = handleActions(
  {
    [ADD_NEW_COURSE]: (state, action) => {
      const lastId = state.lastId[0] + (+state.lastId.slice(1) + 1);
      const courseData = {...action.payload.courses.data[0], id: lastId, students: 0};
      return ({
        ...state,
        data: [...state.data, courseData],
        lastId,
      });
    },
    [ADD_COURSES_DATA]: (state, action) => {debugger;return({
      ...state, 
      data: [...state.data, action.payload.courses.data],
      lastId: action.payload.courses.lastId,
    })},
    [REPLACE_COURSES_DATA]: (state, action) => {debugger;return({ 
      ...action.payload.courses,
    })},
  },
  {
    data: [
      {id: 'C1', name: 'JS', students: 21},
      {id: 'C2', name: 'Python', students: 10},
      {id: 'C3', name: 'Vue', students: 17},
      {id: 'C4', name: 'Angular', students: 18},
      {id: 'C5', name: 'React', students: 17},
      {id: 'C6', name: 'C', students: 17},
      {id: 'C7', name: 'C#', students: 17},
      {id: 'C8', name: 'Django', students: 17},
    ],
    lastId: 'C8',
    rowsOnPage: 5,
  }
);
const students = handleActions(
  {
    [combineActions(
      ADD_COURSES_DATA
      // END_SEARCH_PLAYERS,
      // CLEAR_SEARCH,
      // CLEAR_SEARCH_FILTER,
      // MARK_NEWS,
    )]: (state, action) => ({
      ...state, 
      ...action.payload.students,
    }),
  },
  {
    data: [],
    lastId: 'S0',
    rowsOnPage: 50,
  }
);

export const appState = combineReducers({
  courses,
  students,
});
