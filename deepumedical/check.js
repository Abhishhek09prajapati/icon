const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.URLCODE;  


app.get("/code", (req, res) => {
  res.send(port)
});



app.listen(port, () => {
  console.log("Server running on port");
});
