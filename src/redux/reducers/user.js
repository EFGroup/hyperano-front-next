const init = {
  isAuthenticated: false,
  userData: {},
  loading: false,
  accessToken: null,
  accessTokenExpiry: null
};

const user = (state = init, action) => {
  
  switch (action.type) {
    case 'SET_USER':
      const { user: {
        id,
        token,
        cellphone,
        tellphone,
        firstname,
        lastname,
        username,
        email,
        gender,
        birth_date,
        national_code,
        created_at,
        wallet,
      } } = action;
      return {
        ...state,
        isAuthenticated: token ? true : false,
        accessToken: token,
        userData: {
          id,
          cellphone,
          tellphone,
          firstname,
          lastname,
          username,
          email,
          gender,
          birth_date,
          national_code,
          created_at,
          wallet,
        },
      };
    case 'UPDATE_USER':
      return {
        ...state,
        userData: {
          ...state.userData,
          firstname: action.user?.firstname,
          lastname: action.user?.lastname,
          email: action.user?.email,
        }
      }
    case 'SIGN_OUT':
      return init;
    default:
      return state;
  }
};


export default user;