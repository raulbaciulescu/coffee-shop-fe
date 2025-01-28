import React, { useState, useRef } from 'react';
import { Coffee, ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { CartModal } from './CartModal';

interface NavbarProps {
  isScrolled: boolean;
}

export function Navbar({ isScrolled }: NavbarProps) {
  const location = useLocation();
  const { state } = useCart();
  const isActive = (path: string) => location.pathname === path;
  const cartItemsCount = state.items.reduce((total, item) => total + item.quantity, 0);
  const isHome = location.pathname === '/' || location.pathname === '/contact';
  const [isCartVisible, setIsCartVisible] = useState(false);
  const cartTimeoutRef = useRef<number>();

  const getTextColor = (isScrolled: boolean, isHome: boolean) => {
    if (isHome && !isScrolled) return 'text-white';
    return isScrolled ? 'text-[#2C1810]' : 'text-[#2C1810]';
  };

  const getLinkHoverColor = (isScrolled: boolean, isHome: boolean) => {
    if (isHome && !isScrolled) return 'hover:text-white/80';
    return 'hover:text-[#6F4E37]';
  };

  const handleCartMouseEnter = () => {
    if (cartTimeoutRef.current) {
      clearTimeout(cartTimeoutRef.current);
    }
    setIsCartVisible(true);
  };

  const handleCartMouseLeave = () => {
    cartTimeoutRef.current = window.setTimeout(() => {
      setIsCartVisible(false);
    }, 200);
  };

  return (
      <nav className={`fixed top-0 left-0 right-0 transition-all duration-300 z-40 ${
          isScrolled ? 'bg-white/80 shadow-md' : 'bg-transparent'
      } backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Coffee className={`w-6 h-6 ${isScrolled ? 'text-[#6F4E37]' : isHome ? 'text-white' : 'text-[#2C1810]'}`} />
              <span className={`text-xl font-bold ${getTextColor(isScrolled, isHome)}`}>
              Daily Brew
            </span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link
                  to="/shop"
                  className={`font-medium transition-colors ${
                      isActive('/shop')
                          ? 'text-[#6F4E37]'
                          : `${getTextColor(isScrolled, isHome)} ${getLinkHoverColor(isScrolled, isHome)}`
                  }`}
              >
                Shop
              </Link>
              <Link
                  to="/contact"
                  className={`font-medium transition-colors ${
                      isActive('/shop')
                          ? 'text-[#6F4E37]'
                          : `${getTextColor(isScrolled, isHome)} ${getLinkHoverColor(isScrolled, isHome)}`
                  }`}
              >
                Contact
              </Link>
            </div>
          </div>
          <div
              className="relative"
              onMouseEnter={handleCartMouseEnter}
              onMouseLeave={handleCartMouseLeave}
          >
            <div
                className={`relative p-2 rounded-full transition-colors cursor-pointer ${
                    isScrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
                }`}
            >
              <ShoppingCart className={`w-6 h-6 ${isScrolled ? 'text-[#6F4E37]' : isHome ? 'text-white' : 'text-[#2C1810]'}`} />
              {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center px-1">
                {cartItemsCount}
              </span>
              )}
            </div>
            <CartModal isVisible={isCartVisible} onClose={() => setIsCartVisible(false)} />
          </div>
        </div>
      </nav>
  );
}