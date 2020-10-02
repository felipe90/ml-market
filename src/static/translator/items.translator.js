const _ = require("lodash");

const fromItemRawToItemDTO = (input) => {
  if (!input) {
    return;
  }

  const additionalFields = ['condition', 'pictures', 'address', 'available_quantity' ]

  let output = {
    id: input.id,
    title: input.title,
    price: {
      currency: input.currency_id,
      amount: input.price ? input.price.toFixed(0) : null,
      decimals: input.price % 1,
    },
    permalink: input.permalink,
    thumbnail: input.thumbnail,
    free_shipping: input.shipping && input.shipping.free_shipping,
    sold_quantity: input.sold_quantity,
  };

  additionalFields.forEach(fieldName => {
    if (input[fieldName]) {
      output = { ...output, ...{ [fieldName]: input[fieldName] } };
    }
  })

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
    return category.path_from_root.map((item) => item.name);
  }
};

const fromAvailableFiltersToCategories = (availableFilters) => {
  if (!availableFilters) {
    return;
  }
  const categories = availableFilters.find((filter) => filter.id === "category")
    .values;

  return categories.map((item) => item.name);
};

module.exports = {
  fromItemRawToItemDTO,
  fromSellerToAuthor,
  fromCategoryToArray,
  fromAvailableFiltersToCategories,
};
