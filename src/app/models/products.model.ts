import Product from './product.model';

class Products {
  author: {
    name: string;
    lastname: string;
  };
  categories: string[];
  items: Product[];
}

export default Products;
