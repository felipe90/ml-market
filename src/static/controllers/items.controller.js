"use-strict";

const itemService = require("../services/items.service");
const itemsTranslator = require("../translator/items.translator");

const getItems = async (req, res, next) => {
  try {
    const items = await itemService.getItemsByQuery(req.query.q);
    if (!items) return;

    let itemsDTO = [];
    let itemsListDTO = {};

    for await (const item of items.results) {
      let [seller, category, pictures] = await Promise.all([
        itemService.getItemSellerById(item.seller.id),
        itemService.getItemCategoryById(item.category_id),
        itemService.getPicturesByItemId(item.id),
      ]).catch((error) => error);

      itemsDTO.push({
        ...itemsTranslator.fromItemRawToItemDTO(item),
        ...{ author: itemsTranslator.fromSellerToAuthor(seller) },
        ...{ categories: itemsTranslator.fromCategoryToArray(category) },
        ...{ pictures: pictures },
        ...{
          pictures: itemsTranslator.fromPicturesArrayToSinglePicture(pictures),
        },
      });
      console.log("----[Item-Request] DONE----");
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

    console.log("----[Items-Request] DONE----");
    res.send(itemsListDTO);
    next();
  } catch (error) {
    console.error("error", error);
  }
};

const getItem = async (req, res, next) => {
  try {
    const item = await itemService.getItemById(req.params.id);
    if (!item) return;

    const [seller, category, desc] = await Promise.all([
      itemService.getItemSellerById(item.seller_id),
      itemService.getItemCategoryById(item.category_id),
      itemService.getItemDescriptionById(item.id),
    ]).catch((error) => console.log(`Error in executing ${error}`));

    const itemDTO = {
      ...itemsTranslator.fromItemRawToItemDTO(item),
      ...{ author: itemsTranslator.fromSellerToAuthor(seller) },
      ...{ description: desc ? desc.plain_text : "" },
      ...{ categories: itemsTranslator.fromCategoryToArray(category) },
      ...{
        attributes: item.attributes
          ? item.attributes.map((attr) => `${attr.name} - ${attr.value_name}`)
          : {},
      },
    };

    console.log("----[Item-Request] DONE----");
    res.send(itemDTO);
    next();
  } catch (error) {
    console.error("error", error);
  }
};

module.exports = { getItems, getItem };
