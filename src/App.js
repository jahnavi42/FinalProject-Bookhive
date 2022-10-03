import './App.css';
import {Provider} from 'react-redux'
import store from './reduxStore/store.redux'
import {BrowserRouter} from 'react-router-dom'
import RouteHome from './components/routehome.component';
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
          <RouteHome/>
          <NotificationContainer/>
        </div>
      </BrowserRouter>
    </Provider>
=======
    <div className="App">
      <header className="App-header">
        <img src className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
    </div>
>>>>>>> maheshr
  );
}

export default App;
