import React from 'react';
import {Dialog} from 'evergreen-ui';

const DeleteDialog = ({dataType, rowData = {}, onCloseComplete, onConfirm}) => {
  const {id, name} = rowData;
  return (
    <Dialog
      isShown={true}
      title={`Delete ${name}?`}
      intent="danger"
      onConfirm={close => {onConfirm(id); close();}}
      onCloseComplete={onCloseComplete}
      confirmLabel="Delete"
    >
      {`Are you sure you want to delete ${dataType} ${name}?`} 
    </Dialog>
  );
};

export default DeleteDialog;
