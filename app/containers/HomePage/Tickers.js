import React from "react";
import Star from "../../components/Star";
import TabDropDown from "../../components/TabDropDown";
const navigations = [
  { component: <div>View 1</div>, title: "Trading" },
  { component: <div>View 2</div>, title: "Funding" },
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
export default function Tickers() {
  return (
    <TabDropDown style={styles.tabDropDown} open={true} title={"Tickers"} selectedIndex={2} navigations={navigations} />
  );
}
