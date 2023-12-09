import express from "express";

const app = express();

app.use(express.json());

let counter = 0;

const counterApi = async (req, res, next) => {
  counter++;
  console.log(`API Count : ${counter}`);
  next();
};

const checkApi = (req, res, next) => {
  const { apiKey } = req.query;
  console.log("Received API key:", apiKey);
  if (apiKey === "saurabh") {
    next();
  } else {
    return res.status(401).json({
      success: false,
      message: "API Key is Invalid",
    });
  }
};

// http://localhost:5000/orders?apiKey=saurabh

app.use(counterApi);

app.get("/orders", checkApi, async (req, res) => {
  res.json({
    success: true,
    data: [],
    message: "All orders fetched successfully",
  });
});

const ValidateParams = (req, res, next) => {
  const { title, description, price } = req.body;

  if (!title) {
    return res.json({
      success: false,
      message: "Please select a title",
    });
  }

  if (!description) {
    return res.json({
      success: false,
      message: "Please select a description",
    });
  }

  if (!price) {
    return res.json({
      success: false,
      message: "Please select a price",
    });
  }
  next();
};

app.post("/orders", checkApi, ValidateParams, async (req, res) => {
  res.json({
    success: true,
    data: {},
    message: "All orders fetched successfully",
  });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
