const express = require("express");

const port = 2000;
const app = express();
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
app.get('/', (req, res) => {
  res.send("bot is alive");
});
