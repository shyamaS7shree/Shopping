'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  BadgeCheck,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Heart,
  Minus,
  Package,
  Plus,
  RotateCcw,
  Share2,
  Undo2,
} from 'lucide-react';
import { toast } from 'sonner';
import { getProductById } from '@/lib/products';
import { addToCart, getCartItemKey, updateCartQuantity } from '@/lib/cart';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function getParam(
  params: Record<string, string | string[] | undefined>,
  key: string
) {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

function getProductType(product: DetailProduct) {
  return product.subCategory || product.category || product.description || 'Product';
}

function slugify(value?: string) {
  return (value || 'products')
    .toLowerCase()
    .replace(/\s+&\s+/g, '-')
    .replace(/[\s,]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function buildHighlights(product: DetailProduct) {
  const productType = getProductType(product).replace(/^Men\s/, '');
  const lowerType = productType.toLowerCase();
  const lowerName = product.name.toLowerCase();
  const color = product.color || 'As shown';
  const fit = product.fit || 'Regular Fit';

  if (/watch/.test(lowerType)) {
    return [
      ['Dial Shape', 'Round'],
      ['Display', 'Analog'],
      ['Gender', 'Men'],
      ['Product Type', productType],
      ['Strap Material', /leather/.test(lowerName) ? 'Leather' : 'Stainless Steel'],
      ['Water Resistance', 'Splash Resistant'],
      ['Movement', /chronograph/.test(lowerName) ? 'Chronograph' : 'Quartz'],
      ['Care Instructions', 'Wipe with dry cloth'],
    ];
  }

  if (/perfume|mist|body spray|grooming|personal care/.test(lowerType)) {
    return [
      ['Fragrance Type', /mist|spray/.test(lowerName) ? 'Body Spray' : 'Eau De Parfum'],
      ['Pack Of', '1'],
      ['Gender', 'Men'],
      ['Product Type', productType],
      ['Fragrance Family', /wild|code|bold|shot/i.test(product.name) ? 'Woody Spicy' : 'Fresh'],
      ['Volume', /150/.test(product.name) ? '150 ml' : '50 ml'],
      ['Usage', 'Daily Grooming'],
      ['Care Instructions', 'Store in a cool dry place'],
    ];
  }

  if (/wallet/.test(lowerType)) {
    return [
      ['Material', 'Leather'],
      ['Pattern', 'Textured'],
      ['Gender', 'Men'],
      ['Product Type', productType],
      ['Card Slots', 'Multiple'],
      ['Closure Type', 'Fold'],
      ['Color', color],
      ['Care Instructions', 'Wipe with dry cloth'],
    ];
  }

  if (/belt/.test(lowerType)) {
    return [
      ['Material', 'Leather'],
      ['Pattern', 'Solid'],
      ['Gender', 'Men'],
      ['Product Type', productType],
      ['Buckle Type', 'Pin Buckle'],
      ['Occasion', /formal/i.test(product.name) ? 'Formal Wear' : 'Casual Wear'],
      ['Color', color],
      ['Care Instructions', 'Wipe with dry cloth'],
    ];
  }

  if (/sunglasses|frames/.test(lowerType)) {
    return [
      ['Frame Shape', /aviator/i.test(product.name) ? 'Aviator' : 'Square'],
      ['Lens Feature', 'UV Protected'],
      ['Gender', 'Men'],
      ['Product Type', productType],
      ['Frame Material', 'Metal / Acetate'],
      ['Occasion', 'Outdoor Wear'],
      ['Color', color],
      ['Care Instructions', 'Clean with lens cloth'],
    ];
  }

  if (/shoe|sneaker/.test(lowerType)) {
    return [
      ['Sole Material', 'Rubber'],
      ['Closure Type', /slip/i.test(product.name) ? 'Slip-On' : 'Lace-Up'],
      ['Gender', 'Men'],
      ['Product Type', productType],
      ['Occasion', /formal/i.test(lowerType) ? 'Formal Wear' : 'Casual Wear'],
      ['Upper Material', /formal|leather/i.test(product.name) ? 'Leather' : 'Synthetic'],
      ['Color', color],
      ['Care Instructions', 'Wipe with clean cloth'],
    ];
  }

  if (/jacket|blazer|coat|sherwani|nehru/.test(lowerType)) {
    return [
      ['Pattern', /printed|embroidered/i.test(product.name) ? 'Printed' : 'Solid'],
      ['Closure Type', /jacket|coat/i.test(lowerType) ? 'Zip / Button' : 'Button'],
      ['Gender', 'Men'],
      ['Product Type', productType],
      ['Occasion', /sherwani|nehru|blazer|coat/i.test(lowerType) ? 'Festive / Formal Wear' : 'Casual Wear'],
      ['Fabric', /sherwani|nehru/i.test(lowerType) ? 'Jacquard Blend' : 'Polyester Blend'],
      ['Fit', fit],
      ['Care Instructions', 'Dry Clean Preferred'],
    ];
  }

  if (/brief|trunk|boxer|vest|thermal/.test(lowerType)) {
    return [
      ['Pattern', /printed/i.test(product.name) ? 'Printed' : 'Solid'],
      ['Pack Of', /pack/i.test(lowerName) ? 'Pack' : '1'],
      ['Gender', 'Men'],
      ['Product Type', productType],
      ['Fabric', 'Cotton Stretch'],
      ['Waist Rise', 'Mid Rise'],
      ['Fit', fit],
      ['Care Instructions', 'Machine Wash'],
    ];
  }

  return [
    ['Pattern', /printed|typographic/i.test(product.name) ? 'Typographic' : 'Solid'],
    ['Pack Of', '1'],
    ['Gender', 'Men'],
    ['Product Type', productType],
    ['Occasion', /formal/i.test(lowerType) ? 'Formal Wear' : 'Casual Wear'],
    ['Fabric', /jeans/i.test(lowerType) ? 'Denim' : 'Cotton Blend'],
    ['Fit', fit],
    ['Care Instructions', 'Machine Wash'],
  ];
}

type DetailProduct = {
  id: string;
  brand: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category?: string;
  subCategory?: string;
  image: string;
  size?: string;
  color?: string;
  fit?: string;
};

export default function ProductDetailPage({
  params,
  searchParams,
}: ProductDetailPageProps) {
  const { id } = React.use(params);
  const query = React.use(searchParams || Promise.resolve({}));
  const fallbackProduct = getProductById(id);

  const product = useMemo<DetailProduct | null>(() => {
    const queryName = getParam(query, 'name');
    const queryImage = getParam(query, 'image');

    if (queryName && queryImage) {
      return {
        id,
        brand: getParam(query, 'brand') || getParam(query, 'category') || 'Shopore',
        name: queryName,
        description: getParam(query, 'description') || queryName,
        image: queryImage,
        price: Number(getParam(query, 'price') || 0),
        originalPrice: Number(getParam(query, 'originalPrice') || 0) || undefined,
        category: getParam(query, 'category'),
        subCategory: getParam(query, 'subCategory'),
        size: getParam(query, 'size'),
        color: getParam(query, 'color'),
        fit: getParam(query, 'fit'),
      };
    }

    if (!fallbackProduct) return null;

    return {
      id: fallbackProduct.id,
      brand: fallbackProduct.brand || fallbackProduct.category,
      name: fallbackProduct.name,
      description: fallbackProduct.description,
      price: fallbackProduct.price,
      originalPrice: fallbackProduct.originalPrice,
      category: fallbackProduct.category,
      image: fallbackProduct.image,
    };
  }, [fallbackProduct, id, query]);

  const [selectedSize, setSelectedSize] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);
  const [bagQuantity, setBagQuantity] = useState(1);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="mb-4 text-[26px] font-semibold text-[#071225]">
            Product not found
          </h1>
          <Link href="/products" className="text-[14px] font-semibold text-blue-700">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const productType = getProductType(product).replace(/^Men\s/, '');
  const isWearable = !/wallet|belt|perfume|mist|grooming|watch|sunglasses|frames/i.test(
    productType
  );
  const sizes = ['S', 'M', 'L', 'XL', '2XL'];
  const highlights = buildHighlights(product);

  const visibleHighlights = showMore ? highlights : highlights.slice(0, 4);
  const exploreHref = `/men/${slugify(product.subCategory || product.category)}`;
  const cartProduct = {
    id: product.id,
    brand: product.brand,
    name: product.name,
    image: product.image,
    price: product.price,
    originalPrice: product.originalPrice,
    color: product.color,
    size: isWearable ? selectedSize : undefined,
    href: `/products/${product.id}`,
  };

  const handleAddToBag = () => {
    if (isWearable && !selectedSize) {
      toast.error('Please select size');
      return;
    }

    addToCart(cartProduct, bagQuantity);
    setAddedToBag(true);
    toast.success(`${product.name} added to bag`);
  };

  const updateBagQuantity = (quantity: number) => {
    const nextQuantity = Math.max(1, quantity);
    setBagQuantity(nextQuantity);

    if (addedToBag) {
      updateCartQuantity(getCartItemKey(cartProduct), nextQuantity);
    }
  };

  return (
    <main className="min-h-screen bg-white px-4 pb-10 pt-[96px] font-['DM_Sans',Inter,sans-serif] text-[#071225] md:px-10">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 lg:grid-cols-[360px_1fr]">
        <section className="lg:self-stretch">
          <div className="lg:sticky lg:top-[96px]">
            <div className="relative aspect-[3/4] w-full max-w-[360px] overflow-hidden bg-[#f1f2f4]">
              <Image
                src={product.image}
                alt={`${product.brand} ${product.name}`}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 360px"
              />
            </div>
          </div>
        </section>

        <section className="max-w-[760px] pt-1">
          <div className="mb-4 flex items-start justify-between gap-6">
            <div>
              <h1 className="text-[25px] font-semibold uppercase leading-tight tracking-[0] text-[#071225]">
                {product.brand}
              </h1>
              <p className="mt-2 text-[16px] font-normal text-slate-500">
                {product.name}
              </p>
            </div>

            <div className="flex items-center gap-5 pt-1 text-[#071225]">
              <button type="button" aria-label="Share product" className="transition hover:text-pink-500">
                <Share2 size={19} strokeWidth={1.8} />
              </button>
              <button type="button" aria-label="Wishlist product" className="transition hover:text-pink-500">
                <Heart size={20} strokeWidth={1.8} />
              </button>
            </div>
          </div>

          <div className="mb-5">
            <div className="flex flex-wrap items-baseline gap-3">
              <p className="text-[25px] font-bold leading-none text-black">
                ₹{product.price.toLocaleString('en-IN')}
              </p>
              {product.originalPrice && (
                <p className="text-[14px] text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </p>
              )}
            </div>
            <p className="mt-2 text-[12px] text-slate-500">Inclusive of all taxes</p>
          </div>

          {isWearable && (
            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-[18px] font-semibold uppercase tracking-[0] text-[#071225]">
                  Size
                </h2>
                <button type="button" className="flex items-center gap-1 text-[14px] font-semibold text-black">
                  Size Guide <ChevronRight size={16} />
                </button>
              </div>

              <div className="flex flex-wrap items-start gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`h-9 w-11 border text-[13px] transition ${
                      selectedSize === size
                        ? 'border-[#071225] bg-[#071225] text-white'
                        : 'border-slate-300 bg-white text-[#071225] hover:border-[#071225]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
                <span className="self-end px-1 pb-0.5 text-[11px] font-semibold text-red-500">
                  4 Left
                </span>
              </div>
            </div>
          )}

          <div className="mb-6 grid max-w-[770px] grid-cols-1 gap-5 sm:grid-cols-2">
            {addedToBag && (
              <div className="flex h-12 border border-[#071225]">
                <button
                  type="button"
                  onClick={() => updateBagQuantity(bagQuantity - 1)}
                  className="flex w-12 items-center justify-center bg-slate-50 text-[#071225]"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="flex flex-1 items-center justify-center text-[15px] font-semibold">
                  {bagQuantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateBagQuantity(bagQuantity + 1)}
                  className="flex w-12 items-center justify-center bg-slate-50 text-[#071225]"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            )}

            {addedToBag ? (
              <Link
                href="/cart"
                className="flex h-12 items-center justify-center bg-[#1f1b1f] text-[16px] font-semibold text-white shadow-sm transition hover:bg-[#111d31]"
              >
                Go To Bag
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleAddToBag}
                className="h-12 bg-[#071225] text-[16px] font-semibold text-white shadow-sm transition hover:bg-[#111d31] sm:col-span-2"
              >
                Add To Bag
              </button>
            )}
          </div>

          <section className="mb-7">
            <h2 className="mb-4 text-[20px] font-semibold uppercase tracking-[0]">
              Delivery Details
            </h2>
            <div className="flex h-[46px] max-w-[770px] border border-slate-400">
              <input
                type="text"
                placeholder="Enter your PIN code"
                className="min-w-0 flex-1 px-4 text-[14px] text-[#071225] outline-none placeholder:text-slate-500"
              />
              <button type="button" className="px-5 text-[14px] font-semibold text-[#071225]">
                CHECK
              </button>
            </div>

            <div className="mt-3 flex items-center gap-3 text-[15px] text-[#071225]">
              <RotateCcw size={18} className="text-slate-500" />
              <span>14 Days Easy Returns And Exchange</span>
            </div>
          </section>

          <section className="mb-8 grid grid-cols-3 border-y border-slate-200 py-5">
            {[
              [BadgeCheck, '100% Authentic'],
              [Package, 'Fast Delivery'],
              [Undo2, 'Easy Return'],
            ].map(([Icon, label], index) => {
              const ServiceIcon = Icon as typeof BadgeCheck;
              return (
                <div
                  key={label as string}
                  className={`text-center ${index !== 2 ? 'border-r border-slate-200' : ''}`}
                >
                  <ServiceIcon className="mx-auto mb-2 text-black" size={27} />
                  <p className="text-[13px] text-[#071225]">{label as string}</p>
                </div>
              );
            })}
          </section>

          <section className="border-t border-slate-200 pt-7">
            <button
              type="button"
              onClick={() => setShowMore((value) => !value)}
              className="mb-6 flex w-full items-center justify-between text-left"
            >
              <h2 className="text-[23px] font-semibold uppercase tracking-[0] text-black">
                Product Highlights
              </h2>
              {showMore ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
            </button>

            <div className="grid grid-cols-1 gap-x-24 gap-y-5 text-[14px] sm:grid-cols-2">
              {visibleHighlights.map(([label, value]) => (
                <div key={label}>
                  <p className="text-slate-500">{label}:</p>
                  <p className="mt-1 font-semibold text-black">{value}</p>
                </div>
              ))}
            </div>

            {!showMore && (
              <button
                type="button"
                onClick={() => setShowMore(true)}
                className="mt-7 flex items-center gap-1 text-[14px] font-semibold text-blue-700"
              >
                View More <ChevronDown size={15} />
              </button>
            )}

            <Link
              href={exploreHref}
              className="mt-8 flex items-center justify-between border border-slate-200 px-4 py-3 transition hover:border-slate-300"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-11 overflow-hidden bg-slate-100">
                  <Image src={product.image} alt={product.name} fill className="object-cover" sizes="44px" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-[#071225]">{product.brand}</p>
                  <p className="mt-1 text-[13px] text-slate-500">Explore All Products</p>
                </div>
              </div>
              <ChevronRight size={18} />
            </Link>
          </section>
        </section>
      </div>
    </main>
  );
}
