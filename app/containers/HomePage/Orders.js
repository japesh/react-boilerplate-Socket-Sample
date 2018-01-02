import React from "react";
import TabDropDown from "../../components/TabDropDown";
const navigations = [
  { component: <div>View 1</div>, title: "Bids" },
  { component: <div>View 2</div>, title: "Asks" },
  { component: <div>View 3</div>, title: "All" }
];
const styles = {
  tabDropDown: {
    marginTop: 5
  }
};
export default function Orders() {
  return <TabDropDown style={styles.tabDropDown} title={"Orders (0)"} selectedIndex={2} navigations={navigations} />;
}
