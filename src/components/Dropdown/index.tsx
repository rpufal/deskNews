import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {DropdownButton, DropdownContent, $Button, $FilterArea, $Input, $InputContainer} from "./styles"

//babel plugin for compiling styled components messing up styled types

export const DropdownContainer = styled.div<{isOpen: boolean}>`
  position: relative;
  display: inline-block;
  height: 48px;
  border-radius: 12px;
  border: 2px solid #8023f9;
  background-color: ${({isOpen}) => isOpen ? "#8023f9": "white"};
  color: ${({isOpen}) => isOpen ? "white" : "#8023f9"};
  :hover  {
    background-color: #8023f9;
    color: white;
  }
  button {
    background-color: ${({isOpen}) => isOpen ? "#8023f9": "white"};
    color: ${({isOpen}) => isOpen ? "white" : "#8023f9"};
    :hover  {
      background-color: #8023f9;
      color: white;
    }
  }

  @media (min-width: 300px) {
    width: 100%;
    margin-bottom: 10px;
  }
  @media (min-width: 700px) {
    width: 23%;
  }
  `;

export const DropdownItem = styled.div<{last: boolean, first: boolean}>`
  color: black;
  padding: 12px 0px;
  width: 100%;
  text-decoration: none;
  min-width: 160px;
  cursor: pointer;
  z-index: 999;
  border-top-left-radius: ${({first}) => first ? "20px" : "0px"};
  border-top-right-radius: ${({first}) => first ? "20px" : "0px"};
  border-bottom-left-radius: ${({last}) => last ? "20px" : "0px"};
  border-bottom-right-radius: ${({last}) => last ? "20px" : "0px"};
  &:hover {
    background-color: #8023f9;
    color: white;
  }
  border-bottom: ${({last}) => last ? "0px" : "1px solid lightgrey" };
`;



//

type optionObject = {label: string, value: string}

export interface DropdownProps {
    filter: {
      keyWord: string;
      date: string;
      reset: boolean;
      currentPage: number;
      industry: string;
      region: string;
      integration: string;
    },
    setFilter: React.Dispatch<React.SetStateAction<any>>,
    optionsIntegrations: optionObject[],
    optionsIndustry: optionObject[],
    optionsRegions: optionObject[],
  }


const Dropdown = ( props: DropdownProps ) => {
  const {optionsIndustry, optionsIntegrations,optionsRegions, setFilter, filter} = props;
  const [input, setInput] = useState("")
  const [state, setState] = useState({
    openIndustry: false,
    openIntegration: false,
    openRegion: false,
    selectedIndustry: {
        label: "",
        value: ""
    },
    selectedIntegration: {
      label: "",
      value: ""
    },
    selectedRegion: {
      label: "",
      value: ""
    },
  })

  useEffect(() => {
    if (filter.reset) {
      setState({
        openIndustry: false,
        openIntegration: false,
        openRegion: false,
        selectedIndustry: {
            label: "",
            value: ""
        },
        selectedIntegration: {
          label: "",
          value: ""
        },
        selectedRegion: {
          label: "",
          value: ""
        },
      })
      setFilter({...filter, reset: false})
    }
  }, [filter.reset])

  const handleOpenClose = (type: "industry" | "integration" | "region") => {
    type === "industry" ? setState({ ...state, openIndustry: !state.openIndustry }) 
    : type === "integration"? setState({ ...state, openIntegration: !state.openIntegration }) 
    : setState({ ...state, openRegion: !state.openRegion });
  };

  const handleSelectOption = (type: "industry" | "integration" | "region", option: {value: string, label: string}) => {
    if (type === "industry") {
      setState({...state, openIndustry: false, selectedIndustry: option})
      setFilter({...filter, industry: option.value, reset: false, currentPage: 1})
    } else if (type === "integration") {
      setState({...state, openIntegration: false, selectedIntegration: option})
      setFilter({...filter, integration: option.value, reset: false, currentPage: 1})
    } else {
      setState({...state, openRegion: false, selectedRegion: option})
      setFilter({...filter, region: option.value, reset: false, currentPage: 1})
    }
  }
  
  return (
    <$FilterArea>
        <$InputContainer>
          <$Input placeholder="Search here..." value={input} onChange={({target}) => setInput(target.value)} />
          <$Button onClick={() => {
            props.setFilter({...props.filter, keyWord: input, reset: false})
            setInput("")
            }}>Enter</$Button>
        </$InputContainer>
        <DropdownContainer isOpen={state.openIndustry}>
          <DropdownButton  onClick={() => handleOpenClose("industry")}>
              {state.selectedIndustry.value && !state.openIndustry ? state.selectedIndustry.label : "Select an industry"}
          </DropdownButton>
          {state.openIndustry &&
              <DropdownContent>
              {optionsIndustry.map((option, index) => (
                  <DropdownItem first={index === 0} last={index === (optionsIndustry.length - 1)}  key={index+option.label} onClick={() => handleSelectOption("industry", option)}>
                  {option.label}
                  </DropdownItem>
              ))}
              </DropdownContent>
          }
        </DropdownContainer>
        <DropdownContainer isOpen={state.openIntegration}>
          <DropdownButton   onClick={() => handleOpenClose("region")}>
              {state.selectedRegion.value && !state.openRegion ? state.selectedRegion.label : "Select a region"}
          </DropdownButton>
          {state.openRegion &&
              <DropdownContent>
              {optionsRegions.map((option, index) => (
                  <DropdownItem first={index === 0} last={index === (optionsRegions.length - 1)}  key={index+option.label} onClick={() => handleSelectOption("region", option)}>
                  {option.label}
                  </DropdownItem>
              ))}
              </DropdownContent>
          }
        </DropdownContainer>
        <DropdownContainer isOpen={state.openIntegration}>
          <DropdownButton   onClick={() => handleOpenClose("integration")}>
              {state.selectedIntegration.value && !state.openIntegration ? state.selectedIntegration.label : "Select an integration"}
          </DropdownButton>
          {state.openIntegration &&
              <DropdownContent>
              {optionsIntegrations.map((option, index) => (
                  <DropdownItem first={index === 0} last={index === (optionsIntegrations.length - 1)}  key={index+option.label} onClick={() => handleSelectOption("integration", option)}>
                  {option.label}
                  </DropdownItem>
              ))}
              </DropdownContent>
          }
        </DropdownContainer>
    </$FilterArea>
  );
};

export default Dropdown;
