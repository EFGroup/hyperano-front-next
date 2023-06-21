import { useState } from 'react';

import {
  Box,
  Step,
  Card,
  Stack,
  Button,
  Stepper,
  StepLabel,
  Typography,
  CardContent,
  CircularProgress,
} from '@mui/material';

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import Finish from './Finish';
import FactorView from './FactorView';
import SelectAddress from './SelectAddress';
import SelectPaymentType from './SelectPaymentType';
import SelectShippingTime from './SelectShippingTime';

import { order } from "apollo/requests";
import { useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';

export default function OrderScreenIndex({ order: orderData, statusCode, message }) {
  const [address, setAddress] = useState();
  const [payment, setPaymentType] = useState();
  const [shipping, setShippingTime] = useState();
  const [activeStep, setActiveStep] = useState(0);
  const {accessToken} = useSelector(state => state.user);

  const [loading, setLoading] = useState(false);

  const [res, setData] = useState(orderData);

  const steps = [
    'تعیین آدرس',
    'انتخاب زمان دریافت',
    'انتخاب روش پرداخت',
    'بررسی نهایی',
    'تایید و پرداخت'
  ];
  
  const order_id = orderData?.id;
  const shop_ids = orderData?.shop?.id;
  const handleReset = () => setActiveStep(0);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const [getOrder] = useLazyQuery(
      order.get
  );

  const refetch = async() => {
    try {
      setLoading(true)
      const { data, error } = await getOrder({
        variables: {
          ids: order_id
        },
        context: {
          serviceName: "auth",
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        }
      })
      if(!error) {
        setData(data ? data.order.data[0] : []);
        setLoading(false)
      }
    } catch (error) {
      
    }
    
  }

  const getStep = (step) => {
    if (statusCode) {
      return <Finish
        pay={payment}
        orderInfo={res}
        address={address}
        message={message}
        shipping={shipping}
        refetchInfo={refetch}
        statusCode={statusCode}
        setActiveStep={setActiveStep}
        setPaymentType={setPaymentType}
      />
    }
    if(res?.status?.id === "1") {
      switch (step) {
        case 0:
          return <SelectAddress
                    setAddress={setAddress}
                    setActiveStep={setActiveStep}
                  />
        case 1:
          return <SelectShippingTime
                    order_id={order_id}
                    shop_ids={shop_ids}
                    address_id={address.id}
                    setActiveStep={setActiveStep}
                    setShippingTime={setShippingTime}
                  />
        case 2:
          return <SelectPaymentType
                    shop_id={shop_ids}
                    setActiveStep={setActiveStep}
                    setPaymentType={setPaymentType}
                  />
        case 3:
          return <FactorView
                    address={address}
                    payment={payment}
                    refetch={refetch}
                    orderInfo={res}
                    shipping={shipping}
                    setActiveStep={setActiveStep}
                    setPaymentType={setPaymentType}
                  />
        case 4:
          return <Finish
                    pay={payment}
                    address={address}
                    orderInfo={res}
                    shipping={shipping}
                    refetchInfo={refetch}
                    setActiveStep={setActiveStep}
                    setPaymentType={setPaymentType}
                  />
        default:
          break;
      }
    }else {
      return <Finish
                pay={payment}
                orderInfo={res}
                address={address}
                shipping={shipping}
                refetchInfo={refetch}
                setActiveStep={setActiveStep}
                setPaymentType={setPaymentType}
              />
    }
  };

  return (
    <Card sx={{ mt: -10, borderRadius: 4 }}>
      <CardContent sx={{pt: 2, px: {xs: 1, sm: 1, md: 2}}}>
      {
        res?.status?.id === "1" &&
        <Stepper alternativeLabel activeStep={activeStep} sx={{direction: 'ltr'}}>
          {
            steps.map((label, index) => {
              return (
                <Step key={index}>
                  <StepLabel>
                    <Typography fontSize={10} variant="caption">
                      {label}
                    </Typography>
                  </StepLabel>
                </Step>
              );
            })
          }
        </Stepper>
      }
      {activeStep === steps.length ? (
        <>
          <Typography align="center" sx={{ mt: 2, mb: 1 }}>
            خطای غیر منتظره!
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          {
            loading
            ?
              <Stack alignItems="center" justifyContent="center" minHeight="30vh">
                <CircularProgress color='warning' />
              </Stack>
            :
              getStep(activeStep)
          }          
          {
            res?.status?.id === "1" && activeStep < 3 &&
            <Stack direction="row" alignItems="center" justifyContent="center" p={2}>
              <Button
                color="inherit"
                variant="outlined"
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{ mr: 1, borderRadius: 2 }}
                startIcon={<ArrowForwardIosRoundedIcon />}>
                {steps[activeStep-1] || "ویرایش سبد خرید"}
              </Button>
            </Stack>
          }
        </>
      )}
      </CardContent>
    </Card>
  );
}
