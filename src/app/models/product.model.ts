class Product {
  id: string;
  title: string;
  author: {
    name: string;
    lastname: string;
  };
  categories: string[];
  price: {
    currency: string;
    amount: Number
    decimals: Number
  }
  picture?: string;
  thumbnail?: string;
  condition: string;
  free_shipping: Boolean
}

export default Product;
