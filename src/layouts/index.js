import React, { useEffect } from 'react';
import MinimalLayout from './Minimal';

import { useDispatch } from "react-redux";
import { setUser, setInitCart, setInitCoupons } from 'redux/actions';

const LayoutProvider = ({ layout, user, cart, coupons, children }) => {
  const dispatch = useDispatch();

  useEffect( () => {
    user && dispatch(setUser(user));
    cart && dispatch(setInitCart(cart));
    coupons && dispatch(setInitCoupons(coupons));
  }, [])
  
  switch (layout) {
    case "minimal":
      return <MinimalLayout>{children}</MinimalLayout>;
    default:
      return children;
  }
};

export default LayoutProvider;