import React from "react";
import { BTCAlt } from "../../images/images";
import Card, { CardTitle, CardTitleGreen } from "../../components/Card";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
export default class DisplayView extends React.Component {
  state = {};
  static contextTypes = {
    webStore: PropTypes.object
  };
  componentDidMount() {
    this.context.webStore.getWebSocket(webSocket => {
      webSocket.listen({ channel: "ticker", symbol: "tBTCUSD" }, data => {
        if (Array.isArray(data)) {
          this.setState({ data });
        }
      });
    });
  }
  componentWillUnmount() {
    this.context.webStore.getWebSocket(webSocket => {
      webSocket.unListen({ channel: "ticker", symbol: "tBTCUSD" });
    });
  }
  render() {
    const { data = [0, 0, 0, 0, 0, 0, "", "", "", 0] } = this.state;
    let title = JSON.stringify(Math.floor(data[0])) || 0;
    return (
      <div style={{ flexDirection: "row", padding: 5, backgroundColor: "#1b262d", alignItems: "center" }}>
        <Helmet>
          <title>{title} (BTC/USD) Bitfinex - trading</title>
        </Helmet>
        <img
          src={BTCAlt()}
          style={{ color: "#fff", height: 40, width: 38, filter: "saturate(0) brightness(180%)" }}
          alt=""
        />
        {
          <div style={{ flexDirection: "row", textAlign: "center" }}>
            <div style={{ width: 150 }}>
              <span>BTC/UD</span>
              <Card style={{ fontSize: 13 }}>
                <CardTitle>VOL</CardTitle> {Math.floor(data[7])} <CardTitle>BTC</CardTitle>
              </Card>
              <Card style={{ fontSize: 13 }}><CardTitle>LOW</CardTitle> {Math.floor(data[9])}</Card>
            </div>
            <div style={{ width: 120 }}>
              <span>{title}</span>
              <span style={{ fontSize: 13 }}><CardTitleGreen>N/A</CardTitleGreen></span>
              <Card style={{ fontSize: 13 }}><CardTitle>HIGH</CardTitle> {Math.floor(data[8])}</Card>
            </div>
          </div>
        }
      </div>
    );
  }
}
