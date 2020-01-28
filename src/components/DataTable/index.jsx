import React, {Component, Fragment} from 'react';
import {Table} from 'evergreen-ui';
import Pagination from './Pagination';

import './style.scss';

class DataTable extends Component {

  render = () => {
    return (
      <Fragment>
        Here will be table
        <Table>
          
        </Table>
        <Pagination />
      </Fragment>
    );
  }
};

export default DataTable;
