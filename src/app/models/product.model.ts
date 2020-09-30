class Product {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: Number
    decimals: Number
  }
  picture: string;
  condition: string;
  free_shipping: Boolean
}

export default Product;
