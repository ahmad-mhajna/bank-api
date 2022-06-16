let users = fs.readFileSync(`${__dirname}/data/users.json`).toString();

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
  const number = Number(req.params.number);
  if (!users.includes(number)) {
    return res.status(400).send("this number does not exist");
  }
  users.splice(users.indexOf(number), 1, ...req.body);
  res.send(users);
};

module.exports = { getUsers, getUser, postUser, deleteUser, putUser };
