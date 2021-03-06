import { Grid } from '@material-ui/core';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useSelector } from 'react-redux';
import Canvas from './canvas';
import TopBar from './topbar';

//TOP_BAR_HEIGHT + SPACING + DRAW_AREA_HEIGHT = SCREEN_HEIGHT
const DEFAULT_TOP_BAR_HEIGHT = 84;
const DEFAULT_DRAW_AREA_HEIGHT = 600;
const DEFAULT_SPACING = 16;

function PlayingScreen(props, ref) {
  const topbarHeight = props.topbarHeight
    ? props.topbarHeight
    : DEFAULT_TOP_BAR_HEIGHT;
  const drawAreaHeight = props.drawAreaHeight
    ? props.drawAreaHeight
    : DEFAULT_DRAW_AREA_HEIGHT;
  const spacing = props.spacing ? props.spacing : DEFAULT_SPACING;
  const submitHandler = props.submitHandler;

  const canvasRef = useRef(null);
  const user = useSelector((state) => state.user);
  const roomDrawer = useSelector((state) => state.room.drawerId);

  //Allow parent to call these inner functions
  useImperativeHandle(ref, () => ({
    loadDrawData(data) {
      canvasRef.current.loadDrawData(data);
    },
  }));

  return (
    <Grid container style={{ width: '100%' }}>
      <Grid item xs={12} style={{ height: topbarHeight }}>
        <TopBar />
      </Grid>
      <Grid item xs={12} style={{ height: drawAreaHeight, marginTop: spacing }}>
        <Canvas
          ref={canvasRef}
          submitHandler={submitHandler}
          drawable={roomDrawer === user.id}
        />
      </Grid>
    </Grid>
  );
}

export default forwardRef(PlayingScreen);
