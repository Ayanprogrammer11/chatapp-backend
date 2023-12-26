function handleMessage(user, wss, ws, message) {
  try {
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.type === "username") {
      user.username = parsedMessage.text;
      console.log(`${user.username} joined the chat!`);
      wss.clients.forEach((client) => {
        client !== ws &&
          client.send(
            JSON.stringify({
              type: "join-user",
              text: `${user.username} joined the chat!`,
              username: user.username,
            })
          );
      });
    } else if (parsedMessage.type === "clientNum") {
      wss.clients.forEach((client) =>
        client.send(
          JSON.stringify({
            type: "clientNum",
            text: wss.clients.size,
          })
        )
      );
    } else {
      const text = parsedMessage.text;
      // Sending message to all connected clients except who sended the message
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(
            JSON.stringify({ type: "message", username: user.username, text })
          );
        }
      });
    }
  } catch (err) {
    console.error("Error occurred", err);
  }
}

module.exports = { handleMessage };
