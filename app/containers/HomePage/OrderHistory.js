import React from "react";
import TabDropDown from "../../components/TabDropDown";
const navigations = [
  { component: <div>View 1</div>, title: "CANCELED" },
  { component: <div>View 2</div>, title: "EXECUTED" },
  { component: <div>View 3</div>, title: "ALL" }
];
const styles = {
  tabDropDown: {
    marginTop: 5
  }
};
export default function OrderHistory() {
  return (
    <TabDropDown style={styles.tabDropDown} title={"Order History (0)"} selectedIndex={2} navigations={navigations} />
  );
}
