"use-strict";

const itemService = require("../services/items.service");
const itemsTranslator = require("../translator/items.translator");

const getItems = async (req, res, next) => {
  try {
    const items = await itemService.getItemsByQuery(req.query.q);

    let itemsDTO = [];
    let itemsListDTO = {};

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

    itemsListDTO = {
      items: itemsDTO,
      ...{
        relatedCategories: itemsTranslator.fromAvailableFiltersToCategories(
          items.available_filters
        ),
      },
      ...{ availableFilters: items.available_filters },
    };

    res.send(itemsListDTO);
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
      ...{ item: itemsTranslator.fromItemRawToItemDTO(item) },
      ...{ author: itemsTranslator.fromSellerToAuthor(seller) },
      ...{ description: desc.plain_text },
      ...{ attributes: item.attributes.map((attr) => attr.name) },
    };

    res.send(itemDTO);
    next();
  } catch (error) {
    console.error("error", error);
  }
};

module.exports = { getItems, getItem };
