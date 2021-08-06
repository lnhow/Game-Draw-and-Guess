import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateRoom,
  updateRoomUsers,
  addMessage,
  clearRoom,
  updateTimer,
} from '../../../features/room/roomSlice';
import { useParams, useHistory } from 'react-router-dom'; //Temporarily use URL params as room name
import GameRoomLayout from './layout/gameRoomLayout';
import LoadingPage from '../../loading';
import ErrorPage from '../../error';
import { RoomScreenStates, SpecialMessage } from '../../../common/constant';
import { connectToSocket } from '../../../helpers/socketio';

function SingleRoom() {
  const user = useSelector((state) => state.user);
  const roomId = useSelector((state) => state.room.roomId);
  const [err, setErr] = useState(null);

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
        setErr({ message: error });
        return;
      }
    });

    return function cleanUp() {
      //componentsWillUnmount
      if (socketRef.current && socketRef.current.connected) {
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
      dispatch(updateRoomUsers({ users }));
    });
  }, [dispatch]);

  useEffect(() => {
    socketRef.current.on('message', (message) => {
      dispatch(addMessage(message));
    });
  }, [dispatch]);

  useEffect(() => {
    socketRef.current.on('room-info', ({ info }) => {
      dispatch(
        updateRoom({
          roomState: info.roomState,
          roomRound: info.roomRound + 1, //Room round start at 0
          hostUserId: info.hostUserId,
          roomId: info.roomId,
        }),
      );
    });
  }, [dispatch]);

  useEffect(() => {
    socketRef.current.on('room-start-game', () => {
      dispatch(updateRoom({ roomState: RoomScreenStates.GAME_STARTED }));
    });
    socketRef.current.on('room-start-round', ({ round, drawerId }) => {
      dispatch(
        addMessage({
          type: SpecialMessage.ROUND_START,
          title: round + 1, //Room round start at 0
        }),
      );
      dispatch(
        updateRoom({
          roomRound: round + 1, //Room round start at 0
          drawerId: drawerId,
          roomState: RoomScreenStates.ROUND_START,
        }),
      );
    });
    socketRef.current.on('room-start-playing', () => {
      dispatch(updateRoom({ roomState: RoomScreenStates.ROUND_PLAYING }));
    });
    socketRef.current.on('room-end-round', ({ word }) => {
      dispatch(addMessage({ type: SpecialMessage.ROUND_END }));
      dispatch(
        updateRoom({
          wordLastRound: word,
          drawerWord: null, //Clear drawer word
          roomState: RoomScreenStates.ROUND_ENDED,
        }),
      );
    });
    socketRef.current.on('room-end-game', () => {
      dispatch(updateRoom({ roomState: RoomScreenStates.GAME_ENDED }));
    });
    socketRef.current.on('room-draw-word', ({ word }) => {
      console.log(word);
      dispatch(updateRoom({ drawerWord: word }));
    });
    socketRef.current.on('timer', (timeLeft) => {
      dispatch(updateTimer({ timer: timeLeft }));
    });
    socketRef.current.on('connect_error', (_) => {
      setErr({ message: 'Server - Room connection error' });
      if (socketRef.current && socketRef.current.connected) {
        socketRef.current.disconnect();
      }
    });
  }, [dispatch]);

  return (
    <div>
      {err ? (
        <ErrorPage message={err.message} />
      ) : roomId ? (
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
