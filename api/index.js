const express = require("express");
var cors = require("cors");
var mongodb = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

//mongodb  set up
var MongoClient = mongodb.MongoClient;
var url =
  "";

app.get("/getall", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("sample");
    dbo
      .collection("VacationCard")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
        db.close();
      });
  });
});

app.post("/card", (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("sample");
    var myobj = req.body;
    dbo.collection("VacationCard").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
  res.sendStatus(200);
});

app.delete("/card/:id", (req, res) => {
  console.log(req.params.id);

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("sample");
    var myquery = { _id: new mongodb.ObjectID(req.params.id) };
    dbo.collection("VacationCard").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  });
  res.sendStatus(410);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
