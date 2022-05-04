const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const app = express();
    const server = require("http").Server(app);

    // Server to be used for socket connection. Socket requires server for interaction.
    const io = require("socket.io")(server);

    io.on("connection", (socket) => {
        socket.on("join-room", (roomId, userId) => {
            socket.join(roomId);
            socket.to(roomId).emit("user-connected", userId);

            socket.on("disconnect", () => {
                socket.to(roomId).emit("user-disconnected", userId);
            });
        });
    });

    app.use("/api", require("./api"));

    app.all("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
