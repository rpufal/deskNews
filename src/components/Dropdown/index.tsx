import clsx from 'clsx';
import { useState } from 'react';
import { $FilterArea, $Input, $Button, $Select, $Option } from './styles';
//import Select from 'react-select';
//import data from './Dropdown.data.json';

import './Dropdown.css';

type filter ={
    category: string;
    keyWord: string;
}

export interface DropdownProps {
  filter: {
    category: string;
    keyWord: string;
  },
  setFilter: React.Dispatch<React.SetStateAction<any>>,
  options: {
    label: string;
    value: string;
  }[],
}

const Dropdown = (props: DropdownProps) => {
  const [input, setInput] = useState("")
  const [state, setState] = useState({
    open: false,
    selected: -1,
    active: false,
  })

  const toggleDropdown = () => {
    setState({ ...state, active: !state.active })
  }

  const handleClick = (i: number) => {
    setState({
      ...state,
      active: !state.active,
      selected: i
    })
  }
  return (
    <$FilterArea>
      <div>
        <$Input placeholder="Search here..." onChange={({target}) => setInput(target.value)} />
        <$Button onClick={() => props.setFilter({...props.filter, keyWord: input})}>Enter</$Button>
      </div>
      {/* 
      <$Select>
        {props.options.map((option, index) => (
          <$Option key={index+option.value} value={option.value}>{option.label}</$Option>
        ))}
      </$Select>*/}
      <$Select className="dropdown">
        <$Select
          onClick={() => toggleDropdown()}
          className="dropdown__toggle dropdown__list-item"
        >
          Categories
          {/*<i className="fa fa-angle-down" aria-hidden="true"></i>*/}
        </$Select>

        <ul className={clsx("dropdown__list", state.active && 'dropdown__list--active')}>
          {props.options.map((option, i) => (
            <$Option
              key={i+option.value}
              onClick={evt => handleClick(i)}
              className={clsx("dropdown__list-item", i === state.selected && 'dropdown__list-item--active')}
              value={option.value}
            >
              {option.label}
            </$Option>
          ))}
        </ul>
      </$Select >
    </$FilterArea>
  )
}

export default Dropdown
