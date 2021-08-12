export const NUMBER_RANDOM = Math.floor(Math.random() * 10000);
export const AVATAR_DEFAULT =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNnNH0c03eYhzzID8_Y6mHwZYYGjXLfnreH7RyT9f9GVRtT0yR7vklbKx3As07G6DCGYY&usqp=CAU';

export const RoomScreenStates = Object.freeze({
  WAITING: 'room.waiting',
  GAME_STARTED: 'room.game_started',
  ROUND_START: 'room.round_start',
  ROUND_PLAYING: 'room.round_playing',
  ROUND_ENDED: 'room.round_ended',
  GAME_ENDED: 'room.game_ended',
});

export const CREATED = 'CREATED';
export const WAITING = 'WAITING';
export const PLAYING = 'PLAYING';
export const ENDED = 'ENDED';

export const RoomStates = Object.freeze({
  CREATED,
  WAITING,
  PLAYING,
  ENDED,
});

export const avar = [
  'https://robohash.org/cat?set=set4&size=150x150',
  'https://robohash.org/64Q.png?set=set4&size=150x150',
  'https://robohash.org/kitten?set=set4&size=150x150',
  'https://robohash.org/0UA.png?set=set4&size=150x150',
  'https://robohash.org/sunny.png?set=set4&size=150x150',
  'https://robohash.org/z.png?set=set4&size=150x150',
  'https://robohash.org/1QZ.png?set=set4&size=150x150',
  'https://robohash.org/hoho.png?set=set4&size=150x150',
  'https://robohash.org/tcnxmnc.png?set=set4&size=150x150',
  'https://robohash.org/640.png?set=set4&size=150x150',
];

export const SpecialMessage = Object.freeze({
  JOIN_ROOM: 0,
  LEFT_ROOM: 1,
  CORRECT_GUESS: 2,
  BLOCKED: 3,
  ROUND_START: 100,
  ROUND_END: 101,
});
