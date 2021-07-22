import { useState, useRef } from 'react';
import {
  Box,
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Send } from '@material-ui/icons';

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const msgListBottomRef = useRef(); //Quick trick to scroll down on new msg appear
  const handleSubmitMessage = (newMessage) => {
    let newMessages = [...messages, newMessage]; //Append to messages w/o mutations
    setMessages(newMessages);
    msgListBottomRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <Box
      display="flex"
      flexDirection="column-reverse"
      style={{ height: '100%' }}
    >
      <ChatInputBox list={messages} handleSubmitMessage={handleSubmitMessage} />
      <Box
        style={{
          height: '100vh',
          margin: '2px 0px 0px 8px',
          overflowY: 'scroll',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          {messages &&
            messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
          <div ref={msgListBottomRef} style={{ height: 30 }}></div>
        </div>
      </Box>
    </Box>
  );
}

function ChatInputBox(props) {
  const [formValue, setFormValue] = useState();

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!formValue) {
      //Form value is empty
      return;
    }
    props.handleSubmitMessage({
      title: 'You',
      text: formValue,
    });

    setFormValue('');
  };

  return (
    <div>
      <form onSubmit={sendMessage}>
        <FormControl fullWidth>
          <TextField
            placeholder="Chat or Guess the word..."
            variant="outlined"
            size="small"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton color="primary" size="small" type="submit">
                    <Send />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </form>
    </div>
  );
}

function ChatMessage(props) {
  const { title, text, isSpecialMessage } = props.message;

  return (
    <p style={{ margin: '0px 0px 8px 0px', textAlign: 'left' }}>
      <b>
        {title}
        {isSpecialMessage ? '' : ': '}
      </b>
      {text}
    </p>
  );
}

export default ChatBox;
