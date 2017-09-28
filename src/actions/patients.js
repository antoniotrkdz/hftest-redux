export function patientsHasErrored(bool) {
  return {
    type: 'PATIENTS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function patientsIsLoading(bool) {
  return {
    type: 'PATIENTS_IS_LOADING',
    isLoading: bool,
  };
}
export function patientsFetchSuccess(response) {
  return {
    type: 'PATIENTS_FETCH_SUCCESS',
    response,
  };
}
