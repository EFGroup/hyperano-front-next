const init = {
  carts: [],
  current: [],
  openCart: false,
  refreshCart: false,
  cartId: undefined,
};

const cart = (state = init, action) => {
  switch (action.type) {

    case 'SET_CARTS':
      let { carts, current, cartId } = action;
      return {
        ...state,
        carts,
        cartId,
        current,
      }
    case 'SET_OPEN_CART':
      let { openCart } = action;
      return {
        ...state,
        openCart,
      }
    default:
      return state;
  }
};


export default cart;