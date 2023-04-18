import { useRef } from 'react';
import { VerticalCard }from 'components';
import { Box, Button, Typography, Card, CardContent, CardHeader } from '@mui/material';

export default function SliderPortfolio({title, data}) {
  const slider = useRef(null);
  return (
      <Card elevation={3} sx={{bgcolor: 'error.main', backgroundImage: 'url("/images/bg/bg3.png")', backgroundSize: 'cover'}}>
        <CardHeader
            title={
                <Typography variant="h3" color="#fff">
                    {title}
                </Typography>
            }
            action={
                <Button sx={{bgcolor: '#fff', color: 'error.main'}} variant='contained' color='error'>مشاهده همه</Button>
            }
        />
        <CardContent sx={{px: 1, py: 0}}>
          <Box ref={slider} sx={{
            display: 'flex',
            overflowX: 'scroll !important',
            overflowY: 'hidden',
            py: 2,
            width: '100%',
            scrollSnapType: 'x mandatory',
            scrollPadding: 24,
            scrollBehavior: 'smooth',
            columnGap: 2,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          }}>
            {
              data.map( (item, i) => (
                <Box key={i} sx={{scrollSnapAlign: 'center'}}>
                  <VerticalCard
                    itemId = {item.id}
                    shop = {item.shop}
                    co_price = {item.co_price}
                    me_price = {item.me_price}
                    attributes = {item.attributes}
                    product_info = {item.product_info}
                    discount_percent = {item.discount_percent}
                  />
                </Box>
              ))
            }
          </Box>
          </CardContent>
      </Card>
  )
}