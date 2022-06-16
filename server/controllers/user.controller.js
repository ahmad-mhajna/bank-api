const fs = require("fs");
const path = require("path");
const pathToData = path.resolve(__dirname, "../data/users.json");
let users = JSON.parse(fs.readFileSync(pathToData).toString());
let activeUsers = users.filter((user) => user.isActive === true);
const getUsers = (req, res) => {
  res.send(activeUsers);
};

const getUser = (req, res) => {
  if (!activeUsers.find((user) => user.id === +req.params.id)) {
    return res.status(400).send("this user dose not exist");
  }
  res.send(activeUsers.find((user) => user.id === +req.params.id));
};

const getUsersByAmount = (req, res) => {
  if (!activeUsers.find((user) => user.cash === +req.params.amount)) {
    return res.status(400).send("this user dose not exist");
  }
  const usersfillterd = activeUsers.filter(
    (user) => user.cash === +req.params.amount
  );
  res.send(usersfillterd);
};

const getUsersByIsActive = (req, res) => {
  let isActive =
    req.params.isActive === "true"
      ? true
      : req.params.isActive === "false"
      ? false
      : "";
  if (isActive === "") {
    return res.status(400).send("invalid isActive param");
  }
  if (!users.find((user) => user.isActive === isActive)) {
    return res.status(400).send("this user dose not exist");
  }
  const usersfillterd = users.filter((user) => user.isActive === isActive);
  res.send(usersfillterd);
};

const postUser = (req, res) => {
  if (users.find((user) => user.id === req.body.id)) {
    return res.status(400).send("user already Exists!");
  }
  if (typeof req.body.id !== "number") {
    return res.status(400).send("it should be a number");
  }
  const user = {
    id: req.body.id,
    cash: +req.body.cash || 0,
    credit: +req.body.credit || 0,
    isActive: true,
  };
  activeUsers.push(user);
  res.send(activeUsers);
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
  let id = +req.body.id;
  let amount = req.body.amount;
  let transferID = +req.body.transferID;
  if (id === transferID)
    return res.status(400).send("you cant transfer to your self");

  if (!amount) return res.status(400).send("Amount is undefined");
  let user = activeUsers.find((user) => user.id === id);
  if (!user) return res.status(400).send("user doesnt exist");
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
    let transferUser = activeUsers.find((user) => user.id === transferID);
    if (!transferUser) return res.status(400).send("transferUser doesnt exist");

    if (user.cash + user.credit >= amount) {
      transferUser.cash += amount;
      if (user.cash - amount <= 0) {
        amount -= user.cash;
        user.cash = 0;
        user.credit -= amount;
      } else user.cash -= amount;
    } else return res.status(400).send("not enough cash");
  }
  res.send(activeUsers);
};

module.exports = {
  getUsersByAmount,
  getUsers,
  getUser,
  postUser,
  deleteUser,
  putUser,
  getUsersByIsActive,
};
