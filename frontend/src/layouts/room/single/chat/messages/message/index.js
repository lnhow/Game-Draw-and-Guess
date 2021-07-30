function ChatMessage(props) {
  const { title, user, message, isSpecialMessage } = props.message;
  const msgTitle = user ? user : title;

  return (
    <p style={{ margin: '0px 0px 8px 0px', textAlign: 'left' }}>
      <b>
        {msgTitle}
        {isSpecialMessage ? '' : ': '}
      </b>
      {message}
    </p>
  );
}

export default ChatMessage;
