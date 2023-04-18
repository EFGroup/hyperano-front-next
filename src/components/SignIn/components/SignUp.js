import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import { useDispatch } from "react-redux";
import { setUser, setCoupons, setInitCart, setShop } from 'redux/actions';

import { signUpSchema } from "./schema";
import validate from 'validate.js';
import useAxios from 'utils/useAxios';
import nextApiApolloErrHandling from 'utils/nextApiApolloErrHandling';
import { toast } from 'react-toastify';
import Image from 'next/image';

const SignUp = (props)=> {
  const dispatch = useDispatch();
  const { handleClose, extra } = props;

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [{ isLoading }, getData] = useAxios();

  const signUp = async (event) => {
    event.preventDefault();
    const {response, error } = await getData({
      method: 'POST',
      url: '/api/auth/activate',
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
    const errors = validate(formState.values, signUpSchema);
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
              src="/images/user.webp"
              alt='hyperano-signup'
              style={{objectFit: 'contain'}}
            />
          </Box>
          <TextField
            error={hasError('username')}
            fullWidth
            helperText={
              hasError('username') ? formState.errors.username[0] : null
            }
            label="نام کاربری"
            name="username"
            onChange={handleChange}
            type="text"
            value={formState.values.username || ''}
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
            { isLoading ? <CircularProgress size={20} /> : "ثبت نام" }
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

export default SignUp;




