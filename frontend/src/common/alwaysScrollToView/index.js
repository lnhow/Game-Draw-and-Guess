/**
 * Fisrt answer of:
 * https://stackoverflow.com/questions/45719909/scroll-to-bottom-of-an-overflowing-div-in-react
 *
 * Call every tick which is not ideal
 */
import { useRef, useEffect } from 'react';

const AlwaysScrollToView = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

export default AlwaysScrollToView;
