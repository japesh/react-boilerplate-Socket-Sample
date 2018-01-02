import React from "react";
import Styled from "styled-components";
import PropTypes from "prop-types";
// const {fetch} = require("whatwg-fetch")
const Card = Styled.span`
  color: #899094;
  padding: 4px 5px;
  font-size: 11px;
  flex:1;
  justify-content:center;
  display:flex;
  text-transform: uppercase;
`;
const Row = Styled.div`
  flex-direction:row
`;
const Arrow = Styled.div`
  border: solid ${({ down }) => (down ? "#83332f" : "#77903e")};
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  align-self:center;
  justify-self:center;
  transform: ${({ down }) => (down ? "rotate(45deg)" : "rotate(-135deg)")};
`;
export default class TradeList extends React.PureComponent {
  state = {
    data: []
  };
  static contextTypes = {
    webStore: PropTypes.object
  };
  initializeSocket = () => {
    this.context.webStore.getWebSocket(webSocket => {
      webSocket.listen({ channel: "trades", symbol: "tBTCUSD" }, (trades, tradeUp) => {
        if (Array.isArray(trades)) {
          this.setState(({ data }) => {
            data = [...data];
            data.unshift(...trades);
            data = data.slice(0, 25);
            return { data };
          });
        } else if (trades === "te" && Array.isArray(tradeUp)) {
          this.setState(({ data }) => {
            data = [...data];
            data.unshift(tradeUp);
            data = data.slice(0, 25);
            return { data };
          });
        }
      });
    });
  };
  componentDidMount() {
    // fetch("https://api.bitfinex.com/v2/trades/tBTCUSD/hist").then((response)=>{
    //   // console.log("response>>>>>>>>>>>>", response.json())
    //   return response.json()
    // }).then((response)=>{
    //   console.log(response);
    // })
    this.initializeSocket();
  }
  componentWillUnmount() {
    this.context.webStore.getWebSocket(webSocket => {
      webSocket.unListen({ channel: "trades", symbol: "tBTCUSD" });
    });
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <Row>
          <div style={{ width: 12.73 }} />
          <Card>Time</Card>
          <Card>Price</Card>
          <Card>Amount</Card>
        </Row>
        {data.length === 0
          ? <div>Loading....</div>
          : data.map(row => {
              let amount = row[2];
              let date = new Date(row[1]);
              return (
                <Row key={row[0]}>
                  <Arrow down={amount < 0} />
                  <Card>{date.toLocaleTimeString()}</Card>
                  <Card>{row[3]}</Card>
                  <Card>{Math.abs(amount).toFixed(5)}</Card>
                </Row>
              );
            })}
      </div>
    );
  }
}
