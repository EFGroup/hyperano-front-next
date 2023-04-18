// import Hashids from 'hashids';

const init = {
  openCoupons: false,
  active: undefined,
  data : [],
  inCart : []
};

const coupons = (state = init, action) => {
  switch (action.type) {
    case 'SET_COUPONS':
      return {
          ...state,
          data: action.data,
        }
    case 'SET_ACTIVE_COUPON':
      return {
          ...state,
          active: action.active,
        }
    case 'SET_CART_COUPON':
      return {
          ...state,
          inCart: action.inCart,
        }
    case 'SET_OPEN_COUPONS':
      let { openCoupons } = action;
      return {
          ...state,
          openCoupons
        }

    default:
      return state;
  }
};


export default coupons;