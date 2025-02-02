import React, { useState, useRef, useEffect } from 'react';
import { Coffee, ShoppingCart, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { CartModal } from './CartModal';

interface NavbarProps {
  isScrolled: boolean;
}

export function Navbar({ isScrolled }: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useCart();
  const isActive = (path: string) => location.pathname === path;
  const cartItemsCount = state.items.reduce((total, item) => total + item.quantity, 0);
  const isHome = location.pathname === '/' || location.pathname === '/contact';
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartTimeoutRef = useRef<number>();
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const getTextColor = (isScrolled: boolean, isHome: boolean) => {
    if (isHome && !isScrolled) return 'text-white';
    return isScrolled ? 'text-[#2C1810]' : 'text-[#2C1810]';
  };

  const getLinkHoverColor = (isScrolled: boolean, isHome: boolean) => {
    if (isHome && !isScrolled) return 'hover:text-white/80';
    return 'hover:text-[#6F4E37]';
  };

  const handleCartMouseEnter = () => {
    if (isMobile) return;
    if (cartTimeoutRef.current) {
      clearTimeout(cartTimeoutRef.current);
    }
    setIsCartVisible(true);
  };

  const handleCartMouseLeave = () => {
    if (isMobile) return;
    cartTimeoutRef.current = window.setTimeout(() => {
      setIsCartVisible(false);
    }, 200);
  };

  const handleCartClick = () => {
    if (isMobile) {
      navigate('/cart');
    }
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
      <>
        <nav className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 ${
            isScrolled ? 'bg-white/80 shadow-md' : 'bg-transparent'
        } backdrop-blur-sm`}>
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2">
                <Coffee className={`w-6 h-6 ${isScrolled ? 'text-[#6F4E37]' : isHome ? 'text-white' : 'text-[#2C1810]'}`} />
                <span className={`text-xl font-bold ${getTextColor(isScrolled, isHome)}`}>
                Daily Brew
              </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
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
                          isActive('/contact')
                              ? 'text-[#6F4E37]'
                              : `${getTextColor(isScrolled, isHome)} ${getLinkHoverColor(isScrolled, isHome)}`
                      }`}
                  >
                    Contact
                  </Link>
                </div>

                {/* Desktop Cart */}
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

              {/* Mobile Navigation */}
              <div className="flex items-center space-x-4 md:hidden">
                <button
                    onClick={handleCartClick}
                    className="relative p-2"
                >
                  <ShoppingCart className={`w-6 h-6 ${isScrolled ? 'text-[#6F4E37]' : isHome ? 'text-white' : 'text-[#2C1810]'}`} />
                  {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center px-1">
                    {cartItemsCount}
                  </span>
                  )}
                </button>

                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={`p-2 ${getTextColor(isScrolled, isHome)}`}
                    aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                      <X className="w-6 h-6" />
                  ) : (
                      <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Panel */}
        <div
            className={`fixed inset-0 bg-white transform transition-transform duration-300 ease-in-out z-40 md:hidden ${
                isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ paddingTop: '64px' }} // Height of the navbar
        >
          <div className="h-full overflow-y-auto">
            <div className="flex flex-col py-4">
              <Link
                  to="/"
                  className={`px-8 py-4 text-lg font-medium transition-colors ${
                      isActive('/') ? 'text-[#6F4E37] bg-[#f8f3e9]' : 'text-[#2C1810] hover:bg-gray-50'
                  }`}
              >
                Home
              </Link>
              <Link
                  to="/shop"
                  className={`px-8 py-4 text-lg font-medium transition-colors ${
                      isActive('/shop') ? 'text-[#6F4E37] bg-[#f8f3e9]' : 'text-[#2C1810] hover:bg-gray-50'
                  }`}
              >
                Shop
              </Link>
              <Link
                  to="/contact"
                  className={`px-8 py-4 text-lg font-medium transition-colors ${
                      isActive('/contact') ? 'text-[#6F4E37] bg-[#f8f3e9]' : 'text-[#2C1810] hover:bg-gray-50'
                  }`}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </>
  );
}