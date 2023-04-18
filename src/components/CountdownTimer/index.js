import { Stack, Typography } from '@mui/material';
import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from './useCountdown';

const ExpiredNotice = () => {
  return (
    <Stack>
      <Typography variant='h3'>Expired!!!</Typography>
      <Typography variant='subtitle1'>Please select a future date and time.</Typography>
    </Stack>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds, color }) => {
  return (
    <Stack direction="row-reverse" columnGap={1}>
      <DateTimeDisplay color={color} value={days} type={'Days'} isDanger={days <= 3} />
      <Typography color={color} component="span">:</Typography>
      <DateTimeDisplay color={color} value={hours} type={'Hours'} isDanger={false} />
      <Typography color={color} component="span">:</Typography>
      <DateTimeDisplay color={color} value={minutes} type={'Mins'} isDanger={false} />
      {/* <Typography color={color} component="span">:</Typography> */}
      {/* <DateTimeDisplay color={color} value={seconds} type={'Seconds'} isDanger={false} /> */}
    </Stack>
  );
};

const CountdownTimer = ({ targetDate, color }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        color={color}
      />
    );
  }
};

export default CountdownTimer;
