import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Heading, IconButton, SearchInput} from 'evergreen-ui';
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
const mapStateToProps = ({students}) => {
  return {...students};
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

  render() {
    const {data, rowsOnPage, lastId, match, addNewStudent, updateStudent, deleteStudent, changeStudentsNumberOnPage} = this.props;
    const {dataFilter, showAddNewStudent, sortingParams} = this.state;
    const {courseId} = match.params;
    const processedData = data
      .filter(({name}) => name.toLowerCase().includes(dataFilter))
      .sort((stubentDataA, stubentDataB) => {
        const {field, direction} = sortingParams;
        let a, b;
        if (direction === 'asc') {
          [b, a] = [stubentDataB[field], stubentDataA[field]];
        } else {
          [a, b] = [stubentDataB[field], stubentDataA[field]];
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
          {courseId ? 
            'Course (id: ' + courseId + ')'
            :
            'Students'
          }
        </Heading>
        <IconButton className="add-button" icon="plus" appearance="primary" intent="success" onClick={() => this.setState({showAddNewStudent: true})} />
        <SearchInput className="search-input" placeholder="Search..." onChange={e => this.setState({dataFilter: e.target.value.toLowerCase()})} />
        <DataTable
          data={processedData}
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
