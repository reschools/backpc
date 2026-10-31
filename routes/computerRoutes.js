const express = require("express");
const router = express.Router();

const {
  getComputer,
  getComputerById,
  createComputer,
  updateComputer,
  deleteComputer,
} = require("../controllers/computerController");

router.route("/").get(getComputer).post(createComputer);

router
  .route("/:id")
  .get(getComputerById)
  .put(updateComputer)
  .delete(deleteComputer);
  
module.exports = router;
