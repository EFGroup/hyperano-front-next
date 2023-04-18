import React, { useEffect } from "react";

import {
  Card,
  Stack,
  Avatar,
  Skeleton,
  Checkbox,
  Typography,
  CardHeader,
  CardActionArea,
} from "@mui/material";

import ShopRounded from "@mui/icons-material/ShopRounded";
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';

import { shop } from "apollo/requests";
import { useQuery } from "@apollo/client";

import { useSelector } from "react-redux";

const ShopsList = ({center, changeShop}) => {
  const { id: shopId } = useSelector( state => state.shop );

  const { data, loading, refetch } = useQuery(shop.list, {
    variables: {
      lat: String(center[1]),
      lng: String(center[0]),
      order: "DISTANCE",
    }
  });

  const response = data ? data?.shop?.data : [];

  useEffect( () => {
    refetch()
  }, [center])

  return (
    <Stack rowGap={1} pt={2}>
      <Typography textAlign="center" variant="subtitle2" fontSize={12}>فروشگاه های اطراف</Typography>
      {
        !loading ?
        <>
        {
          response && response.length > 0 &&
          response.map((item, i) => {
            const info = JSON.parse(item.support_info);
            return(
              <Card key={i} elevation={2}>
                <CardActionArea onClick={()=>changeShop(item)} >
                  <CardHeader
                    title={item.title}
                    subheader={
                      <Typography variant="body2" fontSize={12}>{info.address}</Typography>
                    }
                    avatar={
                      <Avatar sx={{bgcolor: 'error.lighter'}}>
                        {item.type?.id === "1" ? <StoreRoundedIcon color="error" fontSize="small" /> : <ShopRounded color="info" fontSize="small"/> }
                        
                      </Avatar>
                    }
                    action={
                      <Checkbox sx={{color: 'success.main'}} color="secondary" size="small" checked={shopId === item.id} />
                    }
                  />
                </CardActionArea>
              </Card>
            )}
          )
        }
      </>
      : <>{
        [0,1].map( item => <Skeleton key={item} sx={{height: 92, width: '100%', borderRadius: 2}} variant="rounded" /> )
      }</>
      }
    </Stack>
  );
}

export default ShopsList;
