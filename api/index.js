const express = require("express");
const router = express.Router();

router.use("/meeting", require("./meeting"));

router.all("/", async (req, res) => {
    return res.status(401).json({ sucess: false });
});

module.exports = router;
