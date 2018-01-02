import React from "react";
import List from "../../components/List";
import Card from "../../components/ListCard";
import Row from "../../components/ListRow";
import Arrow from "../../components/DownUpArrow";
import PropTypes from "prop-types";
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
        <List
          data={data}
          renderRow={row => {
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
          }}
        />
      </div>
    );
  }
}
