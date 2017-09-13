import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Home from './Home';
import PatientDetails from './PatientDetails';

const App = () => (
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
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
