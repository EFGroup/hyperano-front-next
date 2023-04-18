import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Tab,
  Tabs,
  Card,
  Stack,
  Avatar,
  useTheme,
  Typography,
  CardHeader,
  useMediaQuery,
  CardActionArea,
  CircularProgress,
} from '@mui/material';

import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import DirectionsWalkRoundedIcon from '@mui/icons-material/DirectionsWalkRounded';

import { useQuery } from '@apollo/client';
import { shipping } from "apollo/requests";

import { useSelector } from "react-redux";
import { digitsEnToFa } from "@persian-tools/persian-tools";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{flex: 1}}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1, width: '100%' }}>
          {children}
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function SelectShippingTime({
  order_id,
  shop_ids,
  address_id,
  setShippingTime,
  setActiveStep
}) {

    const theme = useTheme();
    const [value, setValue] = useState(0);
    const { accessToken } = useSelector(state => state.user);

    const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
      defaultMatches: true
    });

    const handleChange = (event, newValue) => setValue(newValue);

    const { data: shippingData, loading } = useQuery(shipping.list, {
      variables: {
        order_id,
        shop_ids,
        address_id
      },
      context: {
        serviceName: "auth",
          headers: {
            authorization: `Bearer ${accessToken}`
        }
      }
    });

  const data = shippingData ? shippingData?.shipping : [];

  return (
    <Stack
      p={1}
      rowGap={2}
      columnGap={2}
      minHeight={400}
      flexWrap="wrap"
      direction="column"
      alignItems="stretch">
      {
        loading
        ?
        <Stack justifyContent="center" alignItems="center" minHeight={300} rowGap={2} >
          <CircularProgress color='warning' />
          <Typography color="GrayText">در حال دریافت...</Typography>
        </Stack>
        :
        <>
          {
            data && data.length > 0
            ?
              data.map( item => {
                const hasHours = item.shipping_hours ? true : false;
                const days = hasHours ? JSON.parse(item.shipping_hours) : []
                return <React.Fragment key={item.id}>
                {
                  hasHours
                  ?
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: {xs: 'block', md: 'flex'} }}>
                        <Tabs
                          variant="scrollable"
                          scrollButtons
                          allowScrollButtonsMobile
                          orientation={ isDesktop ? "vertical" :"horizontal"}
                          value={value}
                          onChange={handleChange}
                          sx={{ borderRight: 0, borderColor: 'divider', minWidth: { xs: 120, sm: 200 } }}
                        >
                          {
                            days.map( (day,i) => (
                                <Tab key={day.shamsi_date} label={digitsEnToFa(day.shamsi_date)} sx={{bgcolor: '#f3f3f3', borderRadius: 1, m: 0.5}} {...a11yProps(i)} />
                            ))
                          }
                        </Tabs>
                        {
                          days.map( (day, d)=> (
                              <TabPanel key={d} value={value} index={d}>
                                  <Stack direction="row" flexWrap="wrap" justifyContent="space-between" rowGap={2} columnGap={2}>
                                  {
                                    Object.keys(day.hours).map( (key, i) => {
                                      const hour = day.hours[key]
                                      return <Card elevation={4} key={i} sx={{width: '100%'}}>
                                        <CardActionArea
                                          onClick={()=>{
                                            setShippingTime({
                                              id: item.id,
                                              demand_date: day.date,
                                              demand_hour: hour.from,
                                              shamsi: day.shamsi_date,
                                              title: item.shipping_type.title
                                            })
                                            setActiveStep(2)
                                          }}>
                                        <CardHeader
                                          title = {
                                            <Typography variant="subtitle1">{`حوالی ساعت ${digitsEnToFa(hour.from)} تا ${digitsEnToFa(hour.to)}`}</Typography>
                                          }
                                          subheader = {
                                            <>
                                            <Typography variant="subtitle2" color="secondary">{item.shipping_type.title}</Typography>
                                            {hour.shipping_cost > 0 && <Typography>{`هزینه حمل: ${digitsEnToFa(hour.shipping_cost)} تومان`}</Typography>}
                                            </>
                                          }
                                          avatar={
                                            <Avatar alt="main">
                                              <AccessTimeRoundedIcon />
                                            </Avatar>
                                          }
                                        />
                                        </CardActionArea>
                                      </Card>
                                    })
                                  }
                                  </Stack>
                              </TabPanel>
                          ))
                        }
                      </Box>
                    </Box>
                  :
                  <Box sx={{width: '100%', p: 0.75}}>
                    <Card elevation={4}>
                      <CardActionArea
                        onClick={()=>{
                          setShippingTime({
                            id: item.id,
                            demand_date: null,
                            demand_hour: null,
                            shamsi: null,
                            title: item.shipping_type.title
                          })
                          setActiveStep(2)
                        }}>
                      <CardHeader
                        title = {<Typography variant="subtitle1">{item.shipping_type.title}</Typography>}
                        subheader = { item.cost > 0 && <Typography>{`هزینه حمل: ${item.cost} تومان`}</Typography>}
                        avatar={
                          <Avatar alt="main">
                            <DirectionsWalkRoundedIcon />
                          </Avatar>
                        }
                      />
                      </CardActionArea>
                    </Card>
                  </Box>
                }
                </React.Fragment>
              })
            :
              <Stack justifyContent="center" alignItems="center" minHeight={300} >
                <Typography color="GrayText">موردی یافت نشد.</Typography>
              </Stack>
          }
        </>
      }
    </Stack>
  );
}
