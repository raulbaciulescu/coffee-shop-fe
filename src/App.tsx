import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Admin } from './pages/Admin';
import { Navbar } from './components/Navbar';
import { CartProvider } from './contexts/CartContext';
import {Contact} from "./pages/Contact.tsx";
import {Delivery} from "./pages/Delivery.tsx";
import {ThankYou} from "./pages/ThankYou.tsx";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[#f8f3e9]">
            <Navbar isScrolled={isScrolled} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
  );
}

export default App;