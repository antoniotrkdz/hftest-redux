import React, {Component} from 'react';

class App extends Component {
  constructor() {
    super();
    this.fetchPatients = this.fetchPatients.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      searchTerm: '',
      params: {
        size: 10,
      },
      patients: {
        content: [],
      },
    };
  }

  fetchPatients(path, params) {
    path = this.state.searchTerm;
    params = this.state.params;
    console.log('path', path, 'params', params);
    const url = new URL('https://api.interview.healthforge.io/api/patient');
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );

    console.log('url', url);
    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({patients: response}));
  }

  componentWillMount() {
    this.fetchPatients();
  }

  onChange(input) {
    this.setState({
      searchTerm: input.target.value,
    });
  }

  onSubmit(evt) {
    evt.preventDefault();
    this.fetchPatients(this.state.searchTerm);
  }

  render() {
    var patients = this.state.patients;
    console.log('patients', patients);
    console.log('state', this.state);
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Health Forge</h2>
        </div>
        <div className="form">
          <div>
            <h4>Search&nbsp;</h4>
          </div>
          <input
            type="text"
            className="form-control"
            name="searchTerm"
            value={this.state.searchTerm}
            onChange={this.onChange}
          />
          <button type="clear" onClick={() => this.setState({searchTerm: ''})}>
            Clear
          </button>
          <button type="submit">Submit</button>
        </div>

        <table className="results">
          <tr className="results_headers">
            <th
              onClick={() => {
                this.setState({params: 'firstName ASC'});
                this.fetchPatients();
              }}
            >
              First name
            </th>
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
                {index.dateOfBirth.slice(0, 10)}
              </td>
            </tr>
          )}
        </table>
        <div />
      </div>
    );
  }
}

export default App;
