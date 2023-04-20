import Head from 'next/head';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ErrorPage(props) {
  const { statusCode, error } = props;

  console.log("error", error)
  return (
  <>
    <Head>
      <title>{`خطای ${statusCode}`}</title>
    </Head>
    <Stack pb={8} pt={12} rowGap={1} justifyContent="space-between" alignItems="center" minHeight="100vh">
      <Stack color="#fff" rowGap={2} justifyContent="center" alignItems="center">
        {statusCode
          ? <Typography variant="h1" color="error">{`خطای ${statusCode}`}</Typography>
          : <Typography variant="subtitle2" color="GrayText">گزارش خطا</Typography>
        }
        <Button color="error" variant="outlined" href="/">رفتن به خانه</Button>
      </Stack>
      <Typography variant="body2" color="GrayText">هایپرانو | تجریه خریدی نو</Typography>
    </Stack>
  </>
)}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}