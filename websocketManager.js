const WebSocket = require("ws");
const { handleMessage } = require("./messageHandler");

function initializeWebSocketServer(port) {
  const wss = new WebSocket.Server({ port });

  wss.on("connection", (ws) => {
    let user = {};
    ws.on("message", (message) => {
      handleMessage(user, wss, ws, message);
    });

    ws.on("close", () => {
      if (user?.username)
        wss.clients.forEach((client) => {
          if (client !== ws) {
            client.send(
              JSON.stringify({
                type: "left-user",
                username: user.username,
                text: `${user.username} left the chat!`,
              })
            );
          }
        });
    });
  });
}

module.exports = { initializeWebSocketServer };
