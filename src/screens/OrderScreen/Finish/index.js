import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import {
  Box,
  Card,
  Stack,
  Table,
  Avatar,
  Button,
  Divider,
  Skeleton,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  CardHeader,
  Typography,
  CardContent,
  CardActions,
  TableContainer,
  CircularProgress,
} from '@mui/material';
import { grey } from '@mui/material/colors';

import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import PhoneInTalkRoundedIcon from '@mui/icons-material/PhoneIphoneTwoTone';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

import { useSelector, useDispatch } from 'react-redux';
import { openCouponPopup, openCartDrawer, setCarts } from 'redux/actions';

import moment from "jalali-moment";
import { toast } from 'react-toastify';
import { convertEnToFa, currency } from 'helpers/persianTools';
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";

import { DetailsPopup, ChangePayment } from "./components";

import { useMutation } from '@apollo/client';
import { order, payment, categoryCoupon } from 'apollo/requests';
import Image from 'next/image';

const statusColor = {
  "1":  "warning",  // در انتظار تکمیل اطلاعات <= 1
  "2":  "info",     // در انتظار تایید فاکتور <= 2
  "3":  "primary",  // تایید شده <= 3
  "5":  "info",     // در حال بررسی <= 5
  "6":  "info",     // در حال جمع آوری <= 6
  "7":  "info",     // در حال حمل <= 7
  "8":  "success",  // در مقصد <= 8
  "9":  "success",  // تایید دریافت توسط مشتری <= 9
  "10": "error",    // لغو شده توسط مشتری <= 10
  "11": "error",    // لغو شده توسط سیستم <= 11
  "16": "warning",  // اتمام یافته <= 16
  "17": "error",    // کالایی برای ثبت موجود نیست <= 17
  "18": "error",    // هزینه ی سفارش از حداقل هزینه برای این فروشگاه کمتر است <= 18
  "19": "info",     // تایید تحویل توسط سیستم <= 19
  "20": "warning",  // نیاز به بررسی ی مجدد سبد خرید <= 20
  "21": "info",     // تحویل شده به واحد حمل <= 21
  "22": "info",     // تایید تحویل توسط حمل کننده <= 22
}

export default function Finish({
  message,
  orderInfo,
  statusCode,
  refetchInfo,
  setActiveStep,
}) {

  const dispatch = useDispatch();
  const [totalCoupon, setTotalCoupon] = useState(0);
  const [titleCoupon, setTitleCoupon] = useState("بن :");
  const { accessToken } = useSelector(state => state.user);
  const { data: coupons, active } = useSelector(state => state.coupons);

  const [ confirmOrder, {loading} ] = useMutation(
    order.confirm,
    {
    context: {
        serviceName: "auth",
        headers: {
          authorization: `Bearer ${accessToken}`
        }
    }
    }
  );

  const [ onlinePayment ] = useMutation(
    payment.onlinePayment,
    {
    context: {
        serviceName: "auth",
        headers: {
          authorization: `Bearer ${accessToken}`
        }
    }
    }
  );

  const [ updateOrder, { loading: updateLoading } ] = useMutation(
    order.update,
    {
      context: {
        serviceName: "auth",
        headers: {
            authorization: `Bearer ${accessToken}`
        }
      }
    }
  );

  const [ checkCoupon, { loading: checkCouponLoading } ] = useMutation(
    categoryCoupon.checkCoupon,
    {
      context: {
        serviceName: "auth",
        headers: {
            authorization: `Bearer ${accessToken}`
        }
      },
    }
  );

  const confirm = async(details) => {
    try {
      const { data } = await confirmOrder({
        variables: {
          ...details,
          order_id: orderInfo.id,
          category_coupon_id: active,
        }
      })
      if(data && data.confirmOrder){
        data.confirmOrder?.messages.map( message => toast.success(String(message)) )
        if(
          data.confirmOrder.online_payment_refId &&
          data.confirmOrder.model.payment_status.id !== "1" &&
          data.confirmOrder.model.payment_type.id === "2"
          ){
          window.location.replace(
            "https://dargaah.com/ird/startpay/" + data.confirmOrder.online_payment_refId
          );
        }else {
          dispatch(setCarts([], []))
          refetchInfo()
        }
      }
    } catch (error) {
      dispatch(openCartDrawer(true))
      // dispatch(setRefreshCart(true))
      setActiveStep(0)
    }
  }

  const goToPayment = async() => {
    try {
      const { data } = await onlinePayment({
        variables: {
          order_id: orderInfo.id,
        }
      })
      if(data && data.onlinePayment){
        toast.info("در حال انتقال به بانک...")
        if(
          data.onlinePayment.online_payment_refId &&
          data.onlinePayment.model.payment_status.id !== "1" &&
          data.onlinePayment.model.payment_type.id === "2"
          ){
          window.location.replace(
            "https://dargaah.com/ird/startpay/" + data.onlinePayment.online_payment_refId
          );
        }
      }
    } catch (error) {
      // toast.error(String(errors.message))
    }
  }

  const handleUpdateOrder = async (ids, status_id) =>{
    try {
      const result = await updateOrder({
        variables: { ids, status_id }
      })
      if (result.data) {
        result.data.updateOrder?.messages.map( message => toast.success(String(message)) )
        refetchInfo()
      }
    } catch (error) {
      // toast.error(String(error.message))
    }
  }

  const handleCheckCoupon = async (order_id, category_coupon_id) =>{
    try {
      const {data} = await checkCoupon({
        variables: { order_id, category_coupon_id }
      })
      if (data) {
        // toast.success("تخفیف بن اعمال شد")
        // console.log(data.checkCoupon.model)
        setTitleCoupon(data.checkCoupon.model.find( coupon => coupon.coupon_user )?.coupon_user?.coupon?.category?.title || "بن :")
        setTotalCoupon(data.checkCoupon.total_coupon)
      }
    } catch (error) {
      setTitleCoupon("بن :")
      setTotalCoupon(0)
      // toast.error(String(error.message))
    }
  }

  const notCompelete = ["1", "2"]
  const cancellation = ["3", "5"]
  const delivered = ["5", "6", "7", "8", "21", "22"]
  const canceled = ["10", "11"]


  const changeCoupon = () => {
    dispatch(openCouponPopup(true))
  }
  
  useEffect( () => {
    if (notCompelete.includes(orderInfo?.status?.id)) {
      if (!active && coupons.length > 0) {
        dispatch(openCouponPopup(true))
      }
      if (active) {
        handleCheckCoupon(orderInfo.id, active)
      } else {
        setTitleCoupon("بن :")
        setTotalCoupon(0)
      }
    }
  }, [active])

  const imgs = orderInfo?.order_details.map(
    orderInfo => 
      orderInfo.product_shop.product_info.images
      ? `https://hyperano.ir/api/uploads/images/products/${JSON.parse(orderInfo.product_shop.product_info.images).medium[0]}`
      : "/logo.svg"
  )

  const color = (level = 'main') => {
    if (statusCode) {
      if (statusCode >= 400) {
        return `error.${level}`
      } else {
        return `success.${level}`
      }
    }
    return `${statusColor[orderInfo?.status?.id]}.${level}`
  }

  return (
    <Stack rowGap={1} justifyContent="center" alignItems="center" minHeight={400}>
      <Card elevation={2} sx={{bgcolor: color('lighter'), color: color('dark'), width: '100%'}}>
        <CardHeader
          title={
            <Typography fontSize={12} variant="body2">وضعیت سفارش</Typography>
          }
          subheader={
            statusCode
            ?
            <Typography variant="h5" color={statusCode >= 400 ? "error" :"secondary"}>{message}</Typography>
            :
            <Typography variant="h5" color={color('main')}>{orderInfo?.status?.title}</Typography>
          }
          avatar={
            <Avatar sx={{bgcolor: color('main'), color: color('lighter')}}>
              <InfoRoundedIcon />
            </Avatar>
          }
          action={
            <Stack>
              <Button
                href='/orders'
                endIcon={<ArrowBackRoundedIcon />}
                variant="contained">
                بازگشت
              </Button>
            </Stack>
          }
        />
        {
          statusCode < 300 && orderInfo?.status?.id === "3" &&
          <CardContent>
            <Stack justifyContent="center" alignItems="center">
              <Box mt={-10}>
                <Image alt="confirm" src={'/images/confirm.webp'} width={400} height={250} />
              </Box>
              <Typography gutterBottom mt={-5} align="center" variant="h4" color='success.main'>
                ضمن تشکر از حسن انتخاب شما، سفارش شما با موفقیت ثبت شد و بزودی توسط اپراتور بررسی میشود
              </Typography>
              <Button
                sx={{borderRadius: 3}}
                endIcon={<SupportAgentRoundedIcon />}
                size="large" to={`tel:"03132224456"`}
                variant="contained" color="secondary">
                <Typography color="#fff" variant="subtitle2" align="right">{digitsEnToFa("03132224456")}</Typography>
              </Button>
            </Stack>
          </CardContent>
        }
      </Card>
      
          <Card elevation={2} sx={{ width: '100%', m: 2, border: orderInfo?.status?.id === "10" && '1px solid red' }}>
            <CardHeader
              title={
                <Typography variant="subtitle1">{`سفارش شماره ${digitsEnToFa((orderInfo.tracking_code).split(".")[1])}`}</Typography>
              }
              subheader={
                <Typography fontSize={12} variant="body2">{`تاریخ ثبت سفارش: ${digitsEnToFa((moment(orderInfo.created_at).format("jYYYY/jM/jD hh:mm:ss")))}`}</Typography>
              }
              avatar={
                <Avatar alt="main">
                  <ReceiptRoundedIcon />
                </Avatar>
              }
            />
            <CardContent style={{ padding: 0, overflowX: 'auto' }}>
              {/* <Scrollbar> */}
              <TableContainer sx={{ minWidth: 800 }}>
                <Table size="small" sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>تصویر</TableCell>
                      <TableCell>عنوان</TableCell>
                      <TableCell align="center">قیمت مصرف کننده</TableCell>
                      <TableCell align="center">قیمت فروشگاه</TableCell>
                      <TableCell align="center">تخفیف محصول</TableCell>
                      <TableCell align="center">تعداد</TableCell>
                      <TableCell align="center">مجموع قیمت مصرف کننده</TableCell>
                      <TableCell align="center">مجموع قیمت فروشگاه</TableCell>
                      <TableCell align="center">مجموع تخفیف محصول</TableCell>
                      <TableCell align="center">توضیحات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderInfo.order_details.map((row, r) => (
                      <React.Fragment key={row.id}>
                      <TableRow
                        hover
                        tabIndex={-1}
                        role="checkbox"
                        // selected={selected.indexOf(row.id) !== -1}
                        sx={{
                          bgcolor: row.status === "REJECTED" && grey[300],
                          opacity: row.status === "REJECTED" && 0.8,
                          '&:last-child td, &:last-child th': { border: 0 }
                        }}
                      >
                        <TableCell>
                          <Avatar alt={row.product_shop.product_info.title} src={imgs[r]} />
                        </TableCell>
                        <TableCell>
                          <Link href={`/shops/${orderInfo.shop.id}/${row.product_shop.product_info.id}`} target= '_blank' >
                          <Typography variant="subtitle2">
                          {`${convertEnToFa(row.product_shop.product_info.title)} ${convertEnToFa(row.product_shop.product_info.introtext)} ${convertEnToFa(row.product_shop.product_info.brand?.title)}`}
                          </Typography>
                          </Link>
                        </TableCell>
                        <TableCell align="center">{row.co_price ? digitsEnToFa(addCommas(Number(row.co_price))) : "-"}</TableCell>
                        <TableCell align="center">{digitsEnToFa(addCommas(Number(row.me_price)))}</TableCell>
                        <TableCell align="center">{row.co_price ? digitsEnToFa(addCommas(Number(row.discount_amount))) : "-"}</TableCell>
                        <TableCell align="center">{digitsEnToFa(row.number)}</TableCell>
                        <TableCell align="center">{row.co_price ? digitsEnToFa(addCommas(Number(row.co_price * row.number))) : "-"}</TableCell>
                        <TableCell align="center">{digitsEnToFa(addCommas(Number(row.me_price * row.number)))}</TableCell>
                        <TableCell align="center">{row.co_price ? digitsEnToFa(addCommas(Number(row.discount_amount * row.number))) : "-"}</TableCell>
                        <TableCell align="center">
                          <Typography variant="caption">
                          {row.status === "REJECTED" ? "بازگشت داده شده است" : ""}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      {
                        row.attribute_values.length > 0 && 
                        row.attribute_values.map( (attr, a) => (
                          <TableRow key={a}>
                            <TableCell />
                            <TableCell>{`${attr.attribute.title} ${attr.title}`}</TableCell>
                            <TableCell align="center">{digitsEnToFa(addCommas(Number(attr.price_change_value)))}</TableCell>
                            <TableCell />
                            <TableCell />
                            <TableCell />
                          </TableRow>
                        ))
                      }
                      </React.Fragment>
                    ))}
                  </TableBody>
                  {!orderInfo && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                          <Typography gutterBottom align="center" variant="subtitle1">
                              موردی یافت نشد!
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              {/* </Scrollbar> */}
            </CardContent>
            <CardActions sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
              <Stack rowGap={4} columnGap={4} width="100%" direction={{md: "row"}} flexWrap="wrap" alignItems="stretch">
                <Stack rowGap={1} flex={1} minWidth={280} >
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant='body2' gutterBottom>نحوه پرداخت:</Typography>
                    <Typography variant='body2' gutterBottom align="right">{orderInfo.payment_type?.title}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant='body2' gutterBottom>وضعیت پرداخت:</Typography>
                    {
                      orderInfo.payment_status?.id >= "2" && orderInfo.payment_status?.id <= "6"
                      ? <Typography variant='body2' gutterBottom align="right">پرداخت نشده</Typography>
                      : <Typography variant='body2' gutterBottom align="right">{orderInfo.payment_status?.title}</Typography>
                    }
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant='body2' gutterBottom>وضعیت سفارش:</Typography>
                    <Typography align="center" color="secondary" variant="body2" gutterBottom>{orderInfo?.status?.title}</Typography>
                  </Stack>
                  <Divider sx={{m:1}} />
                  {
                    orderInfo.demand_time &&
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant='body2' gutterBottom>زمان درخواست:</Typography>
                      <Typography align="center" color="secondary" variant="body2" gutterBottom>{digitsEnToFa(moment(orderInfo.demand_time).format("jYYYY/jM/jD ساعت HH:mm"))}</Typography>
                    </Stack>
                  }
                  {
                    orderInfo.delivery_time &&
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant='body2' gutterBottom>زمان تحویل:</Typography>
                      <Typography align="center" color="secondary" variant="body2" gutterBottom>{digitsEnToFa(moment(orderInfo.delivery_time).format("jYYYY/jM/jD ساعت HH:mm"))}</Typography>
                    </Stack>
                  }
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant='body2' gutterBottom>نحوه ارسال:</Typography>
                    <Typography align="center" color="secondary" variant="body2" gutterBottom>{orderInfo.shipping?.shipping_type.title}</Typography>
                  </Stack>
                  <Divider sx={{m:1}} />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant='body2' gutterBottom>مشخصات دریافت کننده:</Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography variant='body2' gutterBottom>آدرس: </Typography>
                    <Typography align="center" color="secondary" variant="body2" gutterBottom>{`${orderInfo.address?.main_street || ""} ${orderInfo.address?.minor_address || ""}`}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="end" columnGap={1} rowGap={1}>
                    <Stack
                      columnGap={1}
                      direction="row"
                      alignItems="center"
                      bgcolor={grey[100]} color={grey[800]}
                      p={0.5} pl={1} pr={1} borderRadius={2}>
                        <Link href={`tel:${digitsEnToFa(orderInfo.address?.tellphone || "")}`}>
                          <Typography color={grey[800]} variant="caption" fontWeight="bold">{digitsEnToFa(orderInfo.address?.tellphone || "") || "ثبت نشده"}</Typography>
                        </Link>
                        <PhoneInTalkRoundedIcon fontSize="small" />
                    </Stack>
                    <Stack
                      columnGap={1}
                      direction="row"
                      alignItems="center"
                      bgcolor={grey[100]} color={grey[800]}
                      p={0.5} pl={1} pr={1} borderRadius={2}>
                        <Link href="#">
                          <Typography variant="caption" fontWeight="bold">{digitsEnToFa(orderInfo.address?.postal_code || "") || "ثبت نشده"}</Typography>
                        </Link>
                      <HomeRoundedIcon fontSize="small" />
                    </Stack>
                  </Stack>
                  {/* <Stack direction="row" justifyContent="space-evenly">
                    <Chip
                      size="small"
                      label={digitsEnToFa(orderInfo.address?.postal_code || "") || "ثبت نشده"}
                      avatar={<Avatar><HomeRoundedIcon fontSize="inherit" /></Avatar>}
                    />
                    <Chip
                      size="small"
                      label={digitsEnToFa(orderInfo.address?.tellphone || "") || "ثبت نشده"}
                      avatar={<Avatar><PhoneInTalkRoundedIcon fontSize="inherit" /></Avatar>}
                    />
                  </Stack> */}
                </Stack>
                <Stack flex={1} minWidth={280} rowGap={1} >
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant='body2' gutterBottom>تعداد اقلام</Typography>
                    <Typography variant='body2' gutterBottom align="right">
                      {digitsEnToFa(orderInfo.order_details.length)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant='body2' gutterBottom>هزینه ارسال</Typography>
                    <Typography variant='body2' gutterBottom align="right">
                      {`${digitsEnToFa(addCommas(Number(orderInfo.shipping_cost)))} تومان`}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant='body2' gutterBottom>مجموع سفارش</Typography>
                    <Typography variant='body2' gutterBottom align="right">
                      {currency(orderInfo.co_products_cost)}
                    </Typography>
                  </Stack>
                  {
                    orderInfo.products_discount > 0 &&
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant='body2' gutterBottom>تخفیف محصولات</Typography>
                      <Typography variant='body2' gutterBottom align="right">
                        {currency(orderInfo.products_discount)}
                      </Typography>
                    </Stack>
                  }
                  {
                    orderInfo.order_discount &&
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant='body2' gutterBottom>{`تخفیف ${orderInfo.discount_title}`}</Typography>
                      <Typography variant='body2' gutterBottom align="right">
                        {currency(orderInfo.order_discount)}
                      </Typography>
                    </Stack>
                  }
                  {
                    notCompelete.includes(orderInfo?.status?.id) &&
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant='body2' gutterBottom>تخفیف {titleCoupon}</Typography>
                        <Typography variant='body2' gutterBottom>
                          {
                            checkCouponLoading ? <Skeleton variant="text" width={64}/> : currency(totalCoupon)
                          }
                        </Typography>
                      </Stack>
                  }
                  {
                    orderInfo.wallet_settled_amount &&
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant='body2' gutterBottom>مقدار استفاده شده از کیف پول</Typography>
                        <Typography variant='body2' gutterBottom>
                          {currency(orderInfo.wallet_settled_amount)}
                        </Typography>
                      </Stack>
                  }
                  {
                    notCompelete.includes(orderInfo?.status?.id)
                    ?
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant='subtitle1' gutterBottom>قابل پرداخت</Typography>
                      <Typography variant='subtitle1' gutterBottom align="right">
                        {currency(orderInfo.total_cost - totalCoupon)}
                      </Typography>
                    </Stack>
                    :
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant='subtitle1' gutterBottom>قابل پرداخت</Typography>
                      <Typography variant='subtitle1' gutterBottom align="right">
                        {currency(orderInfo.total_cost)}
                      </Typography>
                    </Stack>
                  }

                  <Stack direction="row" flexWrap="wrap" columnGap={1} rowGap={1} justifyContent="space-evenly" >
                    
                    {
                    cancellation.includes(orderInfo?.status?.id) &&
                        <Button
                        sx={{bgcolor: 'error.lighter', color: 'error.dark', borderRadius: 2, minWidth: 180, flex: 1}} 
                        size="large"
                        color="error"
                        onClick={()=>handleUpdateOrder(orderInfo.id, "10")}
                        disabled={updateLoading}
                        >
                        لغو سفارش
                        </Button>
                    }
                    {
                    delivered.includes(orderInfo?.status?.id) &&
                        <Button
                        sx={{borderRadius: 2, minWidth: 180, flex: 1}} 
                        size="large"
                        variant="contained"
                        color="secondary"
                        onClick={()=>handleUpdateOrder(orderInfo.id, "9")}
                        disabled={updateLoading}
                        >
                        سفارش را دریافت کردم
                        </Button>
                    }
                    { 
                      notCompelete.includes(orderInfo?.status?.id) &&
                      !canceled.includes(orderInfo?.status?.id) &&
                      coupons.length > 0 &&
                        <Button
                          size="large"
                          color="primary"
                          onClick={changeCoupon}
                          sx={{minWidth: 180, bgcolor: 'info.lighter', color: 'info.dark', borderRadius: 2, flex: 1}}>
                            {
                            checkCouponLoading
                              ? <CircularProgress size={24} />
                              : active ? "تغییر بن" : "استفاده از بن"
                            }
                        </Button>
                    }
                    { 
                      orderInfo.payment_status !== "1" &&
                      !notCompelete.includes(orderInfo?.status?.id) &&
                      !canceled.includes(orderInfo?.status?.id) &&
                        <ChangePayment goToPayment={goToPayment} refetchInfo={refetchInfo} orderId={orderInfo.id} shop_id={orderInfo.shop.id} activePayment={orderInfo.payment_type?.id} />
                    }
                    { 
                      orderInfo?.status?.id === "2" &&
                        <DetailsPopup loading={loading} confirm={confirm} />
                    }
                    { 
                      orderInfo.payment_type?.id === "2" &&
                      orderInfo.payment_status !== "1" &&
                      !notCompelete.includes(orderInfo?.status?.id) &&
                      !canceled.includes(orderInfo?.status?.id) &&
                        <Button
                          sx={{ bgcolor: 'success.lighter', color: 'success.dark', borderRadius: 2, minWidth: 180, flex: 2}}
                          size="large"
                          color="success"
                          onClick={goToPayment}
                          endIcon={<CheckCircleOutlineRoundedIcon fontSize="small" />}
                          >
                          پرداخت آنلاین
                        </Button>
                    }
                    { 
                      canceled.includes(orderInfo?.status?.id) &&
                        <Button
                          sx={{ bgcolor: grey[50], color: grey[800], borderRadius: 2, minWidth: 180, flex: 2}}
                          size="large"
                          color="inherit"
                          disabled
                          >
                           {orderInfo?.status?.title}
                        </Button>
                    }
                  </Stack>
                </Stack>
              </Stack>
            </CardActions>
          </Card>
          {
            orderInfo.transactions.length > 0 &&
            <Card elevation={2} sx={{width: '100%'}}>
              <CardHeader
                title={
                  <Typography variant="subtitle1">تراکنش ها</Typography>
                }
                avatar={
                  <Avatar alt="main">
                    <PaymentRoundedIcon />
                  </Avatar>
                }
              />
              <CardContent style={{ padding: 0, overflowX: 'auto' }}>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">تاریخ</TableCell>
                        <TableCell align="center">مبلغ</TableCell>
                        <TableCell align="center">شماره پیگیری</TableCell>
                        <TableCell align="center">وضعیت</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orderInfo.transactions.map((transaction, r) => (
                        <React.Fragment key={r}>
                        <TableRow
                          hover
                          tabIndex={-1}
                          role="checkbox"
                          // selected={selected.indexOf(transaction.id) !== -1}
                          sx={{
                            bgcolor: transaction.status !== "FAILED" && grey[300],
                            '&:last-child td, &:last-child th': { border: 0 }
                          }}
                        >
                          <TableCell align="center">{digitsEnToFa((moment(transaction.created_at).format("jYYYY/jM/jD hh:mm:ss")))}</TableCell>
                          <TableCell align="center">{digitsEnToFa(addCommas(Number(transaction.price)))}</TableCell>
                          <TableCell align="center">{transaction.ref_code || "-"}</TableCell>
                          <TableCell align="center">
                            <Typography variant="caption">
                            {transaction.status === "FAILED" ? "تراکنش ناموفق" : ""}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        </React.Fragment>
                      ))}
                    </TableBody>
                    {!orderInfo.transactions.length && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                            <Typography gutterBottom align="center" variant="subtitle1">
                                موردی یافت نشد!
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          }
          {
            orderInfo.coupons.length > 0 &&
            <Card elevation={2} sx={{width: '100%'}}>
              <CardHeader
                title={
                  <Typography variant="subtitle1">بن ها</Typography>
                }
                avatar={
                  <Avatar alt="main">
                    <PaymentRoundedIcon />
                  </Avatar>
                }
              />
              <CardContent style={{ padding: 0, overflowX: 'auto' }}>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">عنوان بن</TableCell>
                        <TableCell align="center">مبلغ کل بن</TableCell>
                        <TableCell align="center">مبلغ استفاده شده</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orderInfo.coupons.map((coupon, r) => (
                        <React.Fragment key={r}>
                        <TableRow
                          hover
                          tabIndex={-1}
                          role="checkbox"
                        >
                          <TableCell align="center">{coupon.coupon?.title}</TableCell>
                          <TableCell align="center">{digitsEnToFa(addCommas(Number(coupon.coupon?.amount)))}</TableCell>
                          <TableCell align="center">{digitsEnToFa(addCommas(Number(coupon.amount)))}</TableCell>
                        </TableRow>
                        </React.Fragment>
                      ))}
                    </TableBody>
                    {!orderInfo.coupons.length && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                            <Typography gutterBottom align="center" variant="subtitle1">
                                موردی یافت نشد!
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          }
    </Stack>
  );
}
