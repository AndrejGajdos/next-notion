import React, { Component, Fragment } from "react";
import Head from "next/head";
import Body from "./body";

class Web extends Component {
  render() {
    const { metaTitle, metaDescription, metaKeywords, cart } = this.props;

    return (
      <>
        <Head>
          <meta name="keywords" content={metaKeywords} />
          <meta name="description" content={metaDescription} />
          <meta name="robots" content="index,follow" />
        </Head>
        <Body
          dbData={this.props.dbData}
          cartTotalPrice={this.props.cartTotalPrice}
          cartProductCount={this.props.cartProductCount}
        >
          {this.props.children}
        </Body>
      </>
    );
  }
}

export default Web;
