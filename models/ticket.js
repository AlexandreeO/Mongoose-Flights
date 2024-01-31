const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    seat: {
        type: String,
        match: /^[A-F][1-9]\d?$/, // Regex for 'A1' through 'F99'
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flight",
        required: true,
    },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
