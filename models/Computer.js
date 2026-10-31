const mongoose = require("mongoose");

const computerSchema = new mongoose.Schema(
  {
    serialNumber: { type: String, require: true, unique: true },
    brand: { type: String, require: true, index: true },
    modelName: { type: String, require: true },
    formFactor: {
      type: String,
      enum: ["Desktop", "Laptop", "Server", "Mini-PC"],
      default: "Desktop",
      index: true,
    },
    status: {
      type: String,
      enum: ["Available", "maintenance", "deployed", "decomissioned", "sold"],
      default: "Available",
      index: true,
    },
    specs: {
      cpu: { type: String, required: true },
      ramGb: { type: Number, required: true, min: 4 },
      storageGb: { type: Number, required: true },
      storageType: {
        type: String,
        enum: ["SSD", "HDD", "NVMe"],
        default: "NVMe",
      },
      gpu: { type: String, default: "Integrated" },
    },
    modificationsLog: [
      {
        modifiedAt: { type: Date, default: Date.now },
        modifiedBy: { type: String, default: "System Admin" },
        notes: { type: String },
        changes: { type: mongoose.Schema.Types.Mixed },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Computer", computerSchema);