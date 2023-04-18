import Head from 'next/head';
import { useRouter } from 'next/router';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function OfflinePage() {
  const router = useRouter();
  return (
  <>
    <Head>
      <title>آفلاین</title>
    </Head>
    <Stack rowGap={1} justifyContent="center" alignItems="center" minHeight="99vh">
      <Typography variant="h1" color="error">شما آفلاین هستید!</Typography>
      <Typography variant="body2" color="GrayText">لطفا اتصال اینترنت خود را بررسی کنید.</Typography>
      <Button color="error" variant="outlined" onClick={() => router.reload()}>بررسی مجدد</Button>
    </Stack>
  </>
)}