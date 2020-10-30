import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { themeVars } from "./GlobalStyles";
import slingairLogo from "../assets/logo_text.png";

const Header = (props) => {
  const { localId } = props;
  const [reservationId, setReservationId] = useState(localId);
  
  useEffect(() => {
    setReservationId(localId);
  }, [localId])

  return (
    <Wrapper>
    <Logo>
      <h1>Sling Airlines</h1>
    </Logo>
    <Nav>
      {reservationId && (
        <>
        <StyledNavLink to="/view-reservation">Reservation</StyledNavLink>
        <StyledNavLink to="/profile">Profile</StyledNavLink>
      </>
      )}
    </Nav>
  </Wrapper>
  
);
}

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  background: ${themeVars.alabamaCrimson};
  height: 110px;
  padding: ${themeVars.pagePadding} 18px;
`;
const Logo = styled.div`
  background-image: url(${slingairLogo});
  background-repeat: no-repeat;
  background-position: left center, right center;
  background-size: contain;
  overflow: hidden;
  text-indent: -1000px;
  height: 60px;
  width: 550px;
`;
const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const StyledNavLink = styled(NavLink)`
  background: ${themeVars.selectiveYellow};
  border: 1px solid transparent;
  border-radius: 4px;
  color: ${themeVars.alabamaCrimson};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${themeVars.headingFont};
  font-size: 18px;
  height: 42px;
  margin: 0 0 0 8px;
  padding: 0 14px;
  width: 100%;
  text-decoration: none;
  transition: all ease 400ms;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background: ${themeVars.alabamaCrimson};
    color: ${themeVars.selectiveYellow};
    border-color: ${themeVars.selectiveYellow};
  }
`;

export default Header;
