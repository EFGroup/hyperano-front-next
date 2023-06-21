import { useRef } from 'react';
import { Box, Button, Divider, Typography, Card, Stack, CardContent, CardHeader, CardMedia } from '@mui/material';
import { VerticalCard }from 'components';
// import Image from 'next/image';

{/* <Button onClick={() => slider.current.scrollLeft += 300 }> {"-->"} </Button> */}
{/* <Button onClick={() => slider.current.scrollLeft -= 300 }> {"<--"} </Button> */}

export default function SliderPortfolio({title, data, banner}) {
  const slider = useRef(null);
  return (
    <Stack rowGap={1}>
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardHeader
          title={
            <Typography variant="h5" color="secondary">
              {title}
            </Typography>
          }
          action={
            <Button size="small" variant="contained" color="inherit">
              بیشتر
            </Button>
          }
        />
        <CardContent sx={{ px: 1, py: 0 }}>
          <Box
            ref={slider}
            sx={{
              display: "flex",
              overflowX: "scroll !important",
              overflowY: "hidden",
              py: 2,
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
            {data.map((item, i) => (
              <Box key={i} sx={{ scrollSnapAlign: "center" }}>
                <VerticalCard
                  itemId={item.id}
                  shop={item.shop}
                  co_price={item.co_price}
                  me_price={item.me_price}
                  attributes={item.attributes}
                  product_info={item.product_info}
                  discount_percent={item.discount_percent}
                />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
      {banner && (
        <Card>
          <CardMedia
            alt={banner.alt}
            image={`https://hyperano.ir/api/${JSON.parse(banner).images}`}
            sx={{ position: "relative", pt: "13%" }}
          >
            {/* <Image
              sizes=''
              fill
              alt={banner.alt}
              src={`https://hyperano.ir/api/${JSON.parse(banner).images}`}
              style={{objectFit: 'cover'}}
            /> */}
          </CardMedia>
        </Card>
      )}
    </Stack>
  );
}