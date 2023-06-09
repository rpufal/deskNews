import styled from 'styled-components';


export const $Grid = styled.section`
display: grid;
grid-template-columns: 1fr;
grid-column-gap: 0px;
grid-row-gap: 0px;
margin-inline: 10%;
width: 80%;

  @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 992px) {
      grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1240px) {
      grid-template-columns: repeat(4, 1fr);
  }
`