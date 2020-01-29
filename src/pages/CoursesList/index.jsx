import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Heading, IconButton, SearchInput} from 'evergreen-ui';
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
const mapStateToProps = ({courses}) => {
  return {...courses};
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

  render() {
    const {data, rowsOnPage, lastId, match, addNewCourse, updateCourse, deleteCourse, changeCourcesNumberOnPage} = this.props;
    const {dataFilter, showAddNewCourse, sortingParams} = this.state;
    const {studentId} = match.params;
    const processedData = data
      .filter(({name}) => name.toLowerCase().includes(dataFilter))
      .sort((courseDataA, courseDataB) => {
        const {field, direction} = sortingParams;
        let a, b;
        if (direction === 'asc') {
          [b, a] = [courseDataB[field], courseDataA[field]];
        } else {
          [a, b] = [courseDataB[field], courseDataA[field]];
        }
        if (a > b) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
        return 0;
      });

    return (
      <Fragment>
        <Heading size={800} marginBottom={6} >
          {studentId ? 
            'Student (id: ' + studentId + ')'
            :
            'Courses'
          }
        </Heading>
        <IconButton className="add-button" icon="plus" appearance="primary" intent="success" onClick={() => this.setState({showAddNewCourse: true})} />
        <SearchInput className="search-input" placeholder="Search..." onChange={e => this.setState({dataFilter: e.target.value.toLowerCase()})} />
        <DataTable
          data={processedData}
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
