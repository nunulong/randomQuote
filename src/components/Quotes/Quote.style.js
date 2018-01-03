import styled, { injectGlobal, css } from 'styled-components';

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Raleway');

  body {
    margin: 0;
    box-sizing: border-box;
    font-family: 'Raleway', sans-serif;
  }
`;

export const Wrapper = styled.div`
  transition: all 2s ease;
  ${({ color }) => color && css`
    color: #${color}
  `};
`

export const H1 = styled.h1`
  margin-top: 5vw;
  font-size: 7vw;
  font-style: extra-bold;
  ${({ color }) => color && css`
    color: #${color};
  `};
`

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 80vw;
  height: 60vh;
  margin-right: auto;
  margin-left: auto;
  margin-top: 5vh;
  background: white;
  z-index: 1;
  box-shadow: -5px 5px 5px rgba(68, 68, 68, 0.6);

  p {
    font-size: 2.5vw;
    text-align: justify;
    padding-left: 3vw;
    padding-right: 3vw;
    font-weight: bolder;
  }
  h3 {
    text-align: right;
    padding-right: 5vw;
    font-size: 1.5vw;
  }
`

export const Button = styled.button`
  ${({ color }) => color && css`
    background: #${color};
  `}; 
  color: white;
  font-size: 1.25vw;
  display: inlin-block;
  border-radius: 3px;
  padding: 0.75vh 0;
  margin: 0.75vh 0;
  width: 10vw;
  &:hover {
    cursor: pointer;
  }
`

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`