import React, {Component} from 'react';
import Pager from 'react-pager';
import moment from 'moment';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Home extends Component {
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
      responseParams: {},
      requestParams: {
        size: 10,
      },
    };
  }

  fetchPatients(requestParams) {
    const url = new URL(
      'https://api.interview.healthforge.io/api/secure/patient'
    );

    requestParams = this.state.requestParams;

    Object.keys(requestParams).forEach(key =>
      url.searchParams.append(key, requestParams[key])
    );

    axios
      .get(url)
      .then(response => response.data)
      .then(response =>
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
      )
      .catch(error => console.log('Fetch operation failed: ' + error.message));
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
    if (moment.evt) this.setState({});
    this.fetchPatients(this.state.requestParams);
  }

  toggleSort(column) {
    var requestParams = this.state.requestParams;
    requestParams.sort === column + ' ASC' || null
      ? this.setState(
        {
          requestParams: {
            ...requestParams,
            sort: column + ' DESC',
          },
        },
        () => this.fetchPatients(requestParams)
      )
      : this.setState(
        {
          requestParams: {
            ...requestParams,
            sort: column + ' ASC',
          },
        },
        () => this.fetchPatients(requestParams)
      );
  }

  handlePageChanged(page) {
    var requestParams = this.state.requestParams;
    this.setState(
      {
        requestParams: {
          ...requestParams,
          page: page,
        },
      },
      () => this.fetchPatients(requestParams)
    );
  }

  render() {
    var patients = this.state.patients;
    var identifiers = patients.map(item => {
      return item.identifiers.reduce(item => {
        if (item.usage !== null) return item.value;
      });
    });
    return (
      <div className="App">
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
            <button className="btn" type="submit" onClick={this.onSubmit}>
              Submit
            </button>
          </div>

          <table className="table">
            <tbody>
              <tr className="results_headers">
                <th onClick={() => this.toggleSort('lastName')}>Last name</th>
                <th onClick={() => this.toggleSort('firstName')}>First name</th>
                <th
                  id="dateOfBirth"
                  onClick={() => this.toggleSort('dateOfBirth')}
                >
                  Date of birth
                </th>
              </tr>
              {patients.map((item, i) =>
                <tr key={identifiers[i]}>
                  <td>
                    <Link to={'/' + identifiers[i]}>
                      {item.lastName}
                    </Link>
                  </td>
                  <td>
                    <Link to={'/' + identifiers[i]}>
                      {item.firstName}
                    </Link>
                  </td>
                  <td>
                    <Link to={'/' + identifiers[i]}>
                      {moment(item.dateOfBirth).format('DD MMM YYYY')}
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
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

export default Home;
