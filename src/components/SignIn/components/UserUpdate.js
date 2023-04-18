import React, { useState, useEffect  } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import { updateUser } from 'redux/actions';
import { useSelector, useDispatch } from 'react-redux';

import { userUpdateSchema } from "./schema";
import validate from 'validate.js';
import useAxios from 'utils/useAxios';
import nextApiApolloErrHandling from 'utils/nextApiApolloErrHandling';
import { toast } from "react-toastify";
import Image from 'next/image';

export default function UserUpdate({ handleType, handleClose }) {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user);
 
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      firstname: userData?.firstname,
      lastname: userData?.lastname,
      email: userData?.email
    },
    touched: {},
    errors: {}
  });

  const [{ isLoading }, getData] = useAxios();

  const update = async (event) => {
    event.preventDefault();
    const { response, error } = await getData({
      method: 'PATCH',
      url: '/api/auth/user',
      data: formState.values
    });
    if (response) {
      console.log("response", response)
      dispatch(updateUser(response))
      // dispatch(setCoupons(response?.category_coupons || []))
      // if (response?.order_carts) {
      //   dispatch(setInitCart(response?.order_carts))
      //   dispatch(setShop(response?.order_carts[0]?.shop))
      // }
      toast.success("ویرایش با موفقیت انجام شد")
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
    const errors = validate(formState.values, userUpdateSchema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  return (
    <form onSubmit={update} style={{height: '100%'}}>
      <Stack height="100%" rowGap={1} columnGap={1} sx={{direction: 'rtl'}} px={1}>
        <Stack rowGap={2} flex={1} justifyContent="center">
          <Box width={300} height={160} mx="auto">
            <Image
              fill
              src="/images/sign-in.webp"
              alt='hyperano-signin'
              style={{objectFit: 'contain'}}
            />
          </Box>
          <TextField
              error={hasError('firstname')}
              fullWidth
              helperText={
                  hasError('firstname') ? formState.errors.firstname[0] : null
              }
              label="نام"
              name="firstname"
              onChange={handleChange}
              type="text"
              value={formState.values.firstname || ''}
              variant="outlined"
              margin="dense"
          />
          <TextField
              error={hasError('lastname')}
              fullWidth
              helperText={
                  hasError('lastname') ? formState.errors.lastname[0] : null
              }
              label="نام خانوادگی"
              name="lastname"
              onChange={handleChange}
              type="text"
              value={formState.values.lastname || ''}
              variant="outlined"
              margin="dense"
          />
          <TextField
              error={hasError('email')}
              fullWidth
              helperText={
                  hasError('email') ? formState.errors.email[0] : null
              }
              label="ایمیل"
              name="email"
              onChange={handleChange}
              type="text"
              value={formState.values.email || ''}
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
              { isLoading ? <CircularProgress color="inherit" size={26} /> : "ویرایش" }
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}