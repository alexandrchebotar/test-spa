import {
  ADD_COURSE,
  EDIT_COURSE,
  DELETE_COURSE,
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
    [combineActions(
      ADD_COURSE,
      // END_SEARCH_PLAYERS,
      // CLEAR_SEARCH,
      // CLEAR_SEARCH_FILTER,
      // MARK_NEWS,
    )]: (state, action) => ({
      ...state, 
      data: [...state.data, ...action.payload.courses.data],
      lastId: action.payload.courses.lastId,
    }),
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
      ADD_COURSE,
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
