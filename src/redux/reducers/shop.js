const init = {
  // id: null,
  // title: null,
  // addreess: null,
  // supportInfo: null,
  // minFreeShip: null,
  // minOrderCost: null,
  // avgScoresShop: null,
};

const shop = (state = init, action) => {
  switch (action.type) {

    case 'SET_SHOP':
      let { shop } = action;
      return shop
    case 'CLEAR_SHOP':
      return init
    default:
      return state;
  }
};


export default shop;