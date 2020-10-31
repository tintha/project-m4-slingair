"use strict";

const { relativeTimeThreshold } = require("moment");
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

//  Use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");

// get flight numbers
const getFlights = (req, res) => {
  const flightNumbers = Object.keys(flights);
  if (!flightNumbers) {
    res.status(404).json({
      status: 404,
      message: 'Flight number not found'
    })
  } else {
    res.status(200).json({
      status: 200, 
      data: { flightNumbers }, 
      });
  }
};

// get flight seating data
const getFlight = (req, res) => {
  const { flightNumber } = req.params;
  const flightData = flights[flightNumber];
  if (!flightData) {
    res.status(404).json({
      status: 404,
      message: 'Flight not found'
    })
  } else {
    res.status(200).json({
      status: 200,
      data: { flightData }
    })
  }
};

// add reservation
const addReservations = (req, res) => {
  const newReservation = req.body;
  const {
    flightNumber,
    seat,
    givenName,
    surname,
    email
    } = newReservation;
  console.log(newReservation);
  // generate an ID for the reservation
  newReservation.id = uuidv4();
  // I think all validations are handled by the FE?
  reservations.push(newReservation);
  res.status(201).json({
    status: 201,
    data: { newReservation }
  })
}

// get all reservations
const getReservations = (req, res) => {
  if (!reservations || reservations.length === 0) {
    res.status(404).json({
      status: 404,
      message: "No reservations found"
    })
  } else {
    res.status(200).json({
      status: 200,
      data: { reservations }
    })
  }
};

// get single reservation data
const getSingleReservation = (req, res) => {
  const { id } = req.params;
  const reservation = reservations.find((reserv) => reserv.id === id );
  if (!reservation) {
    res.status(404).json({
      status: 404,
      data: { id },
      message: 'Reservation not found'
    })
  } else {
    res.status(200).json({
      status: 200,
      data: { reservation }
    })
  }
};

// delete a reservation
const deleteReservation = (req, res) => {
  const { id } = req.params;
  // find the reservation
  const reservation = reservations.find((reserv) => reserv.id === id);
  // get its index
  const theIndex = reservations.indexOf(reservation);
  
  if (!reservation) {
    res.status(404).json({
      status: 404,
      data: { id },
      message: 'Reservation not found'
    })
  } else {
    // remove the reservation
    reservations.splice(theIndex, 1);
    res.status(202).json({
      status: 202,
      message: 'Reservation deleted'
    })
  }
};

// update a reservation
const updateReservation = (req, res) => {
  const { id } = req.params;
  const newUpdate = req.body;
  const { newName, newSurname, newEmail } = newUpdate;
  // find the reservation
  const reservation = reservations.find((reserv) => reserv.id === id);
  // update properties... 
  reservation.givenName = `${newName}`;
  reservation.surname = `${newSurname}`;
  reservation.email = `${newEmail}`;

  if (!reservation) {
    res.status(404).json({
      status: 404,
      data: { id },
      message: 'Reservation not found'
    })
  } else {
    res.status(200).json({
      status: 200,
      data: { reservation }
    })
  }
};


module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservations,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
