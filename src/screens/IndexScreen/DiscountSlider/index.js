import { useRef } from 'react';
import { VerticalCard }from 'components';
import { Box, Button, Typography, Card, Stack, CardHeader } from '@mui/material';
import Image from 'next/image';
import { CountdownTimer } from "components";

export default function SliderPortfolio({title, data}) {
  const slider = useRef(null);
  return (
    <Card
      elevation={3}
      sx={{
        bgcolor: "error.main",
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
          direction={{ xs: "row", sm: "column" }}
          minWidth={{ xs: "100%", sm: 260 }}
          justifyContent={{ xs: "space-between", sm: "space-evenly" }}
          alignItems="center"
          rowGap={3}
        >
          {/* <Stack
            flex={1}
            rowGap={2}
            justifyContent="center"
            alignItems="center"
          > */}
          <Typography color="#fff" variant="h6">
            {title}
          </Typography>
          <CountdownTimer targetDate="2023/06/30 17:34:2" color="error.dark" />
          {/* </Stack> */}
          {/* <Stack rowGap={1}>
            <Typography color="#fff" textAlign="center" variant="h1">
              فروش ویژه
            </Typography>
            <Typography
              color="error.darker"
              textAlign="center"
              variant="subtitle2"
              fontSize={18}
            >
              محصولات با بیشترین تخفیف
            </Typography>
          </Stack> */}
          <Box
            display={{ xs: "none", sm: "flex" }}
            width={{ xs: 64, sm: 240 }}
            height={{ xs: 64, sm: 120 }}
            position="relative"
          >
            <Image
              src="/images/best.webp"
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>
        </Stack>
        <Box
          ref={slider}
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
          <Stack
            sx={{ scrollSnapAlign: "center" }}
            minWidth={260}
            justifyContent="center"
            alignItems="center"
            rowGap={3}
          >
            <Button
              sx={{ bgcolor: "#fff", color: "error.main" }}
              variant="contained"
              color="error"
              size="large"
            >
              مشاهده همه
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}