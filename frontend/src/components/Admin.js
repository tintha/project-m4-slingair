import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "./GlobalStyles";

const Admin = ({setAdminPage}) => {
  const [allReservations, setAllReservations] = useState([]);

  useEffect(() => {
    setAdminPage(true);
    fetch('/reservations/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
      })
      .then((res) => res.json())
      .then((data) => {
        setAllReservations([...allReservations,...data.data.reservations]);
      });
  }, []);

  return <Wrapper>
    <SectionTitle>All reservations</SectionTitle>
    {allReservations.map((resersation) => {
      return <ReservationWrapper key={resersation.id}>
        <Text><Bold>Reservation ID:</Bold> {resersation.id}</Text>
        <Text><Bold>Flight / Seat:</Bold> {resersation.flightNumber} / {resersation.seat}</Text>
        <Text><Bold>Name:</Bold> {resersation.givenName} {resersation.surname}</Text>
        <Text className='separator'><Bold>Email:</Bold> {resersation.email}</Text>
        </ReservationWrapper>
    })}
    </Wrapper>;
};

const Wrapper = styled.div`
  margin: auto;
  border: 2px solid ${themeVars.alabamaCrimson};
  padding: 40px;
`;

const ReservationWrapper = styled.div`

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
  font-family: ${themeVars.contentFont};
`;

const Text = styled.p`
  font-family: ${themeVars.contentFont};
  padding-bottom: 10px;
  margin-bottom: 10px;
  margin-top: 16px;
  &.separator {
    border-bottom: 1px solid ${themeVars.alabamaCrimson};
  }
`;

export default Admin;
