import { Container, Box, Button, Paper } from '@material-ui/core';
import { useState, forwardRef } from 'react';

import { useSelector } from 'react-redux';

import useStyles from './styles';

import PlayingScreen from '../playing';
import WaitingScreen from '../modals/waiting';

import ListPlayers from '../listPlayers';
import ChatMessages from '../chat/messages';
import ChatInputBox from '../chat/inputBox';

function GameRoomLayout({ submitDrawHandler, submitMessageHandler }, ref) {
  const classes = useStyles();
  const players = useSelector((state) => state.room.users);
  const messages = useSelector((state) => state.room.messages);

  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleMode = () => {
    setIsPlaying(!isPlaying);
  };

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
              submitHandler={submitDrawHandler}
              ref={ref}
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
                  <ChatInputBox handleSubmitMessage={submitMessageHandler} />
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

export default forwardRef(GameRoomLayout);
