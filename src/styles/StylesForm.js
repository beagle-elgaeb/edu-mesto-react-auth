import styled from "styled-components";

export const Title = styled.h2`
  width: 358px;
  font-size: 24px;
  line-height: 29px;
  font-weight: 900;
  color: #000000;
  margin: 34px 0 0 0;

  @media (max-width: 680px) {
    width: 238px;
    font-size: 18px;
    line-height: 22px;
    margin: 25px 0 25px 0;
  }
`;

export const Form = styled.form`
  margin: 10px 0;
`;

export const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: 0;
  line-height: 17px;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  margin: 0;
  padding: 0;
`;

export const Input = styled.input`
  width: 358px;
  height: 27px;
  background: transparent;
  border: 0;
  border-bottom: 1px solid ${({ error }) => error ? "#dddddd" : "#ff0000"};
  outline: none;
  margin: 30px 0 0 0;

  @media (max-width: 680px) {
    width: 238px;
  }

  ::placeholder {
    color: #c4c4c4;
  }
`;

export const Error = styled.span`
  width: 358px;
  height: 0;
  overflow: visible;
  font-size: 12px;
  line-height: 15px;
  font-weight: 400;
  color: #ff0000;
  margin: 0 auto -5px auto;
  padding: 5px 0 0 0;

  @media (max-width: 680px) {
    width: 238px;
  }
`;

export const SubmitButton = styled.button`
  width: 358px;
  height: 50px;
  background: ${({ disabled }) => (disabled ? "#ffffff" : "#000000")};
  ${({ disabled }) => disabled && "opacity: 0.8"};
  border: ${({ disabled }) => (disabled ? "1px solid #000000;" : "none")};
  border-radius: 2px;
  outline: none;
  font-size: 18px;
  line-height: 22px;
  font-weight: 400;
  color: ${({ disabled }) => (disabled ? "#000000" : "#ffffff")};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  transition: opacity 0.5s ease-out;
  margin: 38px 0 34px 0;

  @media (max-width: 680px) {
    width: 238px;
    height: 46px;
    font-size: 14px;
    line-height: 17px;
    margin: 45px 0 25px 0;
  }

  :hover {
    opacity: 0.8;
  }
`;
