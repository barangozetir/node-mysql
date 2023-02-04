import express from "express";
import mysql from "mysql";

// create connection to mysql

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql", // need to delete when you create database
});

// connect

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql connected");
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// with express
const app = express();

//create db
app.get("/create-db", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("database created");
  });
});

///////////////////////////////////////////////////////////////////////////////////
// create worker table
app.get("/create-table", (req, res) => {
  let sql = "CREATE TABLE worker(id int, name VARCHAR(255), dept int, PRIMARY KEY(id))";

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("worker table created");
  });
});

// add many worker
app.get("/work", (req, res) => {
  var sql = "INSERT INTO worker (id, name, dept) VALUES ?";
  var values = [
    [4, "esra", 3],
    [5, "temel", 4],
    [6, "sahin", 5],
    [7, "berna", 4],
  ];

  let query = db.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("worker 1 added");
  });
});
// add one worker
app.get("/worker2", (req, res) => {
  let worker = { id: 2, name: "ahmet", dept: 4 };
  let sql = "INSERT INTO worker set ?";

  let query = db.query(sql, worker, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("worker 2 added");
  });
});

// select worker

app.get("/select-worker", (req, res) => {
  let sql = "SELECT * FROM worker WHERE id=4";

  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("worker selected");
  });
});

////////////////////////////////////////////////////////////////////////////////////////

// create departmen table
app.get("/create-dept", (req, res) => {
  let sql = "CREATE TABLE department (budget int, department VARCHAR(255), dept_id int, PRIMARY KEY(dept_id))";

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("department table created");
  });
});

// add many dept
app.get("/dept", (req, res) => {
  var sql = "INSERT INTO department (budget, department, dept_id) VALUES ?";
  var values = [
    [4545, "eng", 3],
    [46115, "dev", 4],
    [61651, "architec", 6],
    [722, "civil-eng", 5],
  ];

  let query = db.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("dept added added");
  });
});
// add one worker
app.get("/dept1", (req, res) => {
  let dept = { budget: 84132, department: "name", dept_id: 2 };
  let sql = "INSERT INTO department set ?";

  let query = db.query(sql, dept, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("dept 2 added");
  });
});

// select worker

app.get("/select-dept", (req, res) => {
  let sql = "SELECT * FROM department WHERE dept_id=5";

  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("dept selected");
  });
});

//////////////////////////////////////////////////////////////////////////////////////

// select worker and department

app.get("/select", (req, res) => {
  let sql = "SELECT * FROM worker, department WHERE worker.id = department.dept_id";

  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("selected");
  });
});

app.listen(3434, () => {
  console.log("server running");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///  function

const selected = () => {
  let sql = "SELECT * FROM worker, department WHERE worker.id = department.dept_id";

  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// or

let sql = "SELECT * FROM worker, department";

let query = db.query(sql, (err, result) => {
  if (err) throw err;
  console.log(result);
});
