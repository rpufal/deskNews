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
    width: 30%;
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

export interface DropdownProps {
    filter: {
      category: string;
      keyWord: string;
      date: string;
      reset: boolean;
      currentPage: number;
    },
    setFilter: React.Dispatch<React.SetStateAction<any>>,
    optionsA: {
      label: string;
      value: string;
    }[],
    optionsB: {
      label: string;
      value: string;
    }[],
  }


const Dropdown = ( props: DropdownProps ) => {
  const {optionsA, optionsB, setFilter, filter} = props;
  const [input, setInput] = useState("")
  const [state, setState] = useState({
    openA: false,
    openB: false,
    selectedA: {
        label: "",
        value: ""
    },
    selectedB: {
      label: "",
      value: ""
  },
  })

  useEffect(() => {
    if (filter.reset) {
      setState({
        openA: false,
        openB: false,
        selectedA: {
            label: "",
            value: ""
        },
        selectedB: {
          label: "",
          value: ""
      },
      })
      setFilter({...filter, reset: false})
    }
  }, [filter.reset])

  const handleOpenClose = (type: "A" | "B") => {
    type === "A" ? setState({ ...state, openA: !state.openA }) : setState({ ...state, openB: !state.openB });
  };

  const handleSelectOption = (type: "A" | "B", option: {value: string, label: string}) => {
    if (type === "A") {
      setState({...state, openA: false, selectedA: option})
      setFilter({...filter, category: option.value, reset: false, currentPage: 1})
    } else {
      setState({...state, openB: false, selectedB: option})
      setFilter({...filter, date: option.value, reset: false, currentPage: 1})
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
        <DropdownContainer isOpen={state.openA}>
          <DropdownButton  onClick={() => handleOpenClose("A")}>
              {state.selectedA.value && !state.openA ? state.selectedA.label : "Select an option"}
          </DropdownButton>
          {state.openA &&
              <DropdownContent>
              {optionsA.map((option, index) => (
                  <DropdownItem first={index === 0} last={index === (optionsA.length - 1)}  key={index+option.label} onClick={() => handleSelectOption("A", option)}>
                  {option.label}
                  </DropdownItem>
              ))}
              </DropdownContent>
          }
        </DropdownContainer>
        <DropdownContainer isOpen={state.openB}>
          <DropdownButton   onClick={() => handleOpenClose("B")}>
              {state.selectedB.value && !state.openB ? state.selectedB.label : "Select an option"}
          </DropdownButton>
          {state.openB &&
              <DropdownContent>
              {optionsB.map((option, index) => (
                  <DropdownItem first={index === 0} last={index === (optionsB.length - 1)}  key={index+option.label} onClick={() => handleSelectOption("B", option)}>
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
