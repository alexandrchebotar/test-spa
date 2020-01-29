import {
  ADD_NEW_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
  CHANGE_COURCES_NUMBER_ON_PAGE,
} from '../common/constants';
import {combineReducers} from 'redux'; 
import {handleActions, combineActions} from 'redux-actions';
// import defaultState from './defaultState';

const courses = handleActions(
  {
    [ADD_NEW_COURSE]: (state, action) => {
      const lastId = state.lastId[0] + (+state.lastId.slice(1) + 1);
      const courseData = {...action.payload.courseData, id: lastId, students: 0};
      return ({
        ...state,
        data: [...state.data, courseData],
        lastId,
      });
    },
    [UPDATE_COURSE]: (state, action) => {
      const {courseData} = action.payload;
      const courseId = courseData.id;
      const data = [...state.data.filter(({id}) => id !== courseId), courseData];
      return ({
        ...state,
        data,
      });
    },
    [DELETE_COURSE]: (state, action) => {
      const {courseId} = action.payload;
      const data = state.data.filter(({id}) => id !== courseId);
      return ({
        ...state,
        data,
      });
    },
    [CHANGE_COURCES_NUMBER_ON_PAGE]: (state, action) => ({
        ...state,
        ...action.payload,
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
      ADD_NEW_COURSE
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
