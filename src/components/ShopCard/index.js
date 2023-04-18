import React from 'react';

import {
  Card,
  Stack,
  Avatar,
  Button,
  Typography,
  CardHeader,
  CardContent,
  CardActionArea,
} from '@mui/material';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';

import { convertEnToFa, currency } from 'helpers/persianTools';

const sx = {
    whatsapp: {
    background: 'linear-gradient(45deg, #0fe459 30%, #21f3ad 90%)',
    borderRadius: '25px !important',
    boxShadow: '0 3px 5px 2px rgba(30, 255, 0, .3)',
    color: 'white !important',
    height: 64,
    width: 64,
    borderRadius: 3
  },
  instagram: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: '25px !important',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white !important',
    height: 64,
    width: 64,
    borderRadius: 3
  },
  telegram: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'screen',
    borderRadius: '25px !important',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white !important',
    height: 64,
    width: 64,
    borderRadius: 3
  },
}

export default function OrderScreen({
  data : {
    id,
    lat,
    lng,
    title,
    is_active,
    support_info,
    min_free_ship,
    products_count,
    min_order_cost,
    avg_scores_shop,
    type : { title: typeTitle },
    status : { title: statueTitle },
  }
}) {
  
  const addr = JSON.parse(support_info || "");

  return (
    <Card elevation={2} sx={{ width: '100%' }}>
      <CardActionArea href={`/shops/${id}`}>
      <CardHeader
        title={
          <>
            <Typography variant="subtitle1">{title}</Typography>
          </>
        }
        subheader={
          <>
            <Typography fontSize={12} variant="body2">
              {statueTitle}
            </Typography>
          </>
        }
        avatar={
          <Avatar sx={{bgcolor: 'primary.lighter'}}>
            <StoreRoundedIcon fontSize='small' color='primary' />
          </Avatar>
        }
        action={
          <Stack columnGap={1} direction="row" justifyContent="center" alignItems="center" bgcolor='warning.lighter' color='warning.dark' py={0.5} px={1} borderRadius={2}>
            <Typography variant="subtitle1" fontSize={14} mt={0.5} >{convertEnToFa(addr.tellphone)}</Typography>
            <SupportAgentRoundedIcon fontSize='small' />
          </Stack>
        }
      />
      <CardContent sx={{p: 2}}>
      <Stack direction={{xs: "column", md: "row"}} columnGap={4} rowGap={2}>
        <Stack flex={1} rowGap={2} minWidth={280} >
          <Stack direction="row" justifyContent="space-between" rowGap={1}>
            <Typography variant='subtitle1'>نوع فروشگاه</Typography>
            <Typography variant="body2" textAlign="end" >{typeTitle}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" rowGap={1}>
            <Typography variant='subtitle1'>تعداد محصولات</Typography>
            <Typography variant="body2" textAlign="end" >{convertEnToFa(products_count)}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" rowGap={1}>
            <Typography variant='subtitle1'>حداقل مقدار خرید از این فروشگاه</Typography>
            <Typography variant="body2" textAlign="end" >{currency(min_order_cost)}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" rowGap={1}>
            <Typography variant='subtitle1'>حداقل خرید برای پیک رایگان</Typography>
            <Typography variant="body2" textAlign="end" >{currency(min_free_ship)}</Typography>
          </Stack>
        </Stack>
        <Stack flex={2} rowGap={1}>
          <Typography variant='subtitle1'>مشخصات فروشگاه:</Typography>
          <Stack direction="row" columnGap={1} justifyContent="space-between" alignItems="center">
            <Stack rowGap={1}>
              <Typography variant="body1">
                {addr.address || ""}
              </Typography>
              <Typography variant="body1">
                {addr.conditions}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack justifyContent="center" direction="row" columnGap={2}>
            <Button
              target="_blank"
              href={`https://www.instagram.com/${addr.social_ids?.instagram || "hyperano"}`}
              sx={sx.instagram}
              >
              <InstagramIcon fontSize="large" />
            </Button>
            <Button
              target="_blank"
              href={`https://www.telegram.me/${addr.social_ids?.telegram || "hyperano"}`}
              sx={sx.telegram}
              >
              <TelegramIcon fontSize="large" />
            </Button>
            <Button
              target="_blank"
              href={`https://www.whatsapp.com/${addr.social_ids?.whatsapp || "hyperano"}`}
              sx={sx.whatsapp}
              >
              <WhatsAppIcon fontSize="large" />
            </Button>
          </Stack>
      </Stack>
      </CardContent>
      </CardActionArea>
    </Card>
  );
}
