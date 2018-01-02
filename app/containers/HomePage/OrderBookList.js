import React from "react";
import List from "../../components/List";
import Card from "../../components/ListCard";
import Row from "../../components/ListRow";
import Arrow from "../../components/DownUpArrow";
import PropTypes from "prop-types";
export default class OrderBookList extends React.PureComponent {
  state = {
    data: [],
    book: {
      bids: {},
      asks: {},
      psnap: {},
      mcnt: 0
    }
  };
  static contextTypes = {
    webStore: PropTypes.object
  };
  onMessage = msg => {
    if (msg === "hb") {
      return;
    }
    let { ...BOOK } = this.state.book;
    if (BOOK.mcnt === 0) {
      msg.forEach(function(pp) {
        pp = { price: pp[0], cnt: pp[1], amount: pp[2] };
        const side = pp.amount >= 0 ? "bids" : "asks";
        pp.amount = Math.abs(pp.amount);
        BOOK[side] = { ...BOOK[side] };
        BOOK[side][pp.price] = pp;
      });
    } else {
      let pp = { price: msg[0], cnt: msg[1], amount: msg[2] };
      if (!pp.cnt) {
        let found = true;
        if (pp.amount > 0) {
          if (BOOK["bids"][pp.price]) {
            BOOK["bids"] = { ...BOOK["bids"] };
            delete BOOK["bids"][pp.price];
          } else {
            found = false;
          }
        } else if (pp.amount < 0) {
          if (BOOK["asks"][pp.price]) {
            BOOK["asks"] = { ...BOOK["asks"] };
            delete BOOK["asks"][pp.price];
          } else {
            found = false;
          }
        }
        if (!found) {
          // console.log("[" + moment().format() + "] " + pair + " | " + JSON.stringify(pp) + " BOOK delete fail side not found\n")
        }
      } else {
        let side = pp.amount >= 0 ? "bids" : "asks";
        // let {amount=0} = BOOK[side][pp.price] || {}
        pp.amount = Math.abs(pp.amount);
        BOOK[side] = { ...BOOK[side] };
        BOOK[side][pp.price] = pp;
      }
    }

    ["bids", "asks"].forEach(function(side) {
      let bprices = Object.keys(BOOK[side]);

      let prices = bprices.sort(function(a, b) {
        if (side === "bids") {
          return +a >= +b ? -1 : 1;
        } else {
          return +a <= +b ? -1 : 1;
        }
      });

      BOOK.psnap[side] = prices;
      //console.log("num price points", side, prices.length)
    });

    BOOK.mcnt++;
    this.setState({ book: BOOK });
  };

  initializeSocket = () => {
    this.context.webStore.getWebSocket(webSocket => {
      webSocket.listen({ channel: "book", symbol: "tBTCUSD" }, ordres => {
        this.onMessage(ordres);
      });
    });
  };
  componentDidMount() {
    this.initializeSocket();
  }
  componentWillUnmount() {
    this.context.webStore.getWebSocket(webSocket => {
      webSocket.unListen({ channel: "book", symbol: "tBTCUSD" });
    });
  }
  render() {
    const { book: { bids, asks, psnap } } = this.state;
    return (
      <div>
        <Row>
          <div style={{ flex: 1 }}>
            <Row>
              <Card>Count</Card>
              <Card>Amount</Card>
              <Card>Total</Card>
              <Card>Price</Card>
            </Row>
            <List
              data={psnap.bids || []}
              renderRow={key => {
                let bid = bids[key];
                return (
                  <Row key={bid.price}>
                    <Card>{bid.cnt}</Card>
                    <Card>{bid.amount.toFixed(1)}</Card>
                    <Card>{"N/A"}</Card>
                    <Card>{bid.price}</Card>
                  </Row>
                );
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Row>
              <Card>Price</Card>
              <Card>Total</Card>
              <Card>Amount</Card>
              <Card>Count</Card>
            </Row>
            <List
              data={psnap.asks || []}
              renderRow={key => {
                let ask = asks[key];
                return (
                  <Row key={ask.price}>
                    <Card>{ask.price}</Card>
                    <Card>{"N/A"}</Card>
                    <Card>{ask.amount.toFixed(1)}</Card>
                    <Card>{ask.cnt}</Card>
                  </Row>
                );
              }}
            />
          </div>
        </Row>
      </div>
    );
  }
}
