import React, {Component, Fragment} from 'react';
import {Table} from 'evergreen-ui';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Pagination from '../../components/DataTable/Pagination';

import './style.scss';

class CoursesList extends Component {

  render = () => {
    return (
      <Fragment>
        This is CoursesList
        <Table>
          
        </Table>
        <Pagination />
      </Fragment>
    );
  }
};

export default CoursesList;
