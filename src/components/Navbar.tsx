import React from 'react';
import { Coffee, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

interface NavbarProps {
  isScrolled: boolean;
}

export function Navbar({ isScrolled }: NavbarProps) {
  const location = useLocation();
  const { state } = useCart();
  const isActive = (path: string) => location.pathname === path;
  const cartItemsCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 ${
      isScrolled ? 'bg-white/80 shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <Coffee className={`w-6 h-6 ${isScrolled ? 'text-[#6F4E37]' : 'text-[#2C1810]'}`} />
            <span className={`text-xl font-bold ${isScrolled ? 'text-[#2C1810]' : 'text-[#2C1810]'}`}>
              Daily Brew
            </span>
          </Link>
          <Link 
            to="/shop" 
            className={`font-medium ${
              isScrolled 
                ? isActive('/shop') 
                  ? 'text-[#6F4E37]' 
                  : 'text-[#2C1810] hover:text-[#6F4E37]' 
                : 'text-[#2C1810] hover:text-[#6F4E37]'
            } transition-colors`}
          >
            Shop
          </Link>
        </div>
        <Link 
          to="/cart"
          className={`relative p-2 rounded-full transition-colors ${
            isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
          }`}
        >
          <ShoppingCart className={`w-6 h-6 ${isScrolled ? 'text-[#6F4E37]' : 'text-[#2C1810]'}`} />
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}