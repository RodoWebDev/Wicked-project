const express = require('express')

const auth = require("./auth");
const user = require("./user");
const client = require("./client");
const setting = require("./setting");

const router = express.Router()

router.get('/health', (req, res) => {
    res.send('OK')
  })

router.use("/auth", auth);
router.use("/users", user);
router.use("/clients", client);
router.use("/settings", setting);

module.exports = router
