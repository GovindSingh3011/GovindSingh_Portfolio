const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        organization: { type: String, required: true },
        dateCompleted: { type: String, required: true },
        url: { type: String, required: true },
    },
);

module.exports = mongoose.model("Certificate", certificateSchema);
