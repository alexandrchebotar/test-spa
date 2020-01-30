import React, {useState} from 'react';
import {Dialog, Checkbox, SearchInput} from 'evergreen-ui';

const EditDialog = ({dataType, itemList, onCloseComplete, onConfirm}) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [filter, setFilter] = useState('');

  return (
    <Dialog
      isShown={true}
      title={`Append ${dataType}s`}
      onConfirm={close => {onConfirm(checkedItems); close();}}
      onCloseComplete={onCloseComplete}
      confirmLabel="Save"
    >
      <SearchInput
        className="search-input" placeholder="Search..." 
        onChange={e => setFilter(e.target.value.toLowerCase())}
      />
      {
        itemList
          .filter(({name}) => name.toLowerCase().includes(filter))
          .map(({name, id}) => (
            <Checkbox
              key={id}
              label={name}
              checked={checkedItems.includes(id)}
              onChange={e => {
                if (e.target.checked) {
                  setCheckedItems([...checkedItems, id])
                } else {
                  setCheckedItems(checkedItems.filter(item => item !== id))
                }
              }}
            />
          ))
      }
    </Dialog>
  );
};

export default EditDialog;
