import { combineReducers } from 'redux';
import language from './language';
import cart from './cart';
import user from './user';
import coupons from './coupons';
import shop from './shop';
import settings from './settings';

export default combineReducers({
  language,
  cart,
  user,
  coupons,
  shop,
  settings
});
