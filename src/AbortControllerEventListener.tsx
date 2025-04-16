import { useEffect } from 'react';

export function AbortControllerEventListener() {
  useEffect(() => {
    const abortController = new AbortController();

    window.addEventListener(
      'resize',
      () => {
        console.log('resize trigger');
      },
      { signal: abortController.signal }
    );

    window.addEventListener(
      'hashchange',
      () => {
        console.log('has changed trigger');
      },
      { signal: abortController.signal }
    );

    return () => {
      // Removes all the events listener
      abortController.abort();
    };
  }, []);

  return (
    <>
      <h2>Event Listener Example</h2>
    </>
  );
}
