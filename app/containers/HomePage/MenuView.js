import React from "react";
import Menu, { Menus, MenuTitle, MenuBar, SubMenu } from "../../components/Menu";
function MenuView({ title, height, menus }) {
  return (
    <Menu height={height}>
      <MenuTitle>{title}</MenuTitle>
      {menus &&
        <Menus>
          {menus.map((menu, index) => <SubMenu key={index}>{menu}</SubMenu>)}
        </Menus>}
    </Menu>
  );
}
export default function MenuViews() {
  return (
    <MenuBar>
      <MenuView height={172} title={"Trading"} menus={["Bitcoin", "Litecoin"]} key={"Trading"} />
      <MenuView height={200} title={"Funding"} menus={["US Dollar", "Euro", "Bitcoin", "Litecoin"]} key={"Funding"} />
      <MenuView height={0} title="OTC" key={"OTC"} />
    </MenuBar>
  );
}
