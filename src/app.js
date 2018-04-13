const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const Message = require("./message");

let messages = require("./messages");

const makePath = fileName => {
  return path.resolve(__dirname, "..", "public", fileName);
};

app.use(express.static(path.resolve(__dirname, "..", "public")));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(makePath("index.html"));
});

app.get("/click", (req, res) => {
  res.sendFile(makePath("click.html"));
});

app.get("/scroll", (req, res) => {
  res.sendFile(makePath("scroll.html"));
});

app.get("/observer", (req, res) => {
  res.sendFile(makePath("observer.html"));
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/messages", (req, res) => {
  const messagesToUpdate = req.body.viewedMessages || [];

  messages = messages.map(msg => {
    if (messagesToUpdate.indexOf(msg.id) != -1)
      return Message(msg.id, msg.message, true);

    return msg;
  });

  res.json(messages);
});

module.exports = app;
