const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

mongoose.connect("mongodb://127.0.0.1:27017/taskpromo")
    .then(() => {
        console.log("✅ MongoDB Connected");
    })
    .catch((err) => {
        console.log("❌ MongoDB Connection Error:", err);
    });






app.get("/", (req, res) => {
    res.send("Server Running ✅");
});

app.listen(port, () => {
    console.log("✅ Server started on port:", port);
});
