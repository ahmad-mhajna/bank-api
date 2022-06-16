const express = require("express");
const fs = require("fs");
const cors = require("cors");
const server = express();
const port = process.env.PORT || 5000;
let users = fs.readFileSync(`${__dirname}/data/users.json`).toString();
console.log(users);
server.use(express.json());
server.get("/users", (req, res) => {
  res.send(users);
});

server.post("/users", (req, res) => {
  if (users.includes(...req.body)) {
    return res.status(400).send("Number already Exists!");
  }
  users.push(...req.body);
  res.send(users);
});
server.delete("/users/:number", (req, res) => {
  const number = Number(req.params.number);
  if (!users.includes(number)) {
    return res.status(400).send("this number does not exist");
  }
  users = users.filter((num) => num !== number);
  res.send(users);
});
server.put("/users/:number", (req, res) => {
  const number = Number(req.params.number);
  if (!users.includes(number)) {
    return res.status(400).send("this number does not exist");
  }
  users.splice(users.indexOf(number), 1, ...req.body);
  res.send(users);
});

server.listen(port, () => {
  console.log(`Server is up and listening on Port ${port}`);
});
