const defaultState = {
    logged: false,
    token: localStorage.getItem("jwt")
  }

  export default (state=defaultState, action) => {

    let payload = action.payload;
    switch (action.type) {
        case 'LOGIN_SUCCESSFULL':
            return {
                ...state,
                logged: true,
                token: payload
            };
        case 'LOGOUT':
            return {
                ...state,
                token: null,
                logged: false
            };
        default:
            return state;
    }
  };