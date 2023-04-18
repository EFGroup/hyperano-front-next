import React, { useState, useEffect } from 'react';

import {
  Button,
  Dialog,
  useTheme,
  IconButton,
  Typography,
  DialogTitle,
  useMediaQuery,
  DialogContent,
  CircularProgress,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';

import { useSelector, useDispatch } from "react-redux";
import { openCouponPopup, openProfilePopup } from 'redux/actions';

import {
  OTP,
  Phone,
  SignIn,
  SignUp,
  Logister,
  ResetOTP,
  ResetPhone,
  UserUpdate,
  UserProfile,
  ResetPassword,
} from './components';

const titles =[
    "ورود",
    "احراز اصالت",
    "کد تایید",
    "اطلاعات ثبت نام",
    "ثبت نام و احراز هویت",
    "پروفایل",
    "فراموشی رمز عبور",
    "کد تایید",
  ]

const SignInPopup = (props)=> {
  const theme = useTheme();
  const dispatch = useDispatch();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { openProfile } = useSelector(state => state.settings);
  const { isAuthenticated, loading } = useSelector(state => state.user);
  
  const [update, setUpdate] = useState(false);
  const [extra, setExtra] = useState(null);
  const [step, setStep] = useState(isAuthenticated ? 5 : 0);
  const {icon, fullWidth = true, title = "ورود و ادامه پرداخت"} = props;

  const handleType = (data, extra=null) => {
    data === 5 && setUpdate(true)
    setExtra(extra);
    setStep(data);
  };

  const handleOpen = () => dispatch(openProfilePopup(true));
  const handleClose = () => {
    if (step === 5 && update) {
      return setUpdate(false);
    }
    dispatch(openProfilePopup(false));
  };

  const stepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        if(!isAuthenticated) return <SignIn handleType={handleType} handleClose={handleClose} />
      case 1:
        if(!isAuthenticated) return <Phone handleType={handleType} handleClose={handleClose} />
      case 2:
        if(!isAuthenticated) return <OTP handleType={handleType} extra={extra} />
      case 3:
        if(!isAuthenticated) return <SignUp handleType={handleType} handleClose={handleClose} extra={extra} />
      case 4:
        if(!isAuthenticated) return <Logister handleType={handleType} handleClose={handleClose} extra={extra} />
      case 5:
        if (update && isAuthenticated) return <UserUpdate handleType={handleType} handleClose={handleClose} />
        if (isAuthenticated) return <UserProfile handleType={handleType} handleClose={handleClose} />
      case 7:
        if(!isAuthenticated) return <ResetPhone handleType={handleType} handleClose={handleClose} />
      case 8:
        if(!isAuthenticated) return <ResetOTP handleType={handleType} handleClose={handleClose} extra={extra} />
      case 9:
        if(!isAuthenticated) return <ResetPassword handleType={handleType} handleClose={handleClose} />
      default:
        return 'ناشناخته';
    }
  }

  // const {phone, ref, reg} = router.query;
  const {phone, ref, reg} = {};
  useEffect( () => {
    setStep(isAuthenticated ? 5 : 0);
    if (!isAuthenticated && ref === "rg1") {
      handleOpen()
      handleType(5, {cellphone: phone, register_code: reg})
    }
    if (isAuthenticated && ref === "cou") {
      dispatch(openCouponPopup(true));
    }
  }, [phone, isAuthenticated])  

  return (
    <>
      {
        icon
          ?
            <IconButton size="small" color="warning" sx={{ bgcolor: 'warning.lighter' }} onClick={handleOpen}>
              <PersonRoundedIcon fontSize='20' />
            </IconButton>
          :
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth={fullWidth}
              onClick={handleOpen}
              sx={{borderRadius: '20px'}}
              endIcon={<NavigateBeforeRoundedIcon/>}>
              {title}
            </Button>
      }
      <Dialog
        dir="rtl"
        fullWidth
        maxWidth="sm"
        open={openProfile}
        fullScreen={isMobile}
        onClose={handleClose}
        aria-labelledby="sign-dialog"
      >
        <DialogTitle>
          <Typography variant="subtitle1" component="p">{titles[step]}</Typography>
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
            {
              loading
              ? <CircularProgress color="error" size={22} />
              : update ? <ArrowBackRounded fontSize="small" /> : <CloseIcon fontSize="small" />
            }
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: {xs: 0.5, sm: 1, md: 2}, py: 2 }} dividers>
          { stepContent(step) }
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SignInPopup;
