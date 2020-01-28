import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Heading, Button, IconButton, SearchInput} from 'evergreen-ui';
import DataTable from '../../components/DataTable';

import './style.scss';

const mapDispatchToProps = (dispatch) => {
  return {    
    // addCourse: () => dispatch(addCourse()),
    // updateCourse: () => dispatch(updateCourse()),
    // deleteCourse: () => dispatch(deleteCourse()),
  }
};
const mapStateToProps = ({courses}) => {
  return {courses};
};

class CoursesList extends Component {
  state = {
    filter: '',
  };

  courses = [
    {id: 1, name: 'JS', students: 21},
    {id: 2, name: 'Python', students: 10},
    {id: 3, name: 'Vue', students: 17},
    {id: 4, name: 'Angular', students: 18},
    {id: 5, name: 'React', students: 17},
    {id: 6, name: 'C', students: 17},
    {id: 7, name: 'C#', students: 17},
    {id: 8, name: 'Django', students: 17},
  ]
  headers = ['name', 'id', 'students']

  render() {
    const {studentId} = this.props.match.params;
    const filteredData = this.courses.filter(({name}) => name.toLocaleLowerCase().includes(this.state.filter))

    return (
      <Fragment>
        <Heading size={800} marginBottom={6} >
          {studentId ? 
            'Student (id: ' + studentId + ')'
            :
            'Courses'
          }
        </Heading>
        <IconButton icon="plus" appearance="primary" intent="success" />
        <SearchInput placeholder="Search..." onChange={e => this.setState({filter: e.target.value.toLocaleLowerCase()})} />
        <DataTable data={filteredData} dataType="courses"  headers={this.headers} />
      </Fragment>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CoursesList));
