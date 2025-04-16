import { useState, useRef } from 'react';

export function AbortControllerErrorHandling() {
  const [status, setStatus] = useState<
    'idle' | 'running' | 'cancelled' | 'completed'
  >('idle');
  const [message, setMessage] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  function startTask() {
    setStatus('running');

    const controller = new AbortController();
    controllerRef.current = controller;

    // Simulate a 5-second async task
    const timeout = setTimeout(() => {
      setStatus('completed');
      setMessage('Task completed successfully!');
    }, 5000);

    // Listen for the abort event
    controller.signal.addEventListener('abort', () => {
      clearTimeout(timeout);
      setStatus('cancelled');
      setMessage(String(controller.signal.reason));
    });
  }

  function cancelTaskMessagePrimary() {
    if (controllerRef.current) {
      controllerRef.current.abort('primary user cancelled the task');
    }
  }

  function cancelTaskMessageSecondary() {
    if (controllerRef.current) {
      controllerRef.current.abort('secondary user cancelled the task');
    }
  }

  return (
    <>
      <h2>Abort Controller Error handling</h2>
      <p>Status: {status}</p>
      {message && <p>Message: {message}</p>}
      <button onClick={startTask} disabled={status === 'running'}>
        Start Task
      </button>
      <button
        onClick={cancelTaskMessagePrimary}
        disabled={status !== 'running'}
      >
        Cancel Task primary
      </button>
      <button
        onClick={cancelTaskMessageSecondary}
        disabled={status !== 'running'}
      >
        Cancel Task secondary
      </button>
    </>
  );
}
