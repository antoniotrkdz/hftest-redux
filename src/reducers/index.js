import {combineReducers} from 'redux';
import {patientsIsLoading, patientsHasErrored} from './patients.js';
import {patientsFetchSuccess as response} from './patients.js';

export default combineReducers({
  patientsIsLoading,
  patientsHasErrored,
  response,
});
