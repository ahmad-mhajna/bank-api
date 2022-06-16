const fs = require("fs");
const path = require("path");
const pathToData = path.resolve(__dirname, "../data/users.json");
let users = JSON.parse(fs.readFileSync(pathToData).toString());
const getUsers = (req, res) => {
  res.send(users);
};
const getUser = (req, res) => {
  if (!users.find((user) => user.id === +req.params.id)) {
    return res.status(400).send("this user dose not exist");
  }
  res.send(users.find((user) => user.id === +req.params.id));
};
const getUserByamount = (req, res) => {
  if (users.find((user) => user.cash !== req.params.amount)) {
    return res.status(400).send("this user dose not exist");
  }
  res.send(users.find((user) => user.cash === req.params.amount));
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
  const id = +req.params.id;
  if (!users.find((user) => user.id === id)) {
    return res.status(400).send("this user does not exist");
  }
  users = users.filter((user) => user.id !== id);
  res.send(users);
};

const putUser = (req, res) => {
  const type = req.params.type;
  let { amount, id } = req.body;
  let user = users.find((user) => user.id === id);
  if (amount < 0) {
    return res.status(400).send("amount cant be negative");
  }
  if (type === "deposit") {
    user.cash += amount;
  }
  if (type === "credit") {
    user.credit = amount;
  }
  if (type === "withdraw") {
    if (user.cash + user.credit >= amount) {
      if (user.cash - amount <= 0) {
        amount -= user.cash;
        user.cash = 0;
        user.credit -= amount;
      } else user.cash -= amount;
    } else return res.status(400).send("not enough cash");
  }
  if (type === "transfer") {
    let transferUser = users.find((user) => user.id === req.body.transferID);

    if (user.cash + user.credit >= amount) {
      transferUser.cash += amount;
      if (user.cash - amount <= 0) {
        amount -= user.cash;
        user.cash = 0;
        user.credit -= amount;
      } else user.cash -= amount;
    } else return res.status(400).send("not enough cash");
  }
  res.send(users);
};

module.exports = {
  getUserByamount,
  getUsers,
  getUser,
  postUser,
  deleteUser,
  putUser,
};
