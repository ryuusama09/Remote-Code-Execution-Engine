const express = require("express");
const app = express();
const morgan = require("morgan"); //to log incoming requests
const bodyParser = require("body-parser");

// Remove in Production
app.use(morgan("dev"));

// import routes
const submit_route = require("./routes/submit");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// initializing routes
app.use("/api/submit", submit_route);

// Health Check
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

// Error Handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
});

// Listening on port
const port = process.env.PORT || 7000;
const server = app.listen(port, () => {
  console.log("Server is running on port ", port);
});

module.exports = app;
