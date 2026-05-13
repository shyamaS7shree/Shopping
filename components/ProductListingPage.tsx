'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import {
  Heart,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  SlidersHorizontal,
  Loader2,
} from 'lucide-react';

export interface Product {
  id: number;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  offer?: string;
  image?: string;
}

export interface FilterSection {
  label: string;
  options?: string[];
}

export interface CategoryConfig {
  title: string;
  totalProducts: number;
  accentColor: string;
  brands: string[];
  filters: FilterSection[];
  products: Product[];
}

interface ProductListingPageProps {
  config: CategoryConfig;
}

const fallbackImages = [
  'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=700&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=700&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=700&auto=format&fit=crop',
];

function FilterItem({
  section,
  accentColor,
}: {
  section: FilterSection;
  accentColor: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  const options = section.options || [];
  const visibleOptions = showAll ? options : options.slice(0, 6);

  const toggleOption = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="border-b border-white/50 py-4">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between text-left text-[14px] font-semibold text-gray-800"
      >
        {section.label}
        {open ? <Minus size={15} /> : <Plus size={15} />}
      </button>

      {open && options.length > 0 && (
        <div className="mt-4 space-y-3">
          {visibleOptions.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-3 text-[13px] text-gray-700"
            >
              <button
                type="button"
                onClick={() => toggleOption(option)}
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded border"
                style={{
                  borderColor: selected.includes(option) ? accentColor : '#d1d5db',
                  backgroundColor: selected.includes(option) ? accentColor : '#ffffff',
                }}
              >
                {selected.includes(option) && (
                  <span className="text-[10px] font-bold text-white">✓</span>
                )}
              </button>

              <span className="truncate">{option}</span>
            </label>
          ))}

          {options.length > 6 && (
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              className="text-[12px] font-bold"
              style={{ color: accentColor }}
            >
              {showAll ? 'SHOW LESS' : `SEE MORE (${options.length - 6})`}
            </button>
          )}
        </div>
      )}

      {open && section.label.toLowerCase() === 'price' && options.length === 0 && (
        <div className="mt-4">
          <div className="mb-3 flex gap-2">
            <input
              type="number"
              placeholder="Min"
              defaultValue={100}
              className="w-full rounded-lg border border-gray-200 bg-white/80 px-3 py-2 text-[12px] text-gray-800 outline-none"
            />
            <input
              type="number"
              placeholder="Max"
              defaultValue={10000}
              className="w-full rounded-lg border border-gray-200 bg-white/80 px-3 py-2 text-[12px] text-gray-800 outline-none"
            />
          </div>

          <input
            type="range"
            min={100}
            max={10000}
            defaultValue={5000}
            className="w-full"
            style={{ accentColor }}
          />
        </div>
      )}
    </div>
  );
}

function ProductCard({
  product,
  accentColor,
  image,
}: {
  product: Product;
  accentColor: string;
  image: string;
}) {
  const [liked, setLiked] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-md bg-pink-50">
        {!loaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-pink-50">
            <Loader2 className="animate-spin text-pink-400" size={24} />
          </div>
        )}

        <img
          src={product.image || image}
          alt={product.brand}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {product.discount && (
          <span
            className="absolute left-2 top-2 rounded px-2 py-1 text-[11px] font-bold text-white"
            style={{ backgroundColor: accentColor }}
          >
            {product.discount}% OFF
          </span>
        )}

        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            setLiked((value) => !value);
          }}
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur"
        >
          <Heart
            size={17}
            color={liked ? '#ef4444' : '#6b7280'}
            fill={liked ? '#ef4444' : 'none'}
          />
        </button>
      </div>

      <div className="pt-3">
        <h3 className="w-full truncate font-satoshi-medium text-[11px] font-bold text-primaryBrown-600 md:text-[13px] select-none md:select-text">
          {product.brand}
        </h3>

        <p className="mt-1 w-full truncate font-satoshi-medium text-[11px] text-primaryBrown-600 md:text-[13px] select-none md:select-text">
          {product.description}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-[13px] font-bold text-gray-950 md:text-[14px]">
            ₹{product.price}
          </span>

          {product.originalPrice && (
            <span className="text-[11px] text-gray-400 line-through md:text-[12px]">
              ₹{product.originalPrice}
            </span>
          )}

          {product.discount && (
            <span className="text-[11px] font-bold text-emerald-600 md:text-[12px]">
              {product.discount}% Off
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function ProductListingPage({ config }: ProductListingPageProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Popularity');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const sortOptions = [
    'Popularity',
    'New Arrivals',
    'Discount',
    'Price Low to High',
    'Price High to Low',
  ];

  const products = useMemo(() => {
    const list = [...config.products];

    if (sortBy === 'Price Low to High') {
      list.sort((a, b) => a.price - b.price);
    }

    if (sortBy === 'Price High to Low') {
      list.sort((a, b) => b.price - a.price);
    }

    if (sortBy === 'Discount') {
      list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    }

    return list;
  }, [config.products, sortBy]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-white via-pink-50/20 to-white pt-[92px]">
        <div className="border-b border-pink-100/70 bg-white/70 px-6 py-3 text-[12px] text-gray-500 backdrop-blur-xl">
          Home / Men /{' '}
          <span className="font-semibold text-gray-900">{config.title}</span>
        </div>

        <div className="mx-auto flex max-w-[1500px] gap-6 px-4 py-6 md:px-6">
          <aside className="sticky top-[105px] hidden h-[calc(100vh-120px)] w-[280px] shrink-0 overflow-y-auto rounded-[28px] border border-white/70 bg-white/60 p-5 shadow-[0_20px_60px_rgba(236,72,153,0.13)] backdrop-blur-2xl lg:block">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} />
                <h2 className="text-[18px] font-bold text-gray-900">Filters</h2>
              </div>

              <button
                type="button"
                className="text-[12px] font-bold"
                style={{ color: config.accentColor }}
              >
                Clear
              </button>
            </div>

            {config.filters.map((filter) => (
              <FilterItem
                key={filter.label}
                section={filter}
                accentColor={config.accentColor}
              />
            ))}
          </aside>

          <main className="flex-1">
            <div className="mb-5 flex flex-col gap-4 rounded-[24px] border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur-xl md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-[22px] font-bold text-gray-950">
                  {config.title}
                </h1>
                <p className="mt-1 text-[13px] text-gray-500">
                  {config.totalProducts.toLocaleString()} Products
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-[13px] font-semibold lg:hidden"
                >
                  <SlidersHorizontal size={16} />
                  Filters
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSortOpen((value) => !value)}
                    className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-[13px]"
                  >
                    <span className="text-gray-500">Sort By</span>
                    <span className="font-bold text-gray-900">{sortBy}</span>
                    {sortOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>

                  {sortOpen && (
                    <div className="absolute right-0 top-12 z-40 w-[210px] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setSortBy(option);
                            setSortOpen(false);
                          }}
                          className="block w-full px-5 py-3 text-left text-[13px] hover:bg-pink-50"
                          style={{
                            color:
                              sortBy === option ? config.accentColor : '#374151',
                            fontWeight: sortBy === option ? 700 : 500,
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
              {config.brands.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  className="rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-[12px] font-medium text-gray-700 shadow-sm backdrop-blur transition hover:border-pink-400 hover:text-pink-600"
                >
                  {brand}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  accentColor={config.accentColor}
                  image={fallbackImages[index % fallbackImages.length]}
                />
              ))}
            </div>

            <div className="flex justify-center py-12">
              <div className="flex items-center gap-2 rounded-full bg-white/80 px-5 py-3 text-[13px] font-semibold text-gray-500 shadow-sm backdrop-blur">
                <span className="h-2 w-2 animate-bounce rounded-full bg-pink-500" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-pink-400 [animation-delay:120ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-pink-300 [animation-delay:240ms]" />
                All products loaded
              </div>
            </div>
          </main>
        </div>

        {mobileFilterOpen && (
          <div className="fixed inset-0 z-[200] bg-black/40 lg:hidden">
            <div className="h-full w-[85%] max-w-[340px] overflow-y-auto bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold">Filters</h2>

                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-sm font-bold text-pink-600"
                >
                  Close
                </button>
              </div>

              {config.filters.map((filter) => (
                <FilterItem
                  key={filter.label}
                  section={filter}
                  accentColor={config.accentColor}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}