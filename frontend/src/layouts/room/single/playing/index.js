import { Grid } from '@material-ui/core';

import Canvas from './canvas';
import TopBar from './topbar';

//TOP_BAR_HEIGHT + SPACING + DRAW_AREA_HEIGHT = SCREEN_HEIGHT
const DEFAULT_TOP_BAR_HEIGHT = 84;
const DEFAULT_DRAW_AREA_HEIGHT = 600;
const DEFAULT_SPACING = 600;

export default function PlayingScreen(props) {
  const classes = props.classes;
  const topbarHeight = props.topbarHeight
    ? props.topbarHeight
    : DEFAULT_TOP_BAR_HEIGHT;
  const drawAreaHeight = props.drawAreaHeight
    ? props.drawAreaHeight
    : DEFAULT_DRAW_AREA_HEIGHT;
  const spacing = props.spacing ? props.spacing : DEFAULT_SPACING;

  return (
    <Grid container>
      <Grid item style={{ height: topbarHeight, width: '100%' }}>
        <TopBar classes={classes} />
      </Grid>
      <Grid item style={{ height: drawAreaHeight, marginTop: spacing }}>
        <Canvas classes={classes} />
      </Grid>
    </Grid>
  );
}
