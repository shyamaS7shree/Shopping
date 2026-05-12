'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Heart, ChevronDown, ChevronUp, Plus, Minus, SlidersHorizontal } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────
export interface Product {
  id: number;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  offer?: string;
  image?: string; // optional — show placeholder if not provided
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

// ── Placeholder image box ───────────────────────────────────────────────────
function ProductImagePlaceholder({ color }: { color: string }) {
  return (
    <div style={{
      width: '100%',
      aspectRatio: '3/4',
      background: `linear-gradient(135deg, ${color}18 0%, ${color}30 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
    }}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="4" width="32" height="40" rx="2" stroke={color} strokeWidth="2" strokeOpacity="0.4" />
        <circle cx="24" cy="18" r="6" stroke={color} strokeWidth="2" strokeOpacity="0.4" />
        <path d="M10 38c0-7 28-7 28 0" stroke={color} strokeWidth="2" strokeOpacity="0.4" />
      </svg>
    </div>
  );
}

// ── Single filter section ──────────────────────────────────────────────────
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

  const visibleOptions = showAll
    ? (section.options || [])
    : (section.options || []).slice(0, 5);

  const toggle = (opt: string) =>
    setSelected(prev =>
      prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt]
    );

  return (
    <div style={{ borderBottom: '1px solid #f0f0f0', padding: '14px 0' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: 0, fontSize: '14px', fontWeight: '600', color: '#1f2937',
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        {section.label}
        {open
          ? <Minus size={16} color="#9ca3af" />
          : <Plus size={16} color="#9ca3af" />}
      </button>

      {open && section.options && section.options.length > 0 && (
        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Search inside filter */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#f9fafb', borderRadius: '6px', padding: '6px 10px',
            marginBottom: '4px',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              placeholder="Search"
              style={{ border: 'none', background: 'none', outline: 'none', fontSize: '12px', color: '#374151', width: '100%', fontFamily: 'DM Sans, sans-serif' }}
            />
          </div>

          {visibleOptions.map(opt => (
            <label
              key={opt}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            >
              <div
                onClick={() => toggle(opt)}
                style={{
                  width: '16px', height: '16px', borderRadius: '3px',
                  border: `2px solid ${selected.includes(opt) ? accentColor : '#d1d5db'}`,
                  background: selected.includes(opt) ? accentColor : '#fff',
                  flexShrink: 0, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {selected.includes(opt) && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <span style={{ fontSize: '13px', color: '#374151' }}>{opt}</span>
            </label>
          ))}

          {(section.options.length > 5) && (
            <button
              onClick={() => setShowAll(s => !s)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: accentColor, fontSize: '12px', fontWeight: '600',
                textAlign: 'left', padding: '4px 0', fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {showAll
                ? 'SHOW LESS'
                : `SEE MORE (${section.options.length - 5})`}
            </button>
          )}
        </div>
      )}

      {/* Price range special case */}
      {open && section.label === 'Price' && !section.options && (
        <div style={{ marginTop: '12px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
            {['Min. Amount', 'Max. Amount'].map((placeholder, i) => (
              <input
                key={i}
                type="number"
                placeholder={placeholder}
                defaultValue={i === 0 ? 100 : 10000}
                style={{
                  flex: 1, padding: '8px', border: '1px solid #e5e7eb',
                  borderRadius: '4px', fontSize: '13px', fontFamily: 'DM Sans, sans-serif',
                  outline: 'none', color: '#1f2937',
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>
            <span>₹100</span><span>₹10000</span>
          </div>
          <input type="range" min={100} max={10000} defaultValue={5000}
            style={{ width: '100%', accentColor }} />
        </div>
      )}
    </div>
  );
}

// ── Product Card ───────────────────────────────────────────────────────────
function ProductCard({ product, accentColor }: { product: Product; accentColor: string }) {
  const [liked, setLiked] = useState(false);

  return (
    <div style={{ cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
      <div style={{ position: 'relative' }}>
        {product.image
          ? <img src={product.image} alt={product.brand} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '4px', display: 'block' }} />
          : <ProductImagePlaceholder color={accentColor} />
        }
        <button
          onClick={() => setLiked(l => !l)}
          style={{
            position: 'absolute', top: '8px', right: '8px',
            background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
            width: '32px', height: '32px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <Heart size={16} fill={liked ? '#ef4444' : 'none'} color={liked ? '#ef4444' : '#6b7280'} />
        </button>
        {product.discount && (
          <div style={{
            position: 'absolute', top: '8px', left: '8px',
            background: accentColor, color: '#fff',
            fontSize: '11px', fontWeight: '700', padding: '2px 6px', borderRadius: '3px',
          }}>
            {product.discount}% OFF
          </div>
        )}
      </div>
      <div style={{ padding: '8px 2px 4px' }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: '#1f2937' }}>{product.brand}</div>
        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.description}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#1f2937' }}>₹{product.price}</span>
          {product.originalPrice && (
            <span style={{ fontSize: '12px', color: '#9ca3af', textDecoration: 'line-through' }}>₹{product.originalPrice}</span>
          )}
          {product.discount && (
            <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: '600' }}>{product.discount}% Off</span>
          )}
        </div>
        {product.offer && (
          <div style={{ fontSize: '11px', color: accentColor, fontWeight: '600', marginTop: '3px' }}>{product.offer}</div>
        )}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
const PRODUCTS_PER_PAGE = 10;

export default function ProductListingPage({ config }: ProductListingPageProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const totalPages = Math.ceil(config.products.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = config.products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const sortOptions = ['Popularity', 'New', 'Discount', 'Price Low to High', 'Price High to Low'];

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#fff', fontFamily: 'DM Sans, sans-serif' }}>

        {/* Breadcrumb */}
        <div style={{ padding: '12px 24px', fontSize: '12px', color: '#6b7280', borderBottom: '1px solid #f3f4f6' }}>
          <span>Home</span>
          <span style={{ margin: '0 6px' }}>/</span>
          <span>{config.title.split(' ')[0]}</span>
          <span style={{ margin: '0 6px' }}>/</span>
          <span style={{ color: '#1f2937', fontWeight: '600' }}>{config.title}</span>
        </div>

        <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto' }}>

          {/* ── Filter Sidebar ── */}
          <aside style={{
            width: '260px', flexShrink: 0, padding: '24px 20px',
            borderRight: '1px solid #f3f4f6', position: 'sticky',
            top: '80px', height: 'calc(100vh - 80px)', overflowY: 'auto',
          }}>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>Filters</div>
            {config.filters.map(f => (
              <FilterItem key={f.label} section={f} accentColor={config.accentColor} />
            ))}
          </aside>

          {/* ── Main Content ── */}
          <main style={{ flex: 1, padding: '24px 28px' }}>

            {/* Title + Sort */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#1f2937', margin: 0 }}>{config.title}</h1>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0' }}>{config.totalProducts.toLocaleString()} Products</p>
              </div>

              {/* Sort */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setSortOpen(o => !o)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '14px', color: '#1f2937', fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  <span style={{ color: '#6b7280' }}>Sort By</span>
                  <span style={{ fontWeight: '600' }}>{sortBy}</span>
                  {sortOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {sortOpen && (
                  <div style={{
                    position: 'absolute', top: '100%', right: 0,
                    background: '#fff', boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                    borderRadius: '4px', zIndex: 50, minWidth: '180px', padding: '8px 0',
                  }}>
                    {sortOptions.map(opt => (
                      <button
                        key={opt}
                        onClick={() => { setSortBy(opt); setSortOpen(false); }}
                        style={{
                          display: 'block', width: '100%', padding: '10px 20px',
                          background: sortBy === opt ? `${config.accentColor}10` : 'none',
                          border: 'none', cursor: 'pointer', textAlign: 'left',
                          fontSize: '13px', color: sortBy === opt ? config.accentColor : '#374151',
                          fontWeight: sortBy === opt ? '600' : '400',
                          fontFamily: 'DM Sans, sans-serif',
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Brand chips */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {config.brands.map(brand => (
                <button
                  key={brand}
                  style={{
                    padding: '5px 14px', borderRadius: '999px',
                    border: '1px solid #e5e7eb', background: '#fff',
                    fontSize: '12px', color: '#374151', cursor: 'pointer',
                    fontFamily: 'DM Sans, sans-serif',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = config.accentColor; (e.currentTarget as HTMLButtonElement).style.color = config.accentColor; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#e5e7eb'; (e.currentTarget as HTMLButtonElement).style.color = '#374151'; }}
                >
                  {brand}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px',
              marginBottom: '40px',
            }}>
              {paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} accentColor={config.accentColor} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', paddingBottom: '40px' }}>
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '8px 16px', border: '1px solid #e5e7eb', borderRadius: '4px',
                    background: '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    color: currentPage === 1 ? '#d1d5db' : '#374151', fontSize: '13px',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    style={{
                      width: '36px', height: '36px', border: '1px solid',
                      borderColor: currentPage === page ? config.accentColor : '#e5e7eb',
                      borderRadius: '4px', cursor: 'pointer', fontSize: '13px',
                      background: currentPage === page ? config.accentColor : '#fff',
                      color: currentPage === page ? '#fff' : '#374151',
                      fontWeight: currentPage === page ? '700' : '400',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '8px 16px', border: '1px solid #e5e7eb', borderRadius: '4px',
                    background: '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    color: currentPage === totalPages ? '#d1d5db' : '#374151', fontSize: '13px',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  →
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}