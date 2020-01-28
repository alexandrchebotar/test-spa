import React, {useState} from 'react';
import {Dialog, TextInputField} from 'evergreen-ui';

const EditDialog = ({dataType, row, onCloseComplete}) => {
  const textType = dataType === 'courses' ? 'course' : 'student';
  const {id = null, name = `New ${textType}`} = row;
  const [newName, setNewName] = useState(name);
  return (
    <Dialog
      isShown={true}
      title={name}
      onConfirm={close => {alert(`saved ${textType} - ${newName} (id:${id})`);close()}}
      onCloseComplete={onCloseComplete}
      confirmLabel="Save"
    >
      <TextInputField label={'Name'} value={newName} onChange={e => setNewName(e.target.value)} />
    </Dialog>
  );
};

export default EditDialog;
