export function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FAVORITE_BOOK':
      console.log('existing state: ' + JSON.stringify(state));
      console.log(action.payload);
      return {
        ...state,
        favoriteBook: action.payload
      }
  
    default:
      return state;
  }
}