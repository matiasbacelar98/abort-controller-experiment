import { useState, useRef } from 'react';

/* AbortSignal class comes with some useful static methods */

/*
    AbortSignal.timeout => abort automatically if it takes
    more than 3000ms to complete.

    fetch(url, { signal: AbortSignal.timeout(3000) })
*/

/*
    AbortSignal.any => group multiple abort signals into one

    const publicController = new AbortController();
    const internalController = new AbortController();

    channel.addEventListener('message', handleMessage, {
        signal: AbortSignal.any([publicController.signal, internalController.signal]),
    })
*/

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getUsers() {
  const controller = new AbortController();
  const response = fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'GET',
    signal: controller.signal,
  }).then(async res => {
    // Simulate slow server processing
    await delay(3000);
    return res;
  });
  return { response, controller };
}

export function AbortControllerFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  async function handleFetch() {
    setLoading(true);
    setError(null);

    const { response, controller } = getUsers();
    controllerRef.current = controller;

    try {
      const res = await response;
      if (!res.ok) throw new Error('Failed to fetch data');

      const json = await res.json();
      setData(json);
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        setError('Fetch cancelled');
      } else {
        setError('Error fetching data');
      }
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    controllerRef.current?.abort();
  }

  function handleCleanup() {
    setData(null);
  }

  return (
    <>
      <h2>Abort Controller - Fetch API</h2>
      <button onClick={handleFetch} disabled={loading}>
        Fetch Posts
      </button>
      {loading && <button onClick={handleCancel}>Cancel</button>}
      {data && <button onClick={handleCleanup}>Clean</button>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  );
}
