import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import {Table, IconButton} from 'evergreen-ui';
import Pagination from './Pagination';
import DeleteDialog from '../DeleteDialog';
import EditDialog from '../EditDialog';

import './style.scss';

const DataTable = ({headers, data, dataType, updateRow, deleteRow, rowsOnPage, setRowsOnPage}) => {
  let history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  // const [rowsOnPage, setRowsOnPage] = useState(5);
  const [deleteRowId, setDeleteRowId] = useState(null);
  const [editRowId, setEditRowId] = useState(null);
  useEffect(() => {setCurrentPage(1)}, [data, rowsOnPage]);
  const pageCount = Math.ceil(data.length / rowsOnPage);
  const startIndex = (currentPage-1)*rowsOnPage;
  const pageData = data.slice(startIndex, startIndex + rowsOnPage);
  const headersWithoutName = headers.filter(name => name !== 'name');
  return (
    <div className="data-table">
      <Table border >
        <Table.Head paddingRight={120} >
          <Table.TextHeaderCell> Name </Table.TextHeaderCell>
          {headersWithoutName.map(name => (
            <Table.TextHeaderCell key={name} flexBasis={120} flexShrink={0} flexGrow={0} textAlign="center" >
              {name}
            </Table.TextHeaderCell>
          ))}
        </Table.Head>
        <Table.Body>
          {pageData.map(row => (
              <Table.Row key={row.id} isSelectable onSelect={() => history.push('/' + dataType +'/' + row.id)}
              >
                  <Table.TextCell> {row.name} </Table.TextCell>
                {headersWithoutName.map(name => (
                  <Table.TextCell key={name} flexBasis={120} flexShrink={0} flexGrow={0} textAlign="center">
                    {row[name]}
                  </Table.TextCell>
                ))}
                <Table.Cell flexBasis={120} flexShrink={0} flexGrow={0} textAlign="center">
                  <IconButton icon="edit" appearance="minimal" intent="success" onClick={e => {
                    setEditRowId(row.id);
                    e.stopPropagation();
                  }} />
                  <IconButton icon="trash" appearance="minimal" intent="danger" onClick={e => {
                    setDeleteRowId(row.id);
                    e.stopPropagation();
                  }} />
                </Table.Cell>
              </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        rowsOnPage={rowsOnPage}
        setCurrentPage={setCurrentPage}
        setRowsOnPage={setRowsOnPage}
      />
      {editRowId &&
        <EditDialog
        dataType={dataType}
        rowData={data.find(row => row.id === editRowId)}
        onConfirm={updateRow}
        onCloseComplete={() => setEditRowId(null)}
        />
      }
      {deleteRowId &&
        <DeleteDialog
          dataType={dataType}
          rowData={data.find(row => row.id === deleteRowId)}
          onConfirm={deleteRow}
          onCloseComplete={() => setDeleteRowId(null)}
        />
      }
    </div>
  );
};

export default DataTable;
