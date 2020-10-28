import React from "react";
import styled from "styled-components";
import { themeVars } from "../GlobalStyles";

const Button = ({ handleClick, disabled, subStatus }) => (
  <Wrapper disabled={disabled || subStatus === "pending"} onClick={handleClick}>
    Confirm
  </Wrapper>
);

const Wrapper = styled.button`
  background: ${themeVars.alabamaCrimson};
  border-radius: 4px;
  border-color: transparent;
  color: #fff;
  cursor: pointer;
  display: block;
  font-family: ${themeVars.headingFont};
  font-size: 24px;
  height: 48px;
  width: 100%;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export default Button;
