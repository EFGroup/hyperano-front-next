import React, { useState } from 'react';

import {
  Box,
  Card,
  Paper,
  Stack,
  styled,
  Divider,
  InputBase,
  IconButton,
  CardHeader,
  CardActionArea,
  CircularProgress,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SearchAddress({changeCenter}) {
  const [expanded, setExpanded] = useState(true);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [data, setData] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const searchFunction = () => {
    setLoading(true)
    var url = `https://map.ir/search/v2?&text=${address}&lat=32.6539&lon=51.6660&$filter=city eq اصفهان`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImM1MzU3MDkxMDE3M2MwYjAzNGM1YmFjNGI2NzEwMDg2MmU3YTQ1Mjk4MThkOWViZTNkYWQ3NGYxNTMyM2M0MzRhYjNiNjMwYjI5OGVhMDgzIn0.eyJhdWQiOiI0NzY4IiwianRpIjoiYzUzNTcwOTEwMTczYzBiMDM0YzViYWM0YjY3MTAwODYyZTdhNDUyOTgxOGQ5ZWJlM2RhZDc0ZjE1MzIzYzQzNGFiM2I2MzBiMjk4ZWEwODMiLCJpYXQiOjE2NDEyMjE2NzUsIm5iZiI6MTY0MTIyMTY3NSwiZXhwIjoxNjQxMzk0NDc1LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.Ikf45Qtzp2ZgmvNfW2tckRx9SsuJOJzAdldlD9xcclSjMdGh39MpLlHTiBGswwWiQ9GvrX9emppLLXYSy68jaEgAY-KwvAESPR3t1-s7c4QSrckjuUZwV2Y_yo8dn8oGNwRPF7Ff6a6dut8GloW3VZ3qpoSi_U2JofSje54LeCiWjRc9mwDCm1T4AhKkCgxI0gKX8IuxBBZtVZmaKrv24vEriZiPMBGLUrY4AzTHfcFvCgrGTys-0u-bmeG71rLyCUmV_b8C2MNwxt2IvEgLlB9OydUYjjm-B3jVoRCiCrMcF5b9e6Ty1Zr6ARmgj1rPJmVVbKoK015teTEEd0FfMg",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        if(data?.value) {
          setData(data.value)
          setExpanded(true)
        }
      });
  };

  const handleChange = (event) => {
    setAddress(event.target.value)
    searchFunction()
  }

  const handleSelect = (data) => {
    changeCenter(data)
    setExpanded(false)
  }

  return (
    <Stack sx={{width: '100%'}}>
    <Paper elevation={2} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderRadius: 2 }}>
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="جستجوی محل..."
        inputProps={{ 'aria-label': 'جستجوی محل...' }}
        value={address}
        onChange={handleChange}
      />
      {
        loading ?
        <IconButton disabled color="primary" sx={{ p: '10px' }} aria-label="directions">
            <CircularProgress size={20} />
        </IconButton>
        :
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
            <DirectionsIcon fontSize="small" />
        </IconButton>
      }
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
        <ExpandMoreIcon />
      </ExpandMore>
    </Paper>
    <Box sx={{ width: '100%', position: 'relative' }}>
        { expanded &&
        <Stack direction='column' rowGap={0.5} columnGap={1} sx={{
            position: 'absolute',
            top: 0,
            zIndex: 100,
            width: '100%',
            pt: 1,
            }}>
            {
                data.slice(0,5).map( (item, i) => (
                <Card elevation={2} key={i} sx={{bgcolor: '#fffffff9'}}>
                    <CardActionArea onClick={()=>handleSelect(item.geom.coordinates)}>
                        <CardHeader
                            title={item.title}
                            subheader={item.address}
                            sx={{ p: 2 }}
                        />
                    </CardActionArea>
                </Card>
                ))
            }
        </Stack>
        }
    </Box>
    </Stack>
  );
}
