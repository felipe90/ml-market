const _ = require("lodash");

const fromItemRawToItemDTO = (input) => {
  if (!input) {
    return;
  }

  let output = {
    item: {
      id: input.id,
      title: input.title,
      price: {
        currency: input.currency_id,
        amount: input.price ? input.price.toFixed(0) : null ,
        decimals: input.price % 1,
      },
      permalink: input.permalink,
      thumbnail: input.thumbnail,
      free_shipping: input.shipping && input.shipping.free_shipping,
      sold_quantity: input.sold_quantity,
    },
  };

  if (input.condition) {
    output.item = { ...output.item, ...{ condition: input.condition } };
  }

  if (input.pictures) {
    output.item = { ...output.item, ...{ pictures: input.pictures } };
  }

  return output;
};

const fromSellerToAuthor = (seller) => {
  if (!seller) {
    return;
  }
  if (seller.first_name && seller.last_name) {
    return {
      name: seller.first_name,
      lastname: seller.last_name,
    };
  }
  if (seller.nickname) {
    return {
      name: seller.nickname,
    };
  }
};

const fromCategoryToArray = (category) => {
  if (!category) {
    return;
  }
  if (category.path_from_root) {
    return category.path_from_root.map((item) => {
      return item.name;
    });
  }
};

module.exports = {
  fromItemRawToItemDTO,
  fromSellerToAuthor,
  fromCategoryToArray,
};
