import styled from 'styled-components';


//min 700width works, need media for lower widths
export const $FilterArea = styled.div`
display: flex;
width: 100%;

@media (min-width: 300px) {
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
@media (min-width: 900px) {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

`;


export const $Button = styled.button`
height: 48px;
min-width: 24px;
width: 48px;
border-radius: 12px;
background-color: #8023f9;
color: white;
border: none;
margin-left: -45px;
:focus {
  outline: none;
}
`

export const $Input = styled.input`
height: 48px;
width: 100%;
border-radius: 12px;
background-color: #F9FAFB;
border: none;
padding: 0px;
padding-left: 16px;
:focus {
  outline: 2px solid  #8023f9;
}
:hover {
  outline: 2px solid  #8023f9;
}
`
export const $InputContainer = styled.div`
width: 23%;
height: 48px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;

@media (min-width: 300px) {
  width: 100%;
  margin-bottom: 10px;
}



@media (min-width: 900px) {
  width: 23%;
}
`



  export const DropdownButton = styled.button`
  padding: 12px;
  font-size: 14px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  min-width: 160px;
  width: 100%;
  height: 48px;
  display: inline-flex;
  align-items: center; 
  justify-content: center;
  `;

export const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  position: absolute;
  background-color: #F9FAFB;
  margin-top: 8px;
  border-radius: 12px;
  min-width: 160px;
  width: 100%;
  z-index: 999;
`;
