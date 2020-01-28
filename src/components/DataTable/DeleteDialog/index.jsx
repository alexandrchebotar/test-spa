import React, {Component, Fragment, useState} from 'react';
import {Dialog} from 'evergreen-ui';

const DeleteDialog = ({dataType, row, onCloseComplete}) => {
  const {id, name} = row;
  return (
    <Dialog
      isShown={true}
      title={`Delete ${name}?`}
      intent="danger"
      onConfirm={close => {alert(`deleted ${dataType} ${name} ${id}`);close()}}
      onCloseComplete={onCloseComplete}
      confirmLabel="Delete"
    >
      {`Are you sure you want to delete ${name}?`} 
    </Dialog>
  );
};

export default DeleteDialog;
