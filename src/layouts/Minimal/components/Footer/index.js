import React from 'react';

import {
  Box,
  Grid,
  Card,
  Stack,
  Button,
  Divider,
  useTheme,
  CardMedia,
  Typography,
  IconButton,
  useMediaQuery,
} from '@mui/material';

import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import Image from 'next/image';
import { FooterMobile } from './components';

const Footer = ({menus}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true
  });

  if (isMobile) {
    return <FooterMobile menus={menus} />
  }
  return (
    <footer>
      {/* <Stack sx={{
        // backgroundImage: 'url(/assets/svg/discount.svg)',
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',
        bgcolor: 'warning.main'
        }} mx={1} borderRadius={3} direction="row" justifyContent="space-evenly" alignItems="center" columnGap={2} py={3}>
        <Stack rowGap={2}>
          <Typography sx={{ textShadow: '0px 1px 3px #ffffff70'}} color="#fff" variant="h3">
            دانلود اپلیکیشن هایپرانو
          </Typography>
          <Typography sx={{ textShadow: '0px 1px 3px #ffffff70'}} color="#fff" variant="subtitle1">
            خرید آسان و راحت با تخفیف های جذاب لحظه ای 
          </Typography>
          <Stack direction="row" columnGap={2}>
              <Button fullWidth variant="contained" color="primary" size="large">Sibapp</Button>
              <Button fullWidth variant="contained" color="secondary" size="large">Bazar</Button>
          </Stack>

        </Stack>
        <Stack justifyContent="center" alignItems="center">
          <Image
              src="/images/icons/app.png"
              alt="Hyperano"
              width={240}
              height={240}
              style={{
                  filter: 'drop-shadow(0px 1px 3px #4285f4a3)',
                  padding: 4,
                  objectFit: 'contain'
              }}
          />
        </Stack>
      </Stack> */}

      <Stack py={2} columnGap={1} direction="row" justifyContent="space-evenly" alignItems="center">
        <Stack justifyContent="center" alignItems="center" rowGap={1}>
          <Box position='relative' width={96} height={96} p={1} borderRadius={8} bgcolor="#f5f5f599">
            <Image
              fill
              alt='ارسال بهترین کالاها'
              src='/images/icons/best.png'
              style={{objectFit: 'contain', padding: 12}}
            />
          </Box>
          <Typography align="center" variant="subtitle2" fontSize={14}>
            ارسال بهترین کالاها
          </Typography>
        </Stack>
        <Stack justifyContent="center" alignItems="center" rowGap={1}>
          <Box position='relative' width={96} height={96} p={1} borderRadius={8} bgcolor="#f5f5f599">
            <Image
              fill
              alt='ارسال به موقع سفارش‌ها'
              src='/images/icons/delivery.png'
              style={{objectFit: 'contain', padding: 12}}
            />
          </Box>
          <Typography align="center" variant="subtitle2" fontSize={14}>
            ارسال به موقع سفارش‌ها
          </Typography>
        </Stack>
        <Stack justifyContent="center" alignItems="center" rowGap={1}>
          <Box position='relative' width={96} height={96} p={1} borderRadius={8} bgcolor="#f5f5f599">
            <Image
              fill
              alt='بسته بندی مناسب'
              src='/images/icons/box.png'
              style={{objectFit: 'contain', padding: 12}}
            />
          </Box>
          <Typography align="center" variant="subtitle2" fontSize={14}>
            بسته بندی مناسب
          </Typography>
        </Stack>
        <Stack justifyContent="center" alignItems="center" rowGap={1}>
          <Box position='relative' width={96} height={96} p={1} borderRadius={8} bgcolor="#f5f5f599">
            <Image
              fill
              alt='تخفیف بیشتر محصولات'
              src='/images/icons/discounts.png'
              style={{objectFit: 'contain', padding: 12}}
            />
          </Box>
          <Typography align="center" variant="subtitle2" fontSize={14}>
            تخفیف بیشتر محصولات
          </Typography>
        </Stack>
        <Stack justifyContent="center" alignItems="center" rowGap={1}>
          <Box position='relative' width={96} height={96} p={1} borderRadius={8} bgcolor="#f5f5f599">
            <Image
              fill
              alt='پشتیبانی حرفه ای'
              src='/images/icons/support.png'
              style={{objectFit: 'contain', padding: 12}}
            />
          </Box>
          <Typography align="center" variant="subtitle2" fontSize={14}>
            پشتیبانی حرفه ای
          </Typography>
        </Stack>
      </Stack>

      <Grid container sx={{ p: 2 }}>
        <Grid item container xs={12}>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Stack sx={{ height: '100%', p: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                راه های ارتباطی ما
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography variant="caption" gutterBottom>
                تلفن پشتیبانی : 09136560256
              </Typography>
              <Typography variant="caption" gutterBottom>
                آدرس: اصفهان - خیابان احمدآباد
              </Typography>
              <Typography variant="caption" gutterBottom>
                ایمیل : hyperano@info
              </Typography>
              <Stack direction="row" columnGap={1}>
                <IconButton size='small' color='error' sx={{ bgcolor: 'error.lighter'}}>
                  <InstagramIcon fontSize='20'/>
                </IconButton>
                <IconButton size='small' color='info' sx={{ bgcolor: 'info.lighter'}}>
                  <TelegramIcon fontSize='20'/>
                </IconButton>
                <IconButton size='small' color='primary' sx={{ bgcolor: 'primary.lighter'}}>
                  <FacebookIcon fontSize='20'/>
                </IconButton>
                <IconButton size='small' color='warning' sx={{ bgcolor: 'warning.lighter'}}>
                  <LinkedInIcon fontSize='20'/>
                </IconButton>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Stack sx={{ height: '100%', p: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                تماس با ما
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography color="textSecondary" variant="caption" component="p" gutterBottom>
                نحوه ثبت سفارش
              </Typography>
              <Typography color="textSecondary" variant="caption" component="p" gutterBottom>
                نحوه ثبت سفارش
              </Typography>
              <Typography color="textSecondary" variant="caption" component="p" gutterBottom>
                رویه های ارسال
              </Typography>
              <Typography color="textSecondary" variant="caption" component="p" gutterBottom>
                شیوه های پرداخت
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Stack sx={{ height: '100%', p: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                خدمات مشتریان
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography color="textSecondary" variant="caption" component="p" gutterBottom>
                رویه های بازگرداندن کالا
              </Typography>
              <Typography color="textSecondary" variant="caption" component="p" gutterBottom>
                قوانین و مقررات
              </Typography>
              <Typography color="textSecondary" variant="caption" component="p" gutterBottom>
                پرسش های متداول
              </Typography>
              <Typography color="textSecondary" variant="caption" component="p" gutterBottom>
                حریم خصوصی
              </Typography>
              <Typography color="textSecondary" variant="caption" component="p" gutterBottom>
                گزارش مشکل
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={4} md={3} lg={3}>
            <Stack sx={{ height: '100%', p: 1 }} justifyContent="center" alignItems="center">
              <Stack justifyContent="center" alignItems="center">
                <Image
                    src="/logo.svg"
                    alt="Hyperano"
                    width={72}
                    height={48}
                    style={{
                      filter: 'drop-shadow(0px 1px 3px #4285f4a3)',
                      padding: 4,
                      objectFit: 'contain'
                    }}
                />
                <Typography gutterBottom sx={{ textShadow: '0px 1px 3px #4285f4a3'}} color="#4285f4" variant="subtitle1" fontSize={10}>
                  هایپرانو؛ تجربه ی خریدی نو
                </Typography>
              </Stack>
              <Stack direction="row" columnGap={1}>
                <Card elevation={1} sx={{height: 80, width: 64, p: 1}}>
                  <CardMedia
                    image='/images/samandehi.png'
                    title="title"
                    sx={{
                      height: '100%',
                      width: '100%',
                      backgroundSize: 'contain',
                    }}
                  />
                </Card>
                <Card elevation={1} sx={{height: 80, width: 64, p: 1}}>
                  <CardMedia
                    image='/images/ecunion.png'
                    title="title"
                    sx={{
                      height: '100%',
                      width: '100%',
                      backgroundSize: 'contain',
                    }}
                  />
                </Card>
                <Card elevation={1} sx={{height: 80, width: 64, p: 1}}>
                  <CardMedia
                    image='/images/enemad.png'
                    title="title"
                    sx={{
                      height: '100%',
                      width: '100%',
                      backgroundSize: 'contain',
                    }}
                  />
                </Card>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Grid>

      <Stack sx={{ p: 0.5, color: '#a3a3a3', backgroundColor: '#4285f4', borderTopLeftRadius: 16, borderTopRightRadius: 16 }} alignItems="center">
        <Typography color="#fff" variant="body2" fontSize={10}>
          کلیه حقوق این وبسایت متعلق به Hyperano می باشد.
        </Typography>
      </Stack>
    </footer>
  );
};

export default Footer;
