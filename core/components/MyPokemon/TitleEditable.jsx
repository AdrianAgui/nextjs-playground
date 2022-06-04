import { useState, useRef, useEffect } from 'react';
import { updateName } from 'core/firebase/teams';

import capitalize from 'core/utils/capitalize';
import Pencil from './../Icons/Pencil';
import Save from './../Icons/Save';

export default function TitleEditable({ id, name, setName }) {
  const [editing, setEditing] = useState(false);
  const nameRef = useRef(null);

  const save = () => {
    setEditing(false);
    const newName = nameRef.current.value;
    setName(newName);
    updateName(id, newName);
  };

  useEffect(() => {
    if (editing) nameRef.current.focus();
  }, [editing]);

  return (
    <>
      {!editing ? (
        <div className='flex items-center animate__animated animate__flipInX'>
          <h1 className='text-2xl font-bold text-gray-600' id='modal-title'>
            {capitalize(name)}
          </h1>
          <span className='ml-2 cursor-pointer' title='Edit'>
            <Pencil onClick={() => setEditing(true)} />
          </span>
        </div>
      ) : (
        <div className='flex items-center animate__animated animate__flipInY animate__faster'>
          <input className='input' ref={nameRef} type='text' defaultValue={capitalize(name)} autoComplete='off' />
          <span className='ml-2 cursor-pointer' title='Save'>
            <Save onClick={save} />
          </span>
        </div>
      )}
    </>
  );
}
