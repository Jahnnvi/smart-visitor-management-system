const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    // Who created the request
    createdByRole: {
      type: String,
      enum: ["guest", "faculty","security"],
      required: true,
    },

    // -------------------------
    // Faculty Details (optional if guest creates)
    // -------------------------
    facultyName: {
      type: String,
      required: function () {
        return this.createdByRole === "faculty";
      },
    },

    facultyEmail: {
      type: String,
      required: function () {
        return this.createdByRole === "faculty";
      },
    },

    facultyId: {
      type: String,
      required: function () {
        return this.createdByRole === "faculty";
      },
    },

    department: {
      type: String,
      required: function () {
        return this.createdByRole === "faculty";
      },
    },

    // -------------------------
    // Guest Details (always required)
    // -------------------------
    guestName: {
      type: String,
      required: true,
      trim: true,
    },

    guestEmail: {
      type: String,
      trim: true,
    },

    guestPhone: {
      type: String,
      required: true,
      trim: true,
    },

    organization: {
      type: String,
      default: "",
    },

    purpose: {
      type: String,
      required: true,
      trim: true,
    },

    visitDate: {
      type: Date,
      required: true,
    },

    // -------------------------
    // Status Flow
    // -------------------------
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "checked-in", "checked-out"],
      default: "pending",
    },

    // Unique Visitor ID
    visitorId: {
      type: String,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

// -------------------------
// Generate Unique visitorId
// -------------------------
visitorSchema.pre("save", async function () {
  if (!this.visitorId) {
    let isUnique = false;
    let visitorId;

    while (!isUnique) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const randomNumber = String(Math.floor(Math.random() * 10000)).padStart(4, "0");

      visitorId = `VST-${year}${month}${day}-${randomNumber}`;

      const existing = await mongoose
        .model("Visitor")
        .findOne({ visitorId });

      if (!existing) {
        isUnique = true;
      }
    }

    this.visitorId = visitorId;
  }

  // ❌ REMOVE next()
});

module.exports = mongoose.model("Visitor", visitorSchema);
