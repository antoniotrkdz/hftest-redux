import React, {Component} from 'react';
import {types} from './types.js';

class InfoArray extends Component {
  render() {
    let patient = this.props.patient;
    console.log(this.props);
    return (
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
                      item === 'identifiers' ? 'reverseFields' : 'colFields'
                    }
                  >
                    {item !== 'addresses'
                      ? Object.keys(elem).map(objKey => {
                        if (elem[objKey]) {
                          switch (objKey) {
                          case 'usage':
                            return (
                              <h4 className="fieldContent bold">
                                {elem[objKey] === 'primary'
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
                              objKey === 'usage'
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
    );
  }
}

export default InfoArray;
