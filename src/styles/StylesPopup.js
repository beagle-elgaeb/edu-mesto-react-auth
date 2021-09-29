import styled from "styled-components";

export const Overlay = styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
position: fixed;
top: 0;
overflow: hidden;
visibility: ${({ opened }) => (opened ? "visible" : "hidden")};
opacity: ${({ opened }) => (opened ? "1" : "0")};
background: rgba(0, 0, 0, 0.5);
transition: all 0.3s ease-in;
margin: 0;
z-index: ${({ opened }) => (opened ? "2" : "-1")};
`;

export const Container = styled.div`
  width: 430px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-radius: 10px;
  background: #ffffff;

  @media (max-width: 680px) {
    width: 282px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: -40px;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transition: opacity 0.5s ease-out;
  margin: 0;
  padding: 0;

  @media (max-width: 680px) {
    right: 0;
  }

  :hover {
    opacity: 0.6;
  }
`;

export const CloseButtonIcon = styled.img`
  width: 40px;
  height: 40px;
  transform: rotate(45deg);

  @media (max-width: 680px) {
    width: 26px;
    height: 26px;
  }
`;
