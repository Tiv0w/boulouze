import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { Product } from './types/Product';

type ProductsState = {
  products: Product[],
  product: Product | null,
  setProducts: (products: Product[]) => void,
  setProduct: (product: Product) => void,
  clearProduct: () => void,
};

const useStore = create<ProductsState>(devtools(set => ({
  products: [],
  product: null,
  setProducts: (products: Product[]) => set(_ => ({ products: products })),
  setProduct: (product: Product) => set(_ => ({ product: product })),
  clearProduct: () => set(_ => ({ product: null })),
})));

export default useStore;
