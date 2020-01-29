import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Heading, IconButton, SearchInput} from 'evergreen-ui';
import DataTable from '../../components/DataTable';
import EditDialog from '../../components/EditDialog';
import {addNewCourse, updateCourse, deleteCourse} from '../../store/actions';

import './style.scss';

const headers = ['name', 'id', 'students']

const mapDispatchToProps = (dispatch) => {
  return {    
    addNewCourse: (courseData) => dispatch(addNewCourse(courseData)),
    updateCourse: (courseData) => dispatch(updateCourse(courseData)),
    deleteCourse: (courseId) => dispatch(deleteCourse(courseId)),
  }
};
const mapStateToProps = ({courses}) => {
  return {...courses};
};

class CoursesList extends Component {
  state = {
    dataFilter: '',
    showAddNewCourse: false,
  };

  render() {
    const {data, rowsOnPage, lastId, match, addNewCourse, updateCourse, deleteCourse} = this.props;
    const {dataFilter, showAddNewCourse} = this.state;
    const {studentId} = match.params;
    const filteredData = data.filter(({name}) => name.toLocaleLowerCase().includes(dataFilter))
    return (
      <Fragment>
        <Heading size={800} marginBottom={6} >
          {studentId ? 
            'Student (id: ' + studentId + ')'
            :
            'Courses'
          }
        </Heading>
        <IconButton icon="plus" appearance="primary" intent="success" onClick={() => this.setState({showAddNewCourse: true})} />
        <SearchInput placeholder="Search..." onChange={e => this.setState({filter: e.target.value.toLocaleLowerCase()})} />
        <DataTable
          data={filteredData}
          rowsOnPage={rowsOnPage}
          dataType="course"
          headers={headers}
          updateRow={updateCourse}
          deleteRow={deleteCourse}
        />
        {showAddNewCourse &&
          <EditDialog
            dataType="course"
            lastId={lastId}
            onConfirm={addNewCourse}
            onCloseComplete={() => this.setState({showAddNewCourse: false})}
          />
        }
      </Fragment>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CoursesList));
