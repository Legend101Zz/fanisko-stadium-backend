if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const mongoose = require("mongoose");
const Match = require("./models/match.schema");

const cors = require("cors");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API_ROUTES
app.get("/fanisko", async (req, res) => {
  await Match.findOne()
    .then((result) => {
      console.log(result);
      res.render("index", { id: result.MatchId });
    })
    .catch((err) => {
      console.log(err);
      res.status(201).json({
        type: "error",
        message: err,
      });
    });
});

app.get("/fanisko/api", async (req, res) => {
  await Match.findOne()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        type: "success",
        id: result.MatchId,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(201).json({
        type: "error",
        message: err,
      });
    });
});

app.post("/fanisko", async (req, res) => {
  console.log(req.body.matchId);
  await Match.findOneAndUpdate({ MatchId: req.body.matchId })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        type: "success",
        message: "updated Match Id successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(201).json({
        type: "error",
        message: err,
      });
    });
});

//ROUTE TO HANDLE RANDOM URLS

app.all("*", (req, res, next) => {
  res.redirect("/fanisko");
});

// SERVER CONNECTION
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("Database Connected!!");
    const server = app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
