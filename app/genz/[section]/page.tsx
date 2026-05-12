'use client';

import ProductListingPage, { CategoryConfig } from '@/components/ProductListingPage';
import { useParams } from 'next/navigation';

const SECTION_CONFIGS: Record<string, CategoryConfig> = {
  "women's-western-wear": {
    title: "GenZ Women's Western Wear",
    totalProducts: 5430,
    accentColor: '#14b8a6',
    brands: ['H&M', 'Zara', 'Shein', 'Urbanic', 'Style Union', 'AND'],
    filters: [
      { label: 'Sub-Categories', options: ['Dresses Under ₹599', 'Tops Under ₹399', 'Jeans Under ₹599', 'T-shirts Under ₹299'] },
      { label: 'Brands', options: ['H&M', 'Zara', 'Urbanic', 'Style Union', 'AND'] },
      { label: 'Size', options: ['XS', 'S', 'M', 'L', 'XL'] },
      { label: 'Price' },
      { label: 'Discount', options: ['70%', '60%', '50%', '40%'] },
    ],
    products: Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      brand: ['H&M', 'Zara', 'Urbanic', 'Style Union', 'AND', 'Shein'][i % 6],
      description: ['Mini Dress', 'Crop Top', 'Baggy Jeans', 'Oversized Tee', 'Co-ord Set', 'Skirt'][i % 6],
      price: [499, 299, 599, 249, 799, 399][i % 6],
      originalPrice: i % 3 === 0 ? [999, 599, 1199, 499, 1599, 799][i % 6] : undefined,
      discount: i % 3 === 0 ? [50, 50, 50, 50, 50, 50][i % 6] : undefined,
      offer: i % 4 === 0 ? '1 Offer Available' : undefined,
    })),
  },
  "men's-casual-wear": {
    title: "GenZ Men's Casual Wear",
    totalProducts: 4210,
    accentColor: '#14b8a6',
    brands: ['H&M', 'Snitch', 'Bewakoof', 'The Souled Store', 'Wrogn', 'Campus Sutra'],
    filters: [
      { label: 'Sub-Categories', options: ['T-shirts Under ₹299', 'Shirts Under ₹499', 'Jeans Under ₹599'] },
      { label: 'Brands', options: ['H&M', 'Snitch', 'Bewakoof', 'The Souled Store', 'Wrogn'] },
      { label: 'Size', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
      { label: 'Price' },
      { label: 'Discount', options: ['70%', '60%', '50%', '40%'] },
    ],
    products: Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      brand: ['H&M', 'Snitch', 'Bewakoof', 'The Souled Store', 'Wrogn', 'Campus Sutra'][i % 6],
      description: ['Graphic Tee', 'Oversized Shirt', 'Baggy Jeans', 'Printed Tee', 'Cargo Pants', 'Hoodie'][i % 6],
      price: [249, 449, 549, 299, 699, 799][i % 6],
      originalPrice: i % 3 === 0 ? [499, 899, 1099, 599, 1399, 1599][i % 6] : undefined,
      discount: i % 3 === 0 ? [50, 50, 50, 50, 50, 50][i % 6] : undefined,
      offer: i % 4 === 0 ? '1 Offer Available' : undefined,
    })),
  },
  accessories: {
    title: 'GenZ Accessories',
    totalProducts: 3120,
    accentColor: '#14b8a6',
    brands: ['Accessorize', 'Aldo', 'Steve Madden', 'Fossil', 'Carlton London', 'Hidesign'],
    filters: [
      { label: 'Sub-Categories', options: ['Jewellery Under ₹299', 'Handbags Under ₹499', 'Sunglasses Under ₹699', 'Belts Under ₹799'] },
      { label: 'Brands', options: ['Accessorize', 'Aldo', 'Steve Madden', 'Fossil', 'Carlton London'] },
      { label: 'Price' },
      { label: 'Discount', options: ['60%', '50%', '40%', '30%'] },
    ],
    products: Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      brand: ['Accessorize', 'Aldo', 'Steve Madden', 'Fossil', 'Carlton London', 'Hidesign'][i % 6],
      description: ['Statement Earrings', 'Crossbody Bag', 'Sunglasses', 'Belt', 'Watch', 'Wallet'][i % 6],
      price: [249, 799, 599, 399, 1999, 699][i % 6],
      originalPrice: i % 3 === 0 ? [499, 1599, 1199, 799, 3999, 1399][i % 6] : undefined,
      discount: i % 3 === 0 ? [50, 50, 50, 50, 50, 50][i % 6] : undefined,
      offer: i % 4 === 0 ? '1 Offer Available' : undefined,
    })),
  },
};

const DEFAULT_CONFIG: CategoryConfig = {
  title: 'GenZ Fashion',
  totalProducts: 500,
  accentColor: '#14b8a6',
  brands: ['H&M', 'Zara', 'Snitch'],
  filters: [
    { label: 'Price' },
    { label: 'Size', options: ['XS', 'S', 'M', 'L', 'XL'] },
    { label: 'Discount', options: ['50%', '40%', '30%'] },
  ],
  products: Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    brand: ['H&M', 'Zara', 'Snitch'][i % 3],
    description: ['Dress', 'Tee', 'Jeans'][i % 3],
    price: [499, 299, 599][i % 3],
  })),
};

export default function GenzSectionPage() {
  const params = useParams();
  const section = params.section as string;
  const config = SECTION_CONFIGS[section] ?? DEFAULT_CONFIG;
  return <ProductListingPage config={config} />;
}