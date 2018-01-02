import React from "react";
import TabDropDown from "../../components/TabDropDown";
const navigations = [
  { component: <div>View 1</div>, title: "MARGIN" },
  { component: <div>View 2</div>, title: "FUNDING" }
];
const styles = {
  tabDropDown: {
    marginTop: 5
  }
};
export default function Summary() {
  return <TabDropDown style={styles.tabDropDown} open title={"Summary"} selectedIndex={0} navigations={navigations} />;
}
