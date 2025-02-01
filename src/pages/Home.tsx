import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Coffee, Clock, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { Footer } from "../components/Footer.tsx";

export function Home() {
    return (
        <>
            <Helmet>
                <title>Daily Brew - Premium Coffee Shop</title>
                <meta name="description" content="Discover artisanal coffee at Daily Brew. We offer premium, freshly roasted coffee beans sourced from the world's finest coffee regions." />
                <link rel="canonical" href="https://dailybrew.com/" />
            </Helmet>

            <main>
                <div
                    className="h-screen bg-cover bg-center relative"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80")'
                    }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                            <h1 className="text-5xl font-bold mb-4">Daily Brew</h1>
                            <p className="text-xl">Artisanal Coffee & Good Vibes</p>
                        </div>
                    </div>
                </div>

                <section className="max-w-6xl mx-auto py-16 px-4" aria-label="Features">
                    <div className="grid md:grid-cols-3 gap-8">
                        <article className="text-center">
                            <Coffee className="w-12 h-12 mx-auto mb-4 text-[#6F4E37]" />
                            <h2 className="text-xl font-semibold mb-2">Premium Beans</h2>
                            <p className="text-gray-600">Sourced from the finest coffee regions</p>
                        </article>
                        <article className="text-center">
                            <Clock className="w-12 h-12 mx-auto mb-4 text-[#6F4E37]" />
                            <h2 className="text-xl font-semibold mb-2">Fresh Daily</h2>
                            <p className="text-gray-600">Roasted in small batches every morning</p>
                        </article>
                        <article className="text-center">
                            <MapPin className="w-12 h-12 mx-auto mb-4 text-[#6F4E37]" />
                            <h2 className="text-xl font-semibold mb-2">Local Love</h2>
                            <p className="text-gray-600">Supporting local coffee farmers</p>
                        </article>
                    </div>
                </section>

                <section className="bg-white py-16" aria-label="Featured Products">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Our Favorites</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <article
                                    key={product.id}
                                    className="bg-[#f8f3e9] rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
                                >
                                    <Link to={`/product/${product.id}`}>
                                        <img
                                            src={product.mainImage}
                                            alt={product.name}
                                            className="w-full h-48 object-cover"
                                            loading="lazy"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                            <p className="text-[#6F4E37] font-bold">{product.price}</p>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}