import React, {useState} from 'react';
import {Dialog, TextInputField} from 'evergreen-ui';

const EditDialog = ({dataType, rowData = {}, lastId, onCloseComplete, onConfirm}) => {
  const textType = dataType === 'courses' ? 'course' : 'student';
  const {id = lastId[0] + (+lastId.slice(1) + 1), name = `New ${textType}`} = rowData;
  const [newName, setNewName] = useState(name);
  const confirmData = {data: []};
  if (!rowData.id) {
    confirmData.lastId = id;
    if (dataType === 'courses') {
      confirmData.data.push({id, name: newName, students: 0});
    } else {
      confirmData.data.push({id, name: newName, cources: 0});
    }
  } else {
    confirmData.data.push({...rowData, id: lastId, name: newName});
  }
  return (
    <Dialog
      isShown={true}
      title={name}
      onConfirm={close => {onConfirm(confirmData); close();}}
      onCloseComplete={onCloseComplete}
      confirmLabel="Save"
    >
      <TextInputField label={'Name'} value={newName} onChange={e => setNewName(e.target.value)} />
    </Dialog>
  );
};

export default EditDialog;
