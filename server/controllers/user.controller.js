const fs = require("fs");
const path = require("path");
const pathToData = path.resolve(__dirname, "../data/users.json");
let users = JSON.parse(fs.readFileSync(pathToData).toString());
const getUsers = (req, res) => {
  res.send(users);
};
const getUser = (req, res) => {
  res.send(users.find((user) => user.id === req.params.id));
};
const postUser = (req, res) => {
  if (users.find((user) => user.id === req.body.id)) {
    return res.status(400).send("user already Exists!");
  }
  const user = {
    id: req.body.id,
    cash: req.body.cash ?? 0,
    credit: req.body.credit ?? 0,
  };
  users.push(user);
  res.send(users);
};
const deleteUser = (req, res) => {
  const id = req.params.id;
  if (!users.find((user) => user.id === id)) {
    return res.status(400).send("this user does not exist");
  }
  users = users.filter((user) => user.id !== id);
  res.send(users);
};

const putUser = (req, res) => {
  console.log(typeof users);
  const type = req.params.type;
  if (type === "deposit") {
    let user = users.find((user) => user.id === req.body.id);
    user.cash += req.body.amount;
  }
  res.send(users);
};

module.exports = { getUsers, getUser, postUser, deleteUser, putUser };
