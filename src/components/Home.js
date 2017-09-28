import React, {Component} from 'react';
import Pager from 'react-pager';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchPatients} from '../actions/fetchPatients.js';

class Home extends Component {
  constructor() {
    super();
    //this.props.fetchPatients = this.props.fetchPatients.bind(this);
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
      hasErrored: false,
      isLoading: false,
    };
  }

  componentWillMount() {
    this.props.fetchPatients();
  }

  onChange(input) {
    this.setState({
      searchTerm: input.target.value,
    });
  }

  onSubmit(searchTerm) {
    searchTerm.preventDefault();
    searchTerm = this.state.searchTerm;
    searchTerm.search(/[0-9]/g) !== -1
      ? (searchTerm = {zipCode: `${searchTerm}`})
      : (searchTerm = {lastName: `${searchTerm}`});

    this.setState(
      {
        requestParams: searchTerm,
      },
      () => this.fetchPatients(this.state.requestParams)
    );
  }

  toggleSort(column) {
    var requestParams = this.state.requestParams;
    var direction = '';
    requestParams.sort === column + ' ASC' || null
      ? (direction = ' DESC')
      : (direction = ' ASC');
    this.setState(
      {
        requestParams: {
          ...requestParams,
          sort: column + direction,
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
    console.log('state', this.state);
    console.log('props', this.props);
    var response= this.props.response;
    var sort = response && response.responseParams && response.responseParams.sort;
    var porcoiddio = response && response.patients;

    console.log('++++',response,sort,porcoiddio);
    var patients = this.state.patients;
    var identifiers = patients.map(item =>
      item.identifiers.reduce(item => {
        if (item.usage !== null) return item.value;
      })
    );
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
              onClick={() =>
                this.setState(
                  {
                    searchTerm: '',
                    requestParams: {
                      size: 10,
                    },
                  },
                  () => this.fetchPatients()
                )}
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
                <th onClick={() => this.toggleSort('lastName')}>
                  Last name{!sort || !sort.startsWith('last')
                    ? <span>&#9666; &#9656;</span>
                    : sort === 'lastName DESC'
                      ? <span>&nbsp;&nbsp;&#9652;</span>
                      : <span>&nbsp;&nbsp;&#9662;</span>}
                </th>
                <th onClick={() => this.toggleSort('firstName')}>
                  First name{!sort || !sort.startsWith('first')
                    ? <span>&#9666; &#9656;</span>
                    : sort === 'firstName DESC'
                      ? <span>&nbsp;&nbsp;&#9652;</span>
                      : <span>&nbsp;&nbsp;&#9662;</span>}
                </th>
                <th
                  id="dateOfBirth"
                  onClick={() => this.toggleSort('dateOfBirth')}
                >
                  Date of birth{!sort || !sort.startsWith('date')
                    ? <span>&#9666; &#9656;</span>
                    : sort === 'dateOfBirth DESC'
                      ? <span>&nbsp;&nbsp;&#9652;</span>
                      : <span>&nbsp;&nbsp;&#9662;</span>}
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

function mapStateToProps(state) {
  var response = {
    patients: state.response.content,
    responseParams: {
      last: state.response.last,
      totalPages: state.response.totalPages,
      totalElements: state.response.totalElements,
      sort: state.response.sort,
      numberOfElements: state.response.numberOfElements,
      first: state.response.first,
      size: state.response.size,
      number: state.response.number,
      page: state.response.number,
    },
  };

  return {
    response,
  };
}

export default connect(mapStateToProps, {fetchPatients})(Home);
