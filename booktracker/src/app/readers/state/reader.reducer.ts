export function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_READER_OF_MONTH':
      return {
        ...state,
        readerOfTheMonth: action.payload
      }
    default:
      return state;
  }
}