import { forwardRef } from 'react';
import { useSelector } from 'react-redux';

import WaitingScreen from './waiting';
import GameStartingScreen from './gameStarting';
import RoundStartingScreen from './roundStart';
import PlayingScreen from './playing';
import RoundEndScreen from './roundEnd';
import GameEndScreen from './gameEnded';

import { RoomScreenStates } from '../../../../common/constant';

function MainScreen({ submitDrawHandler, onStartClicked }, ref) {
  const roomState = useSelector((state) => state.room.roomState);

  if (roomState === RoomScreenStates.WAITING) {
    return <WaitingScreen onStartClick={onStartClicked} />;
  } else if (roomState === RoomScreenStates.GAME_STARTED) {
    return <GameStartingScreen />;
  } else if (roomState === RoomScreenStates.ROUND_START) {
    return <RoundStartingScreen />;
  } else if (roomState === RoomScreenStates.ROUND_PLAYING) {
    return (
      <PlayingScreen
        topBarHeight={TOP_BAR_HEIGHT}
        drawAreaHeight={DRAW_AREA_HEIGHT}
        submitHandler={submitDrawHandler}
        ref={ref}
      />
    );
  } else if (roomState === RoomScreenStates.ROUND_ENDED) {
    return <RoundEndScreen />;
  } else if (roomState === RoomScreenStates.GAME_ENDED) {
    return <GameEndScreen />;
  }

  return <div></div>;
}

const TOP_BAR_HEIGHT = 84;
const DRAW_AREA_HEIGHT = 600;

export default forwardRef(MainScreen);
