import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { Product } from './types/Product';

type ProductsState = {
  products: Product[],
  product: Product | null,
  setProducts: (products: Product[]) => void,
  setProduct: (product: Product) => void,
};

const useStore = create<ProductsState>(devtools(set => ({
  products: [],
  product: null,
  setProducts: (products: Product[]) => set(_ => ({ products: products })),
  setProduct: (product: Product) => set(_ => ({ product: product })),
})));

export default useStore;
