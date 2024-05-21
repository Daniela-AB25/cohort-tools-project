const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const cohortsData = require('./cohorts.json')
const studentsData = require('./students.json')

const mongoose = require("mongoose");
const Cohort = require('./models/Cohort.model')
const Student = require('./models/Student.model')


mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));





// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:

const cors = require("cors");

app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ['http://localhost:5173']
  })
);

// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get('/api/cohorts', (req, res) => {
  Cohort
    .find()
    .then(cohorts => res.json(cohorts))
    .catch(err => res.json({ status: 500, error: err }))
});

app.get('/api/students', (req, res) => {
  Student
    .find()
    .then(students => res.json(students))
    .catch(err => res.json({ status: 500, error: err }))
})


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});