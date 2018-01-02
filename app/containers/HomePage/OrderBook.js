import React from "react";
import DropDown from "../../components/DropDown";
import OrderBookList from "./OrderBookList";
const styles = {
  tabDropDown: {
    flex: 2
  }
};
export default function OrderBook() {
  return (
    <DropDown open style={styles.tabDropDown} title={"Order book"}>
      <OrderBookList />
    </DropDown>
  );
}
