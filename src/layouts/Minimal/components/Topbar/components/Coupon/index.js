import React from 'react';

import {
  Stack,
  Badge,
  Dialog,
  useTheme,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  useMediaQuery,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';

import { openCouponPopup } from 'redux/actions';
import { useSelector, useDispatch } from "react-redux";

import { digitsEnToFa } from "@persian-tools/persian-tools";

import CouponContent from './CouponContent';

export default function CouponPopup() {
  const dispatch = useDispatch();
  const { openCoupons, inCart, data } = useSelector(state => state.coupons);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpen = () => dispatch(openCouponPopup(true))
  const handleClose = () => dispatch(openCouponPopup(false))

  return (
    <>
      <IconButton size="small" color="info" sx={{ bgcolor: 'info.lighter' }} onClick={handleOpen}>
        <Badge
          color="info"
          variant='dot'
          invisible={!data.length > 0}
          // badgeContent={digitsEnToFa(data.length)}
          anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
          }}>
          <StorefrontRoundedIcon fontSize='20' />
        </Badge>
      </IconButton>
      
      <Dialog
        dir="rtl"
        fullWidth
        maxWidth="sm"
        open={openCoupons}
        onClose={handleClose}
        fullScreen={isMobile}
        aria-labelledby="coupon-dialog"
        PaperProps={{
            sx: { overflow: 'visible' }
        }}>
        <DialogTitle>
          <Typography variant="subtitle1" component="p">سبد خرید</Typography>
          <IconButton
            aria-label="close"
            size="small"
            color="error"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              left: 12,
              margin: 'auto',
              top: 13.5,
              bgcolor: 'error.lighter'
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: {xs: 0.5, sm: 1, md: 2} }} dividers>
          <Stack rowGap={2}>
          {
            data.length > 0
            ?
            <Typography align="center" variant='h6' color="secondary" gutterBottom>
              شما {digitsEnToFa(data.length)} بن فعال دارید
            </Typography>
            :
            <Typography align="center" variant='h6' color="secondary" gutterBottom>
              شما بن فعالی ندارید
            </Typography>
          }
          {
            data.map( coupon =>
              <CouponContent key={coupon.id} coupon={coupon} inCart={inCart} handleClose={handleClose} />
            )
          }
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}