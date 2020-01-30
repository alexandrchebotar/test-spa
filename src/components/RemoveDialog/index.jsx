import React from 'react';
import {Dialog} from 'evergreen-ui';

const DeleteDialog = ({dataType, rowData = {}, onCloseComplete, onConfirm}) => {
  const {id, name} = rowData;

  return (
    <Dialog
      isShown={true}
      title={`Remove ${name}?`}
      intent="danger"
      onConfirm={close => {onConfirm(id); close();}}
      onCloseComplete={onCloseComplete}
      confirmLabel="Remove"
    >
      {`Are you sure you want to remove ${dataType} ${name}?`} 
    </Dialog>
  );
};

export default DeleteDialog;
