const express = require("express");
const router = express.Router();
const { getStaff, getTutors, getMemberCount } = require("../controllers/getController");


router.get("/staff/:rolecd", async (req, res) => {
  const result = await getStaff(req.params.rolecd);
  return res.status(200).json(result);
});


router.get("/tutors", async (req, res) => {
  const result = await getTutors();
  return res.status(200).json(result);
});


router.get("/membercount", async (req, res) => {
  const result = await getMemberCount();
  return res.status(200).json(result);
});


module.exports = router;
