import React, {useState} from 'react';
import { Stack, Box, Typography, Button } from '@mui/material';
import Form from './Form';
import Link from 'next/link';
// import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function Login() {

  const modelRef = React.useRef();
  const [annots, setAnnots] = useState([]);

  const handleClick = (event) => {
    const { clientX, clientY } = event;

    if (modelRef.current) {
      let hit = modelRef.current.positionAndNormalFromPoint(clientX, clientY);
      if (hit) {
        setAnnots((annots) => {
          return [...annots, hit];
        });
      }
    }
  };

  const getDataPosition = (annot) => {
    return `${annot.position.x} ${annot.position.y} ${annot.position.z}`;
  };

  const getDataNormal = (annot) => {
    return `${annot.normal.x} ${annot.normal.y} ${annot.normal.z}`;
  };

  return (
    <Stack height="100vh" width="100vw"
      sx={{
        backgroundImage: 'url("/assets/svg/discount.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Stack height="100%" width="100%"
        justifyContent="stretch"
        alignItems="center"
        p={1}
      >
        <Stack bgcolor="#ffffff55" borderRadius={2} py={4} px={1} flex={1} >
          {/* <model-viewer src="assets/carpet.glb" ar ar-scale="fixed" camera-controls touch-action="pan-y" alt="A 3D model of an astronaut" ios-src="assets/carpet.usdz" xr-environment></model-viewer> */}
          <Box
            component="img"
            src="/logo.svg"
            sx={{ width: 160, height: 160, objectFit: 'contain', m: 'auto' }} />
          <Typography textAlign='center' variant='subtitle1'>خوش آمدید</Typography>
          <Form />
          <Button disabled href="/register">ثبت نام</Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
