import { forwardRef } from 'react';
import { useSelector } from 'react-redux';

import PlayingScreen from './playing';
import WaitingScreen from './waiting';
import { RoomScreenStates } from '../../../../common/constant';

function MainScreen({ submitDrawHandler, onStartClicked }, ref) {
  const roomState = useSelector((state) => state.room.roomState);

  if (roomState === RoomScreenStates.ROUND_PLAYING) {
    return (
      <PlayingScreen
        topBarHeight={TOP_BAR_HEIGHT}
        drawAreaHeight={DRAW_AREA_HEIGHT}
        submitHandler={submitDrawHandler}
        ref={ref}
      />
    );
  } else if (roomState === RoomScreenStates.WAITING) {
    return <WaitingScreen onStartClick={onStartClicked} />;
  }

  return <div></div>;
}

const TOP_BAR_HEIGHT = 84;
const DRAW_AREA_HEIGHT = 600;

export default forwardRef(MainScreen);
