import buildMessage from '../../../../../../helpers/messageBuilder';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  message: {
    margin: '0px 0px 8px 0px',
    textAlign: 'left',
  },
});

function ChatMessage(props) {
  const classes = useStyles();
  const { title, user, message, type } = props.message;
  const currentUserId = props.currentUserId;
  const { msgTitle, msgBody, msgStyle } = buildMessage(
    {
      title,
      user,
      message,
      type,
    },
    currentUserId,
  );

  return (
    <p className={classes.message} style={msgStyle}>
      <b>{msgTitle + ' '}</b>
      {msgBody}
    </p>
  );
}

export default ChatMessage;
