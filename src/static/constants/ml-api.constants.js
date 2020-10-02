const SITE_ID = 'MCO';

const ML_API = {
  ITEMS_QUERY_URI : `https://api.mercadolibre.com/sites/${SITE_ID}/search?q=`,
  ITEM_QUERY_URI : 'https://api.mercadolibre.com/items/',
  ITEM_DESC_URI : 'https://api.mercadolibre.com/items/{id}/description',
  CATEGORIES_URI : 'https://api.mercadolibre.com/categories/{id}',
  USERS_URI : 'https://api.mercadolibre.com/users/{id}',
  FILTERS_QUERY_URI : `https://api.mercadolibre.com/sites/${SITE_ID}/search?q=`,
  ITEMS_QUERY_LIMIT : 4
}

module.exports = ML_API;
