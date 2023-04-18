import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';

import { useDispatch, useSelector } from "react-redux";

import { setCarts, setInCartCoupon, openCouponPopup, openCartDrawer, setShop } from 'redux/actions';
import { cart } from "apollo/requests";
import { useMutation } from '@apollo/client';

import { toast } from "react-toastify";

import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";

const AddToCartBtn = (props)=> {
  const dispatch = useDispatch()
  const { isAuthenticated, accessToken } = useSelector(state => state.user);
  const { current: currentCart, cartId } = useSelector(state => state.cart);
  const { id: shopId, title: shopTitle } = useSelector(state => state.shop);
  const { active: categoryCouponId } = useSelector(state => state.coupons);

  const {
    id,
    shop,
    current = [],
    currentExist = false,
    attrVals = [],
    isValid = false,
    icon = true
  }  = props;

  const [ saveOrderCartItem, { loading } ] = useMutation(
    cart.saveOrderCartItem,
    {
      ssr: false,
      context: {
        headers: {
          authorization: accessToken ? `Bearer ${accessToken}` : null
        }
      }
    }
  );

  const handleClick = async(updatedNumber) => {
    try {
        if (shopId !== shop?.id && currentCart.length) {
            toast.warning(`شما یک سبد خرید از فروشگاه ${shopTitle} دارید‍‍`)
            dispatch(openCartDrawer(true))
            return
        }
        if (shopId !== shop?.id) {
            dispatch(setShop(shop))
            toast.warning(`فروشگاه پیشفرض شما تغییر یافت`)
        }
        if(currentExist) {
            const { data } = await saveOrderCartItem({
                variables: {
                    type: "UPDATE",
                    product_shop_id: id,
                    number: updatedNumber,
                    order_cart_id: current.order_cart_id,
                    order_cart_item_id: current.order_cart_item_id,
                    attribute_value_ids: attrVals?.length > 0 ? attrVals : undefined,
                    category_coupon_id: isAuthenticated ? categoryCouponId : undefined
                }
            })
            if (data) {
                const currentExistInCart = data.saveOrderCartItem.cart.items.map( cartItem => (
                    {
                        id: cartItem.product_shop.id,
                        number: Number(cartItem.number),
                        order_cart_id: data.saveOrderCartItem.cart.id,
                        order_cart_item_id: cartItem.id,
                        attr: cartItem.attribute_values.map( attr =>attr.id )
                    }
                ) ).flat()
                dispatch(setCarts([{
                    ...data.saveOrderCartItem.cart,
                    coupon_infos: data.saveOrderCartItem.coupon_infos ,
                    discount_amount_cart: data.saveOrderCartItem.discount_amount_cart ,
                    discount_infos: data.saveOrderCartItem.discount_infos ,
                    free_shipp_remaininig: data.saveOrderCartItem.free_shipp_remaininig ,
                    messages: data.saveOrderCartItem.messages ,
                    min_order_cost_remaininig: data.saveOrderCartItem.min_order_cost_remaininig ,
                    min_order_cost: data.saveOrderCartItem.min_order_cost ,
                    product_counts_cart: data.saveOrderCartItem.product_counts_cart ,
                    product_numbers_cart: data.saveOrderCartItem.product_numbers_cart ,
                    total_price_cart: data.saveOrderCartItem.total_price_cart ,
                }], currentExistInCart, data.saveOrderCartItem.cart.id))

                // if(data.saveOrderCartItem.coupon_infos) {
                //     dispatch(setInCartCoupon(data.saveOrderCartItem.coupon_infos.coupons))
                //     let coupon = data.saveOrderCartItem.coupon_infos.coupons.find( item => item.category.id === categoryCouponId )
                //     toast.info(`شما با این خرید ${digitsEnToFa(addCommas(coupon.used_to_now))} تومان از بن "${coupon.title}" استفاده می کنید.`)
                // }
            }
        } else {
            const { data } = await saveOrderCartItem({
                variables: {
                    type: "ADD",
                    number: 1,
                    product_shop_id: id,
                    attribute_value_ids: attrVals?.length > 0 ? attrVals : undefined,
                    category_coupon_id: isAuthenticated ? categoryCouponId : undefined,
                    order_cart_id: cartId
                }
            })

            if (data) {
                const currentExistInCart = data.saveOrderCartItem.cart.items.map( cartItem => (
                    {
                        id: cartItem.product_shop.id,
                        number: Number(cartItem.number),
                        order_cart_id: data.saveOrderCartItem.cart.id,
                        order_cart_item_id: cartItem.id,
                        attr: cartItem.attribute_values.map( attr =>attr.id )
                    }
                ) ).flat()
                dispatch(setCarts([{
                    ...data.saveOrderCartItem.cart,
                    coupon_infos: data.saveOrderCartItem.coupon_infos ,
                    discount_amount_cart: data.saveOrderCartItem.discount_amount_cart ,
                    discount_infos: data.saveOrderCartItem.discount_infos ,
                    free_shipp_remaininig: data.saveOrderCartItem.free_shipp_remaininig ,
                    messages: data.saveOrderCartItem.messages ,
                    min_order_cost_remaininig: data.saveOrderCartItem.min_order_cost_remaininig ,
                    min_order_cost: data.saveOrderCartItem.min_order_cost ,
                    product_counts_cart: data.saveOrderCartItem.product_counts_cart ,
                    product_numbers_cart: data.saveOrderCartItem.product_numbers_cart ,
                    total_price_cart: data.saveOrderCartItem.total_price_cart ,
                }], currentExistInCart, data.saveOrderCartItem.cart.id))

                // if(data.saveOrderCartItem.coupon_infos) {
                //     dispatch(setInCartCoupon(data.saveOrderCartItem.coupon_infos.coupons))
                //     let coupon = data.saveOrderCartItem.coupon_infos.coupons.find( item => item.category.id === categoryCouponId )
                //     toast.info(`شما با این خرید ${digitsEnToFa(addCommas(coupon.used_to_now))} تومان از بن "${coupon.title}" استفاده می کنید.`)
                // }
            }
        }
    } catch (error) {
        toast.error(error.message)
    }
  }

  return (
    <>
    {
        currentExist
        ?
        <>
            <Button color="secondary" disabled={loading} onClick={()=>handleClick(current.number + 1)} variant="outlined" sx={{ml: -2, px: 3}}>
                <AddCircleOutlineRoundedIcon/>
            </Button>
            <Stack justifyContent="center" alignItems="center" bgcolor="warning.lighter" color="#5a5a5a" sx={{alignSelf: 'center', zIndex: 2, width: 68, height: 68, borderRadius: '50%', border: '1px solid', borderColor: 'warning.main'}}>
                {
                    loading
                    ?
                    <CircularProgress size={16} color="inherit" />
                    :
                    <Typography variant="subtitle1">{digitsEnToFa(current.number)}</Typography>
                }
            <Typography variant="caption">عدد</Typography>
            </Stack>
            {
                current.number < 2
                ?
                <Button color="error" disabled={loading} onClick={()=>handleClick(0)} variant="outlined" sx={{mr: -2, px: 3}}>
                    <DeleteOutlineRoundedIcon color="error" />
                </Button>
                :
                <Button color="info" disabled={loading} onClick={()=>handleClick(current.number - 1)} variant="outlined" sx={{mr: -2, px: 3}}>
                    <RemoveCircleOutlineRoundedIcon/>
                </Button>
            }
        </>
        :
            icon
            ?
            <Button
                fullWidth
                color="warning"
                variant="contained"
                disabled={isValid}
                onClick={() => handleClick()}
                sx={{
                    width: 68, height: 68, borderRadius: '50%',
                    fontWeight: "bold",
                    boxShadow: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        fontSize: 15,
                        transition: 'all 0.3s ease',
                        boxShadow: `0 10px 16px -4px #ccc}`
                    }
                }}>
                {
                    loading ? <CircularProgress size={24} color="inherit" /> : <AddShoppingCartRoundedIcon color="action" />
                }
            </Button>
            :
            <Button
                fullWidth
                size="large"
                color="error"
                variant="contained"
                disabled={isValid}
                onClick={() => handleClick()}
                endIcon={<AddShoppingCartRoundedIcon sx={{mr: 2}} fontSize='small' />}
                sx={{
                    px: 4,
                    mx: {xs: 0, sm: 1, md: 4, lg: 4, xl: 6},
                    fontWeight: "bold",
                    boxShadow: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        fontSize: 20,
                        transition: 'all 0.3s ease',
                        boxShadow: `0 10px 16px -4px #ccc}`
                    }
                }}>
                {
                    loading ? <CircularProgress size={24} color="inherit" /> : "افزودن به سبد خرید"
                }
            </Button>

    }
    </>
  );
}

export default AddToCartBtn;