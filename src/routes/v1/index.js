const express = require("express");
const { create, update } = require("../../controllers/index");
const router = express.Router();


router.post('/bookings', create)
// what all should be allowed to update and what not
// still to be reviewed
router.patch('/bookings/:id', update)

module.exports = router;