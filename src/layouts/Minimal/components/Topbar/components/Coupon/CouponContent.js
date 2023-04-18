import React from 'react';
import Link from 'next/link';

import {
    Box,
    Chip,
    Card,
    Stack,
    Button,
    Avatar,
    CardHeader,
    Typography,
    CardContent,
    AvatarGroup,
} from '@mui/material';

import { grey } from '@mui/material/colors';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';

import { setActiveCoupon } from 'redux/actions';
import { useDispatch, useSelector } from "react-redux";

import moment from "jalali-moment";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";

export default function CouponCardPopup({ coupon, inCart, handleClose }) {
  const dispatch = useDispatch();
  const { active } = useSelector( state => state.coupons );

  const handleChange = (categoryId) => {
    if(categoryId !== active) {
      dispatch(setActiveCoupon(categoryId))
    } else {
      dispatch(setActiveCoupon(undefined))
    }
    handleClose()
  }

  return (
    <Card elevation={4}>
      <CardContent style={{ padding: 8 }}>
        <Stack direction={{ xs: "column", sm: "row"}} columnGap={1} >
            <Stack sx={{ flex: 2 }} rowGap={1}>
                <Stack alignItems="stretch">
                    {
                    coupon.coupons.length > 0
                        && coupon.coupons.map((item) => {
                        const existInCart = inCart.find( cartCoupon => cartCoupon.id === item.id )
                        return (
                            <Box key={item.id}>
                                <Card>
                                    <CardHeader
                                        sx={{p: 0}}
                                        avatar={
                                        <Avatar sx={{ bgcolor: 'error.main' }} aria-label="recipe">
                                            <VerifiedRoundedIcon />
                                        </Avatar>
                                        }
                                        action={
                                            <AvatarGroup total={item.products_shop.length} max={3}>
                                            {
                                                item.products_shop.map( (product, p) => {
                                                    const img = product.product_info.images !== null
                                                    ? `https://hyperano.ir/api/uploads/images/products/${JSON.parse(product.product_info.images).medium[0]}`
                                                    : "/logo.svg"
                                                    return <Avatar key={p} style={{border: '1px solid #f1f1f1'}} alt={product.product_info?.title} src={img} />
                                                })
                                            }
                                            </AvatarGroup>
                                        }
                                        title={item.title}
                                        subheader={
                                            <Typography variant='subtitle2'>
                                                {`مبلغ ${digitsEnToFa(addCommas(Number(item.amount)))} تومان`}
                                            </Typography>
                                        }
                                    />
                                    <CardContent sx={{pr: 0, pl: 0}}>
                                        <Stack>
                                            <Typography variant='subtitle1'>
                                                فروشگاه {item.shop?.title}
                                            </Typography>
                                        </Stack>
                                        <Stack mt={0.5} direction="row" alignItems="center" justifyContent="space-between" columnGap={1}>
                                            <Typography align="right" variant="body2">
                                                مقدار باقیمانده :
                                            </Typography>
                                            <Chip
                                                size="small"
                                                sx={{width: 120, bgcolor: 'info.lighter', color: 'info.dark' }}
                                                label={
                                                    <Typography fontWeight="bold" variant="body2">
                                                        {digitsEnToFa(addCommas(Number(item.coupon_user[0].remain_amount)))} تومان
                                                    </Typography>
                                                }
                                            />
                                        </Stack>
                                        {
                                            existInCart &&
                                            <Stack mt={0.5} direction="row" alignItems="center" justifyContent="space-between" columnGap={1}>
                                                <Typography align="right" variant="body2">
                                                    مقدار باقیمانده با احتساب سبد خرید :
                                                </Typography>
                                                <Chip
                                                    size="small"
                                                    sx={{width: 120, bgcolor: 'error.lighter', color: 'error.dark' }}
                                                    label={
                                                        <Typography fontWeight="bold" variant="body2">
                                                            {digitsEnToFa(addCommas(Number(item.coupon_user[0].remain_amount - existInCart?.used_to_now)))} تومان
                                                        </Typography>
                                                    }
                                                />
                                            </Stack>
                                        }
                                        <Stack pt={0.5} direction="row" justifyContent="flex-end">
                                            <Button
                                                onClick={handleClose}
                                                sx={{ borderRadius: 2 }}
                                                href={`/search/?shop_ids=${item.shop?.id}&coupon_id=${item.id}`}
                                                color="secondary" size="small">مشاهده محصولات</Button>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Box>
                        )})
                    }
                </Stack>
            </Stack>
            <Stack
                flex={1}
                bgcolor="warning.lighter"
                borderRadius={2}
                alignItems="center"
                justifyContent="space-between"
                rowGap={2}
                p={1}
            >
                <Typography color="warning.dark" variant="subtitle1" fontSize={20}>{coupon.title}</Typography>
                <Typography variant="caption" align="center">
                    {coupon.description}
                </Typography>
                <Typography color={grey[700]} variant="subtitle2" align="center">
                    {`مبلغ ${digitsEnToFa(addCommas(Number(coupon.total_amount)))} تومان`}
                </Typography>
                <Typography variant="caption" align="center">
                    {`تاریخ انقضا: ${digitsEnToFa((moment(coupon.end_date).format("jYYYY/jM/jD")))}`}
                </Typography>
                <Stack width="100%">
                    <Button
                        fullWidth
                        sx={{borderRadius: 2, mb: 0.5}}
                        onClick={()=>handleChange(coupon.id)}
                        variant={coupon.id === active ? "contained" : "outlined" }
                        color="secondary"
                    >
                        {coupon.id !== active ? "استفاده از این بن" : "غیرفعال کردن" }
                    </Button>
                    {
                        coupon.id === active &&
                        <Typography color={grey[600]} variant="caption" align="center">
                            شما در حال استفاده از این بن هستید
                        </Typography>
                    }
                </Stack>
            </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
