import React, { Component, Fragment } from "react";
import Cookies from "js-cookie";

const INITIAL_STATE = {
  showSearch: false,
  smallHeader: false,
  showMenu: false,
  formData: {
    searchText: "",
  },
  totalPrice: 0,
  count: 0,
};

var lastPageYOffset = 0;

class Body extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.toogleSearch = this.toogleSearch.bind(this);
    this.toogleMenu = this.toogleMenu.bind(this);
    this.formHandle = this.formHandle.bind(this);
  }

  async componentDidMount() {}

  toogleSearch() {
    this.setState({ showSearch: !this.state.showSearch });
  }

  toogleMenu() {
    this.setState({ showMenu: !this.state.showMenu });
  }

  formHandle(e) {
    const t = e.target;
    const v = t.type === "checkbox" ? t.checked : t.value;
    const n = t.name;

    this.setState({ formData: { ...this.state.formData, [n]: v } });
  }

  render() {
    const { showSearch, smallHeader, showMenu, formData } = this.state;
    const { dbData, cartTotalPrice, cartProductCount } = this.props;

    var orderCartID = Cookies.get("cart");
    var loggedUser = Cookies.get("loggedUser");

    if (!orderCartID) orderCartID = 0;

    var totalPrice = 0;
    var productCount = 0;
    if (dbData && dbData.data.cartProducts) {
      if (dbData.data.cartProducts.totalPrice) {
        totalPrice = dbData.data.cartProducts.totalPrice;
      }
      if (dbData.data.cartProducts.productCount) {
        productCount = dbData.data.cartProducts.productCount;
      }
    }

    if ((cartTotalPrice || cartTotalPrice == 0) && cartTotalPrice != null) {
      totalPrice = cartTotalPrice;
    }
    if (
      (cartProductCount || cartProductCount == 0) &&
      cartProductCount != null
    ) {
      productCount = cartProductCount;
    }

    return (
      <Fragment>
        <header className={smallHeader ? "shring" : ""}>
          <div className="content">
            <div className="logo">test logo</div>
            <div className="find">test find</div>
          </div>
        </header>
        {this.props.children}
        <footer>
          <div className="contact row"></div>
        </footer>
      </Fragment>
    );
  }
}

export default Body;
