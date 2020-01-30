import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Text, Heading, IconButton, SearchInput} from 'evergreen-ui';
import {Helmet} from 'react-helmet-async';
import DataTable from '../../components/DataTable';
import EditDialog from '../../components/EditDialog';
import AppendDialog from '../../components/AppendDialog';
import {
  addNewCourse,
  updateCourse,
  deleteCourse,
  addCourseToStudent,
  deleteCourseFromStudent,
  changeCourcesNumberOnPage,
} from '../../store/actions';

const headers = ['name', 'id', 'students']

const mapDispatchToProps = (dispatch) => {
  return {    
    addNewCourse: (courseData) => dispatch(addNewCourse(courseData)),
    addCoursesToStudent: ({coursesId, studentsId}) => dispatch(addCourseToStudent({coursesId, studentsId})),
    updateCourse: (courseData) => dispatch(updateCourse(courseData)),
    deleteCourse: (courseId) => dispatch(deleteCourse(courseId)),
    deleteCourseFromStudent: ({courseId, studentId}) => dispatch(deleteCourseFromStudent({courseId, studentId})),
    changeCourcesNumberOnPage: (rowsOnPage) => dispatch(changeCourcesNumberOnPage(rowsOnPage)),
  }
};
const mapStateToProps = ({courses, students}) => {
  return {...courses, students};
};

class CoursesList extends Component {
  state = {
    dataFilter: '',
    showAddNewCourse: false,
    showAppendCourses: false,
    sortingParams: {field: 'name', direction: 'asc'},
  };

  toggleSorting = field => this.setState(({sortingParams}) => ({
    sortingParams: {
      field,
      direction: (field === sortingParams.field && sortingParams.direction === 'asc') ? 'desc' : 'asc',
    },
  }));
  getProcessedData() {
    const {studentId} = this.props.match.params;
    const {dataFilter, sortingParams} = this.state;
    return this.props.data
      .filter(({name, students}) => {
        if (studentId && !students.includes(studentId)) {
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
        if (field === 'students') {
          [a, b] = [a, b].map(students => students.length);
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
  getVacantCourses() {
    const {studentId} = this.props.match.params;
    return this.props.data.filter(({students}) => !students.includes(studentId));
  };

  render() {
    const {students, rowsOnPage, lastId, match, addNewCourse, addCoursesToStudent,
      updateCourse, deleteCourse, deleteCourseFromStudent, changeCourcesNumberOnPage} = this.props;
    const {showAddNewCourse, showAppendCourses, sortingParams} = this.state;
    const {studentId} = match.params;
    const title = studentId ? students.data.find(({id}) => id === studentId).name : 'Courses';
    const processedData = this.getProcessedData();
    const vacantCourses = studentId && this.getVacantCourses();

    return (
      <Fragment>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Heading>
          {title}
          {studentId &&
            <Text size={500}>
              {` (student id - ${studentId})`}
            </Text>
          }
        </Heading>
        <div className="controls">
          <IconButton
            className="add-button" icon="plus" appearance="primary" intent="success"
            onClick={() => this.setState({[studentId ? 'showAppendCourses' : 'showAddNewCourse']: true})}
            disabled={studentId && !vacantCourses.length}
          />
          <SearchInput 
            className="search-input" placeholder="Search..."
            onChange={e => this.setState({dataFilter: e.target.value.toLowerCase()})}
          />
        </div>
        <DataTable
          data={processedData}
          rowsOnPage={rowsOnPage}
          dataType="course"
          headers={headers}
          updateRow={updateCourse}
          deleteRow={deleteCourse}
          removeRow={(courseId) => deleteCourseFromStudent({courseId, studentId})}
          setRowsOnPage={changeCourcesNumberOnPage}
          sortingParams={sortingParams}
          toggleSorting={this.toggleSorting}
          removeMode={!!studentId}
        />
        {showAddNewCourse &&
          <EditDialog
            dataType="course"
            lastId={lastId}
            onConfirm={addNewCourse}
            onCloseComplete={() => this.setState({showAddNewCourse: false})}
          />
        }
        {showAppendCourses &&
          <AppendDialog
            dataType="course"
            itemList={vacantCourses}
            onConfirm={(coursesId) => addCoursesToStudent({coursesId, studentsId: [studentId]})}
            onCloseComplete={() => this.setState({showAppendCourses: false})}
          />
        }
      </Fragment>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CoursesList));
