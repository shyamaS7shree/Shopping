'use client';

import ProductListingPage, { CategoryConfig } from '@/components/ProductListingPage';
import { useParams } from 'next/navigation';

const SECTION_CONFIGS: Record<string, CategoryConfig> = {
  'boys-clothing': {
    title: 'Boys Clothing',
    totalProducts: 4230,
    accentColor: '#f97316',
    brands: ['H&M Kids', 'Max Kids', 'UCB Kids', 'HRX', 'YK', 'Pantaloons'],
    filters: [
      { label: 'Sub-Categories', options: ['T-Shirts', 'Shirts', 'Clothing Sets', 'Ethnic Wear'] },
      { label: 'Brands', options: ['H&M Kids', 'Max Kids', 'UCB Kids', 'HRX', 'YK'] },
      { label: 'Size', options: ['2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y', '7-8Y', '8-9Y'] },
      { label: 'Price' },
      { label: 'Color', options: ['Blue', 'Red', 'Green', 'Yellow', 'Black', 'White'] },
      { label: 'Discount', options: ['60%', '50%', '40%', '30%'] },
    ],
    products: Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      brand: ['H&M Kids', 'Max Kids', 'UCB Kids', 'HRX', 'YK', 'Pantaloons'][i % 6],
      description: ['Graphic T-Shirt', 'Casual Shirt', 'Clothing Set', 'Ethnic Kurta', 'Joggers', 'Shorts'][i % 6],
      price: [399, 599, 799, 699, 499, 349][i % 6],
      originalPrice: i % 3 === 0 ? [799, 1199, 1599, 1399, 999, 699][i % 6] : undefined,
      discount: i % 3 === 0 ? [50, 50, 50, 50, 50, 50][i % 6] : undefined,
      offer: i % 4 === 0 ? '1 Offer Available' : undefined,
    })),
  },
  'girls-clothing': {
    title: 'Girls Clothing',
    totalProducts: 5120,
    accentColor: '#f97316',
    brands: ['H&M Kids', 'Max Kids', 'Pantaloons', 'UCB Kids', 'YK', 'Mothercare'],
    filters: [
      { label: 'Sub-Categories', options: ['Dresses', 'Tops', 'Clothing Sets', 'Lehenga Choli', 'Kurta Sets', 'Skirts'] },
      { label: 'Brands', options: ['H&M Kids', 'Max Kids', 'Pantaloons', 'UCB Kids', 'YK'] },
      { label: 'Size', options: ['2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y', '7-8Y'] },
      { label: 'Price' },
      { label: 'Color', options: ['Pink', 'Purple', 'Red', 'Yellow', 'Blue', 'White'] },
      { label: 'Discount', options: ['60%', '50%', '40%', '30%'] },
    ],
    products: Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      brand: ['H&M Kids', 'Max Kids', 'Pantaloons', 'UCB Kids', 'YK', 'Mothercare'][i % 6],
      description: ['Floral Dress', 'Casual Top', 'Clothing Set', 'Lehenga', 'Kurta Set', 'Skirt'][i % 6],
      price: [449, 399, 899, 999, 799, 349][i % 6],
      originalPrice: i % 3 === 0 ? [899, 799, 1799, 1999, 1599, 699][i % 6] : undefined,
      discount: i % 3 === 0 ? [50, 50, 50, 50, 50, 50][i % 6] : undefined,
      offer: i % 4 === 0 ? '1 Offer Available' : undefined,
    })),
  },
  footwear: {
    title: 'Kids Footwear',
    totalProducts: 2340,
    accentColor: '#f97316',
    brands: ['Bata Kids', 'Kittens', 'Lilliput', 'Puma Kids', 'Nike Kids', 'Adidas Kids'],
    filters: [
      { label: 'Sub-Categories', options: ['Casual Shoes', 'Sports Shoes', 'School Shoes', 'Sandals', 'Flipflops'] },
      { label: 'Brands', options: ['Bata Kids', 'Kittens', 'Lilliput', 'Puma Kids', 'Nike Kids'] },
      { label: 'Size', options: ['1C', '2C', '3C', '4C', '5C', '6C', '1Y', '2Y'] },
      { label: 'Price' },
      { label: 'Color', options: ['Black', 'White', 'Blue', 'Red', 'Pink'] },
      { label: 'Discount', options: ['60%', '50%', '40%', '30%'] },
    ],
    products: Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      brand: ['Bata Kids', 'Kittens', 'Lilliput', 'Puma Kids', 'Nike Kids', 'Adidas Kids'][i % 6],
      description: ['Casual Shoes', 'Sports Shoes', 'School Shoes', 'Sandals', 'Flipflops', 'Sneakers'][i % 6],
      price: [499, 799, 699, 399, 299, 999][i % 6],
      originalPrice: i % 3 === 0 ? [999, 1599, 1399, 799, 599, 1999][i % 6] : undefined,
      discount: i % 3 === 0 ? [50, 50, 50, 50, 50, 50][i % 6] : undefined,
      offer: i % 4 === 0 ? '1 Offer Available' : undefined,
    })),
  },
};

const DEFAULT_CONFIG: CategoryConfig = {
  title: 'Kids Fashion',
  totalProducts: 500,
  accentColor: '#f97316',
  brands: ['H&M Kids', 'Max Kids', 'UCB Kids'],
  filters: [
    { label: 'Price' },
    { label: 'Size', options: ['2-3Y', '3-4Y', '4-5Y', '5-6Y'] },
    { label: 'Discount', options: ['50%', '40%', '30%'] },
  ],
  products: Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    brand: ['H&M Kids', 'Max Kids', 'UCB Kids'][i % 3],
    description: ['T-Shirt', 'Dress', 'Shoes'][i % 3],
    price: [399, 449, 499][i % 3],
  })),
};

export default function KidsSectionPage() {
  const params = useParams();
  const section = params.section as string;
  const config = SECTION_CONFIGS[section] ?? DEFAULT_CONFIG;
  return <ProductListingPage config={config} />;
}