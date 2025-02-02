import React, { useEffect } from 'react';
import { Coffee, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from "../../hooks/useProducts";
import { Footer } from "../components/Footer.tsx";

export function Home() {
    const { products, loading, error, fetchProducts } = useProducts();

    useEffect(() => {
        fetchProducts();
        document.title = 'Daily Brew';
    }, []);

    // Get top 3 most expensive products
    const topProducts = [...products]
        .sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
        .slice(0, 3);

    return (
        <>
            {/* Hero Section with Parallax and Fade-in Effect */}
            <div
                className="h-screen bg-cover bg-center relative overflow-hidden"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80")'
                }}
            >
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white animate-fade-in">
                        <h1 className="text-6xl font-bold mb-4 animate-slide-up">Daily Brew</h1>
                        <p className="text-xl animate-slide-up-delay">Artisanal Coffee & Good Vibes</p>
                        <Link
                            to="/shop"
                            className="inline-block mt-8 px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full
                       hover:bg-white/30 transition-all duration-300 animate-slide-up-delay-2"
                        >
                            Explore Our Coffee
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features with Hover Animations */}
            <div className="max-w-6xl mx-auto py-24 px-4">
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="text-center transform hover:-translate-y-2 transition-transform duration-300 group">
                        <div className="relative inline-block">
                            <div className="w-24 h-24 bg-[#6F4E37]/10 rounded-full scale-110 group-hover:scale-125 transition-transform duration-300" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Coffee className="w-12 h-12 text-[#6F4E37] transform group-hover:rotate-12 transition-transform duration-300" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-semibold mt-6 mb-3">Premium Beans</h3>
                        <p className="text-gray-600 leading-relaxed">Sourced from the finest coffee regions around the world</p>
                    </div>
                    <div className="text-center transform hover:-translate-y-2 transition-transform duration-300 group">
                        <div className="relative inline-block">
                            <div className="w-24 h-24 bg-[#6F4E37]/10 rounded-full scale-110 group-hover:scale-125 transition-transform duration-300" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Clock className="w-12 h-12 text-[#6F4E37] transform group-hover:rotate-12 transition-transform duration-300" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-semibold mt-6 mb-3">Fresh Daily</h3>
                        <p className="text-gray-600 leading-relaxed">Roasted in small batches every morning</p>
                    </div>
                    <div className="text-center transform hover:-translate-y-2 transition-transform duration-300 group">
                        <div className="relative inline-block">
                            <div className="w-24 h-24 bg-[#6F4E37]/10 rounded-full scale-110 group-hover:scale-125 transition-transform duration-300" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <MapPin className="w-12 h-12 text-[#6F4E37] transform group-hover:rotate-12 transition-transform duration-300" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-semibold mt-6 mb-3">Local Love</h3>
                        <p className="text-gray-600 leading-relaxed">Supporting local coffee farmers and communities</p>
                    </div>
                </div>
            </div>

            {/* Featured Products with Staggered Animation */}
            <div className="bg-white py-24">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16">Premium Selection</h2>
                    {loading ? (
                        <div className="flex justify-center">
                            <Coffee className="w-12 h-12 animate-spin text-[#6F4E37]" />
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500">
                            Failed to load products. Please try again later.
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-12">
                            {topProducts.map((product, index) => (
                                <Link
                                    key={product.id}
                                    to={`/product/${product.id}`}
                                    className={`group bg-[#f8f3e9] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
                           transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up`}
                                    style={{ animationDelay: `${index * 200}ms` }}
                                >
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={product.mainImage}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-2xl font-semibold mb-3 text-[#2C1810] group-hover:text-[#6F4E37] transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-[#6F4E37] font-bold text-xl mb-4">{product.price} Lei</p>
                                        <div className="flex flex-wrap gap-2">
                                            {product.flavorNotes.map((note, index) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-1.5 bg-white rounded-full text-sm text-[#6F4E37] transform transition-transform duration-300 hover:scale-105"
                                                >
                          {note}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                    <div className="text-center mt-16">
                        <Link
                            to="/shop"
                            className="inline-block bg-[#6F4E37] text-white px-10 py-4 rounded-full text-lg font-medium
                       hover:bg-[#5D3D2B] transform hover:-translate-y-1 transition-all duration-300
                       shadow-lg hover:shadow-xl"
                        >
                            View All Products
                        </Link>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    );
}