'use client';

import ProductListingPage, { CategoryConfig } from '@/components/ProductListingPage';
import { useParams } from 'next/navigation';

const SECTION_CONFIGS: Record<string, CategoryConfig> = {
  makeup: {
    title: 'Makeup',
    totalProducts: 6780,
    accentColor: '#14b8a6',
    brands: ['Lakme', 'Maybelline', 'MAC', 'NYX', 'Sugar', 'Colorbar'],
    filters: [
      { label: 'Sub-Categories', options: ['Lipstick', 'Lip Gloss', 'Mascara', 'Eyeliner', 'Kajal', 'Foundation'] },
      { label: 'Brands', options: ['Lakme', 'Maybelline', 'MAC', 'NYX', 'Sugar', 'Colorbar'] },
      { label: 'Price' },
      { label: 'Discount', options: ['60%', '50%', '40%', '30%'] },
    ],
    products: Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      brand: ['Lakme', 'Maybelline', 'MAC', 'NYX', 'Sugar', 'Colorbar'][i % 6],
      description: ['Matte Lipstick', 'Volumizing Mascara', 'Gel Eyeliner', 'BB Cream', 'Lip Gloss', 'Kajal'][i % 6],
      price: [299, 499, 1299, 399, 249, 199][i % 6],
      originalPrice: i % 3 === 0 ? [599, 999, 2599, 799, 499, 399][i % 6] : undefined,
      discount: i % 3 === 0 ? [50, 50, 50, 50, 50, 50][i % 6] : undefined,
      offer: i % 4 === 0 ? '1 Offer Available' : undefined,
    })),
  },
  haircare: {
    title: 'Haircare',
    totalProducts: 3450,
    accentColor: '#14b8a6',
    brands: ['Dove', 'TRESemmé', 'Mamaearth', 'WOW', 'Pantene', 'Head & Shoulders'],
    filters: [
      { label: 'Sub-Categories', options: ['Shampoo', 'Conditioner', 'Hair Oil', 'Hair Serum', 'Hair Color', 'Hair Mask'] },
      { label: 'Brands', options: ['Dove', 'TRESemmé', 'Mamaearth', 'WOW', 'Pantene'] },
      { label: 'Price' },
      { label: 'Discount', options: ['50%', '40%', '30%', '20%'] },
    ],
    products: Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      brand: ['Dove', 'TRESemmé', 'Mamaearth', 'WOW', 'Pantene', 'Head & Shoulders'][i % 6],
      description: ['Moisturising Shampoo', 'Conditioner', 'Argan Hair Oil', 'Hair Serum', 'Anti-Dandruff', 'Hair Mask'][i % 6],
      price: [299, 349, 399, 449, 279, 499][i % 6],
      originalPrice: i % 3 === 0 ? [599, 699, 799, 899, 559, 999][i % 6] : undefined,
      discount: i % 3 === 0 ? [50, 50, 50, 50, 50, 50][i % 6] : undefined,
      offer: i % 4 === 0 ? '1 Offer Available' : undefined,
    })),
  },
  fragrances: {
    title: 'Fragrances',
    totalProducts: 2100,
    accentColor: '#14b8a6',
    brands: ['Fogg', 'Engage', 'Park Avenue', 'Davidoff', 'Hugo Boss', 'Calvin Klein'],
    filters: [
      { label: 'Sub-Categories', options: ['Perfume', 'Deodorant', 'Body Mist', 'Eau de Toilette'] },
      { label: 'Brands', options: ['Fogg', 'Engage', 'Park Avenue', 'Davidoff', 'Hugo Boss'] },
      { label: 'Price' },
      { label: 'Discount', options: ['50%', '40%', '30%', '20%'] },
    ],
    products: Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      brand: ['Fogg', 'Engage', 'Park Avenue', 'Davidoff', 'Hugo Boss', 'Calvin Klein'][i % 6],
      description: ['Body Spray', 'Deodorant', 'Perfume', 'Eau de Toilette', 'Body Mist', 'Cologne'][i % 6],
      price: [199, 149, 1999, 2499, 3499, 2999][i % 6],
      originalPrice: i % 3 === 0 ? [399, 299, 3999, 4999, 6999, 5999][i % 6] : undefined,
      discount: i % 3 === 0 ? [50, 50, 50, 50, 50, 50][i % 6] : undefined,
      offer: i % 4 === 0 ? '1 Offer Available' : undefined,
    })),
  },
};

const DEFAULT_CONFIG: CategoryConfig = {
  title: 'Beauty',
  totalProducts: 500,
  accentColor: '#14b8a6',
  brands: ['Lakme', 'Maybelline', 'Dove'],
  filters: [
    { label: 'Price' },
    { label: 'Discount', options: ['50%', '40%', '30%'] },
  ],
  products: Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    brand: ['Lakme', 'Maybelline', 'Dove'][i % 3],
    description: ['Lipstick', 'Mascara', 'Shampoo'][i % 3],
    price: [299, 499, 299][i % 3],
  })),
};

export default function BeautySectionPage() {
  const params = useParams();
  const section = params.section as string;
  const config = SECTION_CONFIGS[section] ?? DEFAULT_CONFIG;
  return <ProductListingPage config={config} />;
}