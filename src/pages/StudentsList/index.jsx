import React, {Component, Fragment} from 'react';
import { withRouter } from 'react-router-dom';
import {Heading} from 'evergreen-ui';
import DataTable from '../../components/DataTable';

import './style.scss';

class StudentsList extends Component {

  render() {
    const {courseId} = this.props.match.params;
    return (
      <Fragment>
        <Heading size={800}>
          {courseId ? 
            'Course (id: ' + courseId + ')'
            :
            'Students'
          }
        </Heading>
        {/* <DataTable /> */}
      </Fragment>
    );
  }
};

export default withRouter(StudentsList);
