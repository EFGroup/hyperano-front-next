import { useRef } from 'react';
import { Box, Stack, Typography, Avatar } from '@mui/material';

const brands = [
  {
    title: "Brand01",
    image: "/images/brands/brand00001.jpg"
  },
  {
    title: "Brand02",
    image: "/images/brands/brand00002.png"
  },
  {
    title: "Brand03",
    image: "/images/brands/brand00003.jpg"
  },
  {
    title: "Brand04",
    image: "/images/brands/brand00004.jpg"
  },
  {
    title: "Brand05",
    image: "/images/brands/brand00005.jpg"
  },
  {
    title: "Brand06",
    image: "/images/brands/brand00006.png"
  },
  {
    title: "Brand07",
    image: "/images/brands/brand00007.png"
  },
  {
    title: "Brand08",
    image: "/images/brands/brand00008.png"
  },
  {
    title: "Brand09",
    image: "/images/brands/brand00009.png"
  },
]

export default function SliderPortfolio({data = brands}) {
  const slider = useRef(null);
  return (
          <Box ref={slider} sx={{
            py: 2,
            columnGap: 4,
            scrollPadding: 24,
            width: '100%',
            display: 'flex',
            overflowY: 'hidden',
            alignItems: 'center',
            scrollbarWidth: 'none',
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory',
            justifyContent: 'space-evenly',
            overflowX: 'scroll !important',
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          }}>
            {
              data.map( (item, i) => (
                <Stack
                  key={i}
                  alignItems="center"
                  justifyContent="center"
                  sx={{scrollSnapAlign: 'center'}}>
                  <Avatar
                    src={item.image}
                    alt={item.title}
                    sx={{
                      p: 2,
                      width: 80,
                      height: 80,
                      bgcolor: '#fff',
                      border: '2px solid',
                      borderColor: 'error.main'
                    }}/>
                  <Typography
                    mt={0.5}
                    fontSize={14}
                    borderRadius={2}
                    align="center"
                    variant="subtitle2"
                    bgcolor="#ffffff30">
                      {item.title}
                  </Typography>
                </Stack>
              ))
            }
          </Box>
  )
}