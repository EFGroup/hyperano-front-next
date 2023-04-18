import React from 'react';
import {
  Card,
  Stack,
  Skeleton,
  CardHeader,
  Typography,
  CardContent,
} from '@mui/material';

import { AddressCreation, AddressCard } from 'components';

export default function AddressScreen({ addresses, loading }) {
  const refetch = () => console.log("refetch")

  return (
    <Card sx={{ mt: -10, borderRadius: 4 }}>
      <CardHeader
        title={<Typography variant="h5">آدرس های من</Typography>}
        action={<AddressCreation refetch={refetch} />}
      />
      <CardContent sx={{py: 0, px: {xs: 1, sm: 1, md: 2}}}>
        <Stack rowGap={2} minHeight="60vh">
          {
            loading
            ?
              [0,1,2].map( item => <Skeleton key={item} variant='rounded' height={200} sx={{borderRadius: 2}} /> )
            :
              addresses && addresses.length > 0
                ?
                  addresses.map( addr => <AddressCard key={addr.id} addr={addr} refetch={refetch} /> )
                :
                  <Stack justifyContent="center" alignItems="center" minHeight={300} >
                    <Typography color="GrayText">آدرسی برای شما ثبت نشده است.</Typography>
                  </Stack>
          }
        </Stack>
      </CardContent>
    </Card>
  );
}
