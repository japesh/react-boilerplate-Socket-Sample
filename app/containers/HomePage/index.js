/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from "react";
import { logo } from "../../images/images";
import Logo from "../../components/Logo";
import NavBar from "../../components/NavBar";
import MenuView from "./MenuView";
import DisplayView from "./DisplayView";
import Tickers from "./Tickers";
import OrderForm from "./OrderForm";
import Trades from "./Trades";
import Balances from "./Balances";
import PropTypes from "prop-types";
import WebSocket from "./WebSocket";
import Summary from "./Summary";
import Chart from "./Chart";
import Positions from "./Positions";
import Orders from "./Orders";
import OrderHistory from "./OrderHistory";
import OrderBook from "./OrderBook";
import Button from "../../components/Button";
const SocketURL = "wss://api.bitfinex.com/ws/2";

export default class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  getWebSocket = cb => {
    let webSocket = this.webSocket;
    if (webSocket) {
      if (webSocket.isOpened) {
        cb(webSocket);
      } else {
        webSocket.register(cb);
      }

      return webSocket;
    }
    webSocket = new WebSocket(SocketURL);
    webSocket.register(cb);
    this.webSocket = webSocket;
    return webSocket;
  };
  componentWillUnmount() {
    this.webSocket && this.webSocket.close();
  }
  getChildContext() {
    return {
      webStore: {
        getWebSocket: this.getWebSocket
      }
    };
  }
  static childContextTypes = {
    webStore: PropTypes.object
  };
  render() {
    return (
      <div>
        <NavBar>
          <Logo src={logo()} alt="" />
          <MenuView />
          <div style={{ justifyContent: "flex-end", flex: 1, flexDirection: "row" }}>
            <Button color="#fff" borderWidth={0} style={{ paddingRight: 10 }}>LOG IN</Button>
            <Button color="#fff" borderWidth={1}>TOUR</Button>
            <Button color="#97C653" borderWidth={1}>SIGN UP</Button>
            <Button color="#fff" borderWidth={1} borderRadius={"20"}>English</Button>
          </div>
        </NavBar>
        <div style={{ flexDirection: "row", paddingTop: 15, alignItems: "flex-start" }}>
          <div style={{ paddingLeft: 5, width: "25%" }}>
            <DisplayView />
            <Tickers />
            <OrderForm />
            <Balances />
            <Summary />
          </div>
          <div style={{ padding: "0px 5px", flex: 1 }}>
            <Chart />
            <Positions />
            <Orders />
            <OrderHistory />
            <div style={{ flexDirection: "row", paddingTop: 5, alignItems: "flex-start" }}>
              <OrderBook />
              <Trades />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
