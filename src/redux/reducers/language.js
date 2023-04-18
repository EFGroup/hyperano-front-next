const init = {
  lang: 'fa',
  direction: 'rtl'
};

const language = (language = init, action) => {
  switch (action.type) {
    case 'SET_LANG':
      return action.language;
    default:
      return language;
  }
};

export default language;
