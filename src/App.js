<<<<<<< HEAD
=======
import React from 'react';
>>>>>>> origin/main
import './App.css';
import {Provider} from 'react-redux'
import store from './reduxStore/store.redux'
import {BrowserRouter} from 'react-router-dom'

import {NotificationContainer} from 'react-notifications'
import 'react-notifications/lib/notifications.css';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'

function App() {
  return (
<<<<<<< HEAD
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          
          <NotificationContainer/>
        </div>
      </BrowserRouter>
    </Provider>
=======
    <div className="App">
      
    </div>
>>>>>>> origin/main
  );
}

export default App;