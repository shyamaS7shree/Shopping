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
  PackageSearch,
} from 'lucide-react';

export interface Product {
  id: number;
  brand: string;
  name?: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  offer?: string;
  image?: string;
  category?: string;
  subCategory?: string;
  size?: string;
  color?: string;
  fit?: string;
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

// ─── Filter Item ────────────────────────────────────────────────────────────

function FilterItem({
  section,
  accentColor,
  selectedOptions,
  onToggle,
}: {
  section: FilterSection;
  accentColor: string;
  selectedOptions: string[];
  onToggle: (option: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const options = section.options || [];
  const visibleOptions = showAll ? options : options.slice(0, 6);
  const isPriceFilter = section.label.toLowerCase() === 'price';

  return (
    <div className="border-b border-gray-100 py-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left text-[14px] font-semibold text-gray-800"
      >
        {section.label}
        {open ? <Minus size={15} /> : <Plus size={15} />}
      </button>

      {open && options.length > 0 && (
        <div className="mt-4 space-y-3">
          {visibleOptions.map((option) => {
            const checked = selectedOptions.includes(option);
            return (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-3 text-[13px] text-gray-700"
              >
                <button
                  type="button"
                  onClick={() => onToggle(option)}
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded border transition"
                  style={{
                    borderColor: checked ? accentColor : '#d1d5db',
                    backgroundColor: checked ? accentColor : '#ffffff',
                  }}
                >
                  {checked && (
                    <span className="text-[10px] font-bold text-white">✓</span>
                  )}
                </button>
                <span
                  className={
                    isPriceFilter
                      ? 'rounded-full bg-gray-50 px-2.5 py-1 text-[12px] font-semibold text-gray-800'
                      : 'truncate'
                  }
                >
                  {option}
                </span>
              </label>
            );
          })}

          {options.length > 6 && (
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
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
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[12px] text-gray-800 outline-none"
            />
            <input
              type="number"
              placeholder="Max"
              defaultValue={10000}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[12px] text-gray-800 outline-none"
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

// ─── Product Card (no image) ─────────────────────────────────────────────────

function ProductCard({
  product,
  accentColor,
}: {
  product: Product;
  accentColor: string;
}) {
  const [liked, setLiked] = useState(false);
  const productHref = {
    pathname: `/products/${product.id}`,
    query: {
      brand: product.brand,
      name: product.name || product.description,
      description: product.description,
      image: product.image || '',
      price: String(product.price),
      originalPrice: product.originalPrice ? String(product.originalPrice) : '',
      category: product.category || '',
      subCategory: product.subCategory || '',
      size: product.size || '',
      color: product.color || '',
      fit: product.fit || '',
    },
  };

  return (
    <Link href={productHref} className="group block">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100">
        {product.image ? (
          <img
            src={product.image}
            alt={`${product.brand} ${product.name || product.description}`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center">
            <span className="text-[13px] font-bold text-gray-500">{product.brand}</span>
            <span className="text-[11px] leading-snug text-gray-400">{product.name || product.description}</span>
          </div>
        )}

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
          onClick={(e) => {
            e.preventDefault();
            setLiked((v) => !v);
          }}
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <Heart
            size={17}
            color={liked ? '#ef4444' : '#6b7280'}
            fill={liked ? '#ef4444' : 'none'}
          />
        </button>
      </div>

      <div className="pt-3">
        <h3 className="truncate text-[11px] font-bold text-gray-900 md:text-[13px]">
          {product.brand}
        </h3>
        <p className="mt-1 truncate text-[11px] text-gray-500 md:text-[12px]">
          {product.name || product.description}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-[13px] font-bold text-gray-950 md:text-[14px]">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-[11px] text-gray-400 line-through md:text-[12px]">
              ₹{product.originalPrice.toLocaleString('en-IN')}
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

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ProductListingPage({ config }: ProductListingPageProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Popularity');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Global filter state: map of filterLabel -> selected options[]
  const [filterSelections, setFilterSelections] = useState<Record<string, string[]>>({});

  // Active brand pills
  const [activeBrands, setActiveBrands] = useState<string[]>([]);

  const sortOptions = [
    'Popularity',
    'New Arrivals',
    'Discount',
    'Price Low to High',
    'Price High to Low',
  ];

  // Toggle a filter option
  const toggleFilterOption = (label: string, option: string) => {
    setFilterSelections((prev) => {
      const existing = prev[label] || [];
      const updated = existing.includes(option)
        ? existing.filter((o) => o !== option)
        : [...existing, option];
      return { ...prev, [label]: updated };
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilterSelections({});
    setActiveBrands([]);
  };

  // Toggle brand pill
  const toggleBrand = (brand: string) => {
    setActiveBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const hasActiveFilters =
    activeBrands.length > 0 ||
    Object.values(filterSelections).some((v) => v.length > 0);

  // Build filtered + sorted product list
  const products = useMemo(() => {
    let list = [...config.products];

    // Filter by active brand pills
    if (activeBrands.length > 0) {
      list = list.filter((p) => activeBrands.includes(p.brand));
    }

    // Filter by sidebar brand selections
    const selectedBrands = filterSelections['Brands'] || [];
    if (selectedBrands.length > 0) {
      list = list.filter((p) => selectedBrands.includes(p.brand));
    }

    const selectedSubCategories = filterSelections['Sub-Categories'] || [];
    if (selectedSubCategories.length > 0) {
      list = list.filter((p) =>
        selectedSubCategories.includes(p.subCategory || p.description)
      );
    }

    const selectedCategories = filterSelections['Categories'] || [];
    if (selectedCategories.length > 0) {
      list = list.filter((p) => p.category && selectedCategories.includes(p.category));
    }

    const selectedPrices = filterSelections['Price'] || [];
    if (selectedPrices.length > 0) {
      list = list.filter((p) =>
        selectedPrices.some((option) => {
          if (option.includes('500')) return p.price >= 500 && p.price <= 999;
          if (option.includes('1,000')) return p.price >= 1000 && p.price <= 1999;
          if (option.includes('2,000')) return p.price >= 2000 && p.price <= 2999;
          if (option.includes('3,000')) return p.price >= 3000;
          return true;
        })
      );
    }

    const selectedDiscounts = filterSelections['Discount'] || [];
    if (selectedDiscounts.length > 0) {
      const minDiscount = Math.min(
        ...selectedDiscounts
          .map((option) => Number(option.match(/\d+/)?.[0] || 0))
          .filter(Boolean)
      );
      list = list.filter((p) => (p.discount || 0) >= minDiscount);
    }

    const selectedSizes = filterSelections['Size'] || [];
    if (selectedSizes.length > 0) {
      list = list.filter((p) => p.size && selectedSizes.includes(p.size));
    }

    const selectedColors = filterSelections['Color'] || [];
    if (selectedColors.length > 0) {
      list = list.filter((p) => p.color && selectedColors.includes(p.color));
    }

    const selectedFits = filterSelections['Fit'] || [];
    if (selectedFits.length > 0) {
      list = list.filter((p) => p.fit && selectedFits.includes(p.fit));
    }

    // Sort
    if (sortBy === 'Price Low to High') list.sort((a, b) => a.price - b.price);
    if (sortBy === 'Price High to Low') list.sort((a, b) => b.price - a.price);
    if (sortBy === 'Discount') list.sort((a, b) => (b.discount || 0) - (a.discount || 0));

    return list;
  }, [config.products, sortBy, activeBrands, filterSelections]);

  const renderFilterPanel = () => (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} />
          <h2 className="text-[18px] font-bold text-gray-900">Filters</h2>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-[12px] font-bold"
            style={{ color: config.accentColor }}
          >
            Clear
          </button>
        )}
      </div>

      {config.filters.map((filter) => (
        <FilterItem
          key={filter.label}
          section={filter}
          accentColor={config.accentColor}
          selectedOptions={filterSelections[filter.label] || []}
          onToggle={(option) => toggleFilterOption(filter.label, option)}
        />
      ))}
    </>
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white pt-[92px]">
        {/* Breadcrumb — normal flow, right below navbar offset */}
        <div className="bg-white px-6 pb-2 text-[14px] text-gray-500">
          Home / Men /{' '}
          <span className="font-semibold text-gray-900">{config.title}</span>
        </div>

        <div className="mx-auto flex max-w-[1500px] gap-6 px-4 py-4 md:px-6">
          {/* Sidebar — sticky starts below navbar+breadcrumb = 92+37=129px */}
          <aside className="sticky top-[110px] hidden h-[calc(100vh-110px)] w-[260px] shrink-0 overflow-y-auto lg:block">
            {renderFilterPanel()}
          </aside>

          {/* ── Main Content ── */}
          <main className="flex-1">
            {/* Title + Sort — no box, just a plain row */}
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-[22px] font-bold text-gray-950">
                  {config.title}
                </h1>
                <p className="mt-0.5 text-[13px] text-gray-500">
                  {products.length.toLocaleString()} Products
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile filter trigger */}
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-[13px] font-semibold lg:hidden"
                >
                  <SlidersHorizontal size={16} />
                  Filters
                </button>

                {/* Sort dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSortOpen((v) => !v)}
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
                            color: sortBy === option ? config.accentColor : '#374151',
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

            {/* Brand pills */}
            <div className="mb-6 flex flex-wrap gap-2">
              {config.brands.map((brand) => {
                const active = activeBrands.includes(brand);
                return (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => toggleBrand(brand)}
                    className="rounded-full border px-4 py-1.5 text-[12px] font-medium transition"
                    style={{
                      borderColor: active ? config.accentColor : '#e5e7eb',
                      backgroundColor: active ? config.accentColor : '#ffffff',
                      color: active ? '#ffffff' : '#374151',
                    }}
                  >
                    {brand}
                  </button>
                );
              })}
            </div>

            {/* Product grid or No Results */}
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <PackageSearch size={48} className="mb-4 text-gray-300" />
                <h3 className="text-[18px] font-bold text-gray-700">No results found</h3>
                <p className="mt-2 text-[13px] text-gray-400">
                  Try adjusting your filters or clearing them to see more products.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-5 rounded-full px-6 py-2 text-[13px] font-bold text-white transition"
                  style={{ backgroundColor: config.accentColor }}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    accentColor={config.accentColor}
                  />
                ))}
              </div>
            )}

            {products.length > 0 && (
              <div className="flex justify-center py-12">
              </div>
            )}
          </main>
        </div>

        {/* Mobile filter drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-[200] bg-black/40 lg:hidden">
            <div className="h-full w-[85%] max-w-[340px] overflow-y-auto bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-sm font-bold"
                  style={{ color: config.accentColor }}
                >
                  Close
                </button>
              </div>

              {renderFilterPanel()}

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={() => {
                    clearAllFilters();
                    setMobileFilterOpen(false);
                  }}
                  className="mt-4 w-full rounded-full py-3 text-[13px] font-bold text-white"
                  style={{ backgroundColor: config.accentColor }}
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
