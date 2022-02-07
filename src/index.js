import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/styles.css';
import { UserContextProvider } from './store/user-context';



ReactDOM.render(
	<UserContextProvider>
      <App />
    </UserContextProvider>,
	document.querySelector('#fromjs')
);
