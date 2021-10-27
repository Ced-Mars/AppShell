const express = require("express");
const path = require('path');

const app = express(); // create express app
const PORT = 5005;

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// start express server on port 5000
app.listen(PORT, () => {
  console.log("server started on port ", PORT);
});