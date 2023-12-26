import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Auth } from './Components/Auth';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.

        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p>
        Please sign in
      </p>
      <Auth >
      </Auth>
    </div>
  );
}

export default App;
