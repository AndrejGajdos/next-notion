import React, { Component, Fragment } from "react";

import nextCookies from "next-cookies";
import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";
import Layout from "../Layout/web";
import { SERVER_PUBLIC_URL } from "../Config/index";

class Homepage extends Component {
  static async getInitialProps(data) {
    const allCookies = nextCookies(data);

    var orderCartID = allCookies.cart;
    if (!orderCartID) orderCartID = 0;

    const notion = new NotionAPI({
      authToken: "secret_xxxxxx",
    });

    const recordMap = await notion.getPage("page_id");

    return {
      props: {
        recordMap,
      },
      revalidate: 10,
    };
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    const { dbData, recordMap } = this.props;

    return (
      <Fragment>
        <Layout dbData={dbData} metaTitle="" metaDescription="" metaKeywords="">
          <NotionRenderer recordMap={recordMap} fullPage darkMode={false} />
          {/* <section className="homepage">
            {dbData && dbData.data && dbData.data.allHomepageCategories && (
              <div id="categories">
                {dbData.data.allHomepageCategories.map((item, index) => (
                  <div key={index} className="category">
                    <a
                      href={item.categoryID + "-" + item.category.niceName}
                      className="category-content"
                    >
                      <h2>{item.category.name}</h2>
                      <div className="count">{item.category.productCount}</div>
                    </a>
                    <div className="overlay-bg" />
                  </div>
                ))}
              </div>
            )}
          </section> */}
        </Layout>
      </Fragment>
    );
  }
}

export default Homepage;
