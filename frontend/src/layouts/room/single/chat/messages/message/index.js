function ChatMessage(props) {
  const { title, user, message } = props.message;
  const msgTitle = user ? user : title;

  return (
    <p style={{ margin: '0px 0px 8px 0px', textAlign: 'left' }}>
      <b>
        {msgTitle}
        {title ? ' ' : ': '}
      </b>
      {message}
    </p>
  );
}

export default ChatMessage;
