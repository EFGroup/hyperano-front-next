import React from 'react';
import QRCode from "react-qr-code";

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import { grey } from '@mui/material/colors';

import { signOut } from 'redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePopup({ handleType, handleClose }) {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user);

  const userLogout = () => {
    handleClose()
    dispatch(signOut())
  }

  return (
    <Stack height="100%" rowGap={1} columnGap={1} sx={{direction: 'rtl'}} px={2}>
      <Stack rowGap={3} >
        <Stack columnGap={4} rowGap={2} direction="row" flexWrap="wrap" justifyContent="center">
          <Stack flex={1} rowGap={2} justifyContent="center">
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">
                نام و نام خانوادگی :
              </Typography>
              <Typography variant="subtitle1" align="left">
                {`${userData?.firstname || "-"} ${userData?.lastname || "-"}`}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">
                نام کاربری :
              </Typography>
              <Typography variant="subtitle1" align="left">
                {userData?.username}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">
                تلفن تماس :
              </Typography>
              <Typography variant="subtitle1" align="left">
                {userData?.cellphone || "-"}
              </Typography>
            </Stack>
          </Stack>
          <Card variant="outlined">
            <Stack p={2} justifyContent="center" alignItems="center">
              <QRCode
                value={userData?.cellphone}
                size={160}
                style={{ height: "100%", borderRadius: 10 }}
                viewBox={`0 0 220 220`}
                fgColor={grey[800]}
              />
            </Stack>
          </Card>
        </Stack>
        <Stack columnGap={1} rowGap={1} direction={{xs: "column", sm: "row", md: "row"}}>
          <Card variant="outlined" sx={{flex: 1}}>
            <CardActionArea onClick={handleClose} href="/coupons" >
              <CardContent sx={{p: 0.5}}>
                <Stack style={{ margin: 'auto' }}>
                  <Image
                    alt="coupons" src={'/images/discounts.webp'}
                    style={{objectFit: 'contain', margin: 'auto'}} height={80} width={80} />
                </Stack>
                <Typography variant="subtitle1" align="center">بن ها</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card variant="outlined" sx={{flex: 1}}>
            <CardActionArea onClick={handleClose} href="/address">
              <CardContent sx={{p: 0.5}}>
                <Stack style={{ margin: 'auto' }}>
                  <Image
                    alt="addresses" src={'/images/addresses.webp'} 
                    style={{objectFit: 'contain', margin: 'auto'}} height={80} width={80} />
                </Stack>
                <Typography variant="subtitle1" align="center">آدرس ها</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card variant="outlined" sx={{flex: 1}}>
            <CardActionArea onClick={handleClose} href="/orders">
              <CardContent sx={{p: 0.5}}>
                <Stack style={{ margin: 'auto' }}>
                  <Image
                    alt="orders" src={'/images/orders.webp'}
                    style={{objectFit: 'contain', margin: 'auto'}} height={80} width={80} />
                </Stack>
                <Typography variant="subtitle1" align="center">سفارش ها</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Stack>
        <Stack columnGap={1} direction="row" pb={2}>
          <Button
            size="large"
            sx={{ bgcolor: 'info.lighter', color: 'info.dark', borderRadius: 2}}
            onClick={() => handleType(5)}
            // endIcon={<Settings fontSize="small" />}
            fullWidth disableRipple>
            ویرایش اطلاعات
          </Button>
          <Button
            size="large"
            color="error"
            sx={{ bgcolor: 'error.lighter', color: 'error.dark', borderRadius: 2}}
            onClick={userLogout}
            // endIcon={<Logout fontSize="small" />}
            fullWidth disableRipple>
            خروج از حساب
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}