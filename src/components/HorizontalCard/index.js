import React from 'react';

import {
    Chip,
    Card,
    Stack,
    Badge,
    styled,
    Button,
    Avatar,
    Divider,
    Collapse,
    IconButton,
    Typography,
    CardContent,
} from '@mui/material';

import { red, orange, green } from '@mui/material/colors';

import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import ContactSupportRoundedIcon from '@mui/icons-material/ContactSupportRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: red[500],
    color: red[500],
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton color="error" size="small" {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'scale(1)' : 'scale(1.5)',
  marginLeft: 'auto',
  backgroundColor: "whitesmoke",
  color: !expand ? 'GrayText' : 'error',
  transition: theme.transitions.create('all', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function HorizontalCard({ item, updateItem, cartId }) {
  const [expanded, setExpanded] = React.useState(false);

  const img = item.product_shop.product_info.images !== null
            ? `https://hyperano.ir/api/uploads/images/products/${JSON.parse(item.product_shop.product_info.images).medium[0]}`
            : "/logo.svg"

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card elevation={2}>
      <CardContent style={{ padding: 8 }}>
        {
            item.messages && item.messages.map( (message, i) =>
                <Chip
                    key={i}
                    color="error"
                    sx={{
                        mt: 0.5,
                        mb: 0.5,
                        width: '100%',
                        justifyContent: 'space-between',
                        bgcolor: red[50],
                        color: red[600]
                    }}
                    icon={<ErrorOutlineRoundedIcon />}
                    label={
                        <Typography fontWeight="bold" variant="body2" align="center">
                            {message.split('@')[0]}
                        </Typography>
                    }
                />
            )
        }
        <Stack direction="row" columnGap={1} >
            <Stack sx={{ flex: 2 }} rowGap={1}>
                <Stack alignItems="stretch">
                    <Typography variant="subtitle1">{item.product_shop.product_info.title}</Typography>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" columnGap={1}>
                        <Typography fontSize={10} variant="body2">
                            قیمت فروشگاه :
                        </Typography>
                        <Typography fontSize={10} align="right" variant="subtitle2">
                            {digitsEnToFa(addCommas(Number(item.me_price)))} تومان
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" columnGap={1}>
                        <Typography fontSize={10} variant="body2">
                            قیمت مصرف کننده :
                        </Typography>
                        <Typography fontSize={10} align="right" variant="subtitle2">
                            {digitsEnToFa(addCommas(Number(item.co_price)))} تومان
                        </Typography>
                    </Stack>
                    {
                        item.attribute_values.map( attr => (
                            <Stack key={attr.id} direction="row" alignItems="center" justifyContent="space-between" columnGap={1}>
                                <Typography fontSize={10} variant="body2">
                                    {`${attr.attribute?.title} - ${attr.title} :`}
                                </Typography>
                                <Typography fontSize={10} align="right" variant="subtitle2">
                                    {`${digitsEnToFa(addCommas(attr.price_change_value))} تومان`}
                                </Typography>
                            </Stack>
                        ))
                    }
                    <Divider sx={{m:1}}/>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" columnGap={1}>
                        <Typography align="right" variant="subtitle2">
                            تخفیف
                        </Typography>
                        <Chip
                            size="small"
                            sx={{width: 112, bgcolor: orange[50], color: orange[800] }}
                            label={
                                <Typography fontWeight="bold" variant="body2">
                                    {`${digitsEnToFa(addCommas(Number(item.discount_amount)))} تومان`}
                                </Typography>
                            }
                        />
                    </Stack>
                    <Stack mt={0.5} direction="row" alignItems="center" justifyContent="space-between" columnGap={1}>
                        <Typography align="right" variant="subtitle2">
                            جمع کل
                        </Typography>
                        <Chip
                            size="small"
                            sx={{width: 112, bgcolor: green[50], color: green[800] }}
                            label={
                                <Typography fontWeight="bold" variant="body2">
                                    {`${digitsEnToFa(addCommas(Number(item.total_price)))} تومان`}
                                </Typography>
                            }
                        />
                    </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="center">
                    <Button size="small" color="secondary"
                    onClick={()=>updateItem(
                        item.product_shop.id,
                        Number(item.number)+1,
                        cartId,
                        item.id,
                        item.attribute_values
                    )} variant="outlined" sx={{ml: -2, px: 2}}>
                        <AddCircleOutlineRoundedIcon fontSize="small" />
                    </Button>
                    <Stack justifyContent="center" alignItems="center" bgcolor="warning.main" color="#5a5a5a" sx={{alignSelf: 'center', zIndex: 2, width: 48, height: 48, borderRadius: '50%'}}>
                        <Typography variant="subtitle1" fontSize={14}>{digitsEnToFa(item.number)}</Typography>
                    <Typography variant="caption">عدد</Typography>
                    </Stack>
                    {
                        item.number < 2
                        ?
                        <Button size="small" color="error"
                        onClick={
                        ()=>updateItem(
                            item.product_shop.id,
                            0,
                            cartId,
                            item.id,
                            item.attribute_values
                        )}
                        variant="outlined" sx={{mr: -2, px: 2}}>
                            <DeleteOutlineRoundedIcon fontSize="small"/>
                        </Button>
                        :
                        <Button size="small" color="info"
                        onClick={
                        ()=>updateItem(
                            item.product_shop.id,
                            Number(item.number)-1,
                            cartId,
                            item.id,
                            item.attribute_values
                        )} variant="outlined" sx={{mr: -2, px: 2}}>
                            <RemoveCircleOutlineRoundedIcon fontSize="small"/>
                        </Button>
                    }
                </Stack>
            </Stack>
            <Stack
                flex={1}
                bgcolor="#fff"
                borderRadius={2}
                alignItems="center"
                justifyContent={item.messages ? "space-between" : "center"}
            >
                <Avatar
                    sx={{
                        width: 100,
                        height: 100,
                        objectFit: 'contain',
                    }}
                    variant="rounded" aria-label="recipe" src={img}
                />
                {
                    item.messages &&
                    <StyledBadge
                        variant="dot"
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    >
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ContactSupportRoundedIcon />
                        </ExpandMore>
                    </StyledBadge>
                }
            </Stack>
        </Stack>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        {
            item.previous_number &&
                <Typography>
                    {`تعداد قبلی: ${item.previous_number}`}
                </Typography>
        }
        {
            item.previous_me_price &&
                <Typography>
                    {`قیمت قبلی: ${item.previous_me_price}`}
                </Typography>
        }
        </CardContent>
      </Collapse>
    </Card>
  );
}
