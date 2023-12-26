const WebSocket = require("ws");
const { handleMessage } = require("./messageHandler");

function initializeWebSocketServer(port) {
  const wss = new WebSocket.Server({ port });
  const users = [];
  wss.on("connection", (ws) => {
    let user = {};
    users.push(user);
    ws.on("message", (message) => {
      handleMessage(users, user, wss, ws, message);
    });

    ws.on("close", () => {
      users.splice(
        users.findIndex((item) => item === user),
        1
      );
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
