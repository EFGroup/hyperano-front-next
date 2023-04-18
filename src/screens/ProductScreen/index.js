import React from 'react';

import {
    Box,
    Card,
    Stack,
    Button,
    Avatar,
    Skeleton,
    CardHeader,
    Typography,
    CardContent,
    CircularProgress,
} from '@mui/material';

import { useSelector } from "react-redux";
import { AddToCartBtn, AttrinuteSelection, VerticalCard } from 'components';
import { currency, convertEnToFa, productImgUrl } from 'helpers/persianTools';

import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';

import Information from './Information';
import { ProductSlider } from 'components';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function ProductScreen({
    loading,
    similarLoading,
    similars = [],
    product = { product_info: {} },
}) {
  const { current } = useSelector( state => state.cart );
  const currentIds = current.map( c => c.id );

  const router = useRouter()

  const {
    id,
    shop,
    co_price,
    me_price,
    attributes,
    product_info,
    discount_percent,
  } = product;

  const {
    title,
    brand,
    images,
    category,
    introtext,
    packaged_items,
  } = product_info;

  const productTitle = `${title} ${convertEnToFa(introtext)} ${brand?.title || ""}`;

  return (
    <Card sx={{ mt: -10, borderRadius: 4 }}>
      <CardHeader
        title={loading ? <Skeleton variant='text' width={200} /> : productTitle}
        action={
            <Button size="small" variant="contained" onClick={() => router.back()}>
                بازگشت
            </Button>
        }
      />
      <CardContent sx={{py: 0, px: {xs: 1, sm: 1, md: 2}}}>
        <Stack direction={{xs: 'column', sm: 'column', md: 'row'}} alignItems="center">
            <Stack justifyContent="center" alignItems="center" sx={{flex: 2, width: '100%'}}>
                {
                    loading
                    ?
                    <Skeleton variant='rounded' width="100%" height={400} sx={{borderRadius: 2}} />
                    :
                    <Image
                        src={productImgUrl(images)}
                        alt={productTitle}
                        width={400}
                        height={400}
                        style={{ objectFit: 'contain'}}
                    />
                }
            </Stack>
            <Card sx={{flex: 3, width: '100%'}}>
                <CardHeader
                    title={
                        loading
                        ?
                        <Skeleton variant='text' width={300} sx={{mx: {xs: 'auto', md: 0} }} />
                        :
                        <Typography textAlign={{xs: 'center', sm: 'center', md: 'start'}} variant="h1">
                            {productTitle}
                        </Typography>
                    }
                />
                <CardContent>
                    <Stack height="100%" justifyContent="space-between">
                        <Stack width="100%" columnGap={2} rowGap={1} direction={{xs: 'column', sm: 'row'}} justifyContent="space-between" alignItems="center">
                            <Stack direction={{xs: 'row', sm: 'column'}} width="100%" bgcolor="#f9f9f999" justifyContent={{xs: 'start', sm: 'center'}} alignItems="center" flex={1} borderRadius={3} p={1} rowGap={0.5} columnGap={2}>
                                <Avatar sx={{ bgcolor: 'info.lighter', color: 'info.main' }}>
                                    <VerifiedRoundedIcon fontSize='small' />
                                </Avatar>
                                <Typography textAlign="center" variant="caption">برند</Typography>
                                <Typography justifySelf="end" textAlign="center" variant="subtitle1">{brand?.title}</Typography>
                            </Stack>
                            <Stack direction={{xs: 'row', sm: 'column'}} width="100%" bgcolor="#f9f9f999" justifyContent={{xs: 'start', sm: 'center'}} alignItems="center" flex={1} borderRadius={3} p={1} rowGap={0.5} columnGap={2}>
                                <Avatar sx={{ bgcolor: 'warning.lighter', color: 'warning.main' }}>
                                    <WidgetsRoundedIcon fontSize='small' />
                                </Avatar>
                                <Typography textAlign="center" variant="caption">دسته بندی</Typography>
                                <Typography textAlign="center" variant="subtitle1">{category?.title}</Typography>
                            </Stack>
                            <Stack direction={{xs: 'row', sm: 'column'}} width="100%" bgcolor="#f9f9f999" justifyContent={{xs: 'start', sm: 'center'}} alignItems="center" flex={1} borderRadius={3} p={1} rowGap={0.5} columnGap={2}>
                                <Avatar sx={{ bgcolor: 'error.lighter', color: 'error.main' }}>
                                    <PercentRoundedIcon fontSize='small' />
                                </Avatar>
                                <Typography textAlign="center" variant="caption">تخفیف</Typography>
                                <Typography textAlign="center" variant="subtitle1">{discount_percent}</Typography>
                            </Stack>
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" alignItems="center" py={4}>
                            <Typography variant="subtitle1">قیمت فروشگاه</Typography>
                            {
                                loading
                                ?
                                <Stack>
                                    <Skeleton variant='text' width={200} height={16} />
                                    <Skeleton variant='text' width={200} />
                                </Stack>
                                :
                                <Stack>
                                    <Typography align="left" variant="subtitle1" color="error" component="s">
                                        {currency(co_price)}
                                    </Typography>
                                    <Typography align="left" variant="h2" color="secondary">
                                        {currency(me_price)}
                                    </Typography>
                                </Stack>
                            }
                        </Stack>

                        <Stack direction="row" alignItems="center" justifyContent="center">
                        {
                            attributes && attributes.length > 0
                            ? 
                            <AttrinuteSelection
                                id={id}
                                shop={shop}
                                title={currency(me_price)}
                                attributes={attributes}
                                currentExist={currentIds.includes(id)}
                                current={current.filter( c => c.id === id )}
                            />
                            : 
                            <AddToCartBtn
                                id={id}
                                shop={shop}
                                currentExist={currentIds.includes(id)}
                                current={current.find( c => c.id === id )}
                                icon={false}
                            />
                        }
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>

        {
            packaged_items && packaged_items.length > 0 &&
            <ProductSlider
                title="محصولات این پکیج"
                data={packaged_items}
            />
        }

        {/* <Box height={300}>
            <Information />
        </Box> */}

        <Card variant="outlined" sx={{borderRadius: 3}}>
            <CardHeader
                title={
                    <Typography variant="h5" color="secondary">
                        محصولات مشابه
                    </Typography>
                }
                action={
                    <Button size="small" variant="contained" color="inherit">بیشتر</Button>
                }
            />
            <CardContent>
                <Stack
                py={2}
                columnGap={5}
                direction="row"
                alignItems="center"
                justifyContent="center"
                width="100%"
                sx={{
                    overflowY: 'hidden',
                    overflowX: 'scroll !important',
                    scrollPadding: 24,
                    scrollBehavior: 'smooth',
                    scrollSnapType: 'x mandatory',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                    display: 'none'
                    }
                }}
                >
                {
                    similarLoading
                    ?
                    <CircularProgress color='warning' />
                    :
                    similars.map( item => (
                        <VerticalCard
                            key={item.id}
                            itemId = {item.id}
                            shop = {item.shop}
                            co_price = {item.co_price}
                            me_price = {item.me_price}
                            attributes = {item.attributes}
                            product_info = {item.product_info}
                            discount_percent = {item.discount_percent}
                            />
                    ))
                }
                </Stack>
            </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}