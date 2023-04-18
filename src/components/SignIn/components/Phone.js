import React, { useState, useEffect  } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import { phoneSchema } from "./schema";
import validate from 'validate.js';
import useAxios from 'utils/useAxios';
import nextApiApolloErrHandling from 'utils/nextApiApolloErrHandling';
import { toast } from 'react-toastify';
import Image from 'next/image';

const Phone = (props)=> {
  const { handleType } = props;
 
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [{ isLoading }, getData] = useAxios();

  const signUp = async (event) =>{
    event.preventDefault();
    const {response, error } = await getData({
      method: 'POST',
      url: '/api/auth/phone',
      data: formState.values
    });
    if (response) {
      toast.success("کد ثبت نام به تلفن همراه شما ارسال گردید")
      handleType(2, formState.values)
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
    const errors = validate(formState.values, phoneSchema);
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
              src="/images/phone.webp"
              alt='hyperano-signup'
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
            { isLoading ? <CircularProgress size={20} /> : "دریافت کد احراز هویت" }
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

export default Phone;