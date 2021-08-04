import { Container, Box, Paper } from '@material-ui/core';
import { forwardRef } from 'react';

import { useSelector } from 'react-redux';

import useStyles from './styles';

import ListPlayers from '../../listPlayers';
import ChatMessages from '../../chat/messages';
import ChatInputBox from '../../chat/inputBox';
import MainScreen from '../../screen';

function GameRoomLayout(
  { submitDrawHandler, submitMessageHandler, submitStartGameHandler },
  ref,
) {
  const classes = useStyles();
  const players = useSelector((state) => state.room.users);
  const messages = useSelector((state) => state.room.messages);

  return (
    <Container fixed style={{ width: 1200, height: 700 }}>
      {/* <Grid container spacing={2} className={classes.container}> */}
      <Box display="flex" flexDirection="row">
        {/* <Grid item md={9} xs={12}> */}
        <Box style={{ width: 900, height: 700 }}>
          {/* <AspectRatioBox ratio={16/10}> */}
          <MainScreen
            submitDrawHandler={submitDrawHandler}
            onStartClicked={submitStartGameHandler}
            ref={ref}
          />
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
    </Container>
  );
}

const PARTICIPANTS_LIST_HEIGHT = '40%';
const CHAT_HEIGHT = '60%';

export default forwardRef(GameRoomLayout);
