import React from "react";
import DropDown from "../../components/DropDown";
const styles = {
  tabDropDown: {
    marginTop: 5
  }
};
export default function Positions() {
  return (
    <DropDown style={styles.tabDropDown} title={"Positions (0)"}>
      <div>Position View</div>
    </DropDown>
  );
}
