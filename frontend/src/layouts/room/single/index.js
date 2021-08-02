import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateRoom,
  updateRoomUsers,
  addMessage,
  clearRoom,
} from '../../../features/room/roomSlice';
import { useParams, useHistory } from 'react-router-dom'; //Temporarily use URL params as room name
import GameRoomLayout from './layout/gameRoomLayout';
import LoadingPage from '../../loading';
import { RoomScreenStates } from '../../../common/constant';
import { connectToSocket } from '../../../helpers/socketio';

function SingleRoom() {
  const user = useSelector((state) => state.user);
  const roomId = useSelector((state) => state.room.roomId);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const socketRef = useRef();
  const playScreenRef = useRef();

  const submitMsg = (message) => {
    if (message) {
      socketRef.current.emit('message', { name: user.username, message });
    }
  };

  const submitDraw = (drawData) => {
    if (drawData) {
      socketRef.current.emit('canvas-data', drawData);
    }
  };

  const submitStartGame = () => {
    console.log('request-start-game');
    socketRef.current.emit('request-start-game');
  };

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user, history]);

  useEffect(() => {
    socketRef.current = connectToSocket();
    socketRef.current.emit('join', { user, roomId: id }, (error) => {
      if (error) {
        alert(error);
        //Redirect
        return;
      }
    });

    return function cleanUp() {
      //componentsWillUnmount
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      dispatch(clearRoom());
    };
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
      console.log(users);
      dispatch(updateRoomUsers({ users }));
    });
  }, [dispatch]);

  useEffect(() => {
    socketRef.current.on('message', ({ user, message }) => {
      dispatch(addMessage({ user, message }));
    });
  }, [dispatch]);

  useEffect(() => {
    socketRef.current.on('room-info', ({ info }) => {
      console.log(info);
      dispatch(
        updateRoom({
          roomState: info.roomState,
          roomRound: info.roomRound + 1, //Room round start at 0: falsy
          hostUserId: info.hostUserId,
          roomId: info.roomId,
        }),
      );
    });
  }, [dispatch]);

  useEffect(() => {
    socketRef.current.on('room-start-game', () => {
      dispatch(updateRoom({ roomState: RoomScreenStates.ROUND_PLAYING }));
    });
  }, [dispatch]);

  return (
    <div>
      {roomId ? (
        <GameRoomLayout
          submitDrawHandler={submitDraw}
          submitMessageHandler={submitMsg}
          submitStartGameHandler={submitStartGame}
          ref={playScreenRef}
        />
      ) : (
        <LoadingPage text="Joining Room" />
      )}
    </div>
  );
}

export default SingleRoom;
