import React from "react";

import {
  Card,
  Stack,
  Skeleton,
  CardHeader,
  Typography,
  Button,
  CardContent,
  Box,
  Grid,
  CardMedia,
} from "@mui/material";

import {
  ProductSlider,
  DiscountSlider,
  BrandsSlider,
  PackageProduct,
  WholesaleProduct,
} from "components";
import CollectionSlider from "./CollectionSlider";
import Slider from "./Slider";
import BrandSlider from "./BrandSlider";
import SelectedCategorySlider from "./SelectedCategorySlider";
import Image from "next/image";
import Link from "next/link";

const brands = [
  {
    title: "برند",
    image: "/images/brands/brand00001.png",
  },
  {
    title: "برند",
    image: "/images/brands/brand00002.png",
  },
  {
    title: "برند",
    image: "/images/brands/brand00003.png",
  },
  {
    title: "برند",
    image: "/images/brands/brand00004.png",
  },
  {
    title: "برند",
    image: "/images/brands/brand00005.png",
  },
  {
    title: "برند",
    image: "/images/brands/brand00006.png",
  },
  {
    title: "برند",
    image: "/images/brands/brand00007.png",
  },
  {
    title: "برند",
    image: "/images/brands/brand00008.png",
  },
  {
    title: "برند",
    image: "/images/brands/brand00009.png",
  },
  {
    title: "برند",
    image: "/images/brands/brand00010.png",
  },
  {
    title: "برند",
    image: "/images/brands/brand00011.png",
  },
  {
    title: "برند",
    image: "/images/brands/brand00012.png",
  },
];

export default function ShopScreen({
  offslider,
  carousel,
  collection,
  packageData,
  wolesaleData,
  carouselLoading,
  offsliderLoading,
  collectionLoading,
  menus,
  primarySelectedCategories,
  secondarySelectedCategories,
}) {

  return (
    <Card sx={{ mt: -10, borderRadius: 4 }}>
      <Stack rowGap={1}>
        <Stack py={1} px={1}>
          <Slider />
        </Stack>

        <Stack py={2} px={1} rowGap={1}>
          <Typography color="text.primary" textAlign="center" variant="h4">
            دسته بندی های منتخب
          </Typography>
          <SelectedCategorySlider data={primarySelectedCategories} />
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

        <Stack py={2} px={1} rowGap={2}>
          <Typography color="text.primary" textAlign="center" variant="h4">
            پیشنهاد هاپرانو
          </Typography>
          <Grid container spacing={4}>
            {secondarySelectedCategories &&
              secondarySelectedCategories.slice(0, 6).map((item, i) => {
                const { id, title, images } = item;
                const image = images && JSON.parse(images).medium[0];
                return (
                  <Grid key={id} item xs={6} sm={6} lg={4}>
                    <Card
                      sx={{
                        backgroundImage: `url('/images/banners/B0${
                          i + 1
                        }.jpg')`,
                        // backgroundImage: `url('https://hyperano.ir/api/uploads/images/products/${image}')`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    >
                      <Stack
                        height={{xs: 80, sm: 120, lg: 240}}
                        flex={1}
                        rowGap={2}
                        alignItems="center"
                        justifyContent="center"
                      >
                        {/* <Typography
                        noWrap
                        variant="subtitle1"
                        // fontSize={64}
                        textAlign="center"
                      >
                        {title}
                      </Typography> */}
                      </Stack>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Stack>

        <Stack py={2} px={1} rowGap={1}>
          <Typography color="text.primary" textAlign="center" variant="h4">
            پرداخت کمتر؛ خرید بیشتر
          </Typography>
          <Card
            elevation={0}
            sx={{
              bgcolor: "#eee",
              // backgroundImage: 'url("/images/bg/bg3.png")',
              backgroundSize: "cover",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              py={2}
              px={2}
              columnGap={2}
              rowGap={2}
            >
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
          </Card>
        </Stack>

        <Stack py={2} px={1} rowGap={1}>
          <Typography color="text.primary" textAlign="center" variant="h4">
            برندهای محبوب
          </Typography>
          <BrandSlider data={brands} />
        </Stack>

        <Stack py={2} px={1}>
          <Card
            elevation={3}
            sx={{
              bgcolor: "warning.main",
              backgroundImage: 'url("/images/bg/bg3.png")',
              backgroundSize: "cover",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              py={2}
              px={2}
              columnGap={2}
              rowGap={2}
            >
              <Stack
                direction={{ xs: "row-reverse", sm: "column" }}
                minWidth={{ xs: "100%", sm: 260 }}
                justifyContent="center"
                alignItems="center"
                rowGap={3}
              >
                <Stack rowGap={1}>
                  <Typography
                    color="error.darker"
                    textAlign="center"
                    variant="h5"
                  >
                    خرید بیشتر؛ تخفیف بیشتر
                  </Typography>
                  <Typography
                    color="text.secondary"
                    textAlign="center"
                    variant="subtitle2"
                    fontSize={14}
                  >
                    با خرید عمده از تخفیفات بیشتر برخوردار شوید
                  </Typography>
                </Stack>
                <Box
                  display={{ xs: "none", sm: "flex" }}
                  width={{ xs: 64, sm: 240 }}
                  height={{ xs: 64, sm: 240 }}
                  position="relative"
                >
                  <Image
                    src="/images/fighter.webp"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </Box>
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  overflowX: "scroll !important",
                  overflowY: "hidden",
                  py: 0,
                  borderRadius: 2,
                  width: "100%",
                  scrollSnapType: "x mandatory",
                  scrollPadding: 24,
                  scrollBehavior: "smooth",
                  columnGap: 2,
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {wolesaleData &&
                  wolesaleData.map((wholesale, i) => {
                    return (
                      <Box key={i} sx={{ scrollSnapAlign: "center" }}>
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
                      </Box>
                    );
                  })}
                <Stack
                  sx={{ scrollSnapAlign: "center" }}
                  minWidth={260}
                  justifyContent="center"
                  alignItems="center"
                  rowGap={3}
                >
                  <Button color="error" size="large" variant="contained">
                    مشاهده همه
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Card>
        </Stack>

        <Stack py={2} px={1} rowGap={1}>
          {collectionLoading ? (
            <Skeleton
              variant="rounded"
              height={400}
              sx={{ borderRadius: 2, my: 2, mx: 1 }}
            />
          ) : (
            collection &&
            collection.length > 0 && (
              <Grid container spacing={4}>
                {collection.map((item) => {
                  const { id, title, items } = item;
                  return (
                    <Grid key={id} item xs={12} sm={6}>
                      <Card
                        sx={{
                          backgroundImage: `url('/assets/svg/discount.svg')`,
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                        }}
                      >
                        <Stack
                          height={160}
                          flex={1}
                          rowGap={2}
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Typography
                            noWrap
                            sx={{
                              color: "#ffffff",
                              top: 40,
                              left: 0,
                              right: 0,
                              opacity: 0.2,
                              position: "absolute",
                            }}
                            variant="subtitle1"
                            fontSize={64}
                            textAlign="center"
                          >
                            {title}
                          </Typography>
                          <Typography
                            fontSize={{ xs: 20, sm: 24, md: 30 }}
                            sx={{ textShadow: "0 3px 3px #00000030" }}
                            color="#fff"
                            variant="subtitle1"
                            fontWeight="bold"
                          >
                            {title}
                          </Typography>
                          <Button
                            LinkComponent={Link}
                            href={`/search?category_collected_id=${id}`}
                            variant="contained"
                            sx={{
                              maxHeight: 48,
                              fontWeight: "bold",
                              borderRadius: 2,
                              flex: 1,
                            }}
                          >
                            مشاهده مجموعه
                          </Button>
                        </Stack>
                      </Card>
                    </Grid>
                  );
                })}
                {/* <CollectionSlider data={collection} /> */}
              </Grid>
            )
          )}
        </Stack>

        {/* {carouselLoading ? (
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
        )} */}
      </Stack>
    </Card>
  );
}
