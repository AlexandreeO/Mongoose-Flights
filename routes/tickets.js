// routes/tickets.js

const express = require("express");
const router = express.Router({ mergeParams: true }); // Merge params to access :id from the parent route
const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

// Display form to create a new ticket
router.get("/new", async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        res.render("tickets/new", { flight });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Create a new ticket
router.post("/", async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);

        if (flight) {
            const ticketData = {
                seat: req.body.seat,
                price: req.body.price,
                flight: flight._id,
            };

            const newTicket = await Ticket.create(ticketData);
            res.redirect(`/flights/${flight._id}`);
        } else {
            res.status(404).send("Flight not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Delete a ticket
router.delete("/:ticketId", async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        if (!flight) return res.status(404).send("Flight not found");

        const ticket = await Ticket.findByIdAndDelete(req.params.ticketId);
        if (!ticket) return res.status(404).send("Ticket not found");

        res.redirect(`/flights/${flight._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
