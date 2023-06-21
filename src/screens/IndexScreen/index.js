import React from 'react';
import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, IconButton, Stack, Typography } from '@mui/material';
import Slider from './Slider';
import { MoreRounded } from '@mui/icons-material';
import {BrandsSlider, CountdownTimer} from 'components';
import Image from 'next/image';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';

const categories = [
  {
    id: "3",
    title: "پروتئینی ها",
    image: "/images/categories/Cat00001.png",
  },
  {
    id: "81",
    title: "چیپس، پفک و پاپ کورن",
    image: "/images/categories/Cat00002.png"
  },
  {
    id: "102",
    title: "بهداشتی و ضد عفونی",
    image: "/images/categories/Cat00003.png"
  },
  {
    id: "34",
    title: "لبنیات",
    image: "/images/categories/Cat00004.png"
  },
  {
    id: "42",
    title: "میوه و سبزی",
    image: "/images/categories/Cat00005.png"
  },
  {
    id: "17",
    title: "انواع نان",
    image: "/images/categories/Cat00006.png"
  },
  {
    id: "149",
    title: "سرگرمی و آموزش",
    image: "/images/categories/Cat00007.png"
  },
  {
    id: "123",
    title: "لوازم التحریر",
    image: "/images/categories/Cat00008.png"
  },
  {
    id: "85",
    title: "انواع دسر",
    image: "/images/categories/Cat00009.png"
  },
  {
    id: "95",
    title: "کودک و بانوان",
    image: "/images/categories/Cat00010.png"
  },
  {
    id: "72",
    title: "آجیل و خشکبار",
    image: "/images/categories/Cat00011.png"
  },
  {
    id: "113",
    title: "مواد شوینده",
    image: "/images/categories/Cat00012.png"
  },
  {
    id: "55",
    title: "کنسرو و غذای آماده",
    image: "/images/categories/Cat00013.png"
  },
  {
    id: "114",
    title: "صابون و پودر لباسشویی",
    image: "/images/categories/Cat00014.png"
  },
  {
    id: "10",
    title: "چاشنی ها",
    image: "/images/categories/Cat00015.png"
  },
  {
    id: "59",
    title: "سوپ و آش",
    image: "/images/categories/Cat00016.png"
  },
  {
    id: "41",
    title: "نوشیدنی ها",
    image: "/images/categories/Cat00017.png"
  },
]

const products = [
  {
    title: "Product0",
    image: "/images/categories/Cat00010.png"
  },
  {
    title: "Product1",
    image: "/images/categories/Cat00011.png"
  },
  {
    title: "Product2",
    image: "/images/categories/Cat00012.png"
  },
  {
    title: "Product3",
    image: "/images/categories/Cat00013.png"
  },
  {
    title: "Product4",
    image: "/images/categories/Cat00014.png"
  },
  {
    title: "Product5",
    image: "/images/categories/Cat00015.png"
  },
  {
    title: "Product6",
    image: "/images/categories/Cat00016.png"
  },
  {
    title: "Product7",
    image: "/images/categories/Cat00017.png"
  },
  {
    title: "Product8",
    image: "/images/categories/Cat00009.png"
  },
  {
    title: "Product9",
    image: "/images/categories/Cat00008.png"
  },
  {
    title: "Product10",
    image: "/images/categories/Cat00007.png"
  },
  {
    title: "Product11",
    image: "/images/categories/Cat00006.png"
  },
]

const brands = [
  {
    title: "Brand01",
    image: "/images/brands/brand00001.jpg"
  },
  {
    title: "Brand02",
    image: "/images/brands/brand00002.png"
  },
  {
    title: "Brand03",
    image: "/images/brands/brand00003.jpg"
  },
  {
    title: "Brand04",
    image: "/images/brands/brand00004.jpg"
  },
  {
    title: "Brand05",
    image: "/images/brands/brand00005.jpg"
  },
  {
    title: "Brand06",
    image: "/images/brands/brand00006.png"
  },
  {
    title: "Brand07",
    image: "/images/brands/brand00007.png"
  },
  {
    title: "Brand08",
    image: "/images/brands/brand00008.png"
  },
  {
    title: "Brand09",
    image: "/images/brands/brand00009.png"
  },
]

function IndexScreen({shops}) {
  return (
    <Card sx={{ mt: -10, borderRadius: 4 }}>
    <Stack>
        <Slider />
          <Typography variant='h3'>دسته های منتخب</Typography>
        <Stack py={2} px={1} direction="row" justifyContent="space-evenly" alignItems="center">
          {
            categories.map( (item, i) => (
              <Stack key={i} sx={{scrollSnapAlign: 'center'}} justifyContent="center" alignItems="center">
                <Avatar sx={{width: 80, height: 80, p: 1, bgcolor: '#f5f5f5'}} alt={item.title} src={item.image} />
                <Typography noWrap align="center" variant="subtitle2" bgcolor="#ffffff30" fontSize={14} borderRadius={2} mt={0.5}>
                    {item.title}
                </Typography>
              </Stack>
            ))
          }
        </Stack>
        
        <Grid py={2} px={1} container>
            <Grid item p={1} xs={12} sm={6} md={6} lg={3}>
                <Card elevation={3}>
                    <CardMedia sx={{position: 'relative', pt: '42%'}} >
                        <Image
                            fill
                            alt='Banner 01'
                            src='/images/banners/B11.jpg'
                            style={{objectFit: 'cover'}}
                        />
                    </CardMedia>
                </Card>
            </Grid>
            <Grid item p={1} xs={12} sm={6} md={6} lg={3}>
                <Card elevation={3}>
                    <CardMedia sx={{position: 'relative', pt: '42%'}} >
                        <Image
                            fill
                            alt='Banner 02'
                            src='/images/banners/B12.jpg'
                            style={{objectFit: 'cover'}}
                        />
                    </CardMedia>
                </Card>
            </Grid>
            <Grid item p={1} xs={12} sm={6} md={6} lg={3}>
                <Card elevation={3}>
                    <CardMedia sx={{position: 'relative', pt: '42%'}} >
                        <Image
                            fill
                            alt='Banner 03'
                            src='/images/banners/B13.jpg'
                            style={{objectFit: 'cover'}}
                        />
                    </CardMedia>
                </Card>
            </Grid>
            <Grid item p={1} xs={12} sm={6} md={6} lg={3}>
                <Card elevation={3}>
                    <CardMedia sx={{position: 'relative', pt: '42%'}} >
                        <Image
                            fill
                            alt='Banner 04'
                            src='/images/banners/B14.jpg'
                            style={{objectFit: 'cover'}}
                        />
                    </CardMedia>
                </Card>
            </Grid>
        </Grid>

        <Stack py={2} px={2} direction={{xs: 'column', sm: 'column', md: 'row'}} columnGap={2} rowGap={2}>
          {
            shops && shops.map(( shop, i) => (
              <Card elevation={3} sx={{flex: 1}} key={i}>
                <CardActionArea href={`/shops/${shop?.id}`}>
                  <CardHeader
                    title={shop?.title}
                    avatar={
                      <Avatar sx={{bgcolor: 'error.lighter'}}>
                        <StoreRoundedIcon color="error" fontSize="small" />
                      </Avatar>
                    }
                    action={
                      <Typography
                        color="text.secondary"
                        variant="subtitle1"
                        fontSize={12}>
                          {`ارسال رایگان خریدهای بالای ${Number(shop?.min_free_ship)} تومان`}
                      </Typography>
                    }
                  />
                </CardActionArea>
              </Card>
            ))
          }
        </Stack>
        <Stack py={2} px={1}>
            <Card elevation={3} sx={{backgroundImage: 'url("/images/bg/discount.svg")', backgroundSize: 'cover'}}>
                <CardContent sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'column', md: 'row'} }}>
                    <Stack flex={1} justifyContent="center">
                        <Typography variant="h2" color="success.dark">ماه میهمانی</Typography>
                        <Typography variant="subtitle2">سبد کاملی از تخفیف و تنوع</Typography>
                    </Stack>
                    <Stack flex={2} columnGap={1} direction="row" justifyContent="space-between">
                        {
                            categories.map( (item, i) => (
                                <Stack key={i} sx={{scrollSnapAlign: 'center'}} justifyContent="center" alignItems="center">
                                    <Avatar sx={{width: 96, height: 96, p: 1, bgcolor: '#f5f5f555'}} alt={item.title} src={item.image} />
                                    <Typography align="center" variant="subtitle2" bgcolor="#ffffff30" fontSize={14} borderRadius={2} mt={0.5}>
                                        {item.title}
                                    </Typography>
                                </Stack>
                            ))
                        }
                    </Stack>
                </CardContent>
            </Card>
        </Stack>

        <Stack py={2} px={1}>
            <Card elevation={3} sx={{bgcolor: 'error.main', backgroundImage: 'url("/images/bg/bg3.png")', backgroundSize: 'cover'}}>
                <CardContent>
                    <Stack direction={{xs: 'column', sm: 'column', md: 'row'}} rowGap={1} columnGap={1}>
                        <Stack flex={1} rowGap={2} justifyContent="center" alignItems="center">
                            <Typography color="#fff" variant="h2">جشنواره عیدانه هایپرانو</Typography>
                            <CountdownTimer targetDate="2023/04/20 17:34:2" color="error.dark" />
                            <Button sx={{bgcolor: '#fff', color: 'error.main'}} variant='contained' color='error'>مشاهده همه</Button>
                        </Stack>
                        <Stack py={2} flex={2} columnGap={2} rowGap={2} direction="row" flexWrap="wrap" justifyContent="space-evenly" alignItems="center">
                            {
                                products.slice(0, 12).map( (item, i) => (
                                    <Card key={i} sx={{bgcolor: '#ffffff', borderRadius: 4}}>
                                        <CardMedia sx={{position: 'relative', width: 140, height: 140}}>
                                            <Image
                                              fill
                                              alt={item.title}
                                              src={item.image}
                                              style={{objectFit: 'cover', padding: 12}}
                                            />
                                        </CardMedia>
                                    </Card>
                                ))
                            }
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>

        <Stack py={2} px={1}>
          <BrandsSlider data={brands} />
        </Stack>

        <Stack py={2} px={1} alignItems="center" justifyContent="center">
            <Image
              src="/logo.svg"
              alt="Hyperano"
              width={96}
              height={80}
              style={{
                filter: 'drop-shadow(0px 1px 3px #4285f4a3)',
                padding: 0
              }}
            />
            <Typography fontSize={14} color="info.main" variant='subtitle1'>
                هایپرانو ؛ تجربه خریدی نو
            </Typography>
        </Stack>

        
        <Grid py={4} px={2} container>
            <Grid item p={1} xs={12} sm={6} md={6} lg={3}>
                <Card elevation={3}>
                    <CardHeader
                        title="درباره قهوه"
                        subheader="نکات کلیدی در انتخاب و خرید قهوه"
                        avatar={<Avatar />}
                        action={<IconButton><MoreRounded/></IconButton>}
                    />
                    <CardMedia
                        image='/images/articles/A01.jpg'
                        sx={{pt: '33%', borderRadius: 2}}
                    />
                </Card>
            </Grid>
            <Grid item p={1} xs={12} sm={6} md={6} lg={3}>
                <Card elevation={3}>
                    <CardHeader
                        title="آموزش موکا"
                        subheader="روش تهیه انواع قهوه برای مهمانی"
                        avatar={<Avatar />}
                        action={<IconButton><MoreRounded/></IconButton>}
                    />
                    <CardMedia
                        image='/images/articles/A02.jpg'
                        sx={{pt: '33%', borderRadius: 2}}
                    />
                </Card>
            </Grid>
            <Grid item p={1} xs={12} sm={6} md={6} lg={3}>
                <Card elevation={3}>
                    <CardHeader
                        title="انواع شوینده ها"
                        subheader="مضرات استفاده نامناسب از شوینده ها"
                        avatar={<Avatar />}
                        action={<IconButton><MoreRounded/></IconButton>}
                    />
                    <CardMedia
                        image='/images/slides/S06.jpg'
                        sx={{pt: '33%', borderRadius: 2}}
                    />
                </Card>
            </Grid>
            <Grid item p={1} xs={12} sm={6} md={6} lg={3}>
                <Card elevation={3}>
                    <CardHeader
                        title="ماه مهمانی خدا"
                        subheader="سبد غذایی کامل در ماه مبارک رمضان"
                        avatar={<Avatar />}
                        action={<IconButton><MoreRounded/></IconButton>}
                    />
                    <CardMedia
                        image='/images/slides/S04.jpg'
                        sx={{pt: '33%', borderRadius: 2}}
                    />
                </Card>
            </Grid>
        </Grid>
    </Stack>
    </Card>
  );
}

export default IndexScreen;