"use-strict";

const itemService = require("../services/items.service");
const itemsTranslator = require("../translator/items.translator");

const getItems = async (req, res, next) => {
  try {
    const items = await itemService.getItemsByQuery(req.query.q);

    let itemsDTO = [];

    for await (const item of items.results) {
      let [seller, category] = await Promise.all([
        itemService.getItemSellerById(item.seller.id),
        itemService.getItemCategoryById(item.category_id),
      ]).catch((error) => error);

      itemsDTO.push({
        ...itemsTranslator.fromItemRawToItemDTO(item),
        ...{ author: itemsTranslator.fromSellerToAuthor(seller) },
        ...{ categories: itemsTranslator.fromCategoryToArray(category) },
      });
    }

    res.send(itemsDTO);

    // const itemsDTO = await items.results.map(async (item) => {
    //   let [seller, category] = await Promise.all([
    //     itemService.getItemSellerById(item.seller.id),
    //     itemService.getItemCategoryById(item.category_id),
    //   ]).catch((error) => error);

    //   const res = {
    //     // ...itemsTranslator.fromItemsRawToItemsDTO(item),
    //     ...{ author: itemsTranslator.fromSellerToAuthor(seller) },
    //     ...{ categories: itemsTranslator.fromCategoryToArray(category)}
    //   }

    //   console.log(res)
    //   console.log(itemsTranslator.fromItemsRawToItemsDTO(item))

    //   return res;
    // });

    // res.send(itemsDTO);
    // res.send(items.results);
    next();
  } catch (error) {
    console.error("error", error);
  }
};

const getItem = async (req, res, next) => {
  try {
    const item = await itemService.getItemById(req.params.id);
    const [seller, desc] = await Promise.all([
      itemService.getItemSellerById(item.seller_id),
      itemService.getItemDescriptionById(item.id),
    ]).catch((error) => console.log(`Error in executing ${error}`));

    const itemDTO = {
      ...itemsTranslator.fromItemRawToItemDTO(item),
      ...{ author: itemsTranslator.fromSellerToAuthor(seller) },
      ...{ description: desc.plain_text },
    };

    res.send(itemDTO);
    next();
  } catch (error) {
    console.error("error", error);
  }
};

module.exports = { getItems, getItem };
