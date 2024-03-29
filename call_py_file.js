const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const expressSanitizer = require("express-sanitizer");


const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(express.json());
app.use(morgan("dev"));



const pythonScriptPath = path.join(__dirname, 'main.py');


// Route for Python Execution
app.get("/py/:api", async function (req, res) {
  const api = req.params.api;
  const python = spawn('python', [pythonScriptPath, api]);
  
  let dataString = '';
  
  python.stdout.on('data', function(data) {
    dataString += data.toString();
  });

  python.stderr.on('data', function(data) {
    console.log(data.toString());
  });

  python.on('exit', (code) => {
    try {
      const jsonData = JSON.parse(dataString);
      res.json(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Parsing error' });
    }
  });
});

app.listen(8080, () => {
  console.log(`Example app listening on port 8080`)
})