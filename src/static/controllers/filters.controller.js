"use-strict";

const axios = require("axios");
const ML_API = require("../constants/ml-api.constants");

const filtersController = {
  getFilters: async (req, res, next) => {
    let result = await getFilters(req.query.q);

    res.send(result);
    next();
  },
};

async function getFilters(query) {
  try {
    const uri = query
      ? ML_API.FILTERS_QUERY_URI + query
      : ML_API.FILTERS_QUERY_URI;

    console.log("[Filters-Requested]: " + uri);
    const response = await axios.get(uri);

    return response.data;
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = filtersController;
