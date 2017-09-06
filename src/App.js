import React, {Component} from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      patients: {
        content: [],
      },
    };
  }

  componentWillMount() {
    fetch('https://api.interview.healthforge.io/api/patient')
      .then(response => response.json())
      .then(response => this.setState({patients: response}));
  }

  render() {
    var patients = this.state.patients;
    console.log(patients);
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Health Forge</h2>
        </div>
        <table className="results">
          <tr className="results_headers">
            <th>First name</th>
            <th>Last name</th>
            <th>Date of birth</th>
          </tr>
          {patients.content.map(index =>
            <tr>
              <td>
                {index.firstName}
              </td>
              <td>
                {index.lastName}
              </td>
              <td>
                {index.dateOfBirth.slice(0,10)}
              </td>
            </tr>
          )}
        </table>
      </div>
    );
  }
}

export default App;
