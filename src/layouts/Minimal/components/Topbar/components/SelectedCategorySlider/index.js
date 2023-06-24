import { Box, Stack, Typography, Avatar } from "@mui/material";

export default function SliderPortfolio({ data }) {
  return (
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
        columnGap: 4,
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
            bgcolor="#ffffff55"
            borderRadius={3}
            minWidth={120}
            height={140}
            padding={0.5}
          >
            <Avatar
              src={image}
              alt={title}
              sx={{
                width: 60,
                height: 60,
                // bgcolor: "#ffffff33",
                // border: "1px dashed",
                // borderColor: "text.primary",
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
    </Box>
  );
}
