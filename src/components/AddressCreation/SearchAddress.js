import React from 'react';

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
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';

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

const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYzN2I2NDFlZDhkMmVkN2NiZjY1OWU0YTNjMjgyMWFlOGE1M2MxNWYyZTQ5NTdjZTU5NjUyZGJmZGRiZDZkYmEzMjQ5YTAwYmVkZWYxM2YzIn0.eyJhdWQiOiIyMTY0MCIsImp0aSI6ImYzN2I2NDFlZDhkMmVkN2NiZjY1OWU0YTNjMjgyMWFlOGE1M2MxNWYyZTQ5NTdjZTU5NjUyZGJmZGRiZDZkYmEzMjQ5YTAwYmVkZWYxM2YzIiwiaWF0IjoxNjc5OTI0NjE4LCJuYmYiOjE2Nzk5MjQ2MTgsImV4cCI6MTY4MjUxNjYxOCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.KfZMMyFfBEGueCgIFoXQr0TdHtRsgO_BpsSn3eKHJ0VuG_AeSpoGwPPCzG-svUtTmEtS7YrL0QtUnJI7IvqVyGsB224UAPl2jqbE7fRYFWAb1LqLB2oXwz6IjnQW3bKljQSojw9RT2qCM4swQUm1KTMycgoi_H7rBSKIwpRQzOcKxEu1CvznhTfC4T4_692f1L8vkg3ehOj12pZbgH_fpawtfDeODvUTNBOqo8izd3UoY7JJVyhwUQ8QKDtKN_bl_J5FSu0-04uvn_kAIjsf08C2sWfxt6q89eyF3UOd7xWjNqBJ7JVCbAhJbk_BEcXf5sXFyGytgGH7bIKhoyh4lw';

export default function SearchAddress({changeCenter}) {
  const [expanded, setExpanded] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [address, setAddress] = React.useState('');
  const [data, setData] = React.useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const searchFunction = () => {
    setLoading(true)
    var url = `https://map.ir/search/v2?&text=${address}&lat=32.6539&lon=51.6660&$filter=city eq اصفهان`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey
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
    <Stack sx={{width: '100%', mt: 1, mb: 1}}>
      <Paper elevation={2} sx={{ p: 1, display: 'flex', alignItems: 'center', borderRadius: 2 }}>
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
            <DirectionsIcon />
          </IconButton>
        }
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <ExpandMore
          expand={expanded}
          aria-label="show more"
          aria-expanded={expanded}
          onClick={handleExpandClick}>
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
            pt: 1
            }}>
            {
              data.slice(0,5).map( (item, i) => (
                <Card elevation={2} key={i}>
                  <CardActionArea onClick={()=>handleSelect(item.geom.coordinates)}>
                    <CardHeader
                      sx={{ p: 2 }}
                      title={item.title}
                      subheader={item.address}
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
