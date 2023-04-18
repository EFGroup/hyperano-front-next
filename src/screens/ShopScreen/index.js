import React from 'react';

import {
  Card,
  Stack,
  Skeleton,
} from '@mui/material';

import { ProductSlider, DiscountSlider, BrandsSlider } from 'components';
import PackageSlider from './PackageSlider';
import Slider from './Slider';

const brands = [
  {
    title: "",
    image: "/images/brands/brand00002.png"
  },
  {
    title: "",
    image: "/images/brands/brand00003.jpg"
  },
  {
    title: "",
    image: "/images/brands/brand00004.jpg"
  },
  {
    title: "",
    image: "/images/brands/brand00005.jpg"
  },
  {
    title: "",
    image: "/images/brands/brand00006.png"
  },
  {
    title: "",
    image: "/images/brands/brand00007.png"
  },
  {
    title: "",
    image: "/images/brands/brand00008.png"
  },
  {
    title: "",
    image: "/images/brands/brand00009.png"
  },
  {
    title: "",
    image: "/images/brands/brand00006.png"
  },
  {
    title: "",
    image: "/images/brands/brand00004.jpg"
  },
  {
    title: "",
    image: "/images/brands/brand00005.jpg"
  },
  {
    title: "",
    image: "/images/brands/brand00006.png"
  },
  {
    title: "",
    image: "/images/brands/brand00007.png"
  },
  {
    title: "",
    image: "/images/brands/brand00008.png"
  },
  {
    title: "",
    image: "/images/brands/brand00009.png"
  },
]


export default function ShopScreen({
  offslider, carousel, collection,
  carouselLoading, offsliderLoading, collectionLoading,
}) {

  return (
    <Card sx={{ mt: -10, borderRadius: 4 }}>
      <Stack>
          <Slider />
          
          <Stack py={2} px={1}>
            <BrandsSlider data={brands} />
          </Stack>

          {
            offsliderLoading
            ?
            <Skeleton variant='rounded' height={500} sx={{borderRadius: 2, my: 2, mx: 1}} />
            :
            offslider && offslider.length > 0 &&
            <Stack py={2} px={1}>
              <DiscountSlider
                title="فروش ویژه"
                data={offslider}
              />
            </Stack>
          }

          {
            collectionLoading
            ?
            <Skeleton variant='rounded' height={400} sx={{borderRadius: 2, my: 2, mx: 1}} />
            :
            collection && collection.length > 0 &&
            <Stack py={2} px={1}>
              <PackageSlider data={collection} />
            </Stack>
          }

          {
            carouselLoading
            ?
            <Skeleton variant='rounded' height={500} sx={{borderRadius: 2, my: 2, mx: 1}} />
            :
            carousel && carousel.map( (carousel,i) => {
              if(carousel.products.length > 0) {
                return (
                  <Stack py={2} px={1} key={i}>
                    <ProductSlider
                      title={carousel.root_category.title}
                      data={carousel.products}
                      banner={carousel.root_category.banners} />
                  </Stack>
                )
              }
            })
          }

      </Stack>
    </Card>
  );
}