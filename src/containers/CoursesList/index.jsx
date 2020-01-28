import React, {Component, Fragment} from 'react';
import { withRouter } from 'react-router-dom';
import {Heading} from 'evergreen-ui';
import DataTable from '../../components/DataTable';

import './style.scss';

class CoursesList extends Component {

  render() {
    const {studentId} = this.props.match.params;
    return (
      <Fragment>
        <Heading size={800}>
          {studentId ? 
            'Student (id: ' + studentId + ')'
            :
            'Courses'
          }
        </Heading>
        <DataTable />
      </Fragment>
    );
  }
};

export default withRouter(CoursesList);
