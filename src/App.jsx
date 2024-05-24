import React from 'react';
import './App.css';

/*
  Question: 
  Create a custom React hook called useLocalStorage that syncs a state 
  variable with the browser's local storage.

  The hook should accept a key and a default value and handle setting 
  and retrieving the value from local storage.

  Ensure that the component re-renders when the value is updated in 
  local storage. Illustrate its usage in a React component.

  localStorage.getItem('key');
  localStorage.setItem('key', value)
 */

function useLocalStorage(key, defaultValue) {
  const [val, setVal] = React.useState(() => {
    const storedVal = window.localStorage.getItem(key);
    return storedVal ? JSON.parse(storedVal) : defaultValue;
  });

  function setter(nextValOrSetter) {
    const nextVal =
      typeof nextValOrSetter === 'function'
        ? nextValOrSetter()
        : nextValOrSetter;

    setVal(nextVal);
    window.localStorage.setItem(key, JSON.stringify(nextVal));
  }

  return [val, setter];
}

function App() {
  // const [count, setCount] = React.useState(0);
  const [obj, setObj] = useLocalStorage('data', { count: 0 });

  return (
    <div className="card">
      <button onClick={() => setObj({ count: obj.count + 1 })}>
        count is {obj.count}
      </button>
      <p>
        Edit <code>src/App.jsx</code> and save to see changes
      </p>
    </div>
  );
}

export default App;
