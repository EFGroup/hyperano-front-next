import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import {
  Input,
  Stack,
  Button,
  Dialog,
  Skeleton,
  Typography,
  IconButton,
  DialogContent,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchRounded from '@mui/icons-material/SearchRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import { VerticalCard } from 'components';

import { useLazyQuery } from '@apollo/client';
import { productCategory, productShop } from "apollo/requests";

export default function SearchDialog(props) {
  const { sx, size, color, isLanding = false } = props;
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setTitle(e.target.value)
  }

  const [searchInProducts, { data: productsData, loading: productLoading }] = useLazyQuery(productShop.list);
  const [searchInCategories, { data: categoriesData, loading: categoriesLoading }] = useLazyQuery(productCategory.get);

  let products = productsData && productsData?.productShop?.products?.data;
  let categories = categoriesData && categoriesData?.productCategory;

  const inputElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: inputElement } = inputElementRef;
      if (inputElement !== null) {
        inputElement.focus();
      }
    }
  }, [open]);

  useEffect( ()=>{
    let search = setTimeout(() => {
        if(open && title){
          searchInProducts({
            variables: {
              title,
              limit: 12
            }
          })
          searchInCategories({
            variables: {
              title,
              limit: 12
            }
          })
        }
      }, 1000);
    return () => clearTimeout(search);
  }, [title]);

  return (
    <>
    {
      isMobile && !isLanding
      ?
        <IconButton
          onClick={handleClickOpen}
          sx={{ bgcolor: '#f5f5f5', ...sx }}
          size={size || "small"} color={color || "default"}>
          <SearchRounded fontSize='20' />
        </IconButton>
      :
        <Stack
          width={{
            xs: '85%',
            sm: '70%',
            md: 600
          }}
          sx={{
            fontSize: 30,
            transition: 'all 0.5s ease',
            '&:hover': {
              transform: 'scale(1.02)',
              transition: 'all 0.3s ease'
            }
          }}>
          <Button
            fullWidth
            size="medium"
            color="inherit"
            onClick={handleClickOpen}
            sx={{color: "text.secondary", bgcolor: "#f1f1f188", ...sx}}>
            جستجو
          </Button>
        </Stack>
    }
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        maxWidth="sm"
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent
          sx={{
            px: { xs: 2, sm: 4, md: 6},
            py: { xs: 4, sm: 6, md: 10 },
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
            display: 'flex',
            direction: 'rtl',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            backgroundColor: 'hsla(0,0%,100%,.95)',
          }}>
          <IconButton style={{ alignSelf: 'flex-end' }} onClick={handleClose}>
            <CancelRoundedIcon />
          </IconButton>
          <Typography color="GrayText" variant="caption">جستجو در فروشگاه</Typography>
          <Input
            sx={{
              flexGrow: 1,
              color: '#414b56',
              fontSize: '60px',
              lineHeight: '68px',
            }}
            fullWidth
            value={title}
            placeholder="جستجو"
            ref={inputElementRef}
            onChange={handleChange}
          />
          {
            categoriesLoading
            ?
              <Stack direction="row" pt={2} pb={1} alignItems="center" columnGap={1}>
              {[0,1,2,3,4,5].map( item => (
                <Skeleton key={item} animation="wave" variant="rounded" sx={{ width: 90, height: 42, borderRadius: 2 }} />
              ))}
              </Stack>
            : categories && categories.length > 0 &&
            <Stack direction="row" pt={2} pb={1} alignItems="center" columnGap={1}>
              {
                categories.map( cat => (
                  <Button
                    key={cat.id}
                    variant="contained"
                    sx={{borderRadius: 2}}
                    href={`/search?category=${cat?.parent_id}&subcategory=${cat?.id}`}
                    onClick={handleClose}
                  >
                  {cat.title}
                  </Button>
                ))
              }
            </Stack>
          }
          {
            productLoading
            ?
            <Stack direction="row" justifyContent="space-evenly" flexWrap="wrap" minHeight={400} width="100%" rowGap={2} columnGap={2} py={2} >
              {[0,1,2,3,4,5,6,7,8,9,10,11].map( item => (
                <Skeleton key={item} animation="wave" variant="rectangular" sx={{ width: 320, height: 485, borderRadius: 3 }} />
              ))}
            </Stack>
            :
              <>
              {
                products && products.length > 0
                ? 
                  <Stack direction="row" justifyContent="space-evenly" flexWrap="wrap" minHeight={400} width="100%" rowGap={2} columnGap={2} py={2} >
                  {products.map( item => (
                    <VerticalCard
                      key={item?.id}
                      itemId = {item?.id}
                      shop = {item?.shop}
                      co_price = {item?.co_price}
                      me_price = {item?.me_price}
                      attributes = {item?.attributes}
                      product_info = {item?.product_info}
                      discount_percent = {item?.discount_percent}
                      onClick={handleClose}
                    />
                  ))}
                  </Stack>
                :
                  <Stack justifyContent="center" alignItems="center" minHeight={400} width="100%" >
                    <Typography color="GrayText">موردی یافت نشد.</Typography>
                  </Stack>
              }
              </>
          }
        </DialogContent>
      </Dialog>
    </>
  );
}
