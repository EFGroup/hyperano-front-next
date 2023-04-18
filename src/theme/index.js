import { useMemo } from 'react';

import {
  createTheme,
  responsiveFontSizes,
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider
} from '@mui/material/styles';

import shape from './shape';
import palette from './palette';
import typography from './typography';
import GlobalStyles from './globalStyles';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from "react-redux";
import { faIR } from '@mui/material/locale';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const { direction } = useSelector((state) => state.language);

  const themeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography,
      shadows,
      customShadows,
      direction
    }),
    [direction]
  );

  let theme = createTheme(themeOptions, faIR);
  theme = responsiveFontSizes(theme);
  theme.components = componentsOverride(theme);

  return (
    <div dir={direction}>
      {/* <StyledEngineProvider injectFirst> // shoudnt use in ssr */}
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MuiThemeProvider>
      {/* </StyledEngineProvider> */}
    </div>
  );
}
