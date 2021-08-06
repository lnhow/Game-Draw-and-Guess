import { SpecialMessage } from '../common/constant';

export function buildMessage({ title, user, message, type }, currentUserId) {
  let msgTitle = '';
  let msgBody = '';
  let msgStyle = {
    color: 'black',
  };

  switch (type) {
    case SpecialMessage.JOIN_ROOM:
      msgTitle = title;
      msgBody = 'joined the room';
      break;
    case SpecialMessage.LEFT_ROOM:
      msgTitle = title;
      msgBody = 'left the room';
      break;
    case SpecialMessage.CORRECT_GUESS:
      msgTitle = user.id === currentUserId ? 'You' : user.username;
      msgBody = 'guessed the correct word!';
      break;
    case SpecialMessage.BLOCKED:
      msgBody = message;
      break;
    case SpecialMessage.ROUND_START:
      msgTitle = `Round ${title} started`;
      break;
    case SpecialMessage.ROUND_END:
      msgTitle = `Round ended`;
      break;
    default:
      //NORMAL CHAT MESSAGE
      msgTitle = (user.id === currentUserId ? 'You' : user.username) + ':';
      msgBody = message;
      break;
  }

  return { msgTitle, msgBody, msgStyle };
}

/**
 * Check if message contains info the the current user is correct
 * @param {Object} receivedMsg - Received message
 * @param {String} currentUserId - The id of current login user
 * @param {function} onCorrect - Callback function when is correct
 */
export function verifyUserCorrect(receivedMsg, currentUserId, onCorrect) {
  const { user, type } = receivedMsg;
  if (type === SpecialMessage.CORRECT_GUESS) {
    if (user.id === currentUserId) {
      if (onCorrect) {
        onCorrect();
      }
    }
  }
}

export default buildMessage;
