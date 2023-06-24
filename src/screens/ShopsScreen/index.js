import React from "react";

import {
  Card,
  Stack,
  Skeleton,
  CardHeader,
  CardContent,
} from "@mui/material";

import { ShopCard } from 'components';

const ShopsScreen = ({ shops, primarySelectedCategories, loading }) => {
  return (
    <Card sx={{ mt: -10, borderRadius: 4 }}>
      <CardHeader title="فروشگاه های ما" />
      <CardContent sx={{py: 0, px: {xs: 1, sm: 1, md: 2}}}>
        <Stack rowGap={2} minHeight="60vh">
          {
            loading
            ?
            [0,1,2].map( item => <Skeleton key={item} variant='rounded' height={400} sx={{borderRadius: 2}} /> )
            :
            shops && shops.length > 0 && shops.map( (item, i) => (
                <ShopCard key={i} data={item} />
            ))
          }
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ShopsScreen;