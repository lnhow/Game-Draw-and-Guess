/**
 * Console log that won't appear on process.env.NODE_ENV production
 * @param  {...any} msg
 * @returns
 */
export function ConsoleLog(...msg) {
  if (process.env.NODE_ENV === 'production') return;
  console.log(...msg);
}
