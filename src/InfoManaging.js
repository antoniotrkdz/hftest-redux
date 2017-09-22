import React, {Component} from 'react';
import {types} from './types.js';

class InfoManaging extends Component {
  constructor() {
    super();

    this.state = {
      fieldNames: {
        firstName: 'First Name: ',
        lastName: 'Last Name: ',
        prefix: 'Prefix: ',
        name: '',
        managingOrganisation: 'Managing Organization',
        managingPractioner: 'Managing Practitioner',
      },
    };
  }

  render() {
    let patient = this.props.patient;
    let fieldNames = this.state.fieldNames;
    return (
      <div className="lists">
        {Object.keys(patient).map(item => {
          if (types.get(patient[item]) === types.object) {
            return (
              <div>
                <div className="fieldNames">
                  <h4>
                    {fieldNames[item]}
                  </h4>
                </div>
                <div className="reverseFieldManag">
                  {Object.keys(patient[item]).map(elem => {
                    if (types.get(patient[item][elem]) === types.string) {
                      return (
                        <div className="colFields">
                          <h4 className="bold">
                            {fieldNames[elem] + patient[item][elem]}
                          </h4>
                        </div>
                      );
                    } else if (
                      types.get(patient[item][elem]) === types.object
                    ) {
                      return (
                        <div className="colFields">
                          <h4 className="bold">
                            {elem === 'telecom'
                              ? 'contact' + ': '
                              : elem + ': '}
                          </h4>
                          {Object.keys(patient[item][elem]).map(subElem => {
                            if (patient[item][elem][subElem]) {
                              return (
                                <h4 className="fieldContent">
                                  {patient[item][elem][subElem] + ' '}
                                </h4>
                              );
                            }
                          })}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default InfoManaging;
