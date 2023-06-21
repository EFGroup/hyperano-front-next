import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  Chip,
  Card,
  Stack,
  CardMedia,
  Typography,
  CardHeader,
  CardContent,
  CardActionArea,
} from "@mui/material";
import Zoom from "@mui/material/Zoom";

import { useSelector } from "react-redux";
import { currency, convertEnToFa, productImgUrl } from "helpers/persianTools";

import { AddToCartBtn, AttrinuteSelection } from "components";
import { digitsEnToFa } from "@persian-tools/persian-tools";
// ----------------------------------------------------------------------

export default function PackageProduct({
  shop,
  itemId,
  co_price,
  me_price,
  attributes,
  product_info,
  discount_percent,
  wolesale_discounts,
  onClick = () => {},
}) {
  const {
    id,
    title,
    brand,
    images,
    introtext,
    packaged_items,
  } = product_info;

  const productTitle = `${title} ${brand?.title || ""}`;

  const { current } = useSelector((state) => state.cart);
  const currentIds = current.map((c) => c.id);

  const max = 3;
  
  const suggests = wolesale_discounts.sort((a, b) => a.quantity - b.quantity);
  const quantity = current.find((c) => c.id === itemId)?.number || 0;
  const suggest = suggests.find((item) => item.quantity > quantity) || suggests.findLast((item) => item.quantity > 0);

  const [flag, setFlag] = useState(false)
  useEffect( ()=> {
    setFlag(true)
    setTimeout( ()=>{
      setFlag(false)
    }, 700)
  }, [suggest])

  return (
    <Card
      elevation={6}
      sx={{
        width: 240,
        bgcolor: "warning.main",
        position: "relative",
        transition: "all 0.2s ease",
        boxShadow: "0 0px 16px -8px #eaeaea",
        "&:hover": {
          transition: "all 0.5s ease",
          boxShadow: `0 8px 8px -8px #ccc`,
        },
      }}
    >
      <CardActionArea onClick={onClick} href={`/shops/${shop?.id}/${id}`}>
        <CardHeader
          sx={{ p: 0.5 }}
          title={
            <Typography
              width={200}
              noWrap
              color="error.darker"
              textAlign="start"
              variant="subtitle1"
            >
              {productTitle}
            </Typography>
          }
          subheader={
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography textAlign="start" variant="body1" fontSize={16}>
                {convertEnToFa(introtext || ".")}
              </Typography>
              {/* {discount_percent && (
                <Chip
                  sx={{ minWidth: 40 }}
                  color="error"
                  size="small"
                  label={
                    <Typography fontSize={14} variant="subtitle1">
                      {convertEnToFa(discount_percent)}
                      <Typography
                        mx={0.5}
                        fontSize={8}
                        variant="subtitle1"
                        component="span"
                      >
                        تخفیف
                      </Typography>
                    </Typography>
                  }
                />
              )} */}
            </Stack>
          }
          // action={
          //   discount_percent && (
          //     <Chip
          //       sx={{ minWidth: 64 }}
          //       color="error"
          //       label={
          //         <Typography variant="subtitle2">
          //           {convertEnToFa(discount_percent)}
          //         </Typography>
          //       }
          //     />
          //   )
          // }
        />
        <CardMedia
          title={productTitle}
          image={productImgUrl(images)}
          sx={{
            height: 180,
            width: "96%",
            backgroundSize: "contain",
            bgcolor: "#fff",
            borderRadius: 2,
            mx: "auto",
            p: 1
          }}
        >
          <Stack
            height="100%"
            direction="row"
            alignItems="flex-start"
            justifyContent="center"
            columnGap={1}
          >
            {/* <Zoom in={!flag}> */}
            <Typography
              bgcolor="info.main"
              color="#fff"
              px={1}
              py={0.5}
              borderRadius={2}
              textAlign="center"
              fontSize={12}
              variant="subtitle1"
              sx={{
                animation: "ripple 0.7s infinite ease-in-out",
                animationPlayState: flag ? "running" : "paused",
                "@keyframes ripple": {
                  "0%": {
                    transform: "scale(.8)",
                    opacity: 1,
                  },
                  "50%": {
                    transform: "scale(1.1)",
                    opacity: 0.95,
                  },
                  "100%": {
                    transform: "scale(.8)",
                    opacity: 1,
                  },
                },
              }}
            >
              {`${digitsEnToFa(
                Number(suggest?.discount_amount)
              )} تومان تخفیف بیشتر با خرید ${digitsEnToFa(
                suggest?.quantity || ""
              )} عدد`}
            </Typography>
            {/* </Zoom> */}
            {packaged_items.length > 0 &&
              packaged_items.slice(0, max).map((product, i) => {
                const {
                  product_shop: {
                    product_info: { title, images, introtext, brand },
                  },
                } = product;
                const productTitle = `${title} ${convertEnToFa(introtext)} ${
                  brand?.title || ""
                }`;

                return (
                  <Card
                    elevation={1}
                    key={i}
                    sx={{ width: 64, height: 64, borderRadius: 3 }}
                  >
                    <CardMedia
                      component="img"
                      loading="lazy"
                      src={productImgUrl(images)}
                      title={productTitle}
                      sx={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Card>
                );
              })}
            {packaged_items.length - max > 0 && (
              <Card
                elevation={1}
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography fontSize={20} variant="subtitle1">
                  {convertEnToFa(packaged_items.length - max)} +
                </Typography>
              </Card>
            )}
          </Stack>
        </CardMedia>
        <CardContent sx={{ pt: 2.5 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            pb={4}
          >
            <Stack>
              {discount_percent && (
                <Chip
                  sx={{ minWidth: 40 }}
                  color="error"
                  size="small"
                  label={
                    <Typography fontSize={14} variant="subtitle1">
                      {convertEnToFa(discount_percent)}
                      <Typography
                        mx={0.5}
                        fontSize={8}
                        variant="subtitle1"
                        component="span"
                      >
                        تخفیف
                      </Typography>
                    </Typography>
                  }
                />
              )}
              <Typography
                color="error.main"
                variant="subtitle2"
                align="center"
                component="s"
              >
                {currency(co_price)}
                {/* <Typography
                  mx={0.5}
                  fontSize={10}
                  variant="subtitle2"
                  component="span"
                >
                  ت
                </Typography> */}
              </Typography>
            </Stack>
            <Typography color="primary" variant="h3" align="center">
              {currency(me_price)}
              <Typography
                mx={0.5}
                fontSize={12}
                variant="subtitle1"
                component="span"
              >
                تومان
              </Typography>
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        width="100%"
        bottom={8}
        margin="auto"
        zIndex={2}
        px={2}
      >
        {attributes.length > 0 ? (
          <AttrinuteSelection
            id={itemId}
            shop={shop}
            title={currency(me_price)}
            attributes={attributes}
            currentExist={currentIds.includes(itemId)}
            current={current.filter((c) => c.id === itemId)}
          />
        ) : (
          <AddToCartBtn
            id={itemId}
            shop={shop}
            currentExist={currentIds.includes(itemId)}
            current={current.find((c) => c.id === itemId)}
          />
        )}
      </Stack>
    </Card>
  );
}
