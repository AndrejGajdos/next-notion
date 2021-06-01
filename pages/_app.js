import * as React from "react";
import App from "next/app";
import { IntlProvider } from "react-intl";
import { Router } from "next/router";

class MyApp extends App {
  constructor(props) {
    super(props);
  }

  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <IntlProvider locale="en">
        <Component {...pageProps} />
      </IntlProvider>
    );
  }
}

export default MyApp;
