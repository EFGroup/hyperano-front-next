import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Typography, Card, Stack, Button, CardMedia } from '@mui/material';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import { convertEnToFa, productImgUrl } from 'helpers/persianTools';
import Link from 'next/link';

const CollectionSlider = ({ data = [] }) => {
  return (
    <Card
        sx={{
            backgroundImage: `url('/assets/svg/discount.svg')`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }}
        elevation={2}>
        <Carousel
            duration={700}
            interval={2500}
            indicators={false}
            PrevIcon={<NavigateBeforeRoundedIcon/>}
            NextIcon={<NavigateNextRoundedIcon/>}
            >
            {data.map((item, index) => (
                <Slides key={index} item={item}/>
            ))}
        </Carousel>
    </Card>
  );
};

function Slides({ item }) {
  const { id, title, items } = item;
  const max = 3;
  return (
    <div>
      <Stack
        alignItems="center"
        flex={1}
        width="100%"
        py={3}
        px={{ xs: 1, sm: 3, md: 6 }}
        direction={{ xs: "column", sm: "column", md: "row" }}
        rowGap={2}
        sx={{ position: "relative" }}
      >
        <Stack flex={1} rowGap={2} alignItems="center">
          <Typography
            noWrap
            sx={{
              color: "#ffffff",
              top: -20,
              left: 0,
              opacity: 0.2,
              position: "absolute",
            }}
            variant="subtitle1"
            fontSize={120}
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
        <Stack
          flex={1}
          rowGap={3}
          alignItems="center"
          justifyContent="space-around"
        >
          {/* <AvatarGroup sx={{
                '& .MuiAvatarGroup-avatar': {
                    border: '1px solid #f1f1f1',
                    width: 120,
                    height: 120
                }
            }} total={5} max={3}>
            {
                [0,1,2,3,4,5].map( (product, p) => {
                    return <Avatar key={p}
                        alt="alt" src="/logo.png" />
                })
            }
            </AvatarGroup> */}
          <Stack
            direction="row"
            flexWrap="wrap"
            columnGap={1}
            rowGap={1}
            justifyContent="space-evenly"
            alignItems="center"
          >
            {items.slice(0, max).map((product, p) => {
              const {
                product_shop: {
                  product_info: { title, images, introtext, brand },
                },
              } = product;
              const productTitle = `${title} ${convertEnToFa(introtext)} ${
                brand?.title || ""
              }`;

              return (
                <Card key={p} sx={{ width: 108, height: 120, borderRadius: 3 }}>
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
            {items.length !== max && (
              <Card
                sx={{
                  width: 108,
                  height: 120,
                  borderRadius: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography color="GrayText" fontSize={20} variant="subtitle1">
                  {convertEnToFa(items.length - 2)} +
                </Typography>
              </Card>
            )}
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}

export default CollectionSlider;
