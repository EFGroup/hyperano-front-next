import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import {
    Chip,
    Stack,
    Button,
    Skeleton,
    Typography,
    CircularProgress,
} from '@mui/material';
import { orange } from '@mui/material/colors';
import NewReleasesRoundedIcon from '@mui/icons-material/NewReleasesRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

import { useMutation } from '@apollo/client';
import { order, cart } from "apollo/requests";

import { setCarts } from 'redux/actions';
import { useSelector, useDispatch } from "react-redux";

import { SignIn, HorizontalCard } from 'components';

import { toast } from "react-toastify";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";

const CartContent = ({handleOpen, handleClose, setLoading}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { carts } = useSelector(state => state.cart);
  const { active: categoryCouponId } = useSelector(state => state.coupons);
  const { isAuthenticated, accessToken } = useSelector(state => state.user);

  const [ saveOrderCartItem, { loading: itemUpdateLoading } ] = useMutation(
    cart.saveOrderCartItem,
    {
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      }
    }
  );

  const [ saveCart, { loading }] = useMutation(
      order.saveOrderProduct,
      {
      context: {
          serviceName: "auth",
          headers: {
            authorization: `Bearer ${accessToken}`
          }
      }
      }
  );

  const [ deleteOrderCart, { deleteLoading }] = useMutation(
      cart.deleteOrderCart,
      {
      context: {
          serviceName: "auth",
          headers: {
            authorization: `Bearer ${accessToken}`
          }
      }
      }
  );

  const deleteCart = async(ids) => {
    try {
        const {data} = await deleteOrderCart({
            variables: { ids }
        })
        if (data) {
            toast.info("سبد خرید شما خالی شد")
            dispatch(setCarts([], [], undefined))
            handleClose()
        }
    } catch (error) {
        console.log("delete")
    }
  }

  const addCartToOrder = async(order_cart_id) => {
    try {        
        const {data} = await saveCart({
            variables: {
                order_cart_id,
                call_me: 0,
                description: "description"
            }
        })
        if(data){
            toast.success(String(data.saveOrderProduct.messages[0]))
            router.push(`/orders/${data.saveOrderProduct.order.id}`)
            handleClose()
        }
    } catch (error) {
        handleOpen()
    }
  };

  const updateItem = async(product_shop_id, number, order_cart_id, order_cart_item_id, attrVals) => {
    const attribute_value_ids = attrVals.length > 0 ? attrVals.map( attr => attr?.id ) : undefined;
    try {
        const { data } = await saveOrderCartItem({
            variables: {
                type:"UPDATE",
                product_shop_id,
                number,
                order_cart_id,
                order_cart_item_id,
                attribute_value_ids,
                category_coupon_id: isAuthenticated ? categoryCouponId : undefined
            }
        })
        if (data) {
            const currentExistInCart =
                await data.saveOrderCartItem.cart.items.map( cartItem =>
                { return {
                    id: cartItem.product_shop.id,
                    number: Number(cartItem.number),
                    order_cart_id: data.saveOrderCartItem.cart.id,
                    order_cart_item_id: cartItem.id,
                    attr: cartItem.attribute_values.map( attr =>attr.id )
                } } ).flat()
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
            if(data.saveOrderCartItem.coupon_infos) {
                let coupon = data.saveOrderCartItem.coupon_infos.coupons.find( item => item.category.id === categoryCouponId )
                toast.info(`شما با این خرید ${digitsEnToFa(addCommas(coupon.used_to_now))} تومان از بن "${coupon.title}" استفاده می کنید.`)
            }
        }
    } catch (error) {
        // toast.error(error.message)
    }
  };

  useEffect( () => {
    setLoading(itemUpdateLoading || deleteLoading)
  }, [itemUpdateLoading, deleteLoading])

  return (
    <Stack rowGap={1} minHeight="100%" justifyContent="space-between" >
        {
            carts.map( (cart, c) => {
                const {
                    id,
                    items,
                    messages,
                    min_order_cost_remaininig,
                    min_order_cost,
                    discount_amount_cart,
                    free_shipp_remaininig
                } = cart;

                const minRemaining = Number(min_order_cost_remaininig)
                const minOrderCost = Number(min_order_cost)
                const freeShipping = Number(free_shipp_remaininig)

                const hasMessages = messages ? true : false
                return items.length > 0 && <React.Fragment key={id}>
                    {
                        items.map( (item, i) => (
                            <HorizontalCard key={i} cartId={id} item={item} updateItem={updateItem} loading={itemUpdateLoading} />
                        ))
                    }
                    <Stack
                        rowGap={1}
                        style={{
                            backgroundColor: "#fff",
                            position: "sticky",
                            marginTop: "auto",
                            borderRadius: 8,
                            bottom: -16,
                        }}>
                        {/* {
                            hasMessages && messages.map( (message)=>(
                                <Typography align="center" variant="caption" component="p">
                                    {message}
                                </Typography>
                            ) )
                        } */}
                        <Chip
                            variant="outlined"
                            color="info"
                            icon={<NewReleasesRoundedIcon/>}
                            sx={{
                                pt: 1,
                                pb: 1,
                                height: 'auto',
                            }}
                            label={
                                minRemaining > 0
                                ?
                                <Typography fontSize={16} variant="subtitle1" align="center">
                                    حداقل مبلغ ثبت سفارش
                                    {` ${digitsEnToFa(addCommas(minOrderCost))} تومان `}
                                    است
                                </Typography>
                                :
                                <Typography fontSize={16} variant="subtitle1" align="center">
                                    با ثبت این خرید
                                    {` ${digitsEnToFa(addCommas(Number(discount_amount_cart)))} تومان `}
                                    تخفیف می‌گیرید
                                </Typography>
                            }
                        />
                        <Chip
                            sx={{
                                pt: 1,
                                pb: 1,
                                height: 'auto',
                                flexWrap: 'wrap',
                                bgcolor: orange[50]
                            }}
                            label={
                                freeShipping > 0
                                ?
                                <Typography color={orange[700]} fontSize={14} align="center" variant="subtitle1">
                                    با
                                    {` ${digitsEnToFa(addCommas(freeShipping))} تومان `}
                                    خرید دیگر٬ سفارش خود را رایگان تحویل بگیرید
                                </Typography>
                                :
                                <Typography color={orange[700]} variant="subtitle1" align="center">
                                    هزینه ارسال سفارش شما رایگان خواهد بود
                                </Typography>
                            }
                        />
                        {
                        !isAuthenticated
                        ? <SignIn />
                        :
                        <Stack pb={1} direction="row" columnGap={1}>
                            <Button
                                sx={{borderRadius: 2, flex: 1, p: 1}}
                                disabled={loading || minRemaining > 0 }
                                onClick={()=>addCartToOrder(id)}
                                variant="contained" color="secondary" size="large">
                                <Stack flex={1} direction="row" justifyContent="space-between" alignItems="center">
                                    <Chip
                                        sx={{ bgcolor: 'transparent', cursor: 'pointer' }}
                                        label={
                                            <Typography color={minRemaining > 0 ? "inherit" : "white"} variant="h6" component="p">
                                            {
                                                loading
                                                ? <Skeleton variant="text" width={90} />
                                                : "ثبت سفارش"
                                            }
                                            </Typography>
                                        }
                                    />
                                    <Chip
                                        sx={{ bgcolor: 'white', cursor: 'pointer' }}
                                        label={`${digitsEnToFa(addCommas(Number(cart.total_price_cart)))} تومان`}
                                    />
                                </Stack>
                            </Button>
                            <Button sx={{borderRadius: 2}} disabled={loading || deleteLoading} onClick={() => deleteCart(id)} variant="outlined" color="error" size="large" >
                                {
                                    loading
                                    ? <CircularProgress color="inherit" size={24} />
                                    : <DeleteOutlineRoundedIcon/>
                                }
                            </Button>
                        </Stack>
                        }
                    </Stack>
                </React.Fragment>
            })
        }
    </Stack>
)};

export default CartContent;