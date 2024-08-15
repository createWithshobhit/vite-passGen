import { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState('');

  const passGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numAllowed) str += '0123456789';
    if (charAllowed) str += '`~!@#$%^&*()-_=+[{]}\\|;:\'",.<>?/';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  return (
    <>
      <h1>Password Generator</h1>

      <div id="box">
        <div id="form">
          <input type="text" value={password} placeholder="password" readOnly />
          <button id='copyBtn' onClick={copyToClipboard}>Copy</button>
        </div>
        <div id="formbt">
          <div id="opt">
            <input
              type="range"
              min={6}
              max={12}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div id="checkbox">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => setNumAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Include Numbers</label>
          </div>
          <div id="checkbox">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput">Include Special Characters</label>
          </div>
        </div>
        <button onClick={passGenerator}>Generate Password</button>
      </div>
    </>
  );
}

export default App;
