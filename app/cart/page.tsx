'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  // Mock cart data - in a real app, this would come from state management
  const cartItems = [];
  const subtotal = 0;
  const tax = 0;
  const shipping = 0;
  const total = 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {cartItems.length === 0 ? (
            <div className="bg-muted rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Discover amazing products and add them to your cart
              </p>
              <Link href="/products">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-card rounded-lg p-6 border border-border flex gap-4"
                >
                  <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <Link href={`/products/${item.product.id}`}>
                      <h3 className="font-semibold text-foreground hover:text-accent transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground text-sm mb-2">
                      ${item.product.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-border rounded-lg">
                        <button className="px-3 py-1 hover:bg-muted transition-colors">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button className="px-3 py-1 hover:bg-muted transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <span className="font-semibold text-foreground">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-muted rounded-lg p-6 sticky top-20">
            <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 border-b border-border pb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold">${shipping.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between mb-6 text-lg">
              <span className="font-bold text-foreground">Total</span>
              <span className="font-bold text-primary">${total.toFixed(2)}</span>
            </div>

            <Button className="w-full mb-3" disabled={cartItems.length === 0}>
              Proceed to Checkout
            </Button>

            <Link href="/products">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
