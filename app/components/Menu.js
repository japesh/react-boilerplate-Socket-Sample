import Styled from "styled-components";
export const Menus = Styled.div`
  position: absolute;
  top: 32px;
  background-color:#34444c;
  overflow: hidden;
  width: 200px;
  transition: height 100ms ease-in;
  z-index:1;
`;
export const SubMenu = Styled.div`
  padding:0px 8px;
  &:hover {
    background-color:#1b262d;
  }
`;
export const MenuBar = Styled.div`
   margin-left:8px;
   flex-direction: row;
  align-self: stretch;
`;

export const MenuTitle = Styled.div`
  padding: 0px 8px;
  border-radius:4px;
  &:hover {
    background-color:#34444c;
  }
`;
export default Styled.div`
  justify-content: center;
  & ${Menus} {
     height: 0px;
  }
  &:hover ${Menus}, ${Menus}:hover {
    height: ${({ height }) => height}px !important;
  }
`;
