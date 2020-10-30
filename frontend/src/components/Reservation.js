import React from "react";
import styled from "styled-components";

import { themeVars } from "./GlobalStyles";

const Reservation = (props) => {
  const { seat, givenName, flightNumber, id, email, surname } = props.user;

  return <Wrapper>
  <Confirmed>Reservation for {givenName} {surname}</Confirmed>
  <Text><Bold>Reservation #:</Bold> {id}</Text>
  <Text><Bold>Flight #:</Bold> {flightNumber}</Text>
  <Text><Bold>seat #:</Bold> {seat}</Text>
  <Text><Bold>Email:</Bold> {email}</Text>
</Wrapper>;
};

const Wrapper = styled.div`
  margin: auto;
  border: 2px solid ${themeVars.alabamaCrimson};
  padding: 40px;
`;

const Confirmed = styled.h4`
  color: ${themeVars.alabamaCrimson};
  font-family: ${themeVars.contentFont};
  border-bottom: 3px solid ${themeVars.alabamaCrimson};
  font-size: 1.3rem;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const Text = styled.p`
  font-family: ${themeVars.contentFont};
  padding-bottom: 10px;
`;

export default Reservation;
