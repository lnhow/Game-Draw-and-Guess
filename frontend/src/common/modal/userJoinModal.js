import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import Modal from 'react-modal';

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

const useStyles = makeStyles((theme) => ({
  btn: {
    color: 'white',
    marginBottom: '20px',
    marginTop: '20px',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 18,
    padding: '3px 30px',
    border: '4px solid #001B4D',
    borderRadius: '25px',
    lineHeight: 1.5,
    fontFamily: '"Gorditas", cursive',
    '&:hover': {
      backgroundColor: '#0069d9',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
    },
    '&:focus': {
      boxShadow: '0 0 0 0rem rgba(0,123,255,.5)',
    },
  },
}));

export default function GuessJoinRoomModal({
  isOpen,
  closeAlert,
  join,
  errorMessage,
}) {
  const classes = useStyles();
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

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
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeAlert}
        style={customStyles}
      >
        <h1 style={{ color: 'red' }}>{errorMessage}</h1>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Join as guest</h2>
        <form>
          <label>Username</label>&emsp;
          <input
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
        </form>
        <div style={center}>
          <Button
            variant="contained"
            color="warning"
            onClick={closeAlert}
            className={classes.btn}
            style={{ backgroundColor: '#ff5141', marginRight: '10px' }}
          >
            cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => join(value)}
            className={classes.btn}
            style={{ backgroundColor: '#0063cc' }}
          >
            join
          </Button>
        </div>
      </Modal>
    </div>
  );
}
