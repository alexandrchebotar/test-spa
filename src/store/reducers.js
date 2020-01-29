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
      {id: 'c1', name: 'JS', students: 21},
      {id: 'c2', name: 'Python', students: 10},
      {id: 'c3', name: 'Vue', students: 17},
      {id: 'c4', name: 'Angular', students: 18},
      {id: 'c5', name: 'React', students: 17},
      {id: 'c6', name: 'C', students: 17},
      {id: 'c7', name: 'C#', students: 17},
      {id: 'c8', name: 'Django', students: 17},
    ],
    lastId: 'c8',
    rowsOnPage: 5,
  }
);
const students = handleActions(
  {
    [ADD_NEW_STUDENT]: (state, action) => {
      const lastId = state.lastId[0] + (+state.lastId.slice(1) + 1);
      const studentData = {...action.payload.studentData, id: lastId, courses: 0};
      return ({
        ...state,
        data: [...state.data, studentData],
        lastId,
      });
    },
    [UPDATE_STUDENT]: (state, action) => {
      const {studentData} = action.payload;
      const studentId = studentData.id;
      const data = [...state.data.filter(({id}) => id !== studentId), studentData];
      return ({
        ...state,
        data,
      });
    },
    [DELETE_STUDENT]: (state, action) => {
      const {studentId} = action.payload;
      const data = state.data.filter(({id}) => id !== studentId);
      return ({
        ...state,
        data,
      });
    },
    [CHANGE_STUDENTS_NUMBER_ON_PAGE]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
  },
  {
    data: [
      {id: 's1', name: 'Victoria Abril', courses: 21},
      {id: 's2', name: 'Goodman Ace', courses: 10},
      {id: 's3', name: 'Johnny Ace', courses: 17},
      {id: 's4', name: 'Derek Acorah', courses: 18},
      {id: 's5', name: 'Ross Alexander', courses: 17},
      {id: 's6', name: 'Johnny Alf', courses: 17},
      {id: 's7', name: 'Rashied Ali', courses: 17},
      {id: 's8', name: 'Mary Alice', courses: 17},
    ],
    lastId: 's8',
    rowsOnPage: 5,
  }
);

export const appState = combineReducers({
  courses,
  students,
});
