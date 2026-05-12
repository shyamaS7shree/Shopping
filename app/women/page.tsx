'use client';
import ProductListingPage, { CategoryConfig } from '@/components/ProductListingPage';

const WOMEN_CONFIG: CategoryConfig = {
  title: 'Women Western Wear',
  totalProducts: 18432,
  accentColor: '#ec4899',
  brands: ['H&M', 'Zara', 'Mango', 'AND', 'Global Desi', 'W'],
  filters: [
    { label: 'Department', options: ['Women', 'Girls'] },
    { label: 'Categories', options: ['Dresses', 'Tops', 'Jeans', 'Trousers', 'Skirts', 'Co-ords', 'Jumpsuits', 'Jackets'] },
    { label: 'Sub-Categories', options: ['Midi Dress', 'Maxi Dress', 'Mini Dress', 'Shirt Dress', 'Wrap Dress', 'Bodycon Dress'] },
    { label: 'Brands', options: ['H&M', 'Zara', 'Mango', 'AND', 'Global Desi', 'W', 'Biba', 'Libas', 'Anouk', 'Aurelia'] },
    { label: 'Product Type', options: ['Regular', 'Slim Fit', 'Relaxed Fit', 'Flared', 'Oversized'] },
    { label: 'Size', options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'] },
    { label: 'Price' },
    { label: 'Color', options: ['Black', 'White', 'Pink', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Beige'] },
    { label: 'Offers', options: ['Select All', 'Buy 2 Get 1 Free', 'Flat 40% Off', 'Flat 50% Off', 'Flat 60% Off'] },
    { label: 'Discount', options: ['80%', '70%', '65%', '60%', '50%', '40%', '30%'] },
    { label: 'Fabric', options: ['Cotton', 'Chiffon', 'Georgette', 'Silk', 'Polyester', 'Rayon', 'Linen'] },
    { label: 'Occasion', options: ['Casual', 'Party', 'Work', 'Beach', 'Festive'] },
    { label: 'Pattern', options: ['Solid', 'Floral', 'Striped', 'Printed', 'Geometric'] },
  ],
  products: Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    brand: ['H&M', 'Zara', 'Mango', 'AND', 'Global Desi', 'W', 'Biba', 'Libas'][i % 8],
    description: ['Floral Midi Dress', 'Solid Wrap Dress', 'Striped Shirt', 'High Waist Jeans', 'Flared Co-ord Set', 'Jumpsuit', 'Maxi Skirt', 'Crop Top'][i % 8],
    price: [999, 2499, 1299, 1899, 3499, 2199, 1599, 799][i % 8],
    originalPrice: i % 3 === 0 ? ([1999, 4999, 2499, 3799, 5999, 4199, 2999, 1499][i % 8]) : undefined,
    discount: i % 3 === 0 ? ([50, 50, 48, 50, 42, 48, 47, 47][i % 8]) : undefined,
    offer: i % 4 === 0 ? '1 Offer Available' : undefined,
  })),
};

export default function WomenPage() {
  return <ProductListingPage config={WOMEN_CONFIG} />;
}