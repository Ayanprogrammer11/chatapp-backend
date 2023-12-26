const { initializeWebSocketServer } = require("./websocketManager");

const PORT = process.env.PORT;
initializeWebSocketServer(PORT);

// const WebSocket = require("ws");
// const wss = new WebSocket.Server({ port: 3000 });

// wss.on("connection", (ws) => {
//   let user = {};
//   ws.on("message", (message) => {
//     try {
//       const parsedMessage = JSON.parse(message);
//       if (parsedMessage.type === "username") {
//         user.username = parsedMessage.text;
//         console.log(`${user.username} joined the chat!`);
//         wss.clients.forEach((client) => {
//           client !== ws &&
//             client.send(
//               JSON.stringify({
//                 type: "join-user",
//                 text: `${user.username} joined the chat!`,
//                 username: user.username,
//               })
//             );
//         });
//       } else if (parsedMessage.type === "clientNum") {
//         wss.clients.forEach((client) =>
//           client.send(
//             JSON.stringify({
//               type: "clientNum",
//               text: wss.clients.size,
//             })
//           )
//         );
//       } else {
//         const text = parsedMessage.text;
//         // Sending message to all connected clients except who sended the message
//         wss.clients.forEach((client) => {
//           if (client.readyState === WebSocket.OPEN) {
//             client.send(
//               JSON.stringify({ type: "message", username: user.username, text })
//             );
//           }
//         });
//       }
//     } catch (err) {
//       console.error("Error occurred", err);
//     }
//   });

//   // Handling disconnection
//   ws.on("close", () => {
//     if (user?.username)
//       wss.clients.forEach((client) => {
//         if (client !== ws) {
//           client.send(
//             JSON.stringify({
//               type: "left-user",
//               username: user.username,
//               text: `${user.username} left the chat!`,
//             })
//           );
//         }
//       });
//   });
// });
