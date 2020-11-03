import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "./GlobalStyles";

const Admin = ({setAdminPage}) => {
  const [allReservations, setAllReservations] = useState([]);

  const handleDelete = (id) => {
    fetch(`/reservations/${id}`, {
      method: "DELETE",
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 202) {
          const updatedReservations = allReservations.filter((reservation) => reservation.id !== id);
          setAllReservations(updatedReservations);
        } 
      })
    };

  useEffect(() => {
    setAdminPage(true);
    fetch('/reservations/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
      })
      .then((res) => res.json())
      .then(( data ) => {
        if (data.status === 200) {
          setAllReservations([...allReservations,...data.data.reservations]); 
        } else if (data.status === 404) {
          setAllReservations([]);
        }
      });
  }, []);

  return <Wrapper>
    <SectionTitle>Reservations</SectionTitle>
    {allReservations.length >= 1 ? allReservations.map((reservation) => {
      return <ReservationWrapper key={reservation.id}>
        <Text><Bold>Reservation ID:</Bold> {reservation.id}</Text>
        <Text><Bold>Flight / Seat:</Bold> {reservation.flightNumber} / {reservation.seat}</Text>
        <Text><Bold>Name:</Bold> {reservation.givenName} {reservation.surname}</Text>
        <Text><Bold>Email:</Bold> {reservation.email}</Text>
        <Button type="submit" onClick={() => { handleDelete(reservation.id)}}>Delete</Button>
      </ReservationWrapper>
    }) : <><Text>There are no reservations.</Text></>}
    </Wrapper>;
};

const Wrapper = styled.div`
  margin: auto;
  border: 2px solid ${themeVars.alabamaCrimson};
  padding: 40px;
`;

const ReservationWrapper = styled.div`
  border: 1px solid ${themeVars.alabamaCrimson};
  padding: 10px;
  border-radius: 1rem;
  margin: 10px;
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
  padding-bottom: 2px;
  margin-bottom: 2px;
  margin-top: 2px;
`;

const Button = styled.button`
  color: white;
  background-color: ${themeVars.alabamaCrimson};
  margin-left: 80%;
  cursor: pointer;
  font-family: ${themeVars.contentFont};
  font-size: 1rem;
`;

export default Admin;
