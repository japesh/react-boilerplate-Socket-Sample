import React from "react";
import Styled from "styled-components";
const Header = Styled.div`
    flex-direction: row;
    margin:0px 10px 4px 10px;
    padding:2px 0px;
    border-bottom: 1px solid #36464f;
`;
const Body = Styled.span`
    margin:0px 10px 4px 10px;
`;
const TitleContainer = Styled.div`
  flex-direction: row;
  align-items: center;
  flex-grow:1;
`;
const Title = Styled.span`
  text-transform : uppercase;
  font-size:14px;
  margin-left:6px
`;
const Container = Styled.div`
    background-color:#1b262d;
    border: 1px solid #1b262d;
    &:hover {
      border: 1px solid #303e46;
    };
    cursor:pointer;
`;
const Arrow = Styled.span`
  border: solid #7E8486;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(-45deg)")};
`;

export default class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: props.open };
  }
  static defaultProps = {
    open: false
  };
  toggle = () => {
    this.setState(({ open }) => {
      return { open: !open };
    });
  };
  render() {
    const { title, children, actions, style } = this.props;
    const { open } = this.state;
    return (
      <Container style={style}>
        <Header>
          <TitleContainer onClick={this.toggle}>
            <Arrow open={open} />
            <Title>{title}</Title>
          </TitleContainer>
          {open && actions}
        </Header>
        {open && <Body>{children}</Body>}
      </Container>
    );
  }
}
