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
            bgcolor="#eee"
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
                bgcolor: "#fff",
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
              bgcolor="#ffffff30"
            >
              {title}
            </Typography>
          </Stack>
        );
      })}
    </Box>
  );
}
