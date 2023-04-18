import React from 'react';
import Link from 'next/link';

import {
  Card,
  Stack,
  Avatar,
  Divider,
  Skeleton,
  Typography,
  CardHeader,
  CardContent,
  CardActionArea,
} from '@mui/material';

import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';

import moment from "jalali-moment";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";

export default function OrderScreen({ orders, loading }) {

  return (
    <Card sx={{ mt: -10, borderRadius: 4 }}>
      <CardHeader title="سفارشات من" color="primary" />
      <CardContent sx={{py: 0, px: {xs: 1, sm: 1, md: 2}}}>
        <Stack rowGap={2} minHeight="60vh">
        {
            loading
            ?
                [0,1,2].map( item => <Skeleton key={item} variant='rounded' height={400} sx={{borderRadius: 2}} /> )
            :
            orders && orders.map( order => (
            <Card sx={{ bgcolor: order.status?.id === "10" && '#ececec' }} elevation={2} key={order.id}>
                <CardActionArea disabled={order.status?.id === "10"} href={`/orders/${order.id}`}>
                    <CardHeader
                        title={`سفارش ${digitsEnToFa(order.tracking_code.split(".")[1])}`}
                        subheader={`فروشگاه ${order?.shop?.title}`}
                        avatar={
                            <Avatar sx={{bgcolor: 'error.lighter'}}>
                                <LocalMallRoundedIcon color='error' fontSize="small" />
                            </Avatar>
                        }
                        action={
                            <Stack>
                            {
                                order.created_at &&
                                <>
                                <Typography letterSpacing={2} textAlign="end" variant="subtitle1">
                                    {digitsEnToFa((moment(order.created_at).format("jYYYY/jMM/jDD")))}
                                </Typography>
                                <Typography letterSpacing={2} textAlign="end" variant="subtitle2">
                                    {digitsEnToFa((moment(order.created_at).format("hh:mm:ss")))}
                                </Typography>
                                </>
                            }
                            </Stack>
                        }
                    />
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', py: 0 }}>
                        <Stack columnGap={4} rowGap={4} width="100%" direction={{ xs: "column", md: "row"}} alignItems={{xs: "stretch", md: "center"}}>
                            <Stack flex={1}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant='body2' gutterBottom>وضعیت سفارش</Typography>
                                <Typography variant='body2' gutterBottom align="right">
                                {order.status?.title}
                                </Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant='body2' gutterBottom>وضعیت پرداخت</Typography>
                                <Typography variant='body2' gutterBottom align="right">
                                {order.payment_status?.id === "1" ? "پرداخت شده" : "پرداخت نشده"}
                                </Typography>
                            </Stack>
                            <Divider sx={{my: 1}} />
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant='body2' gutterBottom>مجموع سفارش</Typography>
                                <Typography variant='body2' gutterBottom align="right">
                                {`${digitsEnToFa(addCommas(Number(order.co_products_cost)))} تومان`}
                                </Typography>
                            </Stack>
                            {
                                order.products_discount &&
                                <Stack direction="row" justifyContent="space-between">
                                <Typography variant='body2' gutterBottom>تخفیف محصولات</Typography>
                                <Typography variant='body2' gutterBottom align="right">
                                {`${digitsEnToFa(addCommas(Number(order.products_discount)))} تومان`}
                                </Typography>
                                </Stack>
                            }
                            {
                                order.order_discount &&
                                <Stack direction="row" justifyContent="space-between">
                                <Typography variant='body2' gutterBottom>{`تخفیف ${order.discount_title}`}</Typography>
                                <Typography variant='body2' gutterBottom align="right">
                                {`${digitsEnToFa(addCommas(Number(order.order_discount)))} تومان`}
                                </Typography>
                                </Stack>
                            }
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant='body2' gutterBottom>هزینه ارسال</Typography>
                                <Typography variant='body2' gutterBottom align="right">
                                {`${digitsEnToFa(addCommas(Number(order.shipping_cost)))} تومان`}
                                </Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant='subtitle1' gutterBottom>قابل پرداخت</Typography>
                                <Typography variant='subtitle1' gutterBottom align="right">
                                {`${digitsEnToFa(addCommas(Number(order.total_cost)))} تومان`}
                                </Typography>
                            </Stack>
                            </Stack>
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
            ))
        }
        </Stack>
      </CardContent>
    </Card>
  );
}
