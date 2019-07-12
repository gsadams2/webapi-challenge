const express = require("express");
const projectRouter = require("./routers/projectRouter");
const actionRouter = require("./routers/actionRouter");

const server = express();

server.use(logger);
server.use(express.json());

server.use("/project", projectRouter);
server.use("/action", actionRouter);

server.get("/", (req, res) => {
  res.send(`<h2>I'll be a monkey's uncle</h2>`);
});

//custom middleware
function logger(req, res, next) {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);

  next();
}

module.exports = server;
