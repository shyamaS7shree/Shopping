'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  Info,
  Minus,
  Plus,
  Ticket,
  Trash2,
  MapPin,
} from 'lucide-react';
import {
  CartItem,
  getCartEventName,
  readCart,
  removeCartItem,
  updateCartQuantity,
} from '@/lib/cart';

function formatPrice(value: number) {
  return `₹${value.toLocaleString('en-IN')}.00`;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const refreshCart = () => setCartItems(readCart());

  useEffect(() => {
    refreshCart();
    window.addEventListener(getCartEventName(), refreshCart);

    return () => window.removeEventListener(getCartEventName(), refreshCart);
  }, []);

  const updateQuantity = (key: string, quantity: number) => {
    setCartItems(updateCartQuantity(key, quantity));
  };

  const removeItem = (key: string) => {
    setCartItems(removeCartItem(key));
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 0 && subtotal < 300 ? 99 : 0;
  const total = subtotal + deliveryFee;

  return (
    <main className="min-h-screen bg-[#fafafa] px-4 pb-16 pt-[110px] font-['DM_Sans',Inter,sans-serif] text-[#071225] md:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex items-center justify-center gap-4 text-[15px]">
          {['Bag', 'Address', 'Payment'].map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                  index === 0 ? 'border-[#071225]' : 'border-[#071225]'
                }`}
              >
                {index === 0 && <span className="h-2.5 w-2.5 rounded-full bg-[#071225]" />}
              </span>
              <span className={index === 0 ? 'font-semibold' : 'text-slate-600'}>{step}</span>
              {index < 2 && <span className="h-px w-40 bg-slate-300" />}
            </div>
          ))}
        </div>

        {cartItems.length === 0 ? (
          <div className="mx-auto max-w-[560px] bg-white px-8 py-14 text-center shadow-sm">
            <h1 className="text-[24px] font-semibold">Your bag is empty</h1>
            <p className="mt-3 text-[14px] text-slate-500">
              Add something you love and it will appear here.
            </p>
            <Link
              href="/men/topwear"
              className="mt-8 inline-flex h-12 items-center justify-center bg-[#071225] px-8 text-[15px] font-semibold text-white"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-9 lg:grid-cols-[1fr_380px]">
            <section>
              <div className="mb-5 flex items-center justify-between bg-[#f2f3f5] px-5 py-4">
                <div className="flex items-center gap-2 text-[14px] text-[#a0462d]">
                  <MapPin size={17} />
                  <span>Please select a delivery address.</span>
                </div>
                <button className="h-11 border border-[#071225] bg-white px-5 text-[14px] font-semibold">
                  Select Address
                </button>
              </div>

              <p className="mb-4 text-[14px] font-semibold">
                {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
              </p>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <article key={item.key} className="bg-white p-5 shadow-sm">
                    <div className="flex gap-4">
                      <Link
                        href={item.product.href || '/men/topwear'}
                        className="relative h-[165px] w-[115px] shrink-0 overflow-hidden bg-slate-100"
                      >
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="115px"
                        />
                      </Link>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h2 className="text-[16px] font-semibold text-[#071225]">
                              {item.product.brand}{' '}
                              <span className="font-normal text-slate-600">
                                {item.product.name}
                              </span>
                            </h2>
                            <div className="mt-5 flex flex-wrap items-center gap-5 text-[14px] text-slate-700">
                              <span>{item.product.color || 'As shown'}</span>
                              {item.product.size && <span>Size: {item.product.size}</span>}
                              <div className="flex h-9 items-center border border-slate-200">
                                <button
                                  onClick={() => updateQuantity(item.key, item.quantity - 1)}
                                  className="flex h-full w-9 items-center justify-center text-pink-500"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={15} />
                                </button>
                                <span className="flex h-full w-10 items-center justify-center text-[14px]">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.key, item.quantity + 1)}
                                  className="flex h-full w-9 items-center justify-center text-pink-500"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={15} />
                                </button>
                              </div>
                            </div>
                            <p className="mt-6 text-[18px] font-semibold text-black">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                          </div>

                          <button
                            onClick={() => removeItem(item.key)}
                            className="p-1 text-[#071225] transition hover:text-pink-500"
                            aria-label="Remove item"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 border-t border-slate-100 pt-4 text-[13px] italic text-slate-500">
                      Estimated Delivery by <span className="font-semibold text-[#071225]">22 May</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <aside className="space-y-6">

              <div className="bg-white p-5 shadow-sm">
                <h2 className="mb-5 text-[20px] font-semibold">Price Details</h2>
                <div className="space-y-4 border-t border-slate-100 pt-5 text-[14px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total MRP</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1 text-slate-500">
                      Delivery Fee <Info size={13} />
                    </span>
                    <span className="font-semibold">{formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded border border-slate-200 bg-slate-50 px-3 py-3 text-[13px]">
                    <Info size={15} />
                    <span>TIP: Shop for ₹300.00 or more for free delivery.</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-between border-t border-slate-100 pt-6 text-[18px]">
                  <span className="font-semibold">Total Payable amount</span>
                  <span className="font-bold">{formatPrice(total)}</span>
                </div>

                <button className="mt-6 h-12 w-full bg-[#071225] text-[16px] font-semibold text-white transition hover:bg-[#111d31]">
                  Place Order
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
