const axios = require("axios").default;
const ML_API = require("../constants/ml-api.constants");

const getItemsByQuery = async (query) => {
  try {
    const uri = query
      ? `${ML_API.ITEMS_QUERY_URI}${query}&&limit=${ML_API.ITEMS_QUERY_LIMIT}`
      : `${ML_API.ITEMS_QUERY_URI}&&limit=${ML_API.ITEMS_QUERY_LIMIT}`;

    console.log("[Items-Requested]: " + uri);
    const res = await axios.get(uri);

    return res.data;
  } catch (error) {
    return error;
  }
};

const getItemById = async (itemId) => {
  try {
    const uri = `${ML_API.ITEM_QUERY_URI}${itemId}`;

    console.log("[Item-Requested]: " + uri);
    const res = await axios.get(uri);

    return res.data;
  } catch (error) {
    return error;
  }
};

const getItemDescriptionById = async (descId) => {
  try {
    const uri = ML_API.ITEM_DESC_URI.replace("{id}", descId);

    console.log("[Desc-Requested]: " + uri);
    const res = await axios.get(uri);

    return res.data;
  } catch (error) {
    return error;
  }
};

const getItemCategoryById = async (categoryId) => {
  try {
    const uri = ML_API.CATEGORIES_URI.replace("{id}", categoryId);

    console.log("[Category-Requested]: " + uri);
    const res = await axios.get(uri);

    return res.data;
  } catch (error) {
    return error;
  }
};

const getItemSellerById = async (sellerId) => {
  try {
    const uri = ML_API.USERS_URI.replace("{id}", sellerId);

    console.log("[Seller-Requested]: " + uri);
    const res = await axios.get(uri);

    return res.data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getItemsByQuery,
  getItemById,
  getItemDescriptionById,
  getItemCategoryById,
  getItemSellerById,
};
