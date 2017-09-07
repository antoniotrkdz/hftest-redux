import React, {Component} from 'react';
import Pager from 'react-pager';

class App extends Component {
  constructor() {
    super();
    this.fetchPatients = this.fetchPatients.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
    this.handlePageChanged = this.handlePageChanged.bind(this);

    this.state = {
      searchTerm: '',
      patients: [],
      responseParams: {
        //last: false,
        //totalPages: 100,
        //totalElements: 1000,
        //sort: null,
        //numberOfElements: 10,
        //first: true,
        //size: 10,
        //number: 0,
        //size: 10,
        //page: 0,
      },
      requestParams: {
        sort: null,
        size: 10,
        page: 0,
      },
    };
  }

  fetchPatients(requestParams) {
    //path = this.state.searchTerm;
    //params = this.state.patients;
    //console.log('path', path, 'params', params);
    console.log('reqParams', requestParams);
    const url = new URL('https://api.interview.healthforge.io/api/patient');
    if (requestParams)
      Object.keys(requestParams).forEach(key =>
        url.searchParams.append(key, requestParams[key])
      );

    console.log('url', url);
    fetch(url).then(response => response.json()).then(response =>
      this.setState({
        patients: response.content,
        responseParams: {
          last: response.last,
          totalPages: response.totalPages,
          totalElements: response.totalElements,
          sort: response.sort,
          numberOfElements: response.numberOfElements,
          first: response.first,
          size: response.size,
          number: response.number,
          page: response.number,
        },
      })
    );
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

  toggleSort() {
    
  }

  handlePageChanged(page) {
    this.setState({requestParams: {page: page}});
    this.fetchPatients({page});
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
        <div className="container">
          <div className="form">
            <div>
              <h4>Search</h4>
            </div>
            <input
              type="text"
              className="form-control"
              name="searchTerm"
              value={this.state.searchTerm}
              onChange={this.onChange}
            />
            <button
              className="btn"
              type="clear"
              onClick={() => this.setState({searchTerm: ''})}
            >
              Clear
            </button>
            <button
              className="btn"
              type="submit"
              onClick={this.onSubmit}
            >
              Submit
            </button>
          </div>

          <table className="table">
            <tr className="results_headers">
              <th
                onClick={() => {
                  this.fetchPatients({sort: 'firstName ASC'});
                }}
              >
                First name
              </th>
              <th
                onClick={() => {
                  this.fetchPatients({sort: 'lastName ASC'});
                }}
              >
                Last name
              </th>
              <th
                onClick={() => {
                  this.fetchPatients({sort: 'dateOfBirth ASC'});
                }}
              >
                Date of birth
              </th>
            </tr>
            {patients.map(index =>
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
          <Pager
            className="pagination"
            total={this.state.responseParams.totalPages}
            current={this.state.responseParams.number}
            visiblePages={5}
            onPageChanged={this.handlePageChanged}
          />
        </div>
      </div>
    );
  }
}

export default App;
