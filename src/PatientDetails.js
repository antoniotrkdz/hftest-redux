import React, {Component} from 'react';
import {types} from './types.js';
import moment from 'moment';
import axios from 'axios';
import InfoArray from './InfoArray.js';
import InfoManaging from './InfoManaging.js';

class PatientDetails extends Component {
  constructor() {
    super();

    this.state = {
      patient: {},
      fieldNames: {
        prefix: 'Prefix: ',
        firstName: 'First name: ',
        lastName: 'Last name: ',
        suffix: 'Suffix: ',
        gender: 'Gender: ',
        dateOfBirth: 'Date of birth: ',
        dateOfDeath: 'Date of death: ',
      },
    };
  }

  componentWillMount() {
    const url = 'https://api.interview.healthforge.io/api/secure/patient';
    let patientId = this.props.match.params.patientId;
    axios.get(url + '/' + patientId)
      .then(response => response.data)
      .then(response =>
        this.setState({
          patient: response,
        })
      )
      .catch(error => console.log('Fetch operation failed: ' + error.message));
  }

  render() {
    let patient = this.state.patient;
    let fieldNames = this.state.fieldNames;
    return (
      <div className="container">
        <h2>Patient details</h2>
        <div className="credentials">
          {Object.keys(patient).map(item => {
            if (
              types.get(patient[item]) === types.string &&
              patient[item].search(/\d{4}/) === -1
            ) {
              return (
                <div className="fields">
                  <div className="fieldNames">
                    <h4>
                      {fieldNames[item]}
                    </h4>
                  </div>
                  <h4 className="fieldContent">
                    {patient[item]}
                  </h4>
                </div>
              );
            }
          })}
          <div className="dates">
            <div className="fields">
              <div className="fieldNames">
                <h4>
                  {fieldNames['dateOfBirth']}
                </h4>
              </div>
              <h4 className="fieldContent">
                {moment(patient['dateOfBirth']).format('DD MMM YYYY')}
              </h4>
            </div>
            <div className="fields">
              <div className="fieldNames">
                <h4>
                  {fieldNames['dateOfDeath']}
                </h4>
              </div>
              <h4 className="fieldContent">
                {moment(patient['dateOfDeath']).format('DD MMM YYYY')}
              </h4>
            </div>
          </div>
        </div>
        <div>
          <InfoArray patient={this.state.patient} />
        </div>
        <div>
          <InfoManaging patient={this.state.patient} />
        </div>
      </div>
    );
  }
}

export default PatientDetails;
