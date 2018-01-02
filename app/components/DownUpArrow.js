import Styled from "styled-components";
export default Styled.div`
  border: solid ${({ down }) => (down ? "#83332f" : "#77903e")};
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  align-self:center;
  justify-self:center;
  transform: ${({ down }) => (down ? "rotate(45deg)" : "rotate(-135deg)")};
`;
