"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { getFlights,
        getFlight,
        getReservations,
        addReservations,  
        getSingleReservation,
        deleteReservation,
        updateReservation, } = require("./handlers");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))
  .use(express.urlencoded({ extended: false }))
  // added this
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  // get flights (flight numbers)
  .get('/flights', getFlights)

  // retrive single flight data 
  .get('/flights/:flightNumber', getFlight)
  
  // retrive all reservations
  .get('/reservations', getReservations)

  // retrive a single reservation
  .get('/reservations/:id', getSingleReservation)

  // create a reservation
  .post('/reservations/', addReservations)

  // delete a reservation
  .delete('/reservations/:id', deleteReservation)

  // update a reservation
  .patch('/reservations/:id', updateReservation)

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
