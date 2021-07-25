import { Container, Box, Button, Grid, Paper } from '@material-ui/core';
import { useState, useEffect, useRef } from 'react';

import useStyles from './styles';

import PlayingScreen from './playing';
import WaitingScreen from './waiting';

import ListPlayers from './listPlayers';
import ChatMessages from './chat/messages';
import ChatInputBox from './chat/inputBox';

import AspectRatioBox from '../../../common/aspectRatioBox';
import { getRoomPlayers } from '../../../helpers/api';
import { connectToSocket } from '../../../helpers/socketio';

const user = { name: 'john doe' };

function SingleRoom() {
  const [players, setPlayers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const socketRef = useRef();
  const playScreenRef = useRef();

  const classes = useStyles();

  const handleToggleMode = () => {
    setIsPlaying(!isPlaying);
  };

  const submitMsg = (message) => {
    if (message) {
      socketRef.current.emit('message', { name: user.name, message });
    }
  };

  const submitDraw = (drawData) => {
    if (drawData) {
      socketRef.current.emit('canvas-data', drawData);
    }
  };

  useEffect(() => {
    socketRef.current = connectToSocket();
    socketRef.current.on('canvas-data', (drawData) => {
      playScreenRef.current.loadDrawData(drawData);
    });
    return () => socketRef.current.disconnect();
  }, [playScreenRef]);

  useEffect(() => {
    socketRef.current = connectToSocket();
    socketRef.current.on('message', ({ name, message }) => {
      setMessages([...messages, { name, message }]);
    });
    return () => socketRef.current.disconnect();
  }, [messages]);

  useEffect(() => {
    getRoomPlayers('[id]')
      .then((res) => {
        setPlayers(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Container fixed style={{ width: 1200, height: 700 }}>
      {/* <Grid container spacing={2} className={classes.container}> */}
      <Box display="flex" flexDirection="row">
        {/* <Grid item md={9} xs={12}> */}
        <Box style={{ width: 900, height: 700 }}>
          {/* <AspectRatioBox ratio={16/10}> */}
          {isPlaying ? (
            <PlayingScreen
              classes={classes}
              topBarHeight={TOP_BAR_HEIGHT}
              drawAreaHeight={DRAW_AREA_HEIGHT}
              submitHandler={submitDraw}
              ref={playScreenRef}
            />
          ) : (
            <WaitingScreen onStartGame={handleToggleMode} />
          )}
          {/* </AspectRatioBox> */}
        </Box>
        {/* </Grid> */}
        {/* <Grid item md={3} xs={12}> */}
        <Box style={{ marginLeft: 16, width: 284, height: 700 }}>
          <Box style={{ width: '100%', height: '100%' }}>
            {' '}
            {/*style={{height: '88vh', width: '100%'}}>*/}
            <Paper
              elevation={2}
              style={{ height: '100%' }}
              className={classes.backgroundPaper}
            >
              <Box style={{ height: PARTICIPANTS_LIST_HEIGHT }}>
                <ListPlayers players={players} />
              </Box>
              <Box style={{ height: CHAT_HEIGHT }}>
                <Box className={classes.outer}>
                  <ChatMessages messages={messages} />
                  <ChatInputBox
                    list={messages}
                    handleSubmitMessage={submitMsg}
                  />
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
        {/* </Grid> */}
      </Box>
      {/* </Grid> */}
      <Button onClick={handleToggleMode}>Toggle mode</Button>
    </Container>
  );
}

const TOP_BAR_HEIGHT = 84;
const DRAW_AREA_HEIGHT = 600;
const PARTICIPANTS_LIST_HEIGHT = '40%';
const CHAT_HEIGHT = '60%';

export default SingleRoom;
