import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Text, Heading, IconButton, SearchInput} from 'evergreen-ui';
import DataTable from '../../components/DataTable';
import EditDialog from '../../components/EditDialog';
import {addNewCourse, updateCourse, deleteCourse, changeCourcesNumberOnPage} from '../../store/actions';

import './style.scss';

const headers = ['name', 'id', 'students']

const mapDispatchToProps = (dispatch) => {
  return {    
    addNewCourse: (courseData) => dispatch(addNewCourse(courseData)),
    updateCourse: (courseData) => dispatch(updateCourse(courseData)),
    deleteCourse: (courseId) => dispatch(deleteCourse(courseId)),
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
    sortingParams: {field: 'name', direction: 'asc'},
  };

  toggleSorting = field => this.setState(({sortingParams}) => ({
    sortingParams: {
      field,
      direction: (field === sortingParams.field && sortingParams.direction === 'asc') ? 'desc' : 'asc',
    },
  }));
  getProcessedData = () => {
    const {dataFilter, sortingParams} = this.state;
    return this.props.data
      .filter(({name}) => name.toLowerCase().includes(dataFilter))
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
        if (a > b) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
        return 0;
      });
  };

  render() {
    const {students, rowsOnPage, lastId, match, addNewCourse, updateCourse, deleteCourse, changeCourcesNumberOnPage} = this.props;
    const {showAddNewCourse, sortingParams} = this.state;
    const {studentId} = match.params; 

    return (
      <Fragment>
        <Heading>
          {studentId ? students.data.find(({id}) => id === studentId).name : 'Courses'}
          {studentId &&
            <Text size={500}>
              {` (student id - ${studentId})`}
            </Text>
          }
        </Heading>
        <IconButton className="add-button" icon="plus" appearance="primary" intent="success" onClick={() => this.setState({showAddNewCourse: true})} />
        <SearchInput className="search-input" placeholder="Search..." onChange={e => this.setState({dataFilter: e.target.value.toLowerCase()})} />
        <DataTable
          data={this.getProcessedData()}
          rowsOnPage={rowsOnPage}
          dataType="course"
          headers={headers}
          updateRow={updateCourse}
          deleteRow={deleteCourse}
          setRowsOnPage={changeCourcesNumberOnPage}
          sortingParams={sortingParams}
          toggleSorting={this.toggleSorting}
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
