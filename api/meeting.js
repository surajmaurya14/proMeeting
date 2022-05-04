const express = require("express");
const router = express.Router();

const { v4: uuidV4 } = require("uuid");

router.get("/join/:roomId", (req, res) => {
    const roomId = req.params.roomId;
    return res.status(200).json({ success: true });
});

router.get("/create", (req, res) => {
    const roomId = uuidV4();
    return res.status(200).json({ success: true, roomId: roomId });
});

router.all("/", async (req, res) => {
    return res.status(401).json({ sucess: false });
});

module.exports = router;
