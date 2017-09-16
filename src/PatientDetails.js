import React, {Component} from 'react';
import {types} from './types.js';
import _ from 'lodash';
import moment from 'moment';

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
        //addresses: [response.addresses],
        //{usage: null, value: "575-702-8745", codeSystem: "NHS"}
        //managingOrganisation:
      },
    };
  }

  componentWillMount() {
    const url = 'https://api.interview.healthforge.io/api/patient';
    let patientId = this.props.match.params.patientId;
    fetch(url + '/' + patientId)
      .then(response => response.json())
      .then(response =>
        this.setState({
          patient: response,
        })
      );
  }

  render() {
    let patient = this.state.patient;
    let fieldNames = this.state.fieldNames;
    console.log('1patient', patient);
    console.log(Object.keys(patient));
    return (
      <div className="container">
        <h2>Patient details</h2>
        <h4>
          Patient ID: {this.props.match.params.patientId}
        </h4>
        <div className="credentials">
          {Object.keys(patient).map(item => {
            if (
              types.get(patient[item]) === types.string &&
              patient[item].search(/\d{4}/) === -1
            ) {
              return (
                <div className="fields">
                  <div className="fieldnames">
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
              <div className="fieldnames">
                <h4>
                  {fieldNames['dateOfBirth']}
                </h4>
              </div>
              <h4 className="fieldContent">
                {moment(patient['dateOfBirth']).format('DD MMM YYYY')}
              </h4>
            </div>
            <div className="fields">
              <div className="fieldnames">
                <h4>
                  {fieldNames['dateOfDeath']}
                </h4>
              </div>
              <h4 className="fieldContent">
                {moment(patient['dateOfDeath']).format('DD MMM YYYY')}
              </h4>
            </div>
          </div>
          <div>
            {Object.keys(patient).map(item => {
              if (types.get(patient[item]) === types.array) {
                return (
                  <div>
                    {patient[item].map(elem =>
                      <div>
                        {Object.keys(elem).map(objKey =>
                          objKey !== 'usage'
                            ? <h4>
                              {objKey + ': ' + elem[objKey]}
                            </h4>
                            : <h4>
                              {elem[objKey]}
                            </h4>)}
                      </div>)}
                  </div>
                );
              }
            })}
            {Object.keys(patient).map(item => {
              if (types.get(patient[item]) === types.object) {
                return (
                  <div>
                    <h4>
                      {item + ': object'}
                    </h4>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default PatientDetails;
