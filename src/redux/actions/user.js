import axios from 'axios';
import { setCarts } from './cart';
import { clearShop } from './shop';
import { setCoupons } from './coupon';

export const setUser = user => ({
  type: "SET_USER",
  user
});

export const updateUser = user => ({
  type: "UPDATE_USER",
  user
});

export const userSignOut = () => ({
  type: "SIGN_OUT"
});

export const signOut = () => async dispatch => {
  await axios({
    method: 'POST',
    url: '/api/auth/signout'
  });
  localStorage.clear()
  sessionStorage.clear()
  dispatch(clearShop())
  dispatch(setCarts([], [], undefined))
  dispatch(setCoupons([]))
  dispatch(userSignOut())
};