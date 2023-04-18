import React from 'react';

import {
  Grid,
  Card,
  Chip,
  Stack,
  Avatar,
  Typography,
  CardContent,
  CardActionArea,
  CircularProgress,
} from '@mui/material';

import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';

import { address } from "apollo/requests";
import { useQuery } from '@apollo/client';

import { useSelector } from "react-redux";
import { AddressCreation } from 'components';

export default function SelectAddress({ setAddress, setActiveStep }) {
  const { accessToken } = useSelector(state => state.user);

  const handleSelect = (addr) => {
    setAddress(addr)
    setActiveStep(1)
  }

  const { data: addressesData, loading, refetch } = useQuery(address.list, {
    context: {
      serviceName: "auth",
        headers: {
          authorization: `Bearer ${accessToken}`
      }
    }
  });

  const data = addressesData ? addressesData?.userAddress?.data : [];

  return (
    <Stack rowGap={2} p={3} justifyContent="center" alignItems="center" minHeight={400}>
      <Typography variant="subtitle1">آدرس سفارش خود را انتخاب نمایید :</Typography>
      {
        loading
        ?
        <Stack justifyContent="center" alignItems="center" minHeight={300} rowGap={2} >
          <CircularProgress color='warning' />
          <Typography color="GrayText">در حال بارگذاری آدرس های شما...</Typography>
        </Stack>
        :
          data && data.length > 0
            ?
            <Grid container justifyContent="center" spacing={2}>
              {
              data.map( (addr, a) => {
                return <Grid key={a} item xs={12} md={6}>
                  <Card elevation={4} sx={{ width: '100%' }}>
                  <CardActionArea onClick={() => handleSelect(addr)}>
                  <CardContent sx={{minHeight: 130}}>
                    <Stack flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center" rowGap={1} columnGap={1}>
                      <Stack>
                        <Avatar alt="main">
                          <ReceiptRoundedIcon />
                        </Avatar>
                      </Stack>
                      <Stack flex={1}>
                        <Typography variant="h3">
                          {addr.title}
                        </Typography>
                        <Typography fontSize={10} variant="body2">
                          {`آدرس: ${addr.main_street}`}
                        </Typography>
                        <Typography fontSize={12} variant="body1">
                          {addr.minor_address}
                        </Typography>
                      </Stack>
                      <Stack flexDirection={{ xs: "row", sm: "column" }} flexWrap="wrap" justifyContent="center" alignItems="center" rowGap={1} columnGap={3}>
                        <Chip sx={{ minWidth: 160 }} size="small" label={`کد پستی: ${addr.postal_code || "-"}`} />
                        <Chip sx={{ minWidth: 160 }} size="small" label={`تلفن تماس: ${addr.tellphone}`} />
                      </Stack>
                    </Stack>
                  </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              })}
            </Grid>
            :
            <Stack justifyContent="center" alignItems="center" minHeight={300} >
              <Typography color="GrayText">آدرسی برای شما ثبت نشده است.</Typography>
            </Stack>
      }
      <AddressCreation refetch={refetch} />
    </Stack>
  );
}
