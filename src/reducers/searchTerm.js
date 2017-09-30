export function setSearchTerm(state = '', action) {
  switch (action.type) {
  case 'SET_SEARCH_TERM':
    return {
      ...state,
      ...action.term,
    };
  default:
    return state;
  }
}
