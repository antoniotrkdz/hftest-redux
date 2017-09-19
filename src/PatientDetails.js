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
    console.log(this.props.match.params.patientId);
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
        <div className="lists">
          {Object.keys(patient).map(item => {
            if (types.get(patient[item]) === types.array) {
              return (
                <div>
                  <div className="fieldNames">
                    <h4>
                      {item}
                    </h4>
                  </div>
                  {patient[item].map(elem =>
                    <div
                      className={
                        item == 'identifiers' ? 'reverseFields' : 'colFields'
                      }
                    >
                      {item != 'addresses'
                        ? Object.keys(elem).map(objKey => {
                          if (elem[objKey]) {
                            switch (objKey) {
                            case 'usage':
                              return (
                                <h4 className="fieldContent bold">
                                  {elem[objKey] == 'primary'
                                    ? null
                                    : elem[objKey]}
                                </h4>
                              );
                            case 'value':
                              return (
                                <h4 className="fieldContent">
                                  {elem[objKey]}
                                </h4>
                              );
                            case 'codeSystem':
                              return (
                                <h4 className="fieldContent">
                                  {elem[objKey] + ': '}
                                </h4>
                              );
                            default:
                              return (
                                <h4 className="fieldContent">
                                  {objKey + ': ' + elem[objKey]}
                                </h4>
                              );
                            }
                          }
                        })
                        : Object.keys(elem).map(objKey => {
                          return (
                            <h4
                              className={
                                objKey == 'usage'
                                  ? 'fieldContent bold'
                                  : 'fieldContent'
                              }
                            >
                              {elem[objKey]}
                            </h4>
                          );
                        })}
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
        <div>
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
    );
  }
}

export default PatientDetails;
