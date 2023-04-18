import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import useAxios from 'utils/useAxios';
import { toast } from "react-toastify";
import { useCountdown } from 'usehooks-ts';
import nextApiApolloErrHandling from 'utils/nextApiApolloErrHandling';

import PinInput from "react-pin-input";
import Image from 'next/image';

const ResetOTP = (props)=> {
  const {handleType, extra} = props;
  const [isComplete, setComplete] = useState(false);

  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 60,
      intervalMs: 1000,
    });

  const [{ isLoading }, getData] = useAxios();

  const signUp = async (resend_register_code) =>{
    const {response, error } = await getData({
      method: 'POST',
      url: '/api/auth/phone-reset',
      data: { ...extra, resend_register_code}
    });
    if (response) {
      toast.success("کد جدید به تلفن همراه شما ارسال گردید")
      resetCountdown()
      startCountdown()
    }
    if(error) {
      nextApiApolloErrHandling(error);
    }
  };

  const handleActivate = (register_code) => {
    setComplete(true)
    handleType(9, { register_code, ...extra })
    resetCountdown()
    startCountdown()
  };

  useEffect( ()=>{
    startCountdown()
  }, []);

  return (    
    <Stack height="100%" rowGap={1} columnGap={1} sx={{direction: 'rtl'}} pl={1} pr={1}>
      <Stack rowGap={2} flex={1} justifyContent="center">
        <Box width="100%" height={160} position="relative" mx="auto">
          <Image
            fill
            src="/images/phone.webp"
            alt='hyperano-otp'
            style={{objectFit: 'contain'}}
          />
        </Box>
        <PinInput
          focus
          length={5}
          autoSelect
          initialValue=""
          type="numeric"
          inputMode="number"
          inputFocusStyle={{
            borderColor: 'blue'
          }}
          inputStyle={{
            borderRadius: 8,
            borderColor: '#ccc'
          }}
          style={{
            display: 'flex',
            direction: 'ltr',
            alignItems: 'center',
            justifyContent: 'center',
          }}  
          disabled={isComplete}
          onComplete={(value) => handleActivate(value)}
        />
      </Stack>      
      <Button
        fullWidth
        size="large"
        color="primary"
        variant="contained"
        disabled={count > 0 || isLoading}
        onClick={()=>signUp(1)}
      >
        { count > 0 ? `${count} ثانیه` : "ارسال مجدد کد فعالسازی"}
      </Button>
    </Stack>
  );
}

export default ResetOTP;
