export function patientsHasErrored(state = false, action) {
  switch (action.type) {
  case 'PATIENTS_HAS_ERRORED':
    return {
      ...state,
      ...action.hasErrored,
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
      ...action.isLoading,
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
      ...action.response,
    };
  default:
    return state;
  }
}
