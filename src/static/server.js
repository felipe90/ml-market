'use-strict';

const express = require("express");
const cors = require('cors');
const axios = require("axios");
const ML_API_QUERY_URI = "https://api.mercadolibre.com/sites/MCO/search?q=:";

// server config
const PORT = 8080;
const app = express();

app.use(express.static("dist"));
app.use(cors());

// server routes
app.get(
  "/api/items",
  function (req, res, next) {
    console.log("Items Request...");
    next();
  },
  async function (req, res, next) {
    let items = await getItems();

    res.send(items);
  }
);

async function getItems(query) {
  try {
    const response = await axios.get(ML_API_QUERY_URI + query);

    return response.data;
  } catch (error) {
    console.log("error", error);
  }
}

// server run

app.listen(process.env.PORT || PORT, () =>
  console.log(`Listening on port ${process.env.PORT || PORT}!`)
);
