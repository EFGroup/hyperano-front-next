export const setShop = shop => ({
  type: "SET_SHOP",
  shop: { ...shop, support_info: JSON.parse(shop?.support_info)}
})

export const clearShop = () => ({
  type: "CLEAR_SHOP"
})