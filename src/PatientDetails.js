import React, {Component} from 'react';

class PatientDetails extends Component {
  componentWillMount() {
    const url = 'https://api.interview.healthforge.io/api/patient';
    let patientId = this.props.match.params.patientId;
    fetch(url + '/' + patientId)
      .then(response => response.json())
      .then(response => this.setState(response));
  }

  render() {
    console.log(this.state);
    return (
      <div className="container">
        <h2>Patient Details</h2>
        <h3>
          {this.props.match.params.patientId}
        </h3>
      </div>
    );
  }
}

export default PatientDetails;
