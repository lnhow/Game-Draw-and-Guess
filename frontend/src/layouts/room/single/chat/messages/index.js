import { Box, makeStyles } from '@material-ui/core';
import AlwaysScrollToView from '../../../../../common/alwaysScrollToView';

import ChatMessage from './message';

const useStyles = makeStyles(() => ({
  messageContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    marginLeft: '8px',
  },
}));

function ChatMessages({ messages }) {
  const classes = useStyles();
  return (
    <Box className={classes.messageContainer}>
      {messages &&
        messages.map((msg, index) => <ChatMessage key={index} message={msg} />)}
      <AlwaysScrollToView />
    </Box>
  );
}

export default ChatMessages;
