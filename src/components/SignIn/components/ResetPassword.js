import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import { resetPassSchema } from "./schema";
import validate from 'validate.js';
import useAxios from 'utils/useAxios';
import nextApiApolloErrHandling from 'utils/nextApiApolloErrHandling';
import { toast } from 'react-toastify';
import Image from 'next/image';

const SignUp = (props)=> {
  const { handleType, extra } = props;

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
      url: '/api/auth/forget',
      data: { ...formState.values, ...extra }
    });
    if (response) {
      toast.success("بازیابی رمز عبور با موفقیت انجام شد")
      handleType(0)
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
    const errors = validate(formState.values, resetPassSchema);
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
            error={hasError('password')}
            fullWidth
            helperText={
              hasError('password') ? formState.errors.password[0] : null
            }
            label="گذرواژه جدید"
            name="password"
            onChange={handleChange}
            type="password"
            value={formState.values.password || ''}
            variant="outlined"
            margin="dense"
          />
          <TextField
            error={hasError('re_password')}
            fullWidth
            helperText={
              hasError('re_password') ? formState.errors.re_password[0] : null
            }
            label="تکرار گذرواژه"
            name="re_password"
            onChange={handleChange}
            type="password"
            value={formState.values.re_password || ''}
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
            { isLoading ? <CircularProgress size={20} /> : "بازیابی گذرواژه" }
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

export default SignUp;




