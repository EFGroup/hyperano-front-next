import React from 'react';

import {
  Card,
  Stack,
  Skeleton,
  CardHeader,
} from '@mui/material';

import {
  ProductSlider,
  DiscountSlider,
  BrandsSlider,
  PackageProduct,
  WholesaleProduct,
} from "components";
import CollectionSlider from './CollectionSlider';
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
  offslider, carousel, collection, packageData, wolesaleData,
  carouselLoading, offsliderLoading, collectionLoading,
}) {

  return (
    <Card sx={{ mt: -10, borderRadius: 4 }}>
      <Stack>

        <Stack py={1} px={1}>
          <Slider />
        </Stack>

        <Stack py={2} px={1}>
          <BrandsSlider data={brands} />
        </Stack>

        <Stack direction='row' py={2} px={1} columnGap={1} >
          {wolesaleData &&
            wolesaleData.map((wholesale, i) => {
              return (
                <WholesaleProduct
                  key={i}
                  itemId={wholesale.id}
                  shop={wholesale.shop}
                  co_price={wholesale.co_price}
                  me_price={wholesale.me_price}
                  attributes={wholesale.attributes}
                  product_info={wholesale.product_info}
                  discount_percent={wholesale.discount_percent}
                  wolesale_discounts={wholesale.wolesale_discounts}
                />
              );
            })}
        </Stack>

        <Stack direction='row' py={2} px={1}>
          {packageData &&
            packageData.map((packaged, i) => {
              return (
                <PackageProduct
                  key={i}
                  itemId={packaged.id}
                  shop={packaged.shop}
                  co_price={packaged.co_price}
                  me_price={packaged.me_price}
                  attributes={packaged.attributes}
                  product_info={packaged.product_info}
                  discount_percent={packaged.discount_percent}
                />
              );
            })}
        </Stack>


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
              <DiscountSlider title="فروش ویژه" data={offslider} />
            </Stack>
          )
        )}

        {collectionLoading ? (
          <Skeleton
            variant="rounded"
            height={400}
            sx={{ borderRadius: 2, my: 2, mx: 1 }}
          />
        ) : (
          collection &&
          collection.length > 0 && (
            <Stack py={2} px={1}>
              <CollectionSlider data={collection} />
            </Stack>
          )
        )}

        {carouselLoading ? (
          <Skeleton
            variant="rounded"
            height={500}
            sx={{ borderRadius: 2, my: 2, mx: 1 }}
          />
        ) : (
          carousel &&
          carousel.map((carousel, i) => {
            if (carousel.products.length > 0) {
              return (
                <Stack py={2} px={1} key={i}>
                  <ProductSlider
                    title={carousel.root_category.title}
                    data={carousel.products}
                    banner={carousel.root_category.banners}
                  />
                </Stack>
              );
            }
          })
        )}
      </Stack>
    </Card>
  );
}