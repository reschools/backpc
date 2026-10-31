const mongoose = require("mongoose");
const Computer = require("./models/Computer");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pc";

const sampleComputer = [
  {
    serialNumber: "SN-DELL-001",
    brand: "Dell",
    modelName: "Latitude 5420",
    formFactor: "Laptop",
    status: "Available",
    specs: {
      cpu: "Intel® Core™ i5-1145G7 (4 cores, up to 4.4 GHz)",
      ramGb: 16,
      storageGb: 256,
      storageType: "SSD",
      gpu: "Intel Iris Xe Graphics",
    },
  },
  {
    serialNumber: "SN-DELL-002",
    brand: "Dell",
    modelName: "Latitude 5420",
    formFactor: "Laptop",
    status: "Available",
    specs: {
      cpu: "Intel® Core™ i5-1145G7 (4 cores, up to 4.4 GHz)",
      ramGb: 16,
      storageGb: 256,
      storageType: "SSD",
      gpu: "Intel Iris Xe Graphics",
    },
  },
  {
    serialNumber: "SN-DELL-003",
    brand: "Dell",
    modelName: "Latitude 5420",
    formFactor: "Laptop",
    status: "Available",
    specs: {
      cpu: "Intel® Core™ i5-1145G7 (4 cores, up to 4.4 GHz)",
      ramGb: 16,
      storageGb: 256,
      storageType: "SSD",
      gpu: "Intel Iris Xe Graphics",
    },
  },
  {
    serialNumber: "SN-DELL-004",
    brand: "Dell",
    modelName: "Latitude 5420",
    formFactor: "Laptop",
    status: "Available",
    specs: {
      cpu: "Intel® Core™ i5-1145G7 (4 cores, up to 4.4 GHz)",
      ramGb: 16,
      storageGb: 256,
      storageType: "SSD",
      gpu: "Intel Iris Xe Graphics",
    },
  },
  {
    serialNumber: "SN-DELL-005",
    brand: "Dell",
    modelName: "Latitude 5420",
    formFactor: "Laptop",
    status: "Available",
    specs: {
      cpu: "Intel® Core™ i5-1145G7 (4 cores, up to 4.4 GHz)",
      ramGb: 16,
      storageGb: 256,
      storageType: "SSD",
      gpu: "Intel Iris Xe Graphics",
    },
  },
  {
    serialNumber: "SN-DELL-006",
    brand: "Dell",
    modelName: "Latitude 5420",
    formFactor: "Laptop",
    status: "Available",
    specs: {
      cpu: "Intel® Core™ i5-1145G7 (4 cores, up to 4.4 GHz)",
      ramGb: 16,
      storageGb: 256,
      storageType: "SSD",
      gpu: "Intel Iris Xe Graphics",
    },
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    await Computer.deleteMany({});
    console.log("All Data Cleared");

    await Computer.insertMany(sampleComputer);
    console.log("New Data is set on Database");
    process.exit();
  } catch (err) {
    console.error("Seeding Error", err);
    process.exit(1);
  }
}
seedDatabase()