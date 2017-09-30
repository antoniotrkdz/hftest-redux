import {patientsIsLoading, patientsFetchSuccess, patientsHasErrored} from './patients.js';

export function fetchPatients(requestParams) {
  return dispatch => {
    dispatch(patientsIsLoading(true));
    //requestParams = state.requestParams;
    const url = new URL('https://api.interview.healthforge.io/api/patient');
    //Object.keys(requestParams).forEach(key =>
      //url.searchParams.append(key, requestParams[key])
    //);

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(patientsIsLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(response => dispatch(patientsFetchSuccess(response)))
      .catch(() => dispatch(patientsHasErrored(true)));
  };
}
