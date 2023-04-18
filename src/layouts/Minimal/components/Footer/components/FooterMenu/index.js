import React, { useState } from 'react';
import { useRouter } from 'next/router';

import {
    Card,
    Stack,
    Avatar,
    Dialog,
    Typography,
    CardHeader,
    IconButton,
    DialogTitle,
    DialogContent,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import { openMenuPopup } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const MenuCard = ({id, parent, title, images, hasChild, shopId, setActiveMenu, handleClose}) => {
    const router = useRouter();
    const handleCkick = () => {
        if(hasChild) {
            setActiveMenu(id)
        }else {
            router.push(`/search?shop_ids=${shopId || 4}&category=${parent}&subcategory=${id}`)
            handleClose()
        }
    }
    return (
        <Card
            elevation={1}
            key={id}
            onClick={handleCkick}
            sx={{ width: '100%'}}
        >
            <CardHeader
            title={title}
            avatar={
                <Avatar
                    alt={title}
                    variant="rounded"
                    // src={images}
                    src="/images/categories/Cat00004.png"
                />
            }
            action={
                hasChild &&
                <IconButton size="small" color="primary">
                    <ArrowBackIosRoundedIcon fontSize="small" />
                </IconButton>
            }
            />
        </Card>
    )
}

const FooterMenuPopup = ({ menus = [] }) => {
  const dispatch = useDispatch();
  const { shopId } = useSelector( state => state.shop );
  const { openMenu } = useSelector( state => state.settings );

  const handleOpen = () => dispatch(openMenuPopup(true));
  const handleClose = () => dispatch(openMenuPopup(false));

  const [activeMenu, setActiveMenu] = useState('1');

  function activeMenus(data = menus , active = activeMenu) {
    let merged = []
    if (data.length > 0) {
        data.map( item => {
          let {id, parent_id: parent, title, images, children} = item;
          let hasChild = children ? children?.length > 0 : false;
          images = images ? `https://hyperano.ir/api/uploads/images/categories/${JSON.parse(images).medium[0]}` : "/images/search.webp"
          if(hasChild){
            merged.push({id, parent, title, images, hasChild})
            merged = [...merged, ...activeMenus(children)]
          }else{
            merged.push({id, parent, title, images, hasChild})
          }
        })
    }
    return merged.filter( item => item.id === active || item.parent === active );
  }

  const back = activeMenus().find( item => activeMenu === item.id ) || {};

  return (
    <Dialog
        dir="rtl"
        fullWidth
        fullScreen
        maxWidth='sm'
        open={openMenu}
        onClose={handleClose}
        aria-labelledby="menu-dialog-title"
    >
        <DialogTitle>
        <Typography variant="subtitle1" component="p">انتخاب دسته بندی ها</Typography>
        <IconButton
            aria-label="close"
            size="small"
            color="error"
            onClick={handleClose}
            sx={{
                position: 'absolute',
                left: 12,
                margin: 'auto',
                top: 13.5,
                bgcolor: 'error.lighter'
            }}
        >
            {
                <CloseIcon fontSize="small" />
            }
        </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: {xs: 0.5, sm: 1, md: 2} }} dividers>
            <Stack spacing={2} sx={{direction: 'rtl'}}>
                <MenuCard
                    id = {back?.id}
                    parent = {back.parent}
                    title = {`همه "${back.title}"`}
                    images = {back.images}
                    hasChild = {false}
                    shopId={shopId}
                    setActiveMenu={setActiveMenu}
                    handleClose={handleClose}
                />
                {activeMenus().map((item) => {
                    if(item.id !== activeMenu)
                        return <MenuCard
                            key = {item.id}
                            id = {item.id}
                            parent = {item.parent}
                            title = {item.title}
                            images = {item.images}
                            hasChild = {item.hasChild}
                            shopId={shopId}
                            setActiveMenu={setActiveMenu}
                            handleClose={handleClose}
                        />
                })}
                {
                    back.parent > 0 &&
                    <MenuCard
                        id = {back.parent}
                        parent = {back.parent}
                        title = {"برگشت"}
                        images = {back.images}
                        hasChild = {back.hasChild}
                        shopId={shopId}
                        setActiveMenu={setActiveMenu}
                        handleClose={handleClose}
                    />
                }
            </Stack>
        </DialogContent>
    </Dialog>
  );
}

export default FooterMenuPopup;