const Message = require("./message");
const messages = [];

for (let i = 0; i < 100; i++) {
  messages.push(Message(i, `foo ${i}`));
}

module.exports = messages;
