import React from 'react';
import ActBase from "../actbase";

const App = props => {
  const { Component, pageProps } = props;
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};



export default ActBase(App, {});
