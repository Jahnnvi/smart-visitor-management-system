const mongoose = require("mongoose");

const visitorLogSchema = new mongoose.Schema(
    {
    visitorId: {
        type: String,
        required: true,
        index: true,
    },

    guestName: { type: String, required: true },
    guestPhone: { type: String, required: true },
    guestEmail: { type: String, default: "" },

    visitorType: {
        type: String,
        enum: ["Pre-Registered", "On-the-Spot"],
        default: "Pre-Registered",
    },

    purpose: { type: String, default: "" },
    organization: { type: String, default: "" },

    visitDate: { type: Date, required: true },

    checkInTime: { type: Date, required: true },
    checkOutTime: { type: Date, default: null },

    status: {
        type: String,
        enum: ["checked-in", "checked-out"],
        default: "checked-in",
        },
    },
    { timestamps: true }
    );

module.exports = mongoose.model("VisitorLog", visitorLogSchema);
