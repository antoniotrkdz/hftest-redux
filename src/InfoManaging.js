import React, {Component} from 'react';
//import _ from 'lodash';
import {types} from './types.js';

class InfoManaging extends Component {
  constructor() {
    super();

    this.state = {
      fieldNames: {
        managingOrganisation: 'Managing Organization',
        managingPractioner: 'Managing Practitioner',
      },
    };
  }

  render() {
    let patient = this.props.patient;
    let fieldNames = this.state.fieldNames;
    console.log('1patient', patient);
    console.log(Object.keys(patient));
    return (
      <div>
        {Object.keys(patient).map(item => {
          if (types.get(patient[item]) === types.object) {
            return (
              <div>
                <div className="fieldNames">
                  <h4>
                    {fieldNames[item]}
                  </h4>
                </div>
                {Object.keys(patient[item]).map(
                  elem =>
                    patient[item][elem]
                      ? <div>
                        <h4>
                          {elem + ': ' + patient[item][elem]}
                        </h4>
                      </div>
                      : null
                )}
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default InfoManaging;
