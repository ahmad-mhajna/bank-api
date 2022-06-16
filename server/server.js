const express = require("express");
const fs = require("fs");
const cors = require("cors");
const UserRouter = require("./routes/user.routes");
const server = express();
const port = process.env.PORT || 5000;
let users = fs.readFileSync(`${__dirname}/data/users.json`).toString();
server.use(express.json());
server.use(cors());
server.use("/", UserRouter);

server.listen(port, () => {
  console.log(`Server is up and listening on Port ${port}`);
});
