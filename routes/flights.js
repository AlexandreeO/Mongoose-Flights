const express = require("express");
const router = express.Router();
const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

// View all flights
router.get("/", async (req, res) => {
    try {
        const flights = await Flight.find();
        res.render("flights/index", { flights });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// New flight form
router.get("/new", (req, res) => {
    res.render("flights/new");
});

// View flight details including tickets
router.get("/:id", async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);

        if (flight) {
            const tickets = await Ticket.find({ flight: flight._id });
            res.render("flights/show", { flight, tickets });
        } else {
            res.status(404).send("Flight not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Handle form submission to add a new destination
router.post("/:id/add-destination", async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        const newDestination = {
            airport: req.body.newAirport,
            arrival: new Date(req.body.newArrival),
        };

        flight.destinations.push(newDestination);
        await flight.save();

        res.redirect(`/flights/${req.params.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Create new flight
router.post("/", async (req, res) => {
    try {
        await Flight.create(req.body);
        res.redirect("/flights");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
