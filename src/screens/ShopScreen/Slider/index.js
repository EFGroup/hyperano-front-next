import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Card, CardMedia, CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import Home from '@mui/icons-material/Home';
// import Image from 'next/image';

const init = [
  {
    alt: 'S01',
    image: '/images/slides/S01.jpg',
  },
  {
    alt: 'S02',
    image: '/images/slides/S02.jpg',
  },
  {
    alt: 'S03',
    image: '/images/slides/S03.jpg',
  },
  {
    alt: 'S04',
    image: '/images/slides/S04.jpg',
  },
  {
    alt: 'S05',
    image: '/images/slides/S05.gif',
  },
  {
    alt: 'S06',
    image: '/images/slides/S06.jpg',
  },
  {
    alt: 'S07',
    image: '/images/slides/S07.jpg',
  },
]

const IndexScreen = ({data = init}) => {
  const [active, setAcrive] = React.useState(0)
  return (
    <Carousel
      index={active}
      autoPlay={true}
      // navButtonsAlwaysVisible
      // animation="slide"
      IndicatorIcon={<Home style={{ fontSize: 8 }} />}
      indicatorContainerProps={{
        style: {
          width: '100%',
          textAlign: 'center',
          marginTop: 0,
          // display: 'flex',
          // justifyContent: 'flex-end',
          // padding: '0 64px',
        }

      }}
      indicatorIconButtonProps={{
        style: {
          // padding: '10px',    // 1
          margin: '0 2px',
          border: '1px solid #afafaf',
          color: '#fff',
          '& .indicatorIcon': {
            fontSize: 8,
          }
        }
      }}
      activeIndicatorIconButtonProps={{
        style: {
          border: '1px solid #ccc',
          color: '#ccc',
          backgroundColor: '#ccc',
        }
      }}
      // navButtonsWrapperProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
      //   style: {
      //     display: 'flex',
      //     width: '50%',
      //     height: '90%',
      //   }
      // }}
      // NavButton={({ onClick, className, style, next, prev }) => {
      //   return (
      //       <Button onClick={onClick} disableRipple disableFocusRipple style={{
      //         width: '100%',
      //         backgroundColor: 'transparent',
      //         borderRadius: 0,
      //         cursor: next ?
      //           'url(/images/svg/arrow-right.svg),e-resize'
      //           : 'url(/images/svg/arrow-left.svg),e-resize'
      //       }} aria-label="next" >
      //       </Button>
      //   )
      // }}
    >
      {data.map((item, index) => (
        <Slides key={index} item={item}/>
      ))}
    </Carousel>
  );
};

function Slides({ item }) {
  return (
    <div style={{ padding: 0 }}>
      <Card elevation={0} sx={{ borderRadius: 4 }}>
        {/* <CardMedia
          component="img"
          alt={item.alt}
          image={item.image}
          sx={{
            objectFit: 'cover',
            // height: { xs: 300, sm: 450, md: 500 }
          }}
        /> */}
        <CardMedia
          alt={item.alt}
          image={item.image}
          sx={{position: 'relative', pt: '32%'}} >
          {/* <Image
            alt={item.alt}
            src={item.image}
            style={{objectFit: 'cover'}}
            sizes={[450, 640, 750, 828, 1080, 1200, 1920, 2048, 3840]}
          /> */}
        </CardMedia>
        <CardContent style={{ position: 'absolute', top: 0 }}>
        </CardContent>
      </Card>
    </div>
  );
}

export default IndexScreen;