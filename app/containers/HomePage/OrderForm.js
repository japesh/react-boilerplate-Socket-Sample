import React from "react";
import { Star } from "../../components/Star";
import TabDropDown from "../../components/TabDropDown";
const navigations = [
  { component: <div>View 1</div>, title: "Exchange" },
  { component: <div>View 2</div>, title: "Margin" },
  {
    component: <div>View 3</div>,
    title: () => {
      return <Star>📅</Star>;
    }
  }
];
const styles = {
  tabDropDown: {
    marginTop: 5
  }
};
export default function OrderForm() {
  return (
    <TabDropDown style={styles.tabDropDown} open title={"Order Form"} selectedIndex={1} navigations={navigations} />
  );
}
