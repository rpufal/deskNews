import styled from "styled-components";

export const $FilterArea = styled.div`
display: flex;
flex-direction: row;
width: 55%;
justify-content: space-between;
align-items: center;
`;

export const $Button = styled.button`
height: 48px;
width: 48px;
border-radius: 18px;
background-color: #8023f9;
color: white;
border: none;
margin-left: -48px;
`

export const $Input = styled.input`
height: 48px;
width: 224px;
border-radius: 18px;
background-color: #F9FAFB;
border: none;
padding: 0px;
padding-right: 48px;
padding-left: 16px;
`

export const $Select = styled.div`
height: 48px;
width: 168px;
border-radius: 18px;
background-color: #F9FAFB;
cursor: pointer;
`

export const $Option = styled.li`
height: 48px;
width: 168px;
border-radius: 18px;
`	
{/** 
.dropdown__list-item {
    border-bottom: 1px solid #eee;
    list-style: none;
    padding: 15px;
  }*/}