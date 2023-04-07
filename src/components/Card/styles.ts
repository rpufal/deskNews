import styled from "styled-components";

export const $Card = styled.div`
width: 90%;
margin: 5%;
transition: color 150ms ease-out;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
:hover div {
    color: #8023f9;
}

:hover img {
    transition: 0.3s ease all;
    transform: scale(1.06);
}

`;

export const $TextContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
width: 100%;
`

export const $Label = styled.span`
color: #8023f9;
font-weight: 600;
text-transform: uppercase;
line-height: 1.5;
font-family: inter,helvetica,arial;
font-size: 0.75rem;
margin-bottom: 4px; 
` 

export const $Title = styled.h5`
font-size: 1.125rem;
font-family: gilroy,arial,futura;
font-weight: 700;
line-height: 0.80rem;
width: 100%;
margin: 0px;
`

export const $Author = styled.p`
line-height: 1.5;
font-family: inter,helvetica,arial;
font-size: 0.75rem;
margin: 0px;
margin-top: 4px;
`

export const $Image = styled.img`
margin-bottom: 10px;
border-radius: 0.5rem;
overflow: hidden;
transition: 0.4s ease all;
mask-image: linear-gradient(white, black);

display: inline-block;
height: auto;
max-width: 100%;
width: 100%;
`





 
  


