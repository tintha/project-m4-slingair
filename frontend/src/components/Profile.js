import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { themeVars } from "./GlobalStyles";

const Profile = (props) => {
  const { updateUserReservation } = props;
  const { seat, givenName, surname, email, flightNumber, id, customerId } = props.user;
  const [updateData, setUpdateData] = useState({newName: givenName, newSurname: surname, newEmail: email});
  const [subStatus, setSubStatus] =  useState('iddle');
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    // This hook is listening to state changes and verifying whether or not all
    // of the form data is filled out.
    Object.values(updateData).includes("")
      ? setDisabled(true)
      : setDisabled(false);
  }, [updateData, setDisabled]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdateData({...updateData, [name]: value});
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`/reservations/${id}`, {
      method: "PATCH",
      body: JSON.stringify({...updateData}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const { status, data } = json;
        if (status === 200) {
        setSubStatus("confirmed");
        updateUserReservation({...data.reservation});
        } else {
          setSubStatus("error");
        }
      });
  }
  return <Wrapper>
    {subStatus === 'iddle' &&
    <>
    <SectionTitle>Welcome, {givenName}</SectionTitle>
    <Text><Bold>First name: </Bold>{givenName}</Text>
    <Text><Bold>Last name:</Bold> {surname}</Text>
    <Text><Bold>Email:</Bold> {email}</Text>
    <Updatebtn onClick={() => setSubStatus('edit')}>Edit</Updatebtn>
    </>}
    {subStatus === 'edit' && 
    <>
    <SectionTitle>Update your profile</SectionTitle>
    <form onSubmit={handleUpdate}>
      <Text><Bold>First Name:</Bold></Text>
      <Input 
        name='newName' 
        value={updateData.newName} 
        onChange={handleChange} 
        type="text" /> 
      <Text><Bold>Last Name:</Bold></Text>
      <Input 
        name='newSurname' 
        value={updateData.newSurname} 
        onChange={handleChange} 
        type="text" />
      <Text><Bold>Email:</Bold></Text>
      <Input 
        name='newEmail' 
        value={updateData.newEmail} 
        onChange={handleChange} 
        type="email" />
      <Updatebtn 
        type="submit" 
        onClick={handleUpdate}
        disabled={isDisabled}>
          Update
      </Updatebtn>
    </form>
    </>
}
    {subStatus === 'confirmed' && 
    <>
    <SectionTitle>Profile updated</SectionTitle>
    <Text><Bold>First name: </Bold>{givenName}</Text>
    <Text><Bold>Last name:</Bold> {surname}</Text>
    <Text><Bold>Email:</Bold> {email}</Text>
    <Updatebtn onClick={() => setSubStatus('iddle')}>Go back</Updatebtn>
    </>}
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
  font-family: ${themeVars.contentFont};
`;

const Text = styled.p`
  font-family: ${themeVars.contentFont};
  padding-bottom: 10px;
  margin-bottom: 10px;
  margin-top: 16px;
`;

const Input = styled.input`
  background-color: ${themeVars.background};
  border: 1px solid ${themeVars.alabamaCrimson};
  color: black;
`;

const Updatebtn = styled.button`
  background-color: ${themeVars.alabamaCrimson};
  color: white;
  margin-top: 20px;
  display: block;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    background-color: ${themeVars.desertSand};
  }
`;

export default Profile;
