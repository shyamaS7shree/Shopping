'use client';

import ProductListingPage, { CategoryConfig } from '@/components/ProductListingPage';
import { useParams } from 'next/navigation';

const commonFilters = [
  { label: 'Department', options: ['Men'] },
  { label: 'Categories', options: ['Topwear', 'Bottomwear', 'Footwear', 'Sports & Active Wear', 'Indian & Festive Wear'] },
  { label: 'Brands', options: ['U.S. Polo Assn.', 'Louis Philippe', 'Van Heusen', 'FRATINI', 'Nike', 'Adidas', 'Puma'] },
  { label: 'Size', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'] },
  { label: 'Price', options: ['₹0 - ₹999', '₹1000 - ₹1999', '₹2000 - ₹2999', '₹3000+'] },
  { label: 'Color', options: ['Black', 'White', 'Blue', 'Navy', 'Grey', 'Red', 'Green'] },
  { label: 'Discount', options: ['70% and above', '60% and above', '50% and above', '40% and above'] },
  { label: 'Fabric', options: ['Cotton', 'Linen', 'Polyester', 'Denim', 'Blended'] },
  { label: 'Fit', options: ['Slim Fit', 'Regular Fit', 'Relaxed Fit', 'Oversized'] },
  { label: 'Pattern', options: ['Solid', 'Printed', 'Striped', 'Checked', 'Typographic'] },
];

const images = [
  'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=700&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&auto=format&fit=crop',
];

function makeProducts(category: string, brands: string[]) {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    brand: brands[i % brands.length],
    description: category,
    price: [699, 999, 1299, 1899, 2499][i % 5],
    originalPrice: i % 2 === 0 ? [1499, 1999, 2999, 3999, 4999][i % 5] : undefined,
    discount: i % 2 === 0 ? [55, 50, 45, 60, 70][i % 5] : undefined,
    image: images[i % images.length],
  }));
}

const SECTION_CONFIGS: Record<string, CategoryConfig> = {
  't-shirts': {
    title: 'Men T-Shirts',
    totalProducts: 14610,
    accentColor: '#ec4899',
    brands: ['Crimsoune Club', 'Louis Philippe', 'Van Heusen', 'U.S. Polo Assn.', 'Intune', 'FRATINI'],
    filters: [{ label: 'Sub-Categories', options: ['T-Shirts', 'Polo T-Shirts', 'Oversized T-Shirts', 'Printed T-Shirts'] }, ...commonFilters],
    products: makeProducts('Typographic Cotton T-Shirt', ['U.S. Polo Assn.', 'Van Heusen', 'FRATINI', 'Louis Philippe']),
  },

  'casual-shirts': {
    title: 'Men Casual Shirts',
    totalProducts: 8432,
    accentColor: '#ec4899',
    brands: ['U.S. Polo Assn.', 'Louis Philippe', 'Van Heusen', 'Peter England', 'Arrow'],
    filters: [{ label: 'Sub-Categories', options: ['Casual Shirts', 'Denim Shirts', 'Linen Shirts', 'Checked Shirts'] }, ...commonFilters],
    products: makeProducts('Slim Fit Casual Shirt', ['U.S. Polo Assn.', 'Louis Philippe', 'Van Heusen', 'Arrow']),
  },

  'formal-shirts': {
    title: 'Men Formal Shirts',
    totalProducts: 6210,
    accentColor: '#ec4899',
    brands: ['Louis Philippe', 'Van Heusen', 'Arrow', 'Raymond'],
    filters: [{ label: 'Sub-Categories', options: ['Formal Shirts', 'Slim Fit Shirts', 'Office Shirts'] }, ...commonFilters],
    products: makeProducts('Formal Cotton Shirt', ['Louis Philippe', 'Van Heusen', 'Arrow', 'Raymond']),
  },

  jeans: {
    title: 'Men Jeans',
    totalProducts: 5621,
    accentColor: '#ec4899',
    brands: ['Levis', 'Wrangler', 'Lee', 'Flying Machine', 'Jack & Jones'],
    filters: [{ label: 'Sub-Categories', options: ['Jeans', 'Slim Jeans', 'Straight Jeans', 'Relaxed Jeans'] }, ...commonFilters],
    products: makeProducts('Slim Fit Jeans', ['Levis', 'Wrangler', 'Lee', 'Flying Machine']),
  },

  'casual-shoes': {
    title: 'Men Casual Shoes',
    totalProducts: 3210,
    accentColor: '#ec4899',
    brands: ['Nike', 'Adidas', 'Puma', 'Bata', 'Woodland'],
    filters: [{ label: 'Sub-Categories', options: ['Casual Shoes', 'Sneakers', 'Loafers', 'Slip Ons'] }, ...commonFilters],
    products: makeProducts('Casual Sneakers', ['Nike', 'Adidas', 'Puma', 'Bata']),
  },

  'sports-shoes': {
    title: 'Men Sports Shoes',
    totalProducts: 4120,
    accentColor: '#ec4899',
    brands: ['Nike', 'Adidas', 'Puma', 'Reebok', 'HRX'],
    filters: [{ label: 'Sub-Categories', options: ['Sports Shoes', 'Running Shoes', 'Training Shoes'] }, ...commonFilters],
    products: makeProducts('Running Sports Shoes', ['Nike', 'Adidas', 'Puma', 'Reebok']),
  },

  kurtas: {
    title: 'Men Kurtas & Kurta Sets',
    totalProducts: 2890,
    accentColor: '#ec4899',
    brands: ['Manyavar', 'Fabindia', 'Ethnix', 'Soch'],
    filters: [{ label: 'Sub-Categories', options: ['Kurtas', 'Kurta Sets', 'Sherwanis', 'Nehru Jackets'] }, ...commonFilters],
    products: makeProducts('Cotton Kurta', ['Manyavar', 'Fabindia', 'Ethnix']),
  },
};

const DEFAULT_CONFIG = SECTION_CONFIGS['t-shirts'];

export default function MenSectionPage() {
  const params = useParams();
  const section = params.section as string;
  const config = SECTION_CONFIGS[section] ?? DEFAULT_CONFIG;

  return <ProductListingPage config={config} />;
}