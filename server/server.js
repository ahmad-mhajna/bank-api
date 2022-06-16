const express = require("express");
const fs = require("fs");
const cors = require("cors");
const server = express();
const pathToUsers = path.join(__dirname, "./data/users.json");
const port = process.env.PORT || 5000;
server.use(express.json());
server.get("/numbers", (req, res) => {
  res.send(users);
});

server.post("/numbers", (req, res) => {
  if (numbers.includes(...req.body)) {
    return res.status(400).send("Number already Exists!");
  }
  numbers.push(...req.body);
  res.send(numbers);
});
server.delete("/numbers/:number", (req, res) => {
  const number = Number(req.params.number);
  if (!numbers.includes(number)) {
    return res.status(400).send("this number does not exist");
  }
  numbers = numbers.filter((num) => num !== number);
  res.send(numbers);
});
server.put("/numbers/:number", (req, res) => {
  const number = Number(req.params.number);
  if (!numbers.includes(number)) {
    return res.status(400).send("this number does not exist");
  }
  numbers.splice(numbers.indexOf(number), 1, ...req.body);
  res.send(numbers);
});

server.listen(port, () => {
  console.log(`Server is up and listening on Port ${port}`);
});
