import React from 'react';
import Link from 'next/link';

import {
  Chip,
  Card,
  Stack,
  CardMedia,
  Typography,
  CardHeader,
  CardContent,
  CardActionArea,
} from '@mui/material';
import { orange } from '@mui/material/colors';

import { useSelector  } from 'react-redux';
import { currency, convertEnToFa, productImgUrl } from 'helpers/persianTools';

import { AddToCartBtn, AttrinuteSelection } from 'components';
// ----------------------------------------------------------------------

export default function VerticalCard({
    shop,
    itemId,
    co_price,
    me_price,
    attributes,
    product_info,
    discount_percent,
    onClick = () => {}
}) {

  const {
    id,
    title,
    brand,
    images,
    introtext
  } = product_info;

  const productTitle = `${title} ${brand?.title || ""}`;

  const { current } = useSelector( state => state.cart );
  const currentIds = current.map( c => c.id );

  return (
    <Card
      elevation={6}
      sx={{
        width: 320,
        color: orange[400],
        position: 'relative',
        transition: 'all 0.2s ease',
        boxShadow: '0 0px 16px -8px #eaeaea',
        '&:hover': {
          zIndex: 1,
          transform: 'scale(1.02)',
          transition: 'all 0.3s ease',
          boxShadow: `0 8px 8px -8px #ccc`,
        }
      }}>
      <CardActionArea onClick={onClick} href={`/shops/${shop?.id}/${id}`}>        
        <CardHeader
          title={<Typography width={200} noWrap color="primary" textAlign="start" variant="subtitle1">{productTitle}</Typography>}
          subheader={<Typography color="GrayText" textAlign="start" variant="body1" fontSize={16}>{convertEnToFa(introtext || ".")}</Typography>}
          action={
            discount_percent && <Chip sx={{minWidth: 64}} color="error" label={<Typography variant="subtitle2">{convertEnToFa(discount_percent)}</Typography>} />
          }
        />
        <CardMedia
          title={productTitle}
          image={productImgUrl(images)}
          sx={{
            height: 200,
            width: '100%',
            backgroundSize: 'contain',
          }}
        />
        <CardContent sx={{py: 4}}>
          <Stack pb={5}>
            <Typography color="primary" variant="h4" align="center">
              {currency(me_price)}
            </Typography>
            <Typography color="error" variant="body2" align="center" component="s" gutterBottom>
              {currency(co_price)}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>

      <Stack direction="row" alignItems="center" justifyContent="center" position="absolute" width="100%" bottom={8} margin="auto" zIndex={2} px={2}>
        {
          attributes.length > 0
          ? 
          <AttrinuteSelection
            id={itemId}
            shop={shop}
            title={currency(me_price)}
            attributes={attributes}
            currentExist={currentIds.includes(itemId)}
            current={current.filter( c => c.id === itemId )}
          />
          : 
          <AddToCartBtn
            id={itemId}
            shop={shop}
            currentExist={currentIds.includes(itemId)}
            current={current.find( c => c.id === itemId )}
          />
        }
      </Stack>
    </Card>
  );
}