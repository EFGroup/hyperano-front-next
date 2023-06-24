import { Box, Stack, Typography, Avatar, Card, CardActionArea, CardContent } from "@mui/material";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";

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
        columnGap: 2,
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {data.map((item, i) => {
        const { id, title, min_free_ship } = item;
        return (
          <Card
                    elevation={0}
                    sx={{ minWidth: 280, bgcolor: "#ffffff55", scrollSnapAlign: "center" }}
                    key={i}
                  >
                    <CardActionArea href={`/shops/${id}`}>
                      <CardContent sx={{ p: 1 }}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          columnGap={1}
                        >
                          <Avatar
                            sx={{
                              width: 64,
                              height: 64,
                              borderRadius: 3,
                              bgcolor: "#eee",
                            }}
                            variant="rounded"
                            src="/logo.png"
                          />
                          <Stack>
                            <Typography variant="subtitle1">
                              {title}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              fontSize={12}
                            >{`ارسال رایگان خریدهای بالای ${digitsEnToFa(
                              addCommas(Number(min_free_ship))
                            )} تومان`}</Typography>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
          // <Stack
          //   key={i}
          //   alignItems="center"
          //   justifyContent="space-evenly"
          //   sx={{ scrollSnapAlign: "center" }}
          //   bgcolor="#ffffff22"
          //   borderRadius={3}
          //   minWidth={120}
          //   height={160}
          //   padding={0.5}
          // >
          //   <Avatar
          //     src={image}
          //     alt={title}
          //     sx={{
          //       width: 80,
          //       height: 80,
          //       // bgcolor: "#ffffff33",
          //       // border: "1px dashed",
          //       // borderColor: "text.primary",
          //     }}
          //   />
          //   <Typography
          //     mt={0.5}
          //     fontSize={14}
          //     borderRadius={2}
          //     align="center"
          //     variant="subtitle2"
          //   >
          //     {title}
          //   </Typography>
          // </Stack>
        );
      })}
    </Box>
  );
}
