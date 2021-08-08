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

export default function SaveChangeModal(props) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#444444';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button
        type="submit"
        style={props.style}
        onClick={openModal}
        disabled={props.disabled}
      >
        Save
      </button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
          Are you sure you want to change?
        </h2>

        <div style={center}>
          <FuncButton
            text="cancel"
            bgcolor="#ff5141"
            handleClick={closeModal}
          ></FuncButton>
          &emsp;
          <FuncButton text="save" bgcolor="#0063cc" link="/"></FuncButton>
        </div>
      </Modal>
    </div>
  );
}
