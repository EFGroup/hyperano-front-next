import React, { useState, lazy } from 'react';

import {
  Stack,
  Button,
  Dialog,
  useTheme,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  useMediaQuery,
} from '@mui/material';

import CloseRounded from '@mui/icons-material/CloseRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';

import { useDispatch, useSelector } from 'react-redux';
import { setShop, openCartDrawer } from 'redux/actions';

import { toast } from 'react-toastify';
import { useGeolocation } from 'hooks/geoHook';

// import { Loadable } from 'components';
import { ShopsList, SearchAddress } from './components';

import dynamic from "next/dynamic";
import Skeleton from '@mui/material/Skeleton';

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

export default function ChangeShopDialog() {
  const theme = useTheme();
  const state = useGeolocation();
  const dispatch = useDispatch();
  const [ open, setOpen ] = useState(false);
  const { current: currentCart } = useSelector(state => state.cart);
  const [ center, setCenter ] = useState([ state.longitude, state.latitude ]);
  const { id: shopId, title: shopTitle } = useSelector( state => state.shop );
  
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const changeCenter = (data) => setCenter(data);

  const changeShop = async(shop) => {
    let {
      id,
      title,
      min_free_ship,
      min_order_cost,
      support_info,
      avg_scores_shop
    } = shop;

    if (shopId !== id && currentCart.length) {
      toast.warning(`شما یک سبد خرید از فروشگاه ${shopTitle} دارید‍‍`)
      dispatch(openCartDrawer(true))
      handleClose()
      return
    }
    if (shopId !== id) {
      toast.warning(`فروشگاه پیشفرض شما تغییر یافت`)
    }

    dispatch(setShop({
      id,
      title,
      min_free_ship,
      min_order_cost,
      support_info,
      avg_scores_shop
    }))
    handleClose()
  }

  return (
    <>
    {
      fullScreen
      ?
        <IconButton size="small" onClick={handleClickOpen}>
          <StoreRoundedIcon fontSize="small" />
        </IconButton>
      :
        <Button width={116} size="small" variant="contained" onClick={handleClickOpen}>
          تغییر فروشگاه
        </Button>
    }
      <Dialog
        dir='rtl'
        fullWidth
        open={open}
        maxWidth="sm"
        onClose={handleClose}
        fullScreen={fullScreen}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1">انتخاب فروشگاه</Typography>
            <IconButton onClick={handleClose} size="small" sx={{bgcolor: 'action.hover'}}>
              <CloseRounded fontSize="small" />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{p: {xs: 1, sm: 2} }}>
          <Stack rowGap={1}>
            <SearchAddress changeCenter={changeCenter} />
            <DynamicComponentWithNoSSR
              height={"30vh"}
              borderRadius={16}
              width={"100%"}
              center={center}
              getLocation={changeCenter}
              handleClose={handleClose}
            />
          </Stack>
          <ShopsList center={center} changeShop={changeShop} />
        </DialogContent>
      </Dialog>
    </>
  );
}