const express = require("express");
const cors = require("cors");
const app = express();
const uuid = require("uuid/v4");

app.use("/", cors());

app.get("/operations", function(_, res) {
  const operations = [
    {
      id: uuid(),
      date: new Date(2019, 5, 12),
      amount: 1000
    },
    {
      id: uuid(),
      date: new Date(2019, 5, 13),
      amount: -400
    },
    {
      id: uuid(),
      date: new Date(2019, 10, 21),
      amount: -50
    }
  ];
  res.send(operations);
});

app.delete("/operation/:id", function(_, res) {
  res.sendStatus(200);
});

app.listen(5000, function() {
  console.log("Fake API listening on port 5000!");
});
