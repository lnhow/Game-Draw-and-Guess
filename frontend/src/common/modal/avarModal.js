import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, GridList, GridListTile } from '@material-ui/core';
import Modal from 'react-modal';
import { FuncButton } from '../../common/Button.js';
import { avar } from '../../common/constant/index';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ava: {
    cursor: 'pointer',
    borderRadius: '10px',
    padding: '2px',
    border: '2px solid #c1c1c1',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

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

export default function AvarModal(props) {
  const classes = useStyles();

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <FuncButton
        text="change"
        bgcolor="#09f"
        handleClick={openModal}
      ></FuncButton>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <h2 id="transition-modal-title">Change avatar</h2>
        <GridList cols={5} cellHeight={50} spacing={10}>
          {avar.map(function (data, i) {
            return (
              <GridListTile key={i}>
                <Avatar
                  key={i}
                  src={data}
                  className={classes.ava}
                  onClick={(e) => {
                    props.onClick(e);
                    setIsOpen(false);
                  }}
                />
              </GridListTile>
            );
          })}
        </GridList>
      </Modal>
    </div>
  );
}
