import React from 'react';
import { Coffee, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isScrolled: boolean;
}

export function Navbar({ isScrolled }: NavbarProps) {
  return (
    <nav className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 ${
      isScrolled ? 'bg-white/80 shadow-md' : 'bg-transparent'
    } backdrop-blur-sm`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Coffee className={`w-6 h-6 ${isScrolled ? 'text-[#6F4E37]' : 'text-white'}`} />
          <span className={`text-xl font-bold ${isScrolled ? 'text-[#2C1810]' : 'text-white'}`}>
            Daily Brew
          </span>
        </Link>
        <button className={`relative p-2 rounded-full transition-colors ${
          isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
        }`}>
          <ShoppingCart className={`w-6 h-6 ${isScrolled ? 'text-[#6F4E37]' : 'text-white'}`} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            0
          </span>
        </button>
      </div>
    </nav>
  );
}