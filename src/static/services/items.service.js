const axios = require("axios").default;
const ML_API = require("../constants/ml-api.constants");

const getItemsByQuery = async (query) => {
  try {
    const uri = `${ML_API.ITEMS_QUERY_URI}${query}&&limit=4`;
    const res = await axios.get(uri);
    console.log("[Items-Requested]: " + uri);

    return res.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getItemById = async (itemId) => {
  try {
    const uri = `${ML_API.ITEM_QUERY_URI}${itemId}`;
    const res = await axios.get(uri);
    console.log("[Item-Requested]: " + uri);

    return res.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getItemDescriptionById = async (descId) => {
  try {
    const uri = ML_API.ITEM_DESC_URI.replace("/{id}/g", descId);
    const res = await axios.get(uri);
    console.log("[Desc-Requested]: " + uri);

    return res.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getItemCategoryById = async (categoryId) => {
  try {
    const uri = ML_API.CATEGORIES_URI.replace("/{id}/g", categoryId);
    const res = await axios.get(uri);
    console.log("[Category-Requested]: " + uri);

    return res.data;
  } catch (error) {
    return error;
  }
};

const getItemSellerById = async (sellerId) => {
  try {
    const uri = ML_API.USERS_URI.replace("/{id}/g", sellerId);
    const res = await axios.get(uri);
    console.log("[Seller-Requested]: " + uri);

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
  getItemSellerById
};
