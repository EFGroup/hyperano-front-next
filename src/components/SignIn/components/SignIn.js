import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import { useDispatch } from "react-redux";
import { setUser, setCoupons, setInitCart, setShop } from 'redux/actions';

import { signInSchema } from "./schema";
import validate from 'validate.js';
import useAxios from 'utils/useAxios';
import nextApiApolloErrHandling from 'utils/nextApiApolloErrHandling';
import { toast } from 'react-toastify';
import Image from 'next/image';

const SignIn = (props) => {
  const dispatch = useDispatch();
  const { handleType, handleClose } = props;

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [{ isLoading }, getData] = useAxios();
  
  const signIn = async (event) => {
    event.preventDefault();
    const { response, error } = await getData({
      method: 'POST',
      url: '/api/auth/signin',
      data: formState.values
    });
    if (response) {
      dispatch(setUser(response))
      dispatch(setCoupons(response?.category_coupons || []))
      if (response?.order_carts) {
        dispatch(setInitCart(response?.order_carts))
        dispatch(setShop(response?.order_carts[0]?.shop))
      }
      toast.success("ورود با موفقیت انجام شد")
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
    const errors = validate(formState.values, signInSchema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  return (
    <form onSubmit={signIn} style={{height: '100%'}}>
      <Stack height="100%" rowGap={1} columnGap={1} sx={{direction: 'rtl'}} px={1}>
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
            label="تلفن همراه"
            name="cellphone"
            onChange={handleChange}
            type="tel"
            value={formState.values.cellphone || ''}
            variant="outlined"
            margin="dense"
          />
          <TextField
            error={hasError('password')}
            fullWidth
            helperText={
              hasError('password') ? formState.errors.password[0] : null
            }
            label="گذرواژه"
            name="password"
            onChange={handleChange}
            type="password"
            value={formState.values.password || ''}
            variant="outlined"
            margin="dense"
          />
        </Stack>
        <Stack rowGap={1} alignItems="center">
          <Button
            fullWidth
            size="large"
            type="submit"
            color="primary"
            variant="contained"
            disabled={!formState.isValid}
          >
            { isLoading ? <CircularProgress size={20} /> : "ورود" }
          </Button>
          <Button
            fullWidth
            size="small"
            onClick={()=>handleType(1)}
          >
            ثبت نام
          </Button>
          <Button
            fullWidth
            size="small"
            onClick={()=>handleType(7)}
          >
            رمز عبور خود را فراموش کرده‌اید؟
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

export default SignIn;