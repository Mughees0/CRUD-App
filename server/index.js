const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "mugheesuser",
  host: "localhost",
  password: "password",
  database: "employeeSystem",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employee (name, age, country, position, wage)  VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results + "\n This is the error result");
      }
    }
  );
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("yey, your server is running on port 3001");
});
