import React from "react";
import styled from "styled-components";

import { themeVars } from "./GlobalStyles";
import logoImg from "../assets/air-sling.png";

const Footer = () => (
  <Wrapper>
    <Logo src={logoImg} />
    <p>The only way to fly!</p>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  margin: auto auto 24px;
  height: 60px;

  p {
    color: ${themeVars.alabamaCrimson};
    font-family: ${themeVars.headingFont};
    font-size: 36px;
    text-align: center;
    margin: 12px 0 0 24px;
  }
`;
const Logo = styled.img`
  height: 100%;
`;

export default Footer;
