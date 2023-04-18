const init = {
  openMenu: false,
  openProfile: false,
};

const settings = (state = init, action) => {
  switch (action.type) {
    case 'SET_OPEN_MENU':
      let { openMenu } = action;
      return {
        ...state,
        openMenu,
      }
    case 'SET_OPEN_PROFILE':
      let { openProfile } = action;
      return {
        ...state,
        openProfile,
      }
    default:
      return state;
  }
};

export default settings;
