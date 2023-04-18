import { Box, Typography } from '@mui/material';
import React from 'react';

const DateTimeDisplay = ({ value, type, isDanger, color }) => {
  return (
    <Box className={isDanger ? 'countdown danger' : 'countdown'}>
      <Typography color={color} variant='h3' component="p">{Number(value) > 9 ? value : "0"+value}</Typography>
      {/* <Typography variant='caption'>{type}</Typography> */}
    </Box>
  );
};

export default DateTimeDisplay;