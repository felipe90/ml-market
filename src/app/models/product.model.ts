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
  pictures?: string[];
  thumbnail?: string;
  condition: string;
  address: any;
  free_shipping: Boolean
}

export default Product;
