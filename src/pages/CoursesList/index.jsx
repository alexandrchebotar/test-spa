import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Heading, IconButton, SearchInput} from 'evergreen-ui';
import DataTable from '../../components/DataTable';
import EditDialog from '../../components/EditDialog';
import {addCourse, updateCourse, deleteCourse} from '../../store/actions';

import './style.scss';

const headers = ['name', 'id', 'students']

const mapDispatchToProps = (dispatch) => {
  return {    
    addCourse: (courceData) => dispatch(addCourse(courceData)),
    updateCourse: (courceData) => dispatch(updateCourse(courceData)),
    deleteCourse: (courceData) => dispatch(deleteCourse(courceData)),
  }
};
const mapStateToProps = ({courses}) => {
  return {...courses};
};

class CoursesList extends Component {
  state = {
    dataFilter: '',
    addNewCourse: false,
  };

  render() {
    const {data, rowsOnPage, lastId, match, addCourse, updateCourse, deleteCourse} = this.props;
    const {dataFilter, addNewCourse} = this.state;
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
        <IconButton icon="plus" appearance="primary" intent="success" onClick={() => this.setState({addNewCourse: true})} />
        <SearchInput placeholder="Search..." onChange={e => this.setState({filter: e.target.value.toLocaleLowerCase()})} />
        <DataTable
          data={filteredData}
          rowsOnPage={rowsOnPage}
          dataType="courses"
          headers={headers}
          updateRow={updateCourse}
          deleteRow={deleteCourse}
        />
        {addNewCourse &&
          <EditDialog
            dataType="courses"
            lastId={lastId}
            onConfirm={addCourse}
            onCloseComplete={() => this.setState({addNewCourse: false})}
          />
        }
      </Fragment>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CoursesList));
