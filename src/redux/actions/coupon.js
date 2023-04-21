export const setCoupons = data => ({
  type: "SET_COUPONS",
  data
})

export const setActiveCoupon = active => ({
  type: "SET_ACTIVE_COUPON",
  active
})

export const openCouponPopup = openCoupons => ({
  type: "SET_OPEN_COUPONS",
  openCoupons
})

export const setInitCoupons = (coupons) => async dispatch => {
  dispatch(setCoupons(coupons))
}