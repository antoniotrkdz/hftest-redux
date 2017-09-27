import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {createStore, combine, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware,
} from 'connected-react-router';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers/index.js';
import registerServiceWorker from './registerServiceWorker';
import Home from './Home';
import PatientDetails from './PatientDetails';

const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(rootReducer),
  composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
);

const App = ({history}) =>
  <ConnectedRouter history={history}>
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Health Forge</h1>
      </header>
      <main>
        <switch>
          <Route path="/" exact component={Home} />
          <Route path="/:patientId" component={PatientDetails} />
        </switch>
      </main>
    </div>
  </ConnectedRouter>;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App history={history} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
