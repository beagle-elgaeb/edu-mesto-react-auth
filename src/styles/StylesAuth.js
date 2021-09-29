import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.section`
  width: 358px;
  text-align: center;
  color: #ffffff;
  margin: 0 auto;

  @media (max-width: 680px) {
    width: 260px;
  }
`;

export const Title = styled.h1`
  width: 100%;
  font-size: 24px;
  line-height: 29px;
  font-weight: 900;
  margin: 60px 0 20px;

  @media (max-width: 680px) {
    font-size: 20px;
    line-height: 24px;
    margin: 40px 0 10px;
  }
`;

export const Form = styled.form`
  width: 100%;
`;

export const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  margin: 0;
  padding: 0;
`;

export const Input = styled.input`
  width: 358px;
  height: 27px;
  box-sizing: border-box;
  background: transparent;
  border: none;
  border-bottom: 2px solid #ffffff;
  outline: none;
  font-size: 14px;
  line-height: 17px;
  font-weight: 500;
  color: #ffffff;
  margin: 30px 0 0;

  @media (max-width: 680px) {
    width: 260px;
  }

  ::placeholder {
    font-weight: 400;
    color: #ffffff;
  }

  :-webkit-autofill,
  :-webkit-autofill:hover,
  :-webkit-autofill:focus {
    -webkit-text-fill-color: #ffffff;
    -webkit-box-shadow: 0 0 0px 1000px #131414 inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export const InputPass = styled.div`
  position: relative;
`;

export const Eye = styled.button`
  width: 22px;
  position: absolute;
  bottom: 0px;
  right: 10px;
  background: transparent;
  opacity: 0.6;
  border: none;
  outline: none;
  cursor: pointer;
  transition: opacity 0.5s ease-out;
  margin: 0;
  padding: 0;

  :hover {
    opacity: 0.4;
  }
`;

export const EyeIcon = styled.img`
  width: 100%;
`;

export const Error = styled.span`
  width: 358px;
  height: 0;
  display: inline-block;
  font-size: 12px;
  line-height: 13px;
  font-weight: 400;
  color: #ff0000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 auto -13px auto;
  padding: 0 0 13px 0;

  @media (max-width: 680px) {
    width: 260px;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  background: ${({ disabled }) => (disabled ? "#DDDDDD" : "#FFFFFF")};
  border: none;
  border-radius: 2px;
  outline: none;
  font-size: 18px;
  line-height: 22px;
  color: ${({ disabled }) => (disabled ? "#BBBBBB" : "#000000")};
  cursor: pointer;
  transition: opacity 0.5s ease-out;
  margin: 159px 0 0;

  @media (max-width: 680px) {
    height: 46px;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    margin: 116px 0 0;
  }

  :hover {
    opacity: 0.85;
  }
`;

export const Question = styled.p`
  width: 100%;
  font-size: 14px;
  line-height: 17px;
  margin: 30px 0 0;

  @media (max-width: 680px) {
    margin: 20px 0 0;
  }
`;

export const QuestionLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.5s ease-out;

  @media (max-width: 680px) {
    opacity: 0.6;
  }
`;

export const Loadbar = styled.div`
  width: 60px;
  height: 60px;
  margin: 20px auto -80px auto;
`;

export const LoadbarIcon = styled.img`
  width: 100%;
  height: 100%;
`;
