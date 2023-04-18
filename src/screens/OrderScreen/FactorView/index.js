import React, { lazy } from 'react';

import {
  Card,
  Stack,
  Avatar,
  Button,
  Typography,
  CardHeader,
  CardContent,
  CardActions,
  CircularProgress
} from '@mui/material';
import { grey } from '@mui/material/colors';

import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import PhoneInTalkRoundedIcon from '@mui/icons-material/PhonelinkSetupSharp';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

import moment from "jalali-moment";
// import { Loadable } from 'components';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import { digitsEnToFa } from "@persian-tools/persian-tools";

import dynamic from "next/dynamic";
import Skeleton from '@mui/material/Skeleton';

import { order } from 'apollo/requests';
import { useMutation } from '@apollo/client';

// const DynamicComponentWithNoSSR = Loadable(lazy(() => import('components/Mapir')));
const DynamicComponentWithNoSSR = dynamic(
  () =>  import('components/Mapir'),
  {
    ssr: false,
    loading: 
      () => <Skeleton
              width="100%"
              height="30vh"
              variant="rectangular"
              animation= "wave"
              sx={{
                backgroundImage: 'url("/logo.svg")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                borderRadius: 2
              }}
            />
  }
);
export default function OrderScreen({
  refetch,
  payment,
  address,
  shipping,
  orderInfo,
  setActiveStep,
  setPaymentType,
}) {
  
  const { accessToken } = useSelector(state => state.user);

  const [ updateOrder, { loading } ] = useMutation(
    order.saveInfo,
    {
    context: {
        serviceName: "auth",
        headers: {
          authorization: `Bearer ${accessToken}`
        }
    }
    }
  );

  const saveOrderInfo = async() => {
    try {
      const { data } = await updateOrder({
        variables: {
          order_id: orderInfo.id,
          address_id: address.id,
          shipping_id: shipping.id,
          payment_type_id: payment.id,
          demand_date: shipping.demand_date,
          demand_hour: shipping.demand_hour,
        }
      })
      toast.info(String(data.saveOrderInfo?.messages[0]))
      if(data && data.saveOrderInfo.model?.status?.id === "2") {
        setActiveStep(4)
        refetch()
      }
    } catch (error) {
      // toast.error((error.message))
    }
  }

  return (
    <Stack p={{ xs: 0, sm: 1, md: 4 }} justifyContent="center" alignItems="center" minHeight={400}>
      <Typography variant="h3">اطلاعات وارد شده را تایید می کنید؟</Typography>
        <Card elevation={4} key={orderInfo.id} sx={{ width: '100%', m: 2, border: '1px dashed #e3e8f8' }}>
            <CardHeader
              title={
                <>
                  <Typography variant="subtitle1">{`سفارش شماره ${digitsEnToFa((orderInfo.tracking_code).split(".")[1])}`}</Typography>
                </>
              }
              subheader={
                <>
                  <Typography fontSize={12} variant="body2">
                    {`تاریخ ثبت سفارش: ${digitsEnToFa((moment(orderInfo.created_at).format("jYYYY/jM/jD hh:mm:ss")))}`}
                  </Typography>
                </>
              }
              avatar={
                <Avatar alt="main">
                  <ReceiptRoundedIcon />
                </Avatar>
              }
            />
            <CardContent sx={{p: 2}}>
            <Stack direction={{xs: "column", md: "row"}} columnGap={4} rowGap={2}>
              <Stack flex={1} rowGap={2} minWidth={280} >
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant='subtitle1' gutterBottom>نحوه پرداخت:</Typography>
                  <Typography variant='body2' gutterBottom align="right">{payment.title}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant='subtitle1' gutterBottom>وضعیت پرداخت:</Typography>
                  <Typography variant='body2' gutterBottom align="right">{orderInfo.payment_status?.title}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant='subtitle1' gutterBottom>زمان دریافت:</Typography>
                  {
                  shipping.demand_date
                  ? <Typography align="center" variant="body2" gutterBottom>{`${digitsEnToFa(shipping?.shamsi)} ساعت ${digitsEnToFa(shipping?.demand_hour)}`}</Typography>
                  : <Typography align="center" variant="body2" gutterBottom>حمل توسط مشتری</Typography>
                  }
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant='subtitle1' gutterBottom>نحوه ارسال:</Typography>
                  <Typography align="center" variant="body2" gutterBottom>{shipping.title}</Typography>
                </Stack>
              </Stack>
              <Stack flex={2} rowGap={1}>
                <Typography variant='subtitle1' gutterBottom>مشخصات دریافت کننده:</Typography>
                <Stack direction={{xs: 'column', sm: 'row'}} columnGap={1} justifyContent="space-between" alignItems="center">
                  <Stack rowGap={1}>
                    <Typography variant="body1">
                      {address.main_street || ""}
                    </Typography>
                    <Typography variant="body1">
                      {address.minor_address || ""}
                    </Typography>
                  </Stack>
                  <Stack alignItems="end" rowGap={1} columnGap={1} direction={{xs: 'row', sm: 'column'}}>
                    <Stack
                      columnGap={1}
                      direction="row"
                      alignItems="center"
                      bgcolor={grey[100]} color={grey[800]}
                      p={0.5} pl={1} pr={1} borderRadius={2}>
                      <Typography variant="caption" fontWeight="bold">{digitsEnToFa(address?.tellphone || "") || "ثبت نشده"}</Typography>
                      <PhoneInTalkRoundedIcon fontSize="inherit" />
                    </Stack>
                    <Stack
                      columnGap={1}
                      direction="row"
                      alignItems="center"
                      bgcolor={grey[100]} color={grey[800]}
                      p={0.5} pl={1} pr={1} borderRadius={2}>
                      <Typography variant="caption" fontWeight="bold">{digitsEnToFa(address?.postal_code || "") || "ثبت نشده"}</Typography>
                      <HomeRoundedIcon fontSize="inherit" />
                    </Stack>
                  </Stack>
                </Stack>
                <Card>
                  <DynamicComponentWithNoSSR
                    fixed={true}
                    height={180}
                    borderRadius={0}
                    center={ [address.lng, address.lat] }
                  />
                </Card>
              </Stack>
            </Stack>
            </CardContent>
            <CardActions sx={{ p: 2 }}>
              <Stack flex={1} rowGap={2} direction={{xs: "column-reverse", md: "row"}} justifyContent="space-between" alignItems="center">
                <Stack columnGap={1} rowGap={1} direction={{xs: 'column', sm: 'row'}}>
                  <Button
                    sx={{bgcolor: 'info.lighter', color: 'info.dark', pr: 2, pl: 2}}
                    onClick={()=>setActiveStep(2)}
                    fullWidth
                    size="small">
                    تغییر روش پرداخت
                  </Button>
                  <Button
                    sx={{bgcolor: 'info.lighter', color: 'info.dark', pr: 2, pl: 2}}
                    onClick={()=>setActiveStep(1)}
                    fullWidth
                    size="small">
                    تغییر زمان دریافت
                  </Button>
                  <Button
                    sx={{bgcolor: 'info.lighter', color: 'info.dark', pr: 2, pl: 2}}
                    onClick={()=>setActiveStep(0)}
                    fullWidth
                    size="small">
                    تغییر آدرس
                  </Button>
                </Stack>
                <Button
                  sx={{borderRadius: 2, minWidth: 220}}
                  endIcon={<ArrowBackIosNewRoundedIcon />}
                  onClick={saveOrderInfo}
                  size="large" color="secondary" variant="contained" >
                    {
                      loading ? <CircularProgress color="inherit" size={20} /> : "تایید و ادامه"
                    }
                </Button>
              </Stack>
            </CardActions>
          </Card>
    </Stack>
  );
}
