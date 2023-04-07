import styled from 'styled-components';


//<section style={{ marginTop:"5%",marginInline: '10%', width: "80%", display: "flex", justifyContent: "center" ,alignItems: "center"}}>


export const $WarningSection = styled.section`
margin-top: 5%;
margin-inline: 10%;
width: 80%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
align-text: center;
`

export const $FilterSection = styled.section`
margin-inline: 10%;
width: 80%;
margin-bottom: 25px;
`

export const $Warning = styled.h2`
font-size: 1.5rem;
font-family: gilroy,arial,futura;
font-weight: 700;
line-height: 1rem;
margin: 0px;
color: #8023f9;
margin-bottom: 25px;
`

export const $ResetButton = styled.button`
width: 240px;
height: 48px;
border-radius: 12px;
background-color: white;
color: #8023f9;
border: 2px solid #8023f9;
:focus{
    background-color: #8023f9;
    color: white;
}
:hover{
    background-color: #8023f9;
    color: white;
}
`

export const $App = styled.div`
background-color: white;
min-height: 95vh;
`

export const $Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-text: center;
  color: #8023f9;
  margin-bottom:35px;
  margin-top:35px;
  @media (min-width: 300px) {
    margin-inline: 10%;
  }
`;

export const $H1 = styled.h1`
font-size: 2rem;
margin: 0px;

`;