import React, { useState } from 'react';

import {
  Badge,
  Dialog,
  useTheme,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';

import { openCartDrawer } from 'redux/actions';
import { useSelector, useDispatch } from "react-redux";
import { digitsEnToFa } from "@persian-tools/persian-tools";

import CartContent from './CartContent';

export default function CartPopup() {
  const dispatch = useDispatch();
  const [ loading, setLoading ] = useState(true);
  const { current, openCart } = useSelector(state => state.cart);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpen = () => dispatch(openCartDrawer(true))
  const handleClose = () => dispatch(openCartDrawer(false))

  return (
    <>
      <IconButton size="small" color="error" sx={{ bgcolor: 'error.lighter' }} onClick={handleOpen}>
        <Badge
          color="error"
          variant='dot'
          invisible={!current.length > 0}
          // badgeContent={digitsEnToFa(current.length)}
          anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
          }}>
          <LocalMallRoundedIcon fontSize='20' />
        </Badge>
      </IconButton>
      <Dialog
        dir="rtl"
        fullWidth
        maxWidth="sm"
        scroll="paper"
        open={openCart}
        onClose={handleClose}
        fullScreen={isMobile}
        PaperProps={{ sx: { overflow: 'visible' }}}>
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
            }}>
            {
              loading ? <CircularProgress color="error" size={22} /> : <CloseIcon fontSize="small" />
            }
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: {xs: 0.5, sm: 1, md: 2} }} dividers>
          <CartContent handleOpen={handleOpen} handleClose={handleClose} setLoading={setLoading} />
        </DialogContent>
      </Dialog>
    </>
  );
}