'use client';

import ProductListingPage, { CategoryConfig } from '@/components/ProductListingPage';
import { useParams } from 'next/navigation';

const SECTION_CONFIGS: Record<string, CategoryConfig> = {
  'western-wear': {
    title: 'Women Western Wear',
    totalProducts: 12430,
    accentColor: '#ec4899',
    brands: ['H&M', 'Zara', 'AND', 'Global Desi', 'W', 'Biba'],
    filters: [
      { label: 'Sub-Categories', options: ['Dresses', 'Tops', 'Tshirts', 'Jeans', 'Trousers & Capris', 'Shorts & Skirts', 'Co-ords', 'Jumpsuits'] },
      { label: 'Brands', options: ['H&M', 'Zara', 'AND', 'Global Desi', 'W', 'Biba'] },
      { label: 'Size', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
      { label: 'Price' },
      { label: 'Color', options: ['Black', 'White', 'Blue', 'Pink', 'Red', 'Green', 'Yellow'] },
      { label: 'Discount', options: ['70%', '60%', '50%', '40%', '30%'] },
    ],
    products: Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      brand: ['H&M', 'Zara', 'AND', 'Global Desi', 'W', 'Biba'][i % 6],
      description: ['Floral Dress', 'Casual Top', 'Slim Fit Jeans', 'Co-ord Set', 'Jumpsuit', 'Mini Skirt'][i % 6],
      price: [899, 699, 1299, 1499, 1899, 799][i % 6],
      originalPrice: i % 3 === 0 ? [1799, 1399, 2599, 2999, 3799, 1599][i % 6] : undefined,
      discount: i % 3 === 0 ? [50, 50, 50, 50, 50, 50][i % 6] : undefined,
      offer: i % 4 === 0 ? '1 Offer Available' : undefined,
    })),
  },
  'indian-fusion-wear': {
    title: 'Women Indian & Fusion Wear',
    totalProducts: 9870,
    accentColor: '#ec4899',
    brands: ['Biba', 'W', 'Fabindia', 'Soch', 'Libas', 'Aurelia'],
    filters: [
      { label: 'Sub-Categories', options: ['Kurtas & Suits', 'Sarees', 'Lehenga Cholis', 'Kurtis', 'Skirts & Palazzos', 'Dupattas'] },
      { label: 'Brands', options: ['Biba', 'W', 'Fabindia', 'Soch', 'Libas', 'Aurelia'] },
      { label: 'Size', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
      { label: 'Price' },
      { label: 'Color', options: ['Red', 'Blue', 'Green', 'Yellow', 'Pink', 'White'] },
      { label: 'Discount', options: ['60%', '50%', '40%', '30%'] },
    ],
    products: Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      brand: ['Biba', 'W', 'Fabindia', 'Soch', 'Libas', 'Aurelia'][i % 6],
      description: ['Cotton Kurta', 'Silk Saree', 'Lehenga Set', 'Printed Kurti', 'Palazzo Set', 'Dupatta'][i % 6],
      price: [999, 2499, 4999, 799, 1299, 499][i % 6],
      originalPrice: i % 3 === 0 ? [1999, 4999, 9999, 1599, 2599, 999][i % 6] : undefined,
      discount: i % 3 === 0 ? [50, 50, 50, 50, 50, 50][i % 6] : undefined,
      offer: i % 4 === 0 ? '1 Offer Available' : undefined,
    })),
  },
  footwear: {
    title: 'Women Footwear',
    totalProducts: 4320,
    accentColor: '#ec4899',
    brands: ['Steve Madden', 'Clarks', 'Bata', 'Metro', 'Catwalk', 'Inc.5'],
    filters: [
      { label: 'Sub-Categories', options: ['Flats', 'Heels', 'Casual Shoes', 'Boots', 'Sports Shoes', 'Sandals'] },
      { label: 'Brands', options: ['Steve Madden', 'Clarks', 'Bata', 'Metro', 'Catwalk', 'Inc.5'] },
      { label: 'Size', options: ['3', '4', '5', '6', '7', '8'] },
      { label: 'Price' },
      { label: 'Color', options: ['Black', 'Brown', 'White', 'Nude', 'Red', 'Pink'] },
      { label: 'Discount', options: ['60%', '50%', '40%', '30%'] },
    ],
    products: Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      brand: ['Steve Madden', 'Clarks', 'Bata', 'Metro', 'Catwalk', 'Inc.5'][i % 6],
      description: ['Block Heels', 'Ballet Flats', 'Casual Sneakers', 'Ankle Boots', 'Sports Shoes', 'Wedges'][i % 6],
      price: [1499, 999, 1299, 2499, 1999, 1799][i % 6],
      originalPrice: i % 3 === 0 ? [2999, 1999, 2599, 4999, 3999, 3599][i % 6] : undefined,
      discount: i % 3 === 0 ? [50, 50, 50, 50, 50, 50][i % 6] : undefined,
      offer: i % 4 === 0 ? '1 Offer Available' : undefined,
    })),
  },
  'lingerie-sleepwear': {
    title: 'Women Lingerie & Sleepwear',
    totalProducts: 3210,
    accentColor: '#ec4899',
    brands: ['Jockey', 'Triumph', 'Clovia', 'Zivame', 'Amante', 'PrettySecrets'],
    filters: [
      { label: 'Sub-Categories', options: ['Bra', 'Briefs', 'Shapewear', 'Sleepwear', 'Swimwear', 'Camisoles'] },
      { label: 'Brands', options: ['Jockey', 'Triumph', 'Clovia', 'Zivame', 'Amante'] },
      { label: 'Size', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
      { label: 'Price' },
      { label: 'Color', options: ['Black', 'White', 'Pink', 'Nude', 'Red'] },
      { label: 'Discount', options: ['60%', '50%', '40%', '30%'] },
    ],
    products: Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      brand: ['Jockey', 'Triumph', 'Clovia', 'Zivame', 'Amante', 'PrettySecrets'][i % 6],
      description: ['T-Shirt Bra', 'Cotton Briefs', 'Night Dress', 'Shapewear', 'Swimsuit', 'Camisole'][i % 6],
      price: [499, 299, 799, 999, 1499, 399][i % 6],
      originalPrice: i % 3 === 0 ? [999, 599, 1599, 1999, 2999, 799][i % 6] : undefined,
      discount: i % 3 === 0 ? [50, 50, 50, 50, 50, 50][i % 6] : undefined,
      offer: i % 4 === 0 ? '1 Offer Available' : undefined,
    })),
  },
};

const DEFAULT_CONFIG: CategoryConfig = {
  title: 'Women Fashion',
  totalProducts: 1000,
  accentColor: '#ec4899',
  brands: ['H&M', 'Zara', 'AND', 'W', 'Biba'],
  filters: [
    { label: 'Price' },
    { label: 'Size', options: ['XS', 'S', 'M', 'L', 'XL'] },
    { label: 'Discount', options: ['50%', '40%', '30%'] },
  ],
  products: Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    brand: ['H&M', 'Zara', 'AND', 'W', 'Biba'][i % 5],
    description: ['Dress', 'Top', 'Jeans', 'Kurta', 'Saree'][i % 5],
    price: [899, 699, 1299, 999, 2499][i % 5],
  })),
};

export default function WomenSectionPage() {
  const params = useParams();
  const section = params.section as string;
  const config = SECTION_CONFIGS[section] ?? DEFAULT_CONFIG;
  return <ProductListingPage config={config} />;
}