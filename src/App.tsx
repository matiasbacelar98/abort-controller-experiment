/**
    AbortController is a global class in JavaScript that you 
    it can be use to abort anything
 */

/**
    Once an instance is created you get an obj with two things:
        - signal property: we can provide this to an api to react to an abort event
        - abort method: triggers the abort event on the signal 
 */

import { AbortControllerEventListener } from './AbortControllerEventListener';
import { AbortControllerFetch } from './AbortControllerFetch';

export function App() {
  return (
    <>
      <h1>Abort Controller Experiment</h1>
      <AbortControllerEventListener />
      <AbortControllerFetch />
    </>
  );
}
