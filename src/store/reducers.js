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
import {combineReducers} from 'redux'; 
import {handleActions, combineActions} from 'redux-actions';

const courses = handleActions(
  {
    [ADD_NEW_COURSE]: (state, action) => {
      const lastId = state.lastId[0] + (+state.lastId.slice(1) + 1);
      const courseData = {...action.payload.courseData, id: lastId, students: []};
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
    [combineActions(
      ADD_COURSES_TO_STUDENT,
      ADD_STUDENTS_TO_COURSE
    )]: (state, action) => {
      const {coursesId, studentsId} = action.payload;
      const data = state.data.map(courseData => {
        const {id, students} = courseData;
        return ({
          ...courseData,
          students: (coursesId.includes(id)) ? [...students, ...studentsId] : students,
        });
      });
      return ({
        ...state,
        data,
      });
    },
    [combineActions(
      DELETE_STUDENT_FROM_COURSE,
      DELETE_COURSE_FROM_STUDENT
    )]: (state, action) => {
      const {courseId, studentId} = action.payload;
      const data = state.data.map(courseData => {
        const {id, students} = courseData;
        return ({
          ...courseData,
          students: (id === courseId) ? students.filter((id) => id !== studentId) : students,
        });
      });
      return ({
        ...state,
        data,
      });
    },
    [DELETE_STUDENT]: (state, action) => {
      const {studentId} = action.payload;
      const data = state.data.map(courseData => ({
        ...courseData,
        courses: courseData.students.filter((id) => id !== studentId)
      }));
      return ({
        ...state,
        data,
      });
    },
  },
  {
    data: [
      {id: 'c1', name: 'JS', students: ['s1', 's2', 's3' ,'s4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12', 's13', 's14', 's15', 's16']},
      {id: 'c2', name: 'Python', students: ['s1', 's2', 's3' ,'s4', 's5', 's6', 's7', 's8', 's9', 's10']},
      {id: 'c3', name: 'Vue', students: ['s1', 's2', 's3' ,'s4', 's5', 's6', 's7', 's8', 's9', 's10']},
      {id: 'c4', name: 'Angular', students: ['s1', 's2', 's3' ,'s4', 's5', 's6', 's7', 's8', 's9', 's10']},
      {id: 'c5', name: 'React', students: ['s1', 's2', 's3' ,'s4', 's5', 's6', 's7', 's8', 's9', 's10']},
      {id: 'c6', name: 'C', students: ['s1', 's11', 's12', 's13', 's14', 's15', 's16']},
      {id: 'c7', name: 'C#', students: ['s1', 's11', 's12', 's13', 's14', 's15', 's16']},
      {id: 'c8', name: 'Django', students: ['s1', 's14', 's15', 's16']},
    ],
    lastId: 'c8',
    rowsOnPage: 5,
  }
);
const students = handleActions(
  {
    [ADD_NEW_STUDENT]: (state, action) => {
      const lastId = state.lastId[0] + (+state.lastId.slice(1) + 1);
      const studentData = {...action.payload.studentData, id: lastId, courses: []};
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
    [combineActions(
      ADD_COURSES_TO_STUDENT,
      ADD_STUDENTS_TO_COURSE
    )]: (state, action) => {
      const {coursesId, studentsId} = action.payload;
      const data = state.data.map(studentData => {
        const {id, courses} = studentData;
        return ({
          ...studentData,
          courses: (studentsId.includes(id)) ? [...courses, ...coursesId] : courses,
        });
      });
      return ({
        ...state,
        data,
      });
    },
    [combineActions(
      DELETE_STUDENT_FROM_COURSE,
      DELETE_COURSE_FROM_STUDENT
    )]: (state, action) => {
      const {courseId, studentId} = action.payload;
      const data = state.data.map(studentData => {
        const {id, courses} = studentData;
        return ({
          ...studentData,
          courses: (id === studentId) ? courses.filter((id) => id !== courseId) : courses,
        });
      });
      return ({
        ...state,
        data,
      });
    },
    [DELETE_COURSE]: (state, action) => {
      const {courseId} = action.payload;
      const data = state.data.map(studentData => ({
        ...studentData,
        courses: studentData.courses.filter((id) => id !== courseId)
      }));
      return ({
        ...state,
        data,
      });
    },
  },
  {
    data: [
      {id: 's1', name: 'Victoria Abril', courses: ['c1', 'c2', 'c3' ,'c4', 'c5', 'c6', 'c7', 'c8']},
      {id: 's2', name: 'Goodman Ace', courses: ['c1', 'c2', 'c3' ,'c4', 'c5']},
      {id: 's3', name: 'Johnny Ace', courses: ['c1', 'c2', 'c3' ,'c4', 'c5']},
      {id: 's4', name: 'Derek Acorah', courses: ['c1', 'c2', 'c3' ,'c4', 'c5']},
      {id: 's5', name: 'Ross Alexander', courses: ['c1', 'c2', 'c3' ,'c4', 'c5']},
      {id: 's6', name: 'Johnny Alf', courses: ['c1', 'c2', 'c3' ,'c4', 'c5']},
      {id: 's7', name: 'Rashied Ali', courses: ['c1', 'c2', 'c3' ,'c4', 'c5']},
      {id: 's8', name: 'Mary Alice', courses: ['c1', 'c2', 'c3' ,'c4', 'c5']},
      {id: 's9', name: 'Leslie Banks', courses: ['c1', 'c2', 'c3' ,'c4', 'c5']},
      {id: 's10', name: 'Harold Bennett', courses: ['c1', 'c2', 'c3' ,'c4', 'c5']},
      {id: 's11', name: 'Ivy Close', courses: ['c1', 'c6', 'c7']},
      {id: 's12', name: 'Noël Coward', courses: ['c1', 'c6', 'c7']},
      {id: 's13', name: 'Cedric Hardwicke', courses: ['c1', 'c6', 'c7']},
      {id: 's14', name: 'Kathleen Harrison', courses: ['c1', 'c6', 'c7', 'c8']},
      {id: 's15', name: 'Leslie Howard', courses: ['c1', 'c6', 'c7', 'c8']},
      {id: 's16', name: 'Jack Lambert', courses: ['c1', 'c6', 'c7', 'c8']},
    ],
    lastId: 's16',
    rowsOnPage: 10,
  }
);

export const appState = combineReducers({
  courses,
  students,
});
