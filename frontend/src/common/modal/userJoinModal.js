import { Button } from '@material-ui/core';
import React from 'react';
import Modal from 'react-modal';
import { FuncButton } from '../../common/Button.js';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const center = {
  display: 'table',
  marginLeft: 'auto',
  marginRight: 'auto',
};


export default function GuessJoinRoomModal({isOpen,closeAlert,join,errorMessage}) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [value,setValue] = React.useState('')

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeAlert}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1 style={{color:'red'}} >{errorMessage}</h1>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Join as guest</h2>
        <form>
          <label>Username</label>&emsp;
          <input
            value={value}
            onChange={e=>setValue(e.currentTarget.value)}
           />
        </form>
        <div style={center}>
          <Button variant="contained" color="warning" onClick={closeAlert} >cancel</Button>
          <Button variant="contained" color="primary" onClick={()=>join(value)} >join</Button>
        </div>
      </Modal>
    </div>
  );
}
