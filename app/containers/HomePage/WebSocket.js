export default class WebSocket {
  channels = {};
  chanIds = {};
  isOpened = false;

  constructor(url) {
    const w = new window.WebSocket(url);
    w.addEventListener("open", event => {
      this.isOpened = true;
      this.delayedCallbacks.forEach(cb => {
        cb(this);
      });
      this.delayedCallbacks = [];
    });
    this.w = w;
    w.addEventListener("message", response => {
      let data = JSON.parse(response.data);
      console.log("data", data);
      if (Array.isArray(data)) {
        const [chanId, ...restData] = data;
        this.chanIds[chanId](...restData);
      } else if (typeof data === "object") {
        switch (data.event) {
          case "subscribed": {
            //event: "subscribed", channel: "ticker", chanId: 2, symbol: "tBTCUSD", pair: "BTCUSD"

            this.chanIds[data.chanId] = this.channels[data.channel][data.symbol];
            this.channels[data.channel][data.symbol] = data.chanId;
            break;
          }
        }
      }
    });
  }
  delayedCallbacks = [];
  register = cb => {
    this.delayedCallbacks.push(cb);
  };
  listen = ({ channel, symbol }, cb) => {
    let msg = JSON.stringify({
      event: "subscribe",
      channel,
      symbol
    });
    this.channels[channel] = this.channels[channel] || {};
    this.channels[channel][symbol] = cb;
    this.w.send(msg);
  };
  unListen = ({ channel, symbol }, cb) => {
    const chanId = this.channels[channel][symbol];
    if (typeof chanId === "number") {
      let msg = JSON.stringify({
        event: "unsubscribe",
        chanId
      });
      delete this.channels[channel][symbol];
      delete this.chanIds[chanId];
      this.w.send(msg);
    }
  };
  destroy = () => {
    this.w.close();
  };
}
