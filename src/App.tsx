import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GoogleSigning } from './Components/GoogleSigning';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.

        </p>
        <GoogleSigning/>
      </header>
    </div>
  );
}

export default App;
