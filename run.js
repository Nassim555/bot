const { exec } = require("child_process");
require("dotenv").config();
const express = require("express");

const tokens = JSON.parse(process.env.tokens);
const port = 2000;
const app = express();
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

console.log("run", tokens);
tokens.forEach((element) => {
  const childProcess = exec(
    "node index.js",
    { env: { token: element.token, id: element.id } },
    (error, stdout, stderr) => {
      if (error) {
        console.log("error:", error);
        return;
      }
      if (stderr) {
        console.log("stderr:", stderr);
        return;
      }
      console.log("output", stdout);
      console.log(process.env.token1);
    },
  );
  process.on("SIGINT", () => {
    server.close(() => {
      console.log("process is killed");
      childProcess.kill();
      process.exit(0);
    });
  });
});
