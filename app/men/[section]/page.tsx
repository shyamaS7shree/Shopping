'use client';

import ProductListingPage, { CategoryConfig } from '@/components/ProductListingPage';
import { useParams } from 'next/navigation';

const SECTION_CONFIGS: Record<string, CategoryConfig> = {
  topwear: {
    title: 'Men Topwear',
    totalProducts: 8432,
    accentColor: '#ec4899',
    brands: ['U.S. Polo Assn.', 'Louis Philippe', 'Van Heusen', 'FRATINI', 'Arrow', 'Peter England'],
    filters: [
      { label: 'Sub-Categories', options: ['T-Shirts', 'Casual Shirts', 'Formal Shirts', 'Sweatshirts', 'Sweaters', 'Jackets', 'Blazers & Coats', 'Suits'] },
      { label: 'Brands', options: ['U.S. Polo Assn.', 'Louis Philippe', 'Van Heusen', 'Peter England', 'Arrow', 'Raymond'] },
      { label: 'Size', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'] },
      { label: 'Price' },
      { label: 'Color', options: ['Black', 'White', 'Blue', 'Navy', 'Grey', 'Red', 'Green'] },
      { label: 'Discount', options: ['70%', '60%', '50%', '40%', '30%'] },
      { label: 'Fabric', options: ['Cotton', 'Linen', 'Polyester', 'Blended'] },
    ],
    products: Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      brand: ['U.S. Polo Assn.', 'Louis Philippe', 'Van Heusen', 'FRATINI', 'Arrow', 'Peter England'][i % 6],
      description: ['Typographic Cotton T-Shirt', 'Slim Fit Casual Shirt', 'Formal Shirt', 'Sweatshirt', 'Jacket', 'Blazer'][i % 6],
      price: [699, 1299, 1899, 999, 2499, 3499][i % 6],
      originalPrice: i % 3 === 0 ? [1499, 2999, 3999, 1999, 4999, 5999][i % 6] : undefined,
      discount: i % 3 === 0 ? [70, 55, 50, 45, 40, 35][i % 6] : undefined,
      offer: i % 4 === 0 ? '1 Offer Available' : undefined,
    })),
  },

  bottomwear: {
    title: 'Men Bottomwear',
    totalProducts: 5621,
    accentColor: '#ec4899',
    brands: ['Levis', 'Wrangler', 'Lee', 'Flying Machine', 'Jack & Jones', 'Pepe Jeans'],
    filters: [
      { label: 'Sub-Categories', options: ['Jeans', 'Casual Trousers', 'Formal Trousers', 'Shorts', 'Track Pants & Joggers'] },
      { label: 'Brands', options: ['Levis', 'Wrangler', 'Lee', 'Flying Machine', 'Jack & Jones'] },
      { label: 'Size', options: ['28', '30', '32', '34', '36', '38'] },
      { label: 'Price' },
      { label: 'Color', options: ['Blue', 'Black', 'Grey', 'White', 'Brown'] },
      { label: 'Fit', options: ['Slim Fit', 'Regular Fit', 'Relaxed Fit', 'Skinny Fit'] },
      { label: 'Discount', options: ['70%', '60%', '50%', '40%', '30%'] },
    ],
    products: Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      brand: ['Levis', 'Wrangler', 'Lee', 'Flying Machine', 'Jack & Jones', 'Pepe Jeans'][i % 6],
      description: ['Slim Fit Jeans', 'Casual Trousers', 'Formal Trousers', 'Shorts', 'Joggers', 'Chinos'][i % 6],
      price: [1499, 999, 1299, 699, 899, 1199][i % 6],
      originalPrice: i % 3 === 0 ? [2999, 1999, 2499, 1499, 1799, 2199][i % 6] : undefined,
      discount: i % 3 === 0 ? [50, 45, 48, 53, 50, 46][i % 6] : undefined,
      offer: i % 4 === 0 ? '1 Offer Available' : undefined,
    })),
  },

  footwear: {
    title: 'Men Footwear',
    totalProducts: 3210,
    accentColor: '#ec4899',
    brands: ['Nike', 'Adidas', 'Puma', 'Bata', 'Woodland', 'Clarks'],
    filters: [
      { label: 'Sub-Categories', options: ['Casual Shoes', 'Sports Shoes', 'Formal Shoes', 'Sneakers', 'Sandals', 'Flip Flops'] },
      { label: 'Brands', options: ['Nike', 'Adidas', 'Puma', 'Bata', 'Woodland', 'Clarks'] },
      { label: 'Size', options: ['6', '7', '8', '9', '10', '11'] },
      { label: 'Price' },
      { label: 'Color', options: ['Black', 'White', 'Brown', 'Grey', 'Blue'] },
      { label: 'Discount', options: ['70%', '60%', '50%', '40%', '30%'] },
    ],
    products: Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      brand: ['Nike', 'Adidas', 'Puma', 'Bata', 'Woodland', 'Clarks'][i % 6],
      description: ['Running Shoes', 'Casual Sneakers', 'Formal Derby', 'Sandals', 'Loafers', 'Sports Shoes'][i % 6],
      price: [2999, 1999, 2499, 899, 1499, 3499][i % 6],
      originalPrice: i % 3 === 0 ? [5999, 3999, 4999, 1799, 2999, 6999][i % 6] : undefined,
      discount: i % 3 === 0 ? [50, 50, 50, 50, 50, 50][i % 6] : undefined,
      offer: i % 4 === 0 ? '1 Offer Available' : undefined,
    })),
  },

  'indian-festive-wear': {
    title: 'Men Indian & Festive Wear',
    totalProducts: 2890,
    accentColor: '#ec4899',
    brands: ['Manyavar', 'Fabindia', 'W', 'Biba', 'Ethnix', 'Soch'],
    filters: [
      { label: 'Sub-Categories', options: ['Kurtas & Kurta Sets', 'Sherwanis', 'Nehru Jackets', 'Dhotis'] },
      { label: 'Brands', options: ['Manyavar', 'Fabindia', 'Ethnix', 'Soch'] },
      { label: 'Size', options: ['S', 'M', 'L', 'XL', 'XXL'] },
      { label: 'Price' },
      { label: 'Color', options: ['White', 'Cream', 'Blue', 'Maroon', 'Green', 'Yellow'] },
      { label: 'Discount', options: ['60%', '50%', '40%', '30%'] },
    ],
    products: Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      brand: ['Manyavar', 'Fabindia', 'Ethnix', 'Soch', 'W', 'Biba'][i % 6],
      description: ['Cotton Kurta', 'Sherwani Set', 'Nehru Jacket', 'Dhoti Set', 'Kurta Set', 'Festive Kurta'][i % 6],
      price: [999, 3499, 1499, 799, 1999, 2499][i % 6],
      originalPrice: i % 3 === 0 ? [1999, 6999, 2999, 1599, 3999, 4999][i % 6] : undefined,
      discount: i % 3 === 0 ? [50, 50, 50, 50, 50, 50][i % 6] : undefined,
      offer: i % 4 === 0 ? '1 Offer Available' : undefined,
    })),
  },

  athleisure: {
    title: 'Men Athleisure',
    totalProducts: 4120,
    accentColor: '#ec4899',
    brands: ['Nike', 'Adidas', 'Puma', 'Reebok', 'HRX', 'Under Armour'],
    filters: [
      { label: 'Sub-Categories', options: ['Active T-Shirts', 'Track Pants & Joggers', 'Shorts', 'Tracksuits', 'Jackets & Sweatshirts'] },
      { label: 'Brands', options: ['Nike', 'Adidas', 'Puma', 'Reebok', 'HRX', 'Under Armour'] },
      { label: 'Size', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
      { label: 'Price' },
      { label: 'Color', options: ['Black', 'White', 'Grey', 'Blue', 'Red', 'Green'] },
      { label: 'Discount', options: ['60%', '50%', '40%', '30%'] },
    ],
    products: Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      brand: ['Nike', 'Adidas', 'Puma', 'Reebok', 'HRX', 'Under Armour'][i % 6],
      description: ['Active T-Shirt', 'Track Pants', 'Sports Shorts', 'Tracksuit', 'Sports Jacket', 'Joggers'][i % 6],
      price: [999, 1499, 799, 2999, 1999, 1299][i % 6],
      originalPrice: i % 3 === 0 ? [1999, 2999, 1599, 5999, 3999, 2599][i % 6] : undefined,
      discount: i % 3 === 0 ? [50, 50, 50, 50, 50, 50][i % 6] : undefined,
      offer: i % 4 === 0 ? '1 Offer Available' : undefined,
    })),
  },
};

// Default fallback config
const DEFAULT_CONFIG: CategoryConfig = {
  title: 'Men Fashion',
  totalProducts: 1000,
  accentColor: '#ec4899',
  brands: ['U.S. Polo Assn.', 'Louis Philippe', 'Van Heusen'],
  filters: [
    { label: 'Price' },
    { label: 'Size', options: ['S', 'M', 'L', 'XL', 'XXL'] },
    { label: 'Discount', options: ['50%', '40%', '30%'] },
  ],
  products: Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    brand: ['U.S. Polo Assn.', 'Louis Philippe', 'Van Heusen'][i % 3],
    description: ['T-Shirt', 'Shirt', 'Jeans'][i % 3],
    price: [699, 1299, 1499][i % 3],
  })),
};

export default function MenSectionPage() {
  const params = useParams();
  const section = params.section as string;
  const config = SECTION_CONFIGS[section] ?? DEFAULT_CONFIG;

  return <ProductListingPage config={config} />;
}