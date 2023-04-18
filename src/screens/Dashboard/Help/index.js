import { Link as RouterLink } from 'react-router-dom';
import { Button, Typography, Container, Box, Stack, Card, Grid, CardContent } from '@mui/material';
// components
import Page from 'components/Page';

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <Page title="راهنما">
      <Container>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h1" paragraph>
            راهنما
          </Typography>
          <Button to="/" size="medium" variant="contained" component={RouterLink}>
            برگشت
          </Button>
        </Stack>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
            <Card>
              <CardContent>
              <video width="320" height="240" controls style={{width: '100%', height: '100%', objectFit: 'contain', borderRadius: 10}}>
                <source src="https://admin.iwasco.ir/workshopManager.mp4" type="video/mp4"/>
              </video>
              <Typography variant="subtitle1">راهنمای استفاده از سامانه</Typography>
              <Typography variant="subtitle2">نقش مدیر کارگاه</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
            <Card>
              <CardContent>
                <video width="320" height="240" controls style={{width: '100%', height: '100%', objectFit: 'contain', borderRadius: 10}}>
                  <source src="https://admin.iwasco.ir//workshopSupervisor.mp4" type="video/mp4"/>
                </video>
                <Typography variant="subtitle1">راهنمای استفاده از سامانه</Typography>
                <Typography variant="subtitle2">نقش ناظر کارگاه</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
            <Card>
              <CardContent>
                <video width="320" height="240" controls style={{width: '100%', height: '100%', objectFit: 'contain', borderRadius: 10}}>
                  <source src="https://admin.iwasco.ir/superAdmin.mp4" type="video/mp4"/>
                </video>
                <Typography variant="subtitle1">راهنمای استفاده از سامانه</Typography>
                <Typography variant="subtitle2">نقش مدیر کل</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
