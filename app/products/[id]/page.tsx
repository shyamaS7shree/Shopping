'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, Share2, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { getProductById, products } from '@/lib/products';
import { toast } from 'sonner';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = React.use(params);
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
        <Link href="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  const images = product.images || [product.image];
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    toast.success(`${quantity} x ${product.name} added to cart!`);
    setQuantity(1);
  };

  const handleWishlist = () => {
    toast.success('Added to wishlist!');
  };

  const handleShare = () => {
    toast.success('Copied to clipboard!');
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Link href="/products" className="flex items-center text-primary hover:text-primary/80 mb-8 transition-colors fade-down">
          <ChevronLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-16">
          {/* Images - HD Glassmorphism */}
          <div className="fade-up">
            <div className="glass-lg rounded-2xl overflow-hidden mb-6 aspect-square relative shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/5 pointer-events-none"></div>
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={95}
              />
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`glass rounded-xl overflow-hidden aspect-square border-2 transition-all hover:scale-105 ${
                      selectedImage === idx ? 'border-primary shadow-lg' : 'border-border/50 hover:border-border'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                      quality={85}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info - Glassmorphism */}
          <div className="fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="glass rounded-2xl p-8 mb-6">
              <div className="text-sm text-primary/70 font-medium mb-3 uppercase tracking-wide">{product.category}</div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border/30">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-foreground/70">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price - Glassmorphism */}
            <div className="glass rounded-2xl p-8 mb-6">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-4xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-foreground/50 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <div className="text-sm text-destructive font-semibold bg-destructive/10 px-3 py-1 rounded-lg w-fit">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="glass rounded-2xl p-8 mb-6">
              <p className="text-foreground/70 mb-4 text-lg leading-relaxed font-medium">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="mt-4 pt-4 border-t border-border/30">
                {product.inStock ? (
                  <div className="text-green-600 font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                    In Stock
                  </div>
                ) : (
                  <div className="text-destructive font-semibold">Out of Stock</div>
                )}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="glass rounded-2xl p-6">
                <label className="text-foreground font-semibold block mb-4">Select Quantity:</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors font-bold text-lg flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold text-foreground min-w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors font-bold text-lg flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 py-6 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleWishlist}
                  variant="outline"
                  size="lg"
                  className="py-6 px-6 hover:scale-105 transition-transform"
                >
                  <Heart className="w-5 h-5" />
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="lg"
                  className="py-6 px-6 hover:scale-105 transition-transform"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="glass rounded-2xl p-8 mt-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">Product Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b border-border/30">
                  <span className="text-foreground/70">SKU:</span>
                  <span className="font-semibold text-foreground">{product.id}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-border/30">
                  <span className="text-foreground/70">Category:</span>
                  <span className="font-semibold text-foreground">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/70">Availability:</span>
                  <span className="font-semibold text-foreground">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="pt-8 border-t border-border/30">
            <h2 className="text-3xl font-bold text-foreground mb-12 fade-down">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map((p, idx) => (
                <div key={p.id} style={{ animationDelay: `${idx * 0.1}s` }} className="fade-up">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

import React from 'react';
