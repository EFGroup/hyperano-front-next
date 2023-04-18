import React from 'react';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import HomeRounded from '@mui/icons-material/HomeRounded';

import FooterMenu from '../FooterMenu';
import { Search }from 'components';

import { useDispatch, useSelector } from 'react-redux';
import { openCartDrawer, openMenuPopup, openProfilePopup } from 'redux/actions';
import { Badge } from '@mui/material';

export default function MobileFooter({menus}) {
  const dispatch = useDispatch();
  const { current } = useSelector(state => state.cart);

  return (
    <footer style={{ bottom: 0, position: 'sticky' }}>
      <FooterMenu menus={menus} />
      <Box
        sx={{
            bottom: 0,
            bgcolor: '#fff',
            position: 'relative',
            borderStartEndRadius: 24,
            borderStartStartRadius: 24,
            boxShadow: '0 24px 20px 8px #000000',
        }}>
        
        <Stack alignItems="center" justifyContent="center"
          sx={{
            position: 'absolute',
            zIndex: 1,
            top: -24,
            left: 0,
            right: 0,
            margin: 'auto',
            width: 56,
            height: 56,
            backgroundColor: '#fff',
            borderRadius: 4,

          }}>
          <Search size="medium" color="error"/>
        </Stack>

        <Tabs
          value={0}
          variant='fullWidth'
          TabIndicatorProps={{sx: {display: 'none'}}}
          aria-label="icon label tabs example"
          sx={{
            overflow: 'hidden',
            borderStartEndRadius: 24,
            borderStartStartRadius: 24,
            color: "#fff",
            height: 80
          }}
        >
            <Tab value={0} sx={{color: 'text.secondary', fontSize: 12}} label="فروشگاه"
              href="/"
              icon={
                <Avatar sx={{bgcolor: 'primary.lighter'}}>
                  <HomeRounded color="primary" fontSize="small" />
                </Avatar>
              }
            />
            <Tab value={1} sx={{color: 'text.secondary', fontSize: 12}} label="دسته ها"
              onClick={() => dispatch(openMenuPopup(true))}
              icon={
                <Avatar sx={{bgcolor: 'info.lighter'}}>
                  <WidgetsRoundedIcon color="info" fontSize="small" />
                </Avatar>
              }
            />
            <Tab value={2} sx={{color: 'text.secondary', fontSize: 12}} label="سبد خرید"
              onClick={() => dispatch(openCartDrawer(true))}
              icon={
                <Badge
                  color="error"
                  variant='dot'
                  overlap="circular"
                  invisible={!current.length > 0}
                  anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                  }}>
                  <Avatar sx={{bgcolor: 'error.lighter'}}>
                    <LocalMallRoundedIcon color="error" fontSize="small" />
                  </Avatar>
                </Badge>
              }
            />
            <Tab value={3} sx={{color: 'text.secondary', fontSize: 12}} label="پروفایل"
              onClick={() => dispatch(openProfilePopup(true))}
              icon={
                <Avatar sx={{bgcolor: 'warning.lighter'}}>
                  <PersonRoundedIcon color="warning" fontSize="small" />
                </Avatar>
              }
            />
        </Tabs>
      </Box>
    </footer>
  );
}
