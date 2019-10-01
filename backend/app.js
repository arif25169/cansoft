const app = require('express')();
const mysql = require('mysql');
const bodyParser = require('body-parser');

require('dotenv').config();

const routes = require('./routes');

const db = mysql.createConnection ({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

global.db = db;

const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use('/', routes);

app.use(function (req, res, next) {
    return res.status(400).json({ message: "Sorry can't find the requested page.", response: '' });
  })

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});