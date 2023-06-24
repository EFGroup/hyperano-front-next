import { useRef } from 'react';
import { VerticalCard }from 'components';
import { Box, Button, Typography, Card, Stack, CardHeader, Avatar } from '@mui/material';
import Image from 'next/image';
import { CountdownTimer } from "components";

export default function SliderPortfolio({title, data}) {
  const slider = useRef(null);
  return (
    <Card
      elevation={3}
      sx={{
        // bgcolor: "error.main",
        backgroundImage: 'url("/images/bg/discount.svg")',
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

          <Typography textAlign="center" variant="h2" color="success.dark">
                  ماه میهمانی
                </Typography>
                <Typography textAlign="center" variant="subtitle2">
                  سبد کاملی از تخفیف و تنوع
                </Typography>
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
          {data.map((item, i) => {
        const { title, image } = item;
        return (
          <Stack
            key={i}
            alignItems="center"
            justifyContent="space-evenly"
            sx={{ scrollSnapAlign: "center" }}
            bgcolor="#eeeeee55"
            borderRadius={3}
            minWidth={120}
            height={160}
            padding={0.5}
          >
            <Avatar
              src={image}
              alt={title}
              sx={{
                width: 80,
                height: 80,
                bgcolor: "#ffffff99",
                border: "1px dashed",
                borderColor: "text.secondary",
              }}
            />
            <Typography
              mt={0.5}
              fontSize={14}
              borderRadius={2}
              align="center"
              variant="subtitle2"
            >
              {title}
            </Typography>
          </Stack>
        );
      })}
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