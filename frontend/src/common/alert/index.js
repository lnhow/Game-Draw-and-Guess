import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Alerts(props) {
  const classes = useStyles();
  const { onClose } = props;

  return (
    <div className={classes.root}>
      <Alert onClose={onClose}>This is a success!</Alert>
    </div>
  );
}
