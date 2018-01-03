
import React from "react";
import DropDown from "../../components/DropDown";
import TradingView from "./TradeViewScript"
export default class Chart extends React.Component{

  render(){

    return (
    <DropDown title={"chart"} open={true}>
      <ChartView/>
    </DropDown>
  );}
}
class ChartView extends React.Component{
  componentDidMount(){
    new TradingView.widget({
      "width": "100%",
      "height": 500,
      "symbol": "COINBASE:BTCUSD",
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "Dark",
      "style": "1",
      container_id:"widget-container",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "hideideas": true
    });
  }
  render(){
    return <div id="widget-container"/>
  }
}
