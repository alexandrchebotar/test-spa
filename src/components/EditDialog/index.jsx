import React, {useState} from 'react';
import {Dialog, TextInputField} from 'evergreen-ui';

const EditDialog = ({dataType, rowData = {}, onCloseComplete, onConfirm}) => {
  let {id, name = `New ${dataType}`} = rowData;
  const [newName, setNewName] = useState(name);
  //change name or create new rowData with name only
  const courseData = (!rowData.id) ? {...rowData, name: newName} : {name: newName};

  return (
    <Dialog
      isShown={true}
      title={name}
      onConfirm={close => {onConfirm(courseData); close();}}
      onCloseComplete={onCloseComplete}
      confirmLabel="Save"
    >
      <TextInputField 
        label={'Name'}
        value={newName}
        onChange={e => setNewName(e.target.value)} 
        onKeyUp={e => {
          if (e.keyCode === 13) {
            onConfirm(courseData);
            onCloseComplete();
          }
        }}
      />
    </Dialog>
  );
};

export default EditDialog;
