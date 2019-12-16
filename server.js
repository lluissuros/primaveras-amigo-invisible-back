// https://medium.com/@bretcameron/mongodb-a-beginners-guide-8fca0c7787a4
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");

const app = express();

/*=========  enable CORS for development on localhost ============*/
app.use(cors());

app.use(express.json());

const db = config.get("mongoURI");
const Animal = require("./models/Animal");
const Confession = require("./models/Confession");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Read all entries
app.get("/", (req, res) => {
  Confession.find()
    .sort({ date: -1 })
    .then(items => console.log(res.json(items)));
});

// Add a new entry
app.post("/", (req, res) => {
  console.log(req.body);
  const newConfession = new Confession({
    text: req.body.text,
    userId: req.body.userId
  });
  newConfession.save().then(item => res.json(item));
});

// Delete an entry
app.delete("/:id", (req, res) => {
  Confession.findOneAndDelete({ _id: req.params.id })
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

// Update an entry
app.put("/:id", (req, res) => {
  Confession.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server started on port: http://localhost:${port}`)
);
