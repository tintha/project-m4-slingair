import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SeatSelect from "./SeatSelect";
import Confirmation from "./Confirmation";
import Reservation from "./Reservation";
import Profile from "./Profile";
import Admin from "./Admin";
import GlobalStyles, { themeVars } from "./GlobalStyles";


const App = () => {
  const [userReservation, setUserReservation] = useState({});
  const [adminPage, setAdminPage] = useState(false);
 
  const updateUserReservation = (newData) => {
    setUserReservation({...userReservation, ...newData});
  };

  useEffect(() => {
    // check localStorage for an id
    // if yes, get data from server and add it to state
    let currentId = localStorage.getItem('id');
    if (currentId || currentId !== '') {
      fetch(`/reservations/${currentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((res) => res.json())
      .then((data) => {
        updateUserReservation({...data.data.reservation});
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header 
        adminPage={adminPage}
        />
      <Main>
        <Switch>
          <Route exact path="/">
            <SeatSelect updateUserReservation={updateUserReservation}/>
          </Route>
          <Route exact path="/confirmed">
            <Confirmation user={userReservation}/>
          </Route>
          <Route exact path="/view-reservation">
            <Reservation user={userReservation} />
          </Route>
          <Route exact path="/profile">
            <Profile user={userReservation} updateUserReservation={updateUserReservation}/>
          </Route>
          <Route exact path="/admin">
            <Admin setAdminPage={setAdminPage} />
          </Route>
          <Route path="">404: Oops!</Route>
        </Switch>
        <Footer />
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.div`
  background: ${themeVars.background};
  display: flex;
  flex-direction: column;
  height: calc(100vh - 110px);
`;

export default App;
