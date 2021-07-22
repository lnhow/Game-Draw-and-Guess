import { Container, Box, Button } from '@material-ui/core';
import { useState } from 'react';

import useStyles from './styles';

import Sidebar from './sidebar';
import PlayingScreen from './playing';
import WaitingScreen from './waiting';

const players = [
  {
    name: 'Abc(You)',
    avatar: '',
    points: 0,
  },
  {
    name: 'WASD',
    avatar: '',
    points: 0,
  },
  {
    name: 'Hihi',
    avatar: '',
    points: 0,
  },
  {
    name: 'Person',
    avatar: '',
    points: 0,
  },
  {
    name: 'Hacker',
    avatar: '',
    points: 10000,
  },
  {
    name: 'Norm',
    avatar: '',
    points: 0,
  },
];

function SingleRoom() {
  const classes = useStyles();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleMode = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Container fixed>
      <Box
        display="flex"
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          flexDirection: 'row',
        }}
      >
        <Box flexDirection="column" style={{ width: MAIN_AREA_WIDTH }}>
          {/* Main area */}
          {isPlaying ? (
            <PlayingScreen
              classes={classes}
              topBarHeight={TOP_BAR_HEIGHT}
              drawAreaHeight={DRAW_AREA_HEIGHT}
              spacing={SPACING}
            />
          ) : (
            <WaitingScreen onStartGame={handleToggleMode} />
          )}

          {/* Main area */}
        </Box>
        <Box style={{ width: SIDE_BAR_WIDTH, marginLeft: SPACING }}>
          <Sidebar
            players={players}
            classes={classes}
            sizeConfig={DRAW_AREA_DIMENSIONS}
          />
        </Box>
      </Box>
      <Button onClick={handleToggleMode}>Toggle mode</Button>
    </Container>
  );
}

/* 
  Time wasted trying to make this responsive: 10h
  Try if you can, but if fail then please increment the time
  If you are successful then please remove this comment
*/
const SCREEN_WIDTH = 1200,
  SCREEN_HEIGHT = 700;
const SPACING = 16;
//MAIN_AREA_WIDTH + SPACING + SIDE_BAR_AREA_WIDTH = SCREEN_WIDTH
const MAIN_AREA_WIDTH = 900;
const SIDE_BAR_WIDTH = 284;
//TOP_BAR_HEIGHT + SPACING + DRAW_AREA_HEIGHT = SCREEN_HEIGHT
const TOP_BAR_HEIGHT = 84;
const DRAW_AREA_HEIGHT = 600;
const DRAW_AREA_DIMENSIONS = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  CANVAS_TOOLBAR_WIDTH: 80,
  SPACING: 8,
};

export default SingleRoom;
