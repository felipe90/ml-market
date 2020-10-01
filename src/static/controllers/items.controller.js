"use-strict";

const itemService = require("../services/items.service");

const itemsController = {
  getItems: async (req, res, next) => {
    let itemsDTO = await itemService.getItemsByQuery(req.query.q)
    // items


    res.send(itemsDTO);
    next();
  },
  getItem: async (req, res, next) => {
    let itemDTO = await itemService.getItemById(req.params.id);

    res.send(itemDTO);
    next();
  },
};





module.exports = itemsController;
