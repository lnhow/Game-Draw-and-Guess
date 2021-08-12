import { useState } from 'react';
import {
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Send } from '@material-ui/icons';

function ChatInputBox(props) {
  const handleSubmitMessage = props.handleSubmitMessage;
  const isDisabled = props.disabled;
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!formValue) {
      //Form value is empty
      return;
    }
    handleSubmitMessage(formValue);

    setFormValue('');
  };

  return (
    <div>
      <form onSubmit={sendMessage}>
        <FormControl fullWidth>
          <TextField
            disabled={isDisabled}
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

export default ChatInputBox;
