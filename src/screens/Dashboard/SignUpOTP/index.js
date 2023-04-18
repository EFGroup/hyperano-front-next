import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from 'layouts/AuthLayout';
// components
import Page from 'components/Page';
import { MHidden } from 'components/@material-extend';
import AuthSocial from 'components/authentication/AuthSocial';

import Form from './Form';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Register() {
  const { t } = useTranslation('translations');
  return (
    <RootStyle title={t('sign.register')}>
      <AuthLayout>
        {t('sign.hasAccount')} &nbsp;
        <Link href="/login" underline="none" variant="subtitle2" component={RouterLink}>
          {t('sign.login')}
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            {t('sign.slogan')}
          </Typography>
          <img alt="register" src="/assets/images/illustration_register.png" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              {t('sign.free')}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{t('sign.forever')}</Typography>
          </Box>

          <AuthSocial />

          <Form />

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            {t('sign.policy')}
          </Typography>

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              {t('sign.hasAccount')} &nbsp;
              <Link href="/login" component={RouterLink}>
                {t('sign.login')}
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
