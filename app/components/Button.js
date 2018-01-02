import Styled from "styled-components";
export default Styled.div`
  padding: 3px 15px;
  margin: 0px 5px;
  border-radius:${({ borderRadius }) => (borderRadius ? borderRadius : "2")}px;
  font-size:13px;
  transition: opacity 125ms ease;
  opacity:0.7;
  color:${({ color }) => color};
  border-color:${({ color }) => color};
  border-style:solid;
  border-width:${({ borderWidth }) => borderWidth}px;
  &:hover {
    opacity:1
  }
`;
