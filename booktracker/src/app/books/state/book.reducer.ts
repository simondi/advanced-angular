export function reducer(state, action) {

  switch (action.type) {

    case 'UPDATE_FAVORITE_BOOK':

      return {
        ...state,
        favoriteBook: action.payload
      }
  
    default:
      return state;
  }
}