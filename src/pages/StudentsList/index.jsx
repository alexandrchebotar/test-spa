import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Text, Heading, IconButton, SearchInput} from 'evergreen-ui';
import {Helmet} from 'react-helmet-async';
import DataTable from '../../components/DataTable';
import EditDialog from '../../components/EditDialog';
import AppendDialog from '../../components/AppendDialog';
import {
  addNewStudent,
  updateStudent,
  deleteStudent,
  addStudentToCourse,
  deleteStudentFromCourse,
  changeStudentsNumberOnPage
} from '../../store/actions';

const headers = ['name', 'id', 'courses']

const mapDispatchToProps = (dispatch) => {
  return {    
    addNewStudent: (studentData) => dispatch(addNewStudent(studentData)),
    addStudentsToCourse: ({coursesId, studentsId}) => dispatch(addStudentToCourse({coursesId, studentsId})),
    updateStudent: (studentData) => dispatch(updateStudent(studentData)),
    deleteStudent: (studentId) => dispatch(deleteStudent(studentId)),
    deleteStudentFromCourse: ({courseId, studentId}) => dispatch(deleteStudentFromCourse({courseId, studentId})),
    changeStudentsNumberOnPage: (rowsOnPage) => dispatch(changeStudentsNumberOnPage(rowsOnPage)),
  }
};
const mapStateToProps = ({students, courses}) => {
  return {...students, courses};
};

class StudentsList extends Component {
  state = {
    dataFilter: '',
    showAddNewStudent: false,
    showAppendStudents: false,
    sortingParams: {field: 'name', direction: 'asc'},
  };

  toggleSorting = field => this.setState(({sortingParams}) => ({
    sortingParams: {
      field,
      direction: (field === sortingParams.field && sortingParams.direction === 'asc') ? 'desc' : 'asc',
    },
  }));
  getProcessedData() {
    const {courseId} = this.props.match.params;
    const {dataFilter, sortingParams} = this.state;
    return this.props.data
      .filter(({name, courses}) => {
        if (courseId && !courses.includes(courseId)) {
          return false;
        }
        if (name.toLowerCase().includes(dataFilter)) {
          return true;
        }
        return false;
      })
      .sort((rowDataA, rowDataB) => {
        const {field, direction} = sortingParams;
        let a, b;
        if (direction === 'asc') {
          [b, a] = [rowDataB[field], rowDataA[field]];
        } else {
          [a, b] = [rowDataB[field], rowDataA[field]];
        }
        if (field === 'id') {
          [a, b] = [a, b].map(id => +id.slice(1));
        }
        if (field === 'courses') {
          [a, b] = [a, b].map(courses => courses.length);
        }
        if (a > b) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
        return 0;
      });
  };
  getVacantStudents() {
    const {courseId} = this.props.match.params;
    return this.props.data.filter(({courses}) => !courses.includes(courseId));
  };

  render() {
    const {courses, rowsOnPage, lastId, match, addNewStudent, addStudentsToCourse,
      updateStudent, deleteStudent, deleteStudentFromCourse, changeStudentsNumberOnPage} = this.props;
    const {showAddNewStudent, showAppendStudents, sortingParams} = this.state;
    const {courseId} = match.params;
    const title = courseId ? courses.data.find(({id}) => id === courseId).name : 'Students';
    const processedData = this.getProcessedData();
    const vacantStudents = courseId && this.getVacantStudents();

    return (
      <Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Heading>
          {title}
          {courseId &&
            <Text size={500}>
              {` (course id - ${courseId})`}
            </Text>
          }
        </Heading>
        <IconButton
          className="add-button" icon="plus" appearance="primary" intent="success"
          onClick={() => this.setState({[courseId ? 'showAppendStudents' : 'showAddNewStudent']: true})}
          disabled={courseId && !vacantStudents.length}
        />
        <SearchInput 
          className="search-input" placeholder="Search..." 
          onChange={e => this.setState({dataFilter: e.target.value.toLowerCase()})}
        />
        <DataTable
          data={processedData}
          rowsOnPage={rowsOnPage}
          dataType="student"
          headers={headers}
          updateRow={updateStudent}
          deleteRow={deleteStudent}
          removeRow={(studentId) => deleteStudentFromCourse({studentId, courseId})}
          setRowsOnPage={changeStudentsNumberOnPage}
          sortingParams={sortingParams}
          toggleSorting={this.toggleSorting}
          removeMode={!!courseId}
        />
        {showAddNewStudent &&
          <EditDialog
            dataType="student"
            lastId={lastId}
            onConfirm={addNewStudent}
            onCloseComplete={() => this.setState({showAddNewStudent: false})}
          />
        }
        {showAppendStudents &&
          <AppendDialog
            dataType="student"
            itemList={vacantStudents}
            onConfirm={(studentsId) => addStudentsToCourse({studentsId, coursesId: [courseId]})}
            onCloseComplete={() => this.setState({showAppendStudents: false})}
          />
        }
      </Fragment>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StudentsList));
