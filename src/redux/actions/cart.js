export const setCarts = (carts, current, cartId) => ({
    type: "SET_CARTS",
    carts,
    current,
    cartId
});

export const openCartDrawer = openCart => ({
  type: "SET_OPEN_CART",
  openCart
})

export const setInitCart = (cart) => async dispatch => {
  const currentExistInCart = cart.map( cart =>
      cart.items.map( item => (
        {
          id: item.product_shop.id,
          number: Number(item.number),
          order_cart_id: cart.id,
          order_cart_item_id: item.id,
          attr: item.attribute_values.map( attr =>attr.id )
        }
      ))
    ).flat();
  dispatch(setCarts(cart, currentExistInCart, cart[0]?.id))
};