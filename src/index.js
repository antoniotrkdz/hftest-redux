import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Home from './Home';
import PatientDetails from './PatientDetails';
import Keycloak from 'keycloak-js';
import axios from 'axios';

const App = () =>
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
  </div>;

const kc = Keycloak('/keycloak.json');

kc.init({onLoad: 'check-sso'}).success(authenticated => {
  if (authenticated) {
    setInterval(() => {
      kc.updateToken(10).error(() => kc.logout());
    }, 10000);

    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      document.getElementById('root')
    );
  } else {
    kc.login();
  }
});

axios.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    ...{
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + kc.token,
    },
  };
  return config;
});

registerServiceWorker();
