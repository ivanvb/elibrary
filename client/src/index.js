import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {UserProvider} from './Shared/context/User.context';

ReactDOM.render(
    <UserProvider>
        <App />
    </UserProvider>
, document.getElementById('root'));

