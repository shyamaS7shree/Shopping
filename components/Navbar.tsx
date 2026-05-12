'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import { getUser, logout } from '@/lib/api';
import AuthModal from '@/components/AuthModal';

const dropdownLinkStyle: React.CSSProperties = {
  display: 'block',
  padding: '6px 0',
  color: '#374151',
  fontSize: '13px',
  textDecoration: 'none',
  transition: 'color 0.15s',
};

const MEN_MENU = [
  { category: 'Topwear', items: ['T-Shirts', 'Casual Shirts', 'Formal Shirts', 'Sweatshirts', 'Sweaters', 'Jackets', 'Blazers & Coats', 'Suits', 'Rain Jackets'] },
  { category: 'Indian & Festive Wear', items: ['Kurtas & Kurta Sets', 'Sherwanis', 'Nehru Jackets', 'Dhotis'] },
  { category: 'Bottomwear', items: ['Jeans', 'Casual Trousers', 'Formal Trousers', 'Shorts', 'Track Pants & Joggers'] },
  { category: 'Innerwear & Sleepwear', items: ['Briefs & Trunks', 'Boxers', 'Vests', 'Sleepwear & Loungewear', 'Thermals'] },
  { category: 'Plus Size', items: [], isLink: true },
  { category: 'Footwear', items: ['Casual Shoes', 'Sports Shoes', 'Formal Shoes', 'Sneakers', 'Sandals & Floaters', 'Flip Flops', 'Socks'] },
  { category: 'Personal Care & Grooming', items: [], isLink: true },
  { category: 'Sunglasses & Frames', items: [], isLink: true },
  { category: 'Watches', items: [], isLink: true },
  { category: 'Sports & Active Wear', items: ['Sports Shoes', 'Sports Sandals', 'Active T-Shirts', 'Track Pants & Shorts', 'Tracksuits', 'Jackets & Sweatshirts', 'Sports Accessories', 'Swimwear'] },
  { category: 'Fashion Accessories', items: ['Wallets', 'Belts', 'Perfumes & Body Mists'] },
];

const WOMEN_MENU = [
  { category: 'Indian & Fusion Wear', items: ['Kurtas & Suits', 'Kurtis, Tunics & Tops', 'Sarees', 'Ethnic Wear', 'Leggings, Salwars & Churidars', 'Skirts & Palazzos', 'Dress Materials', 'Lehenga Cholis', 'Dupattas & Shawls', 'Jackets'] },
  { category: 'Belts, Scarves & More', items: [], isLink: true },
  { category: 'Watches & Wearables', items: [], isLink: true },
  { category: 'Western Wear', items: ['Dresses', 'Tops', 'Tshirts', 'Jeans', 'Trousers & Capris', 'Shorts & Skirts', 'Co-ords', 'Playsuits', 'Jumpsuits', 'Shrugs', 'Sweaters & Sweatshirts', 'Jackets & Coats', 'Blazers & Waistcoats'] },
  { category: 'Plus Size', items: [], isLink: true },
  { category: 'Maternity', items: [], isLink: true },
  { category: 'Sunglasses & Frames', items: [], isLink: true },
  { category: 'Footwear', items: ['Flats', 'Casual Shoes', 'Heels', 'Boots', 'Sports Shoes & Floaters'] },
  { category: 'Sports & Active Wear', items: ['Clothing', 'Footwear', 'Sports Accessories', 'Sports Equipment'] },
  { category: 'Lingerie & Sleepwear', items: ['Bra', 'Briefs', 'Shapewear', 'Sleepwear & Loungewear', 'Swimwear', 'Camisoles & Thermals'] },
  { category: 'Beauty & Personal Care', items: ['Makeup', 'Skincare', 'Premium Beauty', 'Lipsticks', 'Fragrances'] },
  { category: 'Jewellery', items: ['Fashion Jewellery', 'Fine Jewellery'] },
  { category: 'Backpacks', items: [], isLink: true },
  { category: 'Handbags, Bags & Wallets', items: [], isLink: true },
];

const KIDS_MENU = [
  { category: 'Boys Clothing', items: ['T-Shirts', 'Shirts', 'Clothing Sets', 'Ethnic Wear'] },
  { category: 'Girls Clothing', items: ['Dresses', 'Tops', 'Tshirts', 'Clothing Sets', 'Lehenga choli', 'Kurta Sets', 'Party wear', 'Dungarees & Jumpsuits', 'Skirts & shorts', 'Tights & Leggings', 'Jeans, Trousers & Capris'] },
  { category: 'Footwear', items: ['Casual Shoes', 'Flipflops', 'Sports Shoes', 'Flats', 'Sandals', 'Heels', 'School Shoes', 'Socks'] },
  { category: 'Toys & Games', items: ['Learning & Development', 'Activity Toys', 'Soft Toys', 'Action Figure / Play set'] },
  { category: 'Infants', items: ['Bodysuits', 'Rompers & Sleepsuits', 'Clothing Sets', 'Tshirts & Tops', 'Dresses', 'Bottom wear', 'Winter Wear', 'Innerwear & Sleepwear', 'Infant Care'] },
  { category: 'Home & Bath', items: [], isLink: true },
  { category: 'Personal Care', items: [], isLink: true },
  { category: 'Kids Accessories', items: ['Bags & Backpacks', 'Watches', 'Jewellery & Hair accessory', 'Sunglasses', 'Masks & Protective Gears', 'Caps & Hats'] },
  { category: 'Brands', items: ['H&M', 'Max Kids', 'Pantaloons', 'United Colors Of Benetton Kids', 'YK', 'U.S. Polo Assn. Kids', 'Mothercare', 'HRX'] },
];

const HOME_MENU = [
  { category: 'Bed Linen & Furnishing', items: ['Bed Runners', 'Mattress Protectors', 'Bedsheets', 'Bedding Sets', 'Blankets, Quilts & Dohars', 'Pillows & Pillow Covers', 'Bed Covers', 'Diwan Sets', 'Chair Pads & Covers', 'Sofa Covers'] },
  { category: 'Flooring', items: ['Floor Runners', 'Carpets', 'Floor Mats & Dhurries', 'Door Mats'] },
  { category: 'Bath', items: ['Bath Towels', 'Hand & Face Towels', 'Beach Towels', 'Towels Set', 'Bath Rugs', 'Bath Robes', 'Bathroom Accessories', 'Shower Curtains'] },
  { category: 'Lamps & Lighting', items: ['Floor Lamps', 'Ceiling Lamps', 'Table Lamps', 'Wall Lamps', 'Outdoor Lamps', 'String Lights'] },
  { category: 'Home Décor', items: ['Plants & Planters', 'Aromas & Candles', 'Clocks', 'Mirrors', 'Wall Décor', 'Festive Decor', 'Pooja Essentials', 'Wall Shelves', 'Fountains', 'Showpieces & Vases', 'Ottoman'] },
  { category: 'Cushions & Cushion Covers', items: [], isLink: true },
  { category: 'Curtains', items: [], isLink: true },
  { category: 'Furniture', items: [], isLink: true },
  { category: 'Home Gift Sets', items: [], isLink: true },
  { category: 'Kitchen & Table', items: ['Table Runners', 'Dinnerware & Serveware', 'Cups and Mugs', 'Bakeware & Cookware', 'Kitchen Storage & Tools', 'Bar & Drinkware', 'Table Covers & Furnishings'] },
  { category: 'Storage', items: ['Bins', 'Hangers', 'Organisers', 'Hooks & Holders', 'Laundry Bags'] },
];

const BEAUTY_MENU = [
  { category: 'Makeup', items: ['Lipstick', 'Lip Gloss', 'Lip Liner', 'Mascara', 'Eyeliner', 'Kajal'] },
  { category: 'Skincare, Bath & Body', items: ['Face Moisturiser', 'Cleanser', 'Masks & Peel'] },
  { category: 'Baby Care', items: [], isLink: true },
  { category: 'Masks', items: [], isLink: true },
  { category: 'Haircare', items: ['Shampoo', 'Conditioner', 'Hair Cream', 'Hair Oil', 'Hair Gel', 'Hair Color', 'Hair Serum', 'Hair Accessory'] },
  { category: 'Fragrances', items: ['Perfume', 'Deodorant', 'Body Mist'] },
  { category: 'Appliances', items: ['Hair Straightener', 'Hair Dryer', 'Epilator'] },
  { category: "Men's Grooming", items: ['Trimmers', 'Beard Oil', 'Hair Wax'] },
  { category: 'Beauty Gift & Makeup Set', items: ['Beauty Gift', 'Makeup Kit'] },
  { category: 'Premium Beauty', items: [], isLink: true },
  { category: 'Wellness & Hygiene', items: [], isLink: true },
  { category: 'Top Brands', items: ['Lakme', 'Maybelline', 'LOreal', 'Philips', 'Bath & Body Works', 'THE BODY SHOP', 'Biotique', 'Mamaearth', 'MCaffeine', 'Nivea', 'Lotus Herbals'] },
];

const GENZ_MENU = [
  { category: "Women's Western Wear", items: ['Dresses Under ₹599', 'Tops Under ₹399', 'Jeans Under ₹599', 'Trousers Under ₹699', 'T-shirts Under ₹299'] },
  { category: 'Lingerie & Loungewear', items: ['Bras Under ₹399', 'Night suits Under ₹799', 'Nightdresses Under ₹999'] },
  { category: "Men's Casual Wear", items: ['T-shirts Under ₹299', 'Shirts Under ₹499', 'Jeans Under ₹599'] },
  { category: "Men's Occassion Wear", items: ['Kurtas Under ₹799', 'Kurta Sets Under ₹999'] },
  { category: "Women's Footwear", items: ['Heels Under ₹599', 'Flats Under ₹499', 'Casual shoes Under ₹699', 'Sports shoes Under ₹999', 'Flip flops Under ₹799', 'Boots Under ₹999', 'Ballerinas Under ₹799'] },
  { category: "Men's Footwear", items: ['Casual shoes Under ₹799', 'Sports shoes Under ₹999', 'Formal shoes Under ₹999', 'Sandals Under ₹799', 'Flip flops Under ₹499', 'Boots Under ₹999'] },
  { category: 'Beauty & Grooming', items: ['Skincare Under ₹299', 'Haircare Under ₹399', 'Bath & Body Under ₹399', 'MakeUp Under ₹299', 'Fragrances Under ₹399', 'Appliances Under ₹999'] },
  { category: 'Accessories', items: ['Jewellery Under ₹299', 'Handbags Under ₹499', 'Clutches Under ₹999', 'Backpacks Under ₹699', 'Wallets Under ₹499', 'Sunglasses Under ₹699', 'Belts Under ₹799', 'Caps Under ₹899'] },
];

type MenuName = 'men' | 'women' | 'kids' | 'home' | 'beauty' | 'genz';

const MENU_COLORS: Record<MenuName, string> = {
  men: '#ec4899',
  women: '#ec4899',
  kids: '#f97316',
  home: '#eab308',
  beauty: '#14b8a6',
  genz: '#14b8a6',
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuName | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const [currentUser, setCurrentUser] = useState<{ fullName?: string; email?: string } | null>(null);
  useEffect(() => {
    setCurrentUser(getUser());
  }, []);

  const userFirstName = currentUser?.fullName?.split(' ')[0] || currentUser?.email?.split('@')[0] || 'there';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuEnter = (menuName: MenuName) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    setActiveMenu(menuName);
  };

  const handleMenuLeave = () => {
    closeTimer.current = window.setTimeout(() => setActiveMenu(null), 120);
  };

  const navItems: Array<{ label: string; href: string; hasMega?: boolean; menuName?: MenuName }> = [
    { label: 'Men', href: '/men', hasMega: true, menuName: 'men' },
    { label: 'Women', href: '/women', hasMega: true, menuName: 'women' },
    { label: 'Kids', href: '/kids', hasMega: true, menuName: 'kids' },
    { label: 'Home', href: '/home', hasMega: true, menuName: 'home' },
    { label: 'Beauty', href: '/beauty', hasMega: true, menuName: 'beauty' },
    { label: 'GenZ', href: '/genz', hasMega: true, menuName: 'genz' },
  ];

  const menCols = [MEN_MENU.slice(0, 2), MEN_MENU.slice(2, 5), MEN_MENU.slice(5, 9), MEN_MENU.slice(9, 11), MEN_MENU.slice(11, 14)];
  const womenCols = [WOMEN_MENU.slice(0, 3), WOMEN_MENU.slice(3, 6), WOMEN_MENU.slice(6, 9), WOMEN_MENU.slice(9, 12)];
  const kidsCols = [KIDS_MENU.slice(0, 2), KIDS_MENU.slice(2, 4), KIDS_MENU.slice(4, 7), KIDS_MENU.slice(7, 9)];
  const homeCols = [HOME_MENU.slice(0, 2), HOME_MENU.slice(2, 4), HOME_MENU.slice(4, 7), HOME_MENU.slice(7, 9), HOME_MENU.slice(9, 11)];
  const beautyCols = [BEAUTY_MENU.slice(0, 4), BEAUTY_MENU.slice(4, 6), BEAUTY_MENU.slice(6, 9), BEAUTY_MENU.slice(9, 12)];
  const genzCols = [GENZ_MENU.slice(0, 3), GENZ_MENU.slice(3, 5), GENZ_MENU.slice(5, 7), GENZ_MENU.slice(7, 9)];

  const getMenuCols = (menu: MenuName) => {
    switch (menu) {
      case 'men': return { cols: menCols, count: 5 };
      case 'women': return { cols: womenCols, count: 4 };
      case 'kids': return { cols: kidsCols, count: 4 };
      case 'home': return { cols: homeCols, count: 5 };
      case 'beauty': return { cols: beautyCols, count: 4 };
      case 'genz': return { cols: genzCols, count: 4 };
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .shopore-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 18px 60px; display: flex; align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-bottom: 2px solid rgba(236,72,153,0.08);
          transition: padding 0.3s ease, background 0.3s ease;
          font-family: 'DM Sans', 'Inter', sans-serif;
        }
        .shopore-nav.scrolled { padding: 6px 60px; background: rgba(255,255,255,0.95); }
        .nav-logo {
          display: flex; align-items: center; gap: 8px;
          font-family: 'Georgia', serif; font-size: 26px; font-weight: 800;
          color: #111827; text-decoration: none; letter-spacing: 3px;
          text-transform: uppercase; transition: opacity 0.2s;
        }
        .logo-svg { width: 40px; height: 40px; flex-shrink: 0; }
        .nav-center { display: flex; align-items: center; gap: 36px; flex: 1; justify-content: center; }
        .nav-links { display: flex; gap: 32px; list-style: none; margin: 0; padding: 0; align-items: center; }
        .nav-links li { position: relative; }
        .nav-links a { color: #6b7280; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .nav-links a:hover { color: #ec4899; }
        .nav-links a.active { color: var(--menu-accent, #ec4899); font-weight: 600; }
        .nav-links a.active::after {
          content: ''; position: absolute; bottom: -6px; left: 0; right: 0;
          height: 2px; background: var(--menu-accent, #ec4899); border-radius: 2px;
        }
        .mega-menu {
          position: fixed; top: 64px; left: 50%; transform: translateX(-50%);
          background: #fff; border-top: 3px solid var(--mega-accent, #ec4899);
          box-shadow: 0 20px 60px rgba(0,0,0,0.1); z-index: 99;
          padding: 32px 48px 36px; display: grid; gap: 0 24px;
          animation: megaFadeIn 0.18s ease; width: clamp(720px, 65%, 960px);
        }
        @keyframes megaFadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .mega-col { display: flex; flex-direction: column; gap: 24px; }
        .mega-category {
          color: var(--mega-accent, #ec4899); font-size: 13px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;
          text-decoration: none; display: block; cursor: pointer;
        }
        .mega-category:hover { opacity: 0.8; }
        .mega-divider { height: 1px; background: rgba(0,0,0,0.07); margin: 4px 0 14px; }
        .mega-item {
          display: block; color: #374151; font-size: 13px; font-weight: 400;
          line-height: 2; text-decoration: none; transition: color 0.15s, padding-left 0.15s; cursor: pointer;
        }
        .mega-item:hover { color: var(--mega-accent, #ec4899); padding-left: 4px; }
        .nav-search { position: relative; width: clamp(240px, 32vw, 420px); }
        .nav-search input {
          width: 100%; padding: 10px 38px 10px 18px;
          background: rgba(255,255,255,0.95);
          border: 2px solid rgba(236,72,153,0.18); border-radius: 999px;
          color: #1f2937; font-size: 14px; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s; font-family: inherit;
          box-shadow: 0 6px 20px rgba(236,72,153,0.08);
        }
        .nav-search input::placeholder { color: #9ca3af; font-size: 13px; }
        .nav-search input:focus { border-color: #ec4899; background: #fff; box-shadow: 0 0 0 3px rgba(236,72,153,0.12); }
        .nav-search-icon { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #d1d5db; display: flex; align-items: center; }
        .nav-right { display: flex; align-items: center; gap: 4px; }
        .nav-icon-btn {
          background: transparent; border: none; color: #6b7280; padding: 8px;
          border-radius: 10px; cursor: pointer; display: flex; align-items: center;
          justify-content: center; transition: color 0.2s, background 0.2s; text-decoration: none;
        }
        .nav-icon-btn:hover { color: #ec4899; background: rgba(236,72,153,0.1); }
        .cart-wrapper { position: relative; }
        .cart-badge {
          position: absolute; top: -4px; right: -4px;
          background: #ef4444; color: white; font-size: 10px; font-weight: 700;
          width: 18px; height: 18px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .mobile-toggle { display: none; background: transparent; border: none; color: #8b8aaa; cursor: pointer; padding: 6px; }
        .mobile-menu { background: rgba(255,255,255,0.95); border-bottom: 2px solid rgba(236,72,153,0.08); padding: 16px 24px 20px; }
        .mobile-search { position: relative; margin-bottom: 12px; }
        .mobile-search input {
          width: 100%; padding: 10px 36px 10px 16px;
          background: rgba(236,72,153,0.05); border: 2px solid rgba(236,72,153,0.1);
          border-radius: 50px; color: #1f2937; font-size: 14px; outline: none; font-family: inherit;
        }
        .mobile-search input::placeholder { color: #d1d5db; }
        .mobile-search-icon { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: #d1d5db; }
        .mobile-nav-link {
          display: block; padding: 10px 4px; color: #6b7280; text-decoration: none; font-size: 15px;
          border-bottom: 1px solid rgba(236,72,153,0.05); transition: color 0.2s;
        }
        .mobile-nav-link:hover { color: #ec4899; }
        .profile-dropdown-link {
          display: block; padding: 6px 0; color: #374151; font-size: 13px;
          text-decoration: none; transition: color 0.15s; background: none;
          border: none; cursor: pointer; font-family: inherit; text-align: left; width: 100%;
        }
        .profile-dropdown-link:hover { color: #ec4899; }

        @media (max-width: 900px) {
          .shopore-nav { padding: 10px 20px; }
          .shopore-nav.scrolled { padding: 12px 20px; }
          .nav-center { display: none; }
          .mobile-toggle { display: flex; align-items: center; }
          .mega-menu { display: none; }
        }
      `}</style>

      <nav className={`shopore-nav${scrolled ? ' scrolled' : ''}`}>
        {/* Logo */}
        <Link href="/" className="nav-logo">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo-svg">
            <path d="M10 8C10 6.89543 10.8954 6 12 6H28C29.1046 6 30 6.89543 30 8V32C30 33.1046 29.1046 34 28 34H12C10.8954 34 10 33.1046 10 32V8Z" stroke="url(#paint0_linear)" strokeWidth="2.5" />
            <path d="M15 8C15 5.23858 17.2386 3 20 3C22.7614 3 25 5.23858 25 8" stroke="url(#paint0_linear)" strokeWidth="2.5" strokeLinecap="round" />
            <text x="20" y="26" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="url(#paint0_linear)" textAnchor="middle">S</text>
            <defs>
              <linearGradient id="paint0_linear" x1="10" y1="8" x2="30" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#EC4899" />
                <stop offset="1" stopColor="#F97316" />
              </linearGradient>
            </defs>
          </svg>
          SHOPORE
        </Link>

        {/* Center */}
        <div className="nav-center">
          <ul className="nav-links">
            {navItems.map(item => (
              <li key={item.href}>
                {item.hasMega && item.menuName ? (
                  <span
                    className={activeMenu === item.menuName ? 'active' : ''}
                    style={{
                      '--menu-accent': MENU_COLORS[item.menuName],
                      cursor: 'default',
                      color: activeMenu === item.menuName ? MENU_COLORS[item.menuName] : '#6b7280',
                      fontSize: '14px',
                      fontWeight: '500',
                    } as React.CSSProperties}
                    onMouseEnter={() => handleMenuEnter(item.menuName!)}
                    onMouseLeave={handleMenuLeave}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href}>{item.label}</Link>
                )}
              </li>
            ))}
          </ul>

          <div className="nav-search">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <span className="nav-search-icon"><Search size={14} /></span>
          </div>
        </div>

        {/* Right */}
        <div className="nav-right">

          {/* Profile dropdown — hover to open */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setProfileOpen(true)}
            onMouseLeave={() => setProfileOpen(false)}
          >
            <button
              className="nav-icon-btn"
              title="Profile"
              style={{ flexDirection: 'column', gap: '2px', padding: '6px 10px' }}
            >
              <User size={18} />
              <span style={{ fontSize: '11px', fontWeight: 600, color: profileOpen ? '#ec4899' : '#374151' }}>Profile</span>
            </button>

            {profileOpen && (
              <div style={{
                position: 'absolute', top: '100%', right: 0,
                background: '#fff', borderRadius: '4px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
                width: '200px', zIndex: 200,
                borderTop: '3px solid #ec4899',
                fontFamily: 'DM Sans, sans-serif',
                padding: '16px',
              }}>
                {currentUser ? (
                  // ── LOGGED IN ──
                  <>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
                      Hi, {userFirstName}! 👋
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '14px' }}>
                      {currentUser?.email ?? 'No email available'}
                    </div>
                    <a href="/my-orders" style={dropdownLinkStyle}>📦 My Orders</a>
                    <a href="/profile" style={dropdownLinkStyle}>👤 Profile</a>
                    <a href="/wishlist" style={dropdownLinkStyle}>❤️ Wishlist</a>
                    <hr style={{ border: 'none', borderTop: '1px solid #f3f4f6', margin: '8px 0' }} />
                    <button
                      onClick={() => { logout(); window.location.reload(); }}
                      style={{ ...dropdownLinkStyle, color: '#ef4444', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0', fontFamily: 'inherit' }}
                    >
                      🚪 Logout
                    </button>
                  </>
                ) : (
                  // ── NOT LOGGED IN ──
                  <>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>Welcome</div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '14px' }}>
                      To access account and manage orders
                    </div>
                    <button
                      onClick={() => { setProfileOpen(false); setAuthModalOpen(true); }}
                      style={{
                        width: '100%', padding: '9px',
                        border: '2px solid #ec4899', color: '#ec4899',
                        borderRadius: '4px', background: 'none',
                        fontWeight: '700', fontSize: '13px',
                        cursor: 'pointer', fontFamily: 'inherit',
                      }}
                    >
                      LOGIN / SIGNUP
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Cart / Bag */}
          <Link
            href="/cart"
            className="nav-icon-btn cart-wrapper"
            title="Cart"
            style={{ flexDirection: 'column', gap: '2px', padding: '6px 10px' }}
          >
            <ShoppingCart size={18} />
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#374151' }}>Bag</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {/* Mobile toggle */}
          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mega Menu */}
      {activeMenu && (() => {
        const { cols, count } = getMenuCols(activeMenu);
        const accent = MENU_COLORS[activeMenu as MenuName];
        return (
          <div
            className="mega-menu"
            style={{
              top: scrolled ? '50px' : '76px',
              gridTemplateColumns: `repeat(${count}, 1fr)`,
              '--mega-accent': accent,
            } as React.CSSProperties}
            onMouseEnter={() => handleMenuEnter(activeMenu)}
            onMouseLeave={handleMenuLeave}
          >
            {cols.map((colSections, ci) => (
              <div className="mega-col" key={ci}>
                {colSections.map(sec => (
                  <div className="mega-section" key={sec.category}>
                    <a className="mega-category" href={`/${activeMenu}/${sec.category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/[\s,]+/g, '-')}`}>{sec.category}</a>
                    {sec.items.length > 0 && <div className="mega-divider" />}
                    {sec.items.map(item => (
                      <a className="mega-item" key={item} href={`/${activeMenu}/${sec.category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/[\s,]+/g, '-')}`}>
                        {item}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      })()}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu" style={{ position: 'fixed', top: scrolled ? '57px' : '73px', left: 0, right: 0, zIndex: 99 }}>
          <div className="mobile-search">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <span className="mobile-search-icon"><Search size={14} /></span>
          </div>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className="mobile-nav-link" onClick={() => setIsOpen(false)}>
              {item.label}
            </Link>
          ))}
          <button
            className="mobile-nav-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', width: '100%', textAlign: 'left', color: '#ec4899', fontWeight: 600, padding: '10px 4px', fontSize: '15px' }}
            onClick={() => { setIsOpen(false); setAuthModalOpen(true); }}
          >
            Login / Signup
          </button>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}