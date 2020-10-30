import React from "react";
import styled from "styled-components";

import { themeVars } from "./GlobalStyles";

const Profile = (props) => {
  const { seat, givenName, surname, email, flightNumber, id } = props.user;

  return <Wrapper>
    <SectionTitle>Profile</SectionTitle>
    <Text><Bold>First Name:</Bold> {givenName}</Text>
    <Text><Bold>Last Name:</Bold> {surname}</Text>
    <Text><Bold>Email:</Bold> {email}</Text>
  </Wrapper>;
};

const Wrapper = styled.div`
  margin: auto;
  border: 2px solid ${themeVars.alabamaCrimson};
  padding: 40px;
`;

const SectionTitle = styled.h4`
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

export default Profile;
