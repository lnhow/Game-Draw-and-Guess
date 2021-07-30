import { useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  updateRoom,
  updateRoomUsers,
  addMessage,
  clearRoom,
} from '../../../features/room/roomSlice';
import { useParams, useHistory } from 'react-router-dom'; //Temporarily use URL params as room name

import GameRoomLayout from './layout';
import { connectToSocket } from '../../../helpers/socketio';

function SingleRoom() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const socketRef = useRef();
  const playScreenRef = useRef();

  const submitMsg = (message) => {
    if (message) {
      console.log({ name: user.username, message });
      socketRef.current.emit('message', { name: user.username, message });
    }
  };

  const submitDraw = (drawData) => {
    if (drawData) {
      socketRef.current.emit('canvas-data', drawData);
    }
  };

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user, history]);

  useEffect(() => {
    const room = id;
    socketRef.current = connectToSocket();

    socketRef.current.emit('join', { name: user.username, room }, (error) => {
      if (error) {
        alert(error);
        //Redirect
        return;
      }
      dispatch(updateRoom({ roomId: room }));
    });
  }, [id, user, dispatch]);

  useEffect(() => {
    socketRef.current.on('canvas-data', (drawData) => {
      if (playScreenRef.current) {
        playScreenRef.current.loadDrawData(drawData);
      }
    });
  }, []);

  useEffect(() => {
    socketRef.current.on('room-users', ({ users }) => {
      dispatch(updateRoomUsers({ users }));
    });
  }, [dispatch]);

  useEffect(() => {
    socketRef.current.on('message', ({ user, message }) => {
      dispatch(addMessage({ user, message }));
    });
  }, [dispatch]);

  useEffect(() => {
    socketRef.current.on('disconnect', () => {
      dispatch(clearRoom());
    });
  }, [dispatch]);

  return (
    <GameRoomLayout
      submitDrawHandler={submitDraw}
      submitMessageHandler={submitMsg}
      ref={playScreenRef}
    />
  );
}

export default SingleRoom;
