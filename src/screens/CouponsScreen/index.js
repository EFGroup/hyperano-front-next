import React from 'react';
import {
  Card,
  Stack,
  Skeleton,
  CardHeader,
  Typography,
  CardContent,
} from '@mui/material';

import { CouponCard } from 'components';
import { useSelector } from "react-redux";

export default function OrderScreen({ coupons, loading }) {
  const { inCart } = useSelector(state => state.coupons);

  return (
    <Card sx={{ mt: -10, borderRadius: 4 }}>
      <CardHeader
        title={<Typography variant="h5">بن های من</Typography>}
      />
      <CardContent sx={{py: 0, px: {xs: 1, sm: 1, md: 2}}}>
        <Stack rowGap={2} minHeight="60vh">
          {
            loading
            ?
              [0,1,2].map( item => <Skeleton key={item} variant='rounded' height={200} sx={{borderRadius: 2}} /> )
            :
            coupons && coupons.length > 0
            ?
              coupons.map( coupon => <CouponCard key={coupon.id} coupon={coupon} inCart={inCart} /> )
            :
              <Stack justifyContent="center" alignItems="center" minHeight={300} >
                <Typography color="GrayText">بنی برای شما ثبت نشده است.</Typography>
              </Stack>
          }
        </Stack>
      </CardContent>
    </Card>
  );
}
