import express from 'express'

const port = process.env.PORT || 8080;
const app = express();
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
app.get('/', (req, res) => {
  res.send("bot is alive");
});
