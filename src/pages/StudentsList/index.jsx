import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Text, Heading, IconButton, SearchInput} from 'evergreen-ui';
import DataTable from '../../components/DataTable';
import EditDialog from '../../components/EditDialog';
import {addNewStudent, updateStudent, deleteStudent, changeStudentsNumberOnPage} from '../../store/actions';

import './style.scss';

const headers = ['name', 'id', 'courses']

const mapDispatchToProps = (dispatch) => {
  return {    
    addNewStudent: (studentData) => dispatch(addNewStudent(studentData)),
    updateStudent: (studentData) => dispatch(updateStudent(studentData)),
    deleteStudent: (studentId) => dispatch(deleteStudent(studentId)),
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
    const {courses, rowsOnPage, lastId, match, addNewStudent, updateStudent, deleteStudent, changeStudentsNumberOnPage} = this.props;
    const {showAddNewStudent, sortingParams} = this.state;
    const {courseId} = match.params;

    return (
      <Fragment>
        <Heading>
          {courseId ? courses.data.find(({id}) => id === courseId).name : 'Students'}
          {courseId &&
            <Text size={500}>
              {` (course id - ${courseId})`}
            </Text>
          }
        </Heading>
        <IconButton className="add-button" icon="plus" appearance="primary" intent="success" onClick={() => this.setState({showAddNewStudent: true})} />
        <SearchInput className="search-input" placeholder="Search..." onChange={e => this.setState({dataFilter: e.target.value.toLowerCase()})} />
        <DataTable
          data={this.getProcessedData()}
          rowsOnPage={rowsOnPage}
          dataType="student"
          headers={headers}
          updateRow={updateStudent}
          deleteRow={deleteStudent}
          setRowsOnPage={changeStudentsNumberOnPage}
          sortingParams={sortingParams}
          toggleSorting={this.toggleSorting}
        />
        {showAddNewStudent &&
          <EditDialog
            dataType="student"
            lastId={lastId}
            onConfirm={addNewStudent}
            onCloseComplete={() => this.setState({showAddNewStudent: false})}
          />
        }
      </Fragment>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StudentsList));
