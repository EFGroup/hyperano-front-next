import React, { useEffect } from 'react';
import Head from 'next/head';
import 'styles/globals.css';
import ThemeProvider from "theme";
import LayoutProvider from 'layouts';
import createEmotionCache from 'utils/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import { Provider as ReduxProvider } from 'react-redux';
import { useStore } from 'redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
// import { appWithTranslation, useTranslation } from "next-i18next";

import { ApolloProvider } from "@apollo/client";
import client from "apollo/apollo-client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const clientSideEmotionCache = createEmotionCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// const isBrowser = typeof document !== "undefined";
// let insertionPoint;

// if (isBrowser) {
//   const emotionInsertionPoint = document.querySelector(
//     'meta[name="emotion-insertion-point"]',
//   );
//   insertionPoint = emotionInsertionPoint ?? undefined;
// }

// const cacheRtl = createEmotionCache({
//   key: "mui-style-rtl",
//   stylisPlugins: [prefixer, rtlPlugin],
//   insertionPoint,
// });

// const cacheLtr = createEmotionCache({
//   key: "mui-style-ltr",
//   insertionPoint,
// });

function MyApp(props) {
  // const { i18n } = useTranslation();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, function () {
    persistor.persist()
  })

  // useEffect(() => {
  //   document.body.dir = i18n.dir;
  // }, [i18n]);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
        jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  
  return (
    <CacheProvider value={emotionCache} >
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <ReduxProvider store={store}>
        <ToastContainer closeButton={false} bodyStyle={{direction: 'rtl'}} position="top-center" />
        <ApolloProvider client={client}>
          <ThemeProvider>
            <LayoutProvider {...pageProps}>
              <Component {...pageProps} />
            </LayoutProvider>
          </ThemeProvider>
        </ApolloProvider>
      </ReduxProvider>
    </CacheProvider>
  );
}

export default MyApp;
// export default appWithTranslation(MyApp);