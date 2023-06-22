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

//create new match

app.get("/createMatch", async (req, res) => {
  const match = new Match({ MatchId: "ef884c07-5b63-4a42-ac72-3947471c43e5" });
  match
    .save()
    .then((result) => {
      res.status(201).json({
        type: "success",
        data: result,
      });
    })
    .catch((err) => {
      res.status(201).json({
        type: "error",
        message: err,
      });
    });
});

//API_ROUTES
//Get Matches
app.get("/fanisko", async (req, res) => {
  await Match.find()
    .then((result) => {
      console.log(result);
      res.render("index", { id: result[0].MatchId });
    })
    .catch((err) => {
      console.log(err);
      res.status(201).json({
        type: "error",
        message: err,
      });
    });
});

app.get("/fanisko2", async (req, res) => {
  await Match.find()
    .then((result) => {
      console.log(result);
      res.render("index2", { id: result[1].MatchId });
    })
    .catch((err) => {
      console.log(err);
      res.status(201).json({
        type: "error",
        message: err,
      });
    });
});
//Get Matches api
app.get("/fanisko/api/match1", async (req, res) => {
  await Match.find()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        type: "success",
        id: result[0].MatchId,
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

app.get("/fanisko/api/match2", async (req, res) => {
  await Match.find()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        type: "success",
        id: result[1].MatchId,
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
//Post new Data of Matches
app.post("/fanisko", async (req, res) => {
  console.log("Req__BODY-->", req.body);

  await Match.findOneAndUpdate(
    { MatchId: req.body.matchIdOld },
    {
      MatchId: req.body.matchId,
    }
  )
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

app.post("/fanisko2", async (req, res) => {
  console.log(req.body.matchId);
  // const id = req.body.matchIdOld.replace(/['"]+/g, "");
  await Match.findOneAndUpdate(
    { MatchId: req.body.matchIdOld },
    {
      MatchId: req.body.matchId,
    }
  )
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
