'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Hero from '@/components/Hero';
import { products, categories } from '@/lib/products';
import { Button } from '@/components/ui/button';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 600]);

  const filteredProducts = products
    .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return a.id.localeCompare(b.id);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <>
      <Hero
        title="Our Collection"
        subtitle="Explore our carefully curated selection of premium products"
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-muted p-6 rounded-lg sticky top-20">
              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold text-foreground mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-background'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Max Price: ${priceRange[1]}</label>
                    <input
                      type="range"
                      min="0"
                      max="600"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Stock */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Availability</h3>
                <label className="flex items-center space-x-2 text-foreground cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-border">
              <div>
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} products
                </p>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-muted-foreground mr-2">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-background border border-border rounded-lg text-foreground text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
