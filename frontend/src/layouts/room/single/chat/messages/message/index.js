function ChatMessage(props) {
  const { title, name, message, isSpecialMessage } = props.message;
  const msgTitle = name ? name : title;

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
