// import React, {Component, Fragment} from 'react';
// import { withRouter } from 'react-router-dom';
// import {Heading} from 'evergreen-ui';
// import DataTable from '../../components/DataTable';

// import './style.scss';

// class StudentsList extends Component {

//   render() {
//     const {courseId} = this.props.match.params;
//     return (
//       <Fragment>
//         <Heading size={800}>
//           {courseId ? 
//             'Course (id: ' + courseId + ')'
//             :
//             'Students'
//           }
//         </Heading>
//         {/* <DataTable /> */}
//       </Fragment>
//     );
//   }
// };

// export default withRouter(StudentsList);

///////////////////////////

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
  };

  render() {
    const {data, rowsOnPage, lastId, match, addNewStudent, updateStudent, deleteStudent, changeStudentsNumberOnPage} = this.props;
    const {dataFilter, showAddNewStudent} = this.state;
    const {courseId} = match.params;
    const filteredData = data.filter(({name}) => name.toLowerCase().includes(dataFilter))
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
          data={filteredData}
          rowsOnPage={rowsOnPage}
          dataType="student"
          headers={headers}
          updateRow={updateStudent}
          deleteRow={deleteStudent}
          setRowsOnPage={changeStudentsNumberOnPage}
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
