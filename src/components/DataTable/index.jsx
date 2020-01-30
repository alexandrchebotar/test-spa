import React, {Fragment, useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import {Table, TextDropdownButton, IconButton, Pane, Text, Select} from 'evergreen-ui';
import Pagination from './Pagination';
import DeleteDialog from '../DeleteDialog';
import EditDialog from '../EditDialog';
import RemoveDialog from '../RemoveDialog';

import './style.scss';

const DataTable = ({headers, data, dataType, updateRow, deleteRow, removeRow, rowsOnPage, setRowsOnPage, sortingParams, toggleSorting, removeMode}) => {
  let history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteRowId, setDeleteRowId] = useState(null);
  const [removeRowId, setRemoveRowId] = useState(null);
  const [editRowId, setEditRowId] = useState(null);
  useEffect(() => {setCurrentPage(1)}, [data, rowsOnPage]);
  const pageCount = Math.ceil(data.length / rowsOnPage);
  const startIndex = (currentPage-1)*rowsOnPage;
  const pageData = data.slice(startIndex, startIndex + rowsOnPage);
  const headersWithoutName = headers.filter(name => name !== 'name');

  return (
    <div className="data-table">
      <Pane display="flex">
        <Pane marginLeft="auto">
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            rowsOnPage={rowsOnPage}
            setCurrentPage={setCurrentPage}
            setRowsOnPage={setRowsOnPage}
          />
        </Pane>
      </Pane>
      <Table border >
        <Table.Head paddingRight={60} >
          <Table.TextHeaderCell> 
            <TextDropdownButton
              onClick={() => toggleSorting('name')}
              icon={(sortingParams.field !== 'name') ? 'blank'
                : (sortingParams.direction === 'asc') ? 'arrow-down'
                : 'arrow-up'
              }
            >
              {'Name'}
            </TextDropdownButton>
          </Table.TextHeaderCell>
          {headersWithoutName.map(name => (
            <Table.TextHeaderCell key={name} flexBasis={120} flexShrink={0} flexGrow={0} textAlign="center" >
              <TextDropdownButton
                onClick={() => toggleSorting(name)}
                icon={(sortingParams.field !== name) ? 'blank'
                  : (sortingParams.direction === 'asc') ? 'arrow-down'
                  : 'arrow-up'
                }
              >
                {name[0].toUpperCase() + name.slice(1)}
              </TextDropdownButton>
            </Table.TextHeaderCell>
          ))}
        </Table.Head>
        <Table.Body>
          {pageData.map(row => (
              <Table.Row
                key={row.id}
                isSelectable
                onSelect={() => history.push('/' + dataType +'s/' + row.id)}
              >
                <Table.TextCell> {row.name} </Table.TextCell>
                {headersWithoutName.map(name => (
                  <Table.TextCell key={name} flexBasis={120} flexShrink={0} flexGrow={0} textAlign="center">
                    {(name === 'students' || name === 'courses') ? row[name].length : row[name]}
                  </Table.TextCell>
                ))}
                <Table.Cell flexBasis={60} flexShrink={0} flexGrow={0} textAlign="center">
                  {removeMode ?
                      <IconButton
                        icon="remove" appearance="minimal" intent="danger"
                        onClick={e => {setRemoveRowId(row.id); e.stopPropagation();}}
                      />
                    :
                      <Fragment>
                        <IconButton
                          icon="edit" appearance="minimal" intent="success"
                          onClick={e => {setEditRowId(row.id); e.stopPropagation();}}
                        />
                        <IconButton
                          icon="trash" appearance="minimal" intent="danger"
                          onClick={e => {setDeleteRowId(row.id); e.stopPropagation();}}
                        />
                      </Fragment>
                  }
                </Table.Cell>
              </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Pane display="flex" >
        <Pane className="pagination" >
          <Text>{`${dataType[0].toUpperCase() + dataType.slice(1)}s on page:`}</Text>
          <Select value={rowsOnPage} onChange={e => setRowsOnPage(+e.target.value)} flex="none" width={60} height={24}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Select>
          <Text>{`, total ${dataType}s: ${data.length}.`}</Text>
        </Pane>
        <Pane marginLeft="auto">
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            rowsOnPage={rowsOnPage}
            setCurrentPage={setCurrentPage}
            setRowsOnPage={setRowsOnPage}
          />
        </Pane>
      </Pane>
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
      {removeRowId &&
        <RemoveDialog
          dataType={dataType}
          rowData={data.find(row => row.id === removeRowId)}
          onConfirm={removeRow}
          onCloseComplete={() => setRemoveRowId(null)}
        />
      }
    </div>
  );
};

export default DataTable;
