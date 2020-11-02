import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "../GlobalStyles";

const FlightSelect = ({ flightNumber, handleFlightSelect, flights }) => {

  return (
    <Wrapper>
      <label htmlFor="flight">Flight Number :</label>
        <select value={flightNumber} onChange={handleFlightSelect} >
        
          {flights.map((num) => {
            return <option value={num} key={num}>{num}</option>
          })}
        </select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${themeVars.cadmiumRed};
  height: 80px;
  display: flex;
  align-items: center;
  padding: ${themeVars.pagePadding};
  margin-bottom: ${themeVars.pagePadding};
`;

export default FlightSelect;
