import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Card,
  Stack,
  Avatar,
  CardHeader,
  Typography,
  CardActionArea,
  CircularProgress
} from '@mui/material';

import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';

import { useQuery } from '@apollo/client';
import { payment } from 'apollo/requests';

import { useSelector } from 'react-redux';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function SelectPaymentType({
  shop_id,
  setActiveStep,
  setPaymentType,
}) {

  const { accessToken } = useSelector(state => state.user);

  const { data: paymentData, loading } = useQuery(payment.list, {
    variables: { shop_id },
    context: {
      serviceName: "auth",
        headers: {
          authorization: `Bearer ${accessToken}`
      }
    }
  });

  const data = paymentData ? paymentData?.paymentType : [];

  return (
    <Stack p={3} justifyContent="center" alignItems="center" minHeight={400}>
      <Typography variant="subtitle1">نحوه پرداخت را انتخاب کنید :</Typography>
      <Stack direction="row" flexWrap="wrap" justifyContent="center" alignItems="center">
        {
          loading
          ?
          <Stack justifyContent="center" alignItems="center" minHeight={300} rowGap={2} >
            <CircularProgress color='warning' />
            <Typography color="GrayText">در حال دریافت...</Typography>
          </Stack>
          :
          <>
            {
              data && data.length > 0
              ?
                data.map( item => {
                  return <Card elevation={4} key={item.id} sx={{ m: 2, minWidth: 320 }}>
                    <CardActionArea onClick={()=>{
                      setPaymentType(item)
                      setActiveStep(3)
                    }}>
                    <CardHeader
                      title={
                        <Typography align="center" variant="subtitle1">{item.title}</Typography>
                      }
                      avatar={
                        <Avatar alt="main">
                          <AttachMoneyRoundedIcon />
                        </Avatar>
                      }
                    />
                    </CardActionArea>
                  </Card>
                })
              :
                <Stack justifyContent="center" alignItems="center" minHeight={300} >
                  <Typography color="GrayText">موردی یافت نشد.</Typography>
                </Stack>
            }
          </>
        }
      </Stack>
    </Stack>
  );
}
