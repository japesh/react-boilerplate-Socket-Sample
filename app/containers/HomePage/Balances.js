import React from "react";
import Star from "../../components/Star";
import TabDropDown from "../../components/TabDropDown";
const navigations = [
  { component: <div>View 1</div>, title: "Exchange" },
  { component: <div>View 2</div>, title: "Margin" },
  {
    component: <div>View 3</div>,
    title: () => {
      return <Star />;
    }
  }
];
const styles = {
  tabDropDown: {
    marginTop: 5
  }
};
export default function Balances() {
  return <TabDropDown style={styles.tabDropDown} open title={"Balances"} selectedIndex={0} navigations={navigations} />;
}
