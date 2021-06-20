import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Posts} from "./Posts";


ReactDOM.render(
  <React.StrictMode>
      <header className="App-header">
          <Posts/>
      </header>
  </React.StrictMode>,
  document.getElementById('root')
);

