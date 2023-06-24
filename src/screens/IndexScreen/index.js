import React from 'react';
import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import Slider from './Slider';
import { MoreRounded } from '@mui/icons-material';
import {BrandsSlider, CountdownTimer} from 'components';
import Image from 'next/image';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import BrandSlider from './BrandSlider';
import DiscountSlider from './DiscountSlider';
import Promotion from './Promotion';

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
    image: "/images/brands/brand00001.png"
  },
  {
    title: "Brand02",
    image: "/images/brands/brand00002.png"
  },
  {
    title: "Brand03",
    image: "/images/brands/brand00003.png"
  },
  {
    title: "Brand04",
    image: "/images/brands/brand00004.png"
  },
  {
    title: "Brand05",
    image: "/images/brands/brand00005.png"
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
  {
    title: "Brand10",
    image: "/images/brands/brand00010.png"
  },
  {
    title: "Brand11",
    image: "/images/brands/brand00011.png"
  },
  {
    title: "Brand12",
    image: "/images/brands/brand00012.png"
  },
]

function IndexScreen({ shops, offslider, offsliderLoading }) {
  return (
    <Card sx={{ mt: -10, borderRadius: 4 }}>
      <Stack rowGap={3}>
        <Stack py={1} px={1} pb={0}>
          <Slider />
        </Stack>

        <Grid px={1} container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card elevation={3}>
              <CardMedia sx={{ position: "relative", pt: "42%" }}>
                <Image
                  fill
                  alt="Banner 01"
                  src="/images/banners/B11.jpg"
                  style={{ objectFit: "cover" }}
                />
              </CardMedia>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card elevation={3}>
              <CardMedia sx={{ position: "relative", pt: "42%" }}>
                <Image
                  fill
                  alt="Banner 02"
                  src="/images/banners/B12.jpg"
                  style={{ objectFit: "cover" }}
                />
              </CardMedia>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card elevation={3}>
              <CardMedia sx={{ position: "relative", pt: "42%" }}>
                <Image
                  fill
                  alt="Banner 03"
                  src="/images/banners/B13.jpg"
                  style={{ objectFit: "cover" }}
                />
              </CardMedia>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Card elevation={3}>
              <CardMedia sx={{ position: "relative", pt: "42%" }}>
                <Image
                  fill
                  alt="Banner 04"
                  src="/images/banners/B14.jpg"
                  style={{ objectFit: "cover" }}
                />
              </CardMedia>
            </Card>
          </Grid>
        </Grid>

        {categories && categories.length > 0 && (
          <Stack py={2} px={1}>
            <Promotion title="فروش ویژه" data={categories} />
          </Stack>
        )}

        {offsliderLoading ? (
          <Skeleton
            variant="rounded"
            height={500}
            sx={{ borderRadius: 2, my: 2, mx: 1 }}
          />
        ) : (
          offslider &&
          offslider.length > 0 && (
            <Stack py={2} px={1}>
              <DiscountSlider
                title="عیدانه هایپرانو"
                data={offslider}
              />
            </Stack>
          )
        )}

        {/* <Stack py={2} px={1} alignItems="center" justifyContent="center">
          <Image
            src="/logo.svg"
            alt="Hyperano"
            width={96}
            height={80}
            style={{
              filter: "drop-shadow(0px 1px 3px #4285f4a3)",
              padding: 0,
            }}
          />
          <Typography fontSize={14} color="info.main" variant="subtitle1">
            هایپرانو ؛ تجربه خریدی نو
          </Typography>
        </Stack> */}

        <Stack px={1} rowGap={0.5}>
          <Typography color="text.primary" textAlign="center" variant="h4">
            برندهای محبوب
          </Typography>
          <BrandSlider data={brands} />
        </Stack>

        <Stack px={1} rowGap={0.5}>
          <Typography color="text.primary" textAlign="center" variant="h4">
            مقالات
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Card elevation={3}>
                <CardHeader
                  title="درباره قهوه"
                  subheader="نکات کلیدی در انتخاب و خرید قهوه"
                  avatar={<Avatar />}
                  action={
                    <IconButton>
                      <MoreRounded />
                    </IconButton>
                  }
                />
                <CardMedia
                  image="/images/articles/A01.jpg"
                  sx={{ pt: "33%", borderRadius: 2 }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Card elevation={3}>
                <CardHeader
                  title="آموزش موکا"
                  subheader="روش تهیه انواع قهوه برای مهمانی"
                  avatar={<Avatar />}
                  action={
                    <IconButton>
                      <MoreRounded />
                    </IconButton>
                  }
                />
                <CardMedia
                  image="/images/articles/A02.jpg"
                  sx={{ pt: "33%", borderRadius: 2 }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Card elevation={3}>
                <CardHeader
                  title="انواع شوینده ها"
                  subheader="مضرات استفاده نامناسب از شوینده ها"
                  avatar={<Avatar />}
                  action={
                    <IconButton>
                      <MoreRounded />
                    </IconButton>
                  }
                />
                <CardMedia
                  image="/images/slides/S06.jpg"
                  sx={{ pt: "33%", borderRadius: 2 }}
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={3}>
              <Card elevation={3}>
                <CardHeader
                  title="ماه مهمانی خدا"
                  subheader="سبد غذایی کامل در ماه مبارک رمضان"
                  avatar={<Avatar />}
                  action={
                    <IconButton>
                      <MoreRounded />
                    </IconButton>
                  }
                />
                <CardMedia
                  image="/images/slides/S04.jpg"
                  sx={{ pt: "33%", borderRadius: 2 }}
                />
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </Card>
  );
}

export default IndexScreen;