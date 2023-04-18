import React, { useState, useEffect  } from 'react';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import { useDispatch } from "react-redux";
import { setUser, setCoupons, setInitCart, setShop } from 'redux/actions';

import validate from 'validate.js';
import useAxios from 'utils/useAxios';
import { toast } from "react-toastify";
import { logisterSchema } from "./schema";
import nextApiApolloErrHandling from 'utils/nextApiApolloErrHandling';

const Logister = (props)=> {
  const dispatch = useDispatch();
  const { handleClose, handleType, extra } = props;
 
  const [formState, setFormState] = useState({
    isValid: false,
    values: { ...extra },
    touched: {},
    errors: {}
  });

  const [{ isLoading }, getData] = useAxios();

  const signUp = async (event) => {
    event.preventDefault();
    const {response, error } = await getData({
      method: 'POST',
      url: '/api/auth/logister',
      data: { ...formState.values, ...extra }
    });
    if (response) {
      dispatch(setUser(response))
      dispatch(setCoupons(response?.category_coupons || []))
      if (response?.order_carts) {
        dispatch(setInitCart(response?.order_carts))
        dispatch(setShop(response?.order_carts[0]?.shop))
      }
      toast.success("ثبت نام با موفقیت انجام شد")
      handleClose()
    }
    if(error) {
      nextApiApolloErrHandling(error);
    }
  };

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : (event.target.value)
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  useEffect(() => {
    const errors = validate(formState.values, logisterSchema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  return (
    <form onSubmit={signUp} style={{height: '100%'}}>
      <Stack height="100%" rowGap={1} columnGap={1} sx={{direction: 'rtl'}} pl={1} pr={1}>
        <Stack rowGap={2} flex={1} justifyContent="center">
          <Box width="100%" height={160} position="relative" mx="auto">
            <Image
              fill
              src="/images/sign-in.webp"
              alt='hyperano-signin'
              style={{objectFit: 'contain'}}
            />
          </Box>
          <TextField
            error={hasError('cellphone')}
            fullWidth
            helperText={
                hasError('cellphone') ? formState.errors.cellphone[0] : null
            }
            label="شماره تلفن همراه"
            name="cellphone"
            onChange={handleChange}
            type="tel"
            value={formState.values.cellphone || ''}
            variant="outlined"
            margin="dense"
          />
          <TextField
            error={hasError('register_code')}
            fullWidth
            helperText={
                hasError('register_code') ? formState.errors.register_code[0] : null
            }
            label="کد فعالسازی"
            name="register_code"
            onChange={handleChange}
            type="number"
            value={formState.values.register_code || ''}
            variant="outlined"
            margin="dense"
          />
          {/* <TextField
            error={hasError('first_name')}
            fullWidth
            helperText={
                hasError('first_name') ? formState.errors.first_name[0] : null
            }
            label="نام"
            name="first_name"
            onChange={handleChange}
            type="text"
            value={formState.values.first_name || ''}
            variant="outlined"
            margin="dense"
          />
          <TextField
            error={hasError('last_name')}
            fullWidth
            helperText={
                hasError('last_name') ? formState.errors.last_name[0] : null
            }
            label="نام خانوادگی"
            name="last_name"
            onChange={handleChange}
            type="text"
            value={formState.values.last_name || ''}
            variant="outlined"
            margin="dense"
          /> */}
          <TextField
            error={hasError('password')}
            fullWidth
            helperText={
                hasError('password') ? formState.errors.password[0] : null
            }
            label="رمز عبور"
            name="password"
            onChange={handleChange}
            type="password"
            value={formState.values.password || ''}
            variant="outlined"
            margin="dense"
          />
            {/* <TextField
            error={hasError('re_password')}
            fullWidth
            helperText={
                hasError('re_password') ? formState.errors.re_password[0] : null
            }
            label="تکرار رمز عبور"
            name="re_password"
            onChange={handleChange}
            type="password"
            value={formState.values.re_password || ''}
            variant="outlined"
            margin="dense"
          /> */}
          </Stack>
          <Stack rowGap={1} alignItems="center">
            <Button
              color="primary"
              disabled={!formState.isValid}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              { isLoading ? <CircularProgress color="inherit" size={26} /> : "ثبت نام و احراز هویت" }
            </Button>
            <Button
              fullWidth
              size="small"
              onClick={()=>handleType(0)}
            >
              ورود
            </Button>
          </Stack>
      </Stack>
    </form>
  );
}

export default Logister;