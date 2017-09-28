export function patientsHasErrored(state = false, action) {
  switch (action.type) {
  case 'PATIENTS_HAS_ERRORED':
    return {
      ...state,
      hasErrored: action.hasErrored,
    };
  default:
    return state;
  }
}
export function patientsIsLoading(state = false, action) {
  switch (action.type) {
  case 'ITEMS_IS_LOADING':
    return {
      ...state,
      isLoading: action.isLoading,
    };
  default:
    return state;
  }
}
export function patientsFetchSuccess(state = {}, action) {
  switch (action.type) {
  case 'PATIENTS_FETCH_SUCCESS':
    return {
      ...state,
      patients: action.response,
    };
  default:
    return state;
  }
}
