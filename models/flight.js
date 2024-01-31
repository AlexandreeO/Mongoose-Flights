const mongoose = require("mongoose");
const destinationSchema = require("./destination");

const flightSchema = new mongoose.Schema({
    airline: {
        type: String,
        enum: ["American", "Southwest", "United"],
        required: true,
    },
    airport: {
        type: String,
        enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
        default: "DEN",
    },
    destinations: {
        type: [destinationSchema], // Using the destinationSchema as a subdocument array
        required: true,
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999,
    },
    departs: {
        type: Date,
        default: () => {
            const oneYearFromNow = new Date();
            oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
            return oneYearFromNow;
        },
    },
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
