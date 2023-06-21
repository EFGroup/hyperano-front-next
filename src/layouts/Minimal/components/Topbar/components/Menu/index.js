import React, { useState } from 'react';

import {
  Box,
  Card,
  Grid,
  Fade,
  Grow,
  Paper,
  Stack,
  Button,
  useTheme,
  Divider,
  CardMedia,
  Typography,
  useMediaQuery,
  ClickAwayListener,
} from '@mui/material';

import { useSelector } from 'react-redux';
import Link from 'next/link';

const Menu = ({ menus = [] }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = useState();

  const { shopId } = useSelector( state => state.shop )

  const handleClick = (data) => {
    setOpen(data);
  };

  const handleClickAway = () => {
    setOpen(null);
  };
  
  return (
    <>
    { matches
    &&
      <ClickAwayListener onClickAway={handleClickAway}>
        <Stack
          columnGap={1}
          direction="row"
          flexWrap="wrap"
          bgcolor="#f1f1f155"
          sx={{ width: '100%', py: 0.5, px: { xs: 1, sm: 2, md: 4, lg: 6, xl: 8 } }}>
          {
            menus.length > 0 && menus[0].children.map( (item, i) => (
              <Box key={i}>
                <Button
                  size="small"
                  color="info"
                  aria-haspopup="true"
                  onClick={() => handleClick(item.title)}
                  onMouseOver={() => handleClick(item.title)}
                  sx={{ fontSize: 14, color: '#656565' }}>
                  {item.title}
                </Button>
                {open === item.title && (
                  <Grow in={open === item.title} timeout={500} >
                    <Divider variant="middle" style={{
                      position: 'relative',
                      top: 0,
                      height: 3,
                      borderRadius: 3,
                      backgroundColor: theme.palette.primary.main,
                    }} />
                  </Grow>
                )}
                <Fade onMouseLeave={handleClickAway} in={open === item.title} timeout={200} >
                  <Box style={{
                    position: 'absolute',
                    top: { xs: 200, sm: 100 },
                    right: 0,
                    left: 0,
                    zIndex: 1000,
                    direction: 'rtl',
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: '0px 200px 200px 0px #00000030',
                    borderBottomRightRadius: "8px",
                    borderBottomLeftRadius: "8px",
                  }}>
                    <Grid sx={{ height: { xs: 'calc( 100vh - 200px )', sm: 'calc( 100vh - 100px )'}, display: { xs: 'flex', sm: 'none' } }} container justify="center">
                      <Paper elevation={0}
                        style={{
                          height: '100%',
                          width: '100%',
                          backgroundPosition: 'center center',
                          backgroundSize: '70%',
                          borderRadius: 0,
                          backgroundRepeat: 'no-repeat',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          padding: 32,
                          direction: theme.direction,
                        }}
                      >
                        <Link href={`/search?shop_ids=${shopId}&category=${item.parent_id}&subcategory=${item.id}`}>
                          <Typography variant="h3" align="center" gutterBottom>{item.title}</Typography>
                        </Link>
                        <Grid height="100%" container justify="center">
                          {Array.isArray(item.children) && item?.children.map( (child, c) => (
                          <Grid key={c} item lg={2} md={3} sm={4} xs={6} >
                            <Stack sx={{ height: '100%', p: 1 }}>
                              <Link href={`/search?shop_ids=${shopId}&category=${child.parent_id}&subcategory=${child.id}`}>
                                <Typography color="primary" variant="subtitle2" gutterBottom>
                                  {child.title}
                                </Typography>
                              </Link>
                              <Divider sx={{ mb: 1 }} />
                              {
                                child.children.length > 0 && child.children.map( (cc, j)=>(
                                  <Typography key={j} color="textSecondary" variant="caption" component="p" gutterBottom>
                                    {cc.title}
                                  </Typography>
                                ))
                              }
                            </Stack>
                          </Grid>
                          ))}
                        </Grid>
                        <Button
                          variant="outlined"
                          onClick={handleClickAway}
                          style={{ borderRadius: 20, minWidth: 70, margin: 4, marginTop: 'auto' }}>
                          بستن
                        </Button>
                      </Paper>
                    </Grid>
                    <Grid
                      container
                      justify="center"
                      sx={{
                        p: 1,
                        minHeight: 400,
                        display: { xs: 'none', sm: 'flex' }
                      }}>
                        <Grid container item xs={8}>
                          {Array.isArray(item.children) && item.children.map( (child, c) => (
                          <Grid key={c} item lg={2} md={3} sm={4} xs={6} >
                            <Stack sx={{ height: '100%', p: 1 }}>
                              <Typography color="GrayText" variant="subtitle2" gutterBottom>
                                {child.title}
                              </Typography>
                              <Divider sx={{ mb: 1 }} />
                              {
                                child.children.length > 0 && child.children.map( (cc, j)=>(
                                  <Typography key={j} color="textSecondary" variant="caption" component="p" gutterBottom>
                                    {cc.title}
                                  </Typography>
                                ))
                              }
                            </Stack>
                          </Grid>
                          ))}
                        </Grid>
                        <Grid container item xs={4}>
                          <Card sx={{height: '100%', width: '100%', p: 4}}>
                            <CardMedia
                              image='/logo.svg'
                              title="title"
                              sx={{
                                height: '100%',
                                width: '100%',
                                backgroundSize: 'contain',
                              }}/>
                          </Card>
                        </Grid>
                    </Grid>
                  </Box>
                </Fade>
              </Box>
            ))
          }
        </Stack>
      </ClickAwayListener>
    }
    </>
  );
}

export default Menu;
