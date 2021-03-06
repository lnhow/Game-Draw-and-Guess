/**
 * https://codesandbox.io/s/1106l?file=/AspectRatioBox.js:0-580
 */
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: { position: 'relative' },
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    '& > *': { height: '100%', width: '100%' },
  },
}));

const AspectRatioBox = ({ children, ratio = 1 }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>{children}</div>
      <div style={{ paddingBottom: (1 / ratio) * 100 + '%' }} />
    </div>
  );
};

export default AspectRatioBox;
