import React from "react";
import Styled from "styled-components";
import DropDown from "./DropDown";
const TabContainer = Styled.div`
    flex-direction: row;
`;
const TabStyled = Styled.span`
    padding: 0px 4px;
    color: ${({ selected }) => (selected ? "#DBDFE3" : "#A4A9AC")};
    font-size: 12px;
    border-bottom: 1px solid ${({ selected }) => (selected ? "#DBDFE3" : "#1b262d")};
    &:hover {
      border-bottom: 1px solid #DBDFE3;
      color: #DBDFE3;
    }
`;
class Tab extends React.Component {
  selectTab = () => {
    const { selectTab, index } = this.props;
    selectTab(index);
  };
  render() {
    const { navigation, selected, selectTab } = this.props;
    const { title } = navigation;
    return (
      <TabStyled onClick={this.selectTab} selected={selected}>
        {typeof title === "function" ? title({ selected }) : title}
      </TabStyled>
    );
  }
}
function TabView({ navigations, selectedIndex, selectTab }) {
  return (
    <TabContainer>
      {navigations.map((navigation, index) => {
        return (
          <Tab
            key={index}
            selectTab={selectTab}
            selected={selectedIndex === index}
            navigation={navigation}
            index={index}
          />
        );
      })}
    </TabContainer>
  );
}
export default class TabDropDown extends React.Component {
  static defalutProps = {
    selectedIndex: 0,
    navigations: []
  };
  constructor(props) {
    super(props);
    this.state = { selectedIndex: props.selectedIndex || 0 };
  }
  selectTab = index => {
    this.setState({ selectedIndex: index });
  };
  render() {
    const { navigations, ...rest } = this.props;
    const { selectedIndex } = this.state;
    const actions = <TabView selectTab={this.selectTab} selectedIndex={selectedIndex} navigations={navigations} />;
    return (
      <DropDown {...rest} actions={actions}>
        {navigations[selectedIndex].component}
      </DropDown>
    );
  }
}
