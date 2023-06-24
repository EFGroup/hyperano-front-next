import { Box, Stack, Typography, Avatar } from "@mui/material";

export default function SliderPortfolio({ data }) {
  return (
    <Box
      sx={{
        py: 2,
        columnGap: 4,
        scrollPadding: 24,
        width: "100%",
        display: "flex",
        overflowY: "hidden",
        alignItems: "center",
        scrollbarWidth: "none",
        scrollBehavior: "smooth",
        scrollSnapType: "x mandatory",
        justifyContent: "space-evenly",
        overflowX: "scroll !important",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {data.map((item, i) => (
        <Stack
          key={i}
          alignItems="center"
          justifyContent="center"
          sx={{ scrollSnapAlign: "center" }}
        >
          <Avatar
            src={item.image}
            alt={item.title}
            sx={{
              p: 2,
              width: 80,
              height: 80,
              bgcolor: "#fff",
              border: "2px solid",
              borderColor: "error.main",
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
            {item.title}
          </Typography>
        </Stack>
      ))}
    </Box>
  );
}
