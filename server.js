console.log("Server is working");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuidv1 = require('uuid/v1');

const fs = require("fs");

const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

app.post("/mandelbrot", (req, res) => {
  const fractals = readJSONFile();
  const fractalsList = fractals["mandelbrot"];
  const newFractal = req.body;
  newFractal.id = uuidv1();
  console.log(fractalsList);
  const newFractalList = [...fractalsList, newFractal];
  const postFractal = {
      "mandelbrot": newFractalList,
      "julia": fractals["julia"]
  }
  writeJSONFile(postFractal);
  res.json(newFractal);
});

app.post("/julia", (req, res) => {
  const fractals = readJSONFile();
  const fractalsList = fractals["julia"];
  const newFractal = req.body;
  newFractal.id = uuidv1();
  console.log(fractalsList);
  const newFractalList = [...fractalsList, newFractal];
  const postFractal = {
      "mandelbrot": fractals["mandelbrot"],
      "julia": newFractalList
  }
  writeJSONFile(postFractal);
  res.json(newFractal);
});
  
  
app.put("/mandelbrot/:id", (req, res) => {
  const fractals = readJSONFile();
  const id = req.params.id;
  const newFractal = req.body;
  newFractal.id = id;
  idFound = false;

  const newFractalsList = fractals["mandelbrot"].map((fractal) => {
    if (fractal.id === id) {
      idFound = true;
      return newFractal;
    }
    return fractal;
  });
  const postFractal = {
    "mandelbrot": newFractalsList,
    "julia": fractals["julia"]
  }
  writeJSONFile(postFractal);

  if (idFound) {
    res.json(postFractal);
  } else {
    res.status(404).send(`Fractal ${id} was not found`);
  }
});

app.put("/julia/:id", (req, res) => {
  const fractals = readJSONFile();
  const id = req.params.id;
  const newFractal = req.body;
  newFractal.id = id;
  idFound = false;

  const newFractalsList = fractals["julia"].map((fractal) => {
    if (fractal.id === id) {
      idFound = true;
      return newFractal;
    }
    return fractal;
  });
  const postFractal = {
    "mandelbrot": fractals["mandelbrot"],
    "julia": newFractalsList
  }
  writeJSONFile(postFractal);

  if (idFound) {
    res.json(postFractal);
  } else {
    res.status(404).send(`Fractal ${id} was not found`);
  }
});
 
app.get("/mandelbrot/:id", (req, res) => {
  const fractals = readJSONFile();
  const id = req.params.id;
  let idFound = false;
  let foundFractal;
  fractals["mandelbrot"].forEach(fractal => {
    if (id === fractal.id) {
      idFound = true;
      foundFractal = fractal;
    }
  });
  if (idFound) {
    res.json(foundFractal);
  } else {
    res.status(404).send(`Fractal ${id} was not found`);
  }
});

app.get("/julia/:id", (req, res) => {
  const fractals = readJSONFile();
  const id = req.params.id;
  let idFound = false;
  let foundFractal;
  fractals["julia"].forEach(fractal => {
    if (id === fractal.id) {
      idFound = true;
      foundFractal = fractal;
    }
  });
  if (idFound) {
    res.json(foundFractal);
  } else {
    res.status(404).send(`Fractal ${id} was not found`);
  }
});

app.get("/mandelbrot", (req, res) => {
  const fractals = readJSONFile();
  res.json(fractals["mandelbrot"]);
});

app.get("/julia", (req, res) => {
  const fractals = readJSONFile();
  res.json(fractals["julia"]);
});

// Delete
app.delete("/mandelbrot/:id", (req, res) => {
  const fractals = readJSONFile();
  const id = req.params.id;
  const newFractalsList = fractals["mandelbrot"].filter((fractal) => fractal.id !== id)

  if (fractals["mandelbrot"].length !== newFractalsList.length) {
    res.status(200).send(`Fractal ${id} was removed`);
    const postFractal = {
      "mandelbrot": newFractalsList,
      "julia": fractals["julia"]
    }
    writeJSONFile(postFractal);
  } else {
    res.status(404).send(`Fractal ${id} was not found`);
  }
});

app.delete("/julia/:id", (req, res) => {
  const fractals = readJSONFile();
  const id = req.params.id;
  const newFractalsList = fractals["julia"].filter((fractal) => fractal.id !== id)

  if (fractals["julia"].length !== newFractalsList.length) {
    res.status(200).send(`Fractal ${id} was removed`);
    const postFractal = {
      "mandelbrot": fractals["mandelbrot"],
      "julia": newFractalsList
    }
    writeJSONFile(postFractal);
  } else {
    res.status(404).send(`Fractal ${id} was not found`);
  }
});

function readJSONFile() {
  return JSON.parse(fs.readFileSync("fractals.json"));
}

function writeJSONFile(content) {
  fs.writeFileSync(
    "fractals.json",
    JSON.stringify(content),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);
