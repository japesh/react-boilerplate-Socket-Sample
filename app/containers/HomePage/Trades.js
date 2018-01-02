import React from "react";
import TradeList from "./TradeList";
import TabDropDown from "../../components/TabDropDown";
const navigations = [{ component: <TradeList />, title: "MARKET" }, { component: <div>View 2</div>, title: "YOURS" }];

const styles = {
  tabDropDown: {
    flex: 1,
    marginLeft: 5
  }
};
export default function Trades() {
  return <TabDropDown style={styles.tabDropDown} open={true} title={"Trades"} navigations={navigations} />;
}
