import React from "react";
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
import { orange } from "@mui/material/colors";

import { useSelector } from "react-redux";
import { currency, convertEnToFa, productImgUrl } from "helpers/persianTools";

import { AddToCartBtn, AttrinuteSelection } from "components";
// ----------------------------------------------------------------------

export default function PackageProduct({
  shop,
  itemId,
  co_price,
  me_price,
  attributes,
  product_info,
  discount_percent,
  onClick = () => {},
}) {
  const { id, title, brand, images, introtext, packaged_items } = product_info;

  const productTitle = `${title} ${brand?.title || ""}`;

  const { current } = useSelector((state) => state.cart);
  const currentIds = current.map((c) => c.id);

  const max = 3

  return (
    <Card
      elevation={6}
      sx={{
        width: 260,
        color: "warning.main",
        position: "relative",
        transition: "all 0.2s ease",
        boxShadow: "0 0px 16px -8px #eaeaea",
      }}
    >
      <CardActionArea onClick={onClick} href={`/shops/${shop?.id}/${id}`}>
        <CardHeader
          title={
            <Typography
              noWrap
              color="text.primary"
              textAlign="center"
              variant="subtitle1"
            >
              {productTitle}
            </Typography>
          }
          subheader={
            <Typography
              color="GrayText"
              textAlign="center"
              variant="body1"
              fontSize={14}
            >
              {convertEnToFa(introtext || ".")}
            </Typography>
          }
        />
        <CardMedia
          title={productTitle}
          image={productImgUrl(images)}
          sx={{
            height: 160,
            width: "96%",
            backgroundSize: "contain",
            bgcolor: "#fff",
            borderRadius: 2,
            mx: "auto",
            p: 1,
          }}
        >
          <Stack
            height="100%"
            direction="row"
            alignItems="flex-end"
            justifyContent="center"
            columnGap={1}
          >
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
                    sx={{ width: 72, height: 72, borderRadius: 3 }}
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
                        // p: 1
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
        <CardContent sx={{ pt: 2.5, p: 1 }}>
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
                color="text.disabled"
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
            <Typography color="text.primary" variant="h5" align="center">
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
        bottom={4}
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
