class Product {
  id: string;
  title: string;
  author: {
    name: string;
    lastname: string;
  };
  price: {
    currency: string;
    amount: number
    decimals: number
  };
  categories: string[];
  pictures?: string[];
  thumbnail?: string;
  condition: string;
  address: any;
  free_shipping: boolean;
  description?: string;
  sold_quantity?: number;
  available_quantity?: number;
  attributes?: string[];
  permalink?: string;
}

export default Product;
