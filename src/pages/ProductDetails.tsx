import React, {useEffect, useState, useMemo} from 'react';
import {Link, useParams} from 'react-router-dom';
import {ArrowLeft, Coffee, ShoppingCart} from 'lucide-react';
import {useCart} from '../contexts/CartContext';
import {useProducts} from "../../hooks/useProducts.ts";
import {ImageGallery} from "../components/ImageGallery.tsx";
import {Footer} from "../components/Footer.tsx";
import {Product} from "../data/products.ts";

export function ProductDetails() {
    const {id} = useParams<{ id: string }>();
    const {currentProduct, products, loading, error, getProductById, fetchProducts} = useProducts();
    const {dispatch} = useCart();
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        getProductById(id!);
        fetchProducts(); // Fetch all products for similar products section
    }, [id]);

    useEffect(() => {
        // Update page title when product loads
        if (currentProduct) {
            document.title = `${currentProduct.name} | Daily Brew`;
        } else {
            document.title = 'Product | Daily Brew';
        }

        // Reset title when component unmounts
        return () => {
            document.title = 'Daily Brew';
        };
    }, [currentProduct]);

    // Calculate similarity score between two products
    const calculateSimilarity = (product1: Product, product2: Product) => {
        let score = 0;

        // Same roast level
        if (product1.roastLevel === product2.roastLevel) {
            score += 3;
        }

        // Shared flavor notes
        const sharedNotes = product1.flavorNotes.filter(note =>
            product2.flavorNotes.includes(note)
        );
        score += sharedNotes.length * 2;

        // Similar price range (within 20%)
        const price1 = parseFloat(product1.price);
        const price2 = parseFloat(product2.price);
        if (Math.abs(price1 - price2) / price1 <= 0.2) {
            score += 1;
        }

        // Same origin
        if (product1.origin === product2.origin) {
            score += 2;
        }

        return score;
    };

    // Get similar products
    const similarProducts = useMemo(() => {
        if (!currentProduct || !products.length) return [];

        return products
            .filter(product => product.id !== currentProduct.id)
            .map(product => ({
                ...product,
                similarityScore: calculateSimilarity(currentProduct, product)
            }))
            .sort((a, b) => b.similarityScore - a.similarityScore)
            .slice(0, 3);
    }, [currentProduct, products]);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-center">
                    <Coffee className="w-12 h-12 animate-spin mx-auto mb-4 text-[#6F4E37]" />
                    <p className="text-[#2C1810]">Loading products...</p>
                </div>
            </div>
        );
    }

    if (!currentProduct) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Product not found</h2>
                    <Link to="/" className="text-[#6F4E37] hover:underline">
                        Return to home
                    </Link>
                </div>
            </div>
        );
    }

    const allImages = [currentProduct.mainImage, ...currentProduct.galleryImages];

    const addToCart = () => {
        dispatch({type: 'ADD_ITEM', payload: currentProduct});
    };

    const openGallery = (index: number) => {
        setSelectedImageIndex(index);
        setIsGalleryOpen(true);
    };

    return (
        <>
            <div className="min-h-screen pt-24 pb-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <Link to="/shop" className="inline-flex items-center text-[#6F4E37] hover:underline mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2"/>
                        Back to Shop
                    </Link>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="space-y-4">
                            <div
                                className="relative cursor-pointer group overflow-hidden rounded-lg"
                                onClick={() => openGallery(0)}
                            >
                                <img
                                    src={currentProduct.mainImage}
                                    alt={currentProduct.name}
                                    className="w-full h-[400px] object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                                />
                                <div
                                    className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
                                        View Gallery
                                    </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {currentProduct.galleryImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className="aspect-square rounded-lg overflow-hidden shadow-md cursor-pointer group"
                                        onClick={() => openGallery(index + 1)}
                                    >
                                        <div className="relative h-full">
                                            <img
                                                src={image}
                                                alt={`${currentProduct.name} view ${index + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            <div
                                                className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h1 className="text-4xl font-bold mb-4">{currentProduct.name}</h1>
                            <p className="text-2xl text-[#6F4E37] font-bold mb-6">{currentProduct.price}</p>

                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">Description</h2>
                                    <p className="text-gray-600">{currentProduct.description}</p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold mb-2">Details</h2>
                                    <dl className="space-y-2">
                                        <div>
                                            <dt className="font-medium">Origin</dt>
                                            <dd className="text-gray-600">{currentProduct.origin}</dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium">Roast Level</dt>
                                            <dd className="text-gray-600">{currentProduct.roastLevel}</dd>
                                        </div>
                                    </dl>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold mb-2">Flavor Notes</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {currentProduct.flavorNotes.map((note, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-[#f8f3e9] rounded-full text-sm"
                                            >
                                                {note}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={addToCart}
                                    className="w-full bg-[#6F4E37] text-white py-3 px-6 rounded-lg hover:bg-[#5D3D2B] transition-colors"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Similar Products Section */}
                    {similarProducts.length > 0 && (
                        <div className="border-t pt-16">
                            <h2 className="text-3xl font-bold mb-8">Similar Products</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {similarProducts.map((product) => (
                                    <Link
                                        key={product.id}
                                        to={`/product/${product.id}`}
                                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
                                    >
                                        <div className="aspect-square overflow-hidden">
                                            <img
                                                src={product.mainImage}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold mb-2 text-[#2C1810]">{product.name}</h3>
                                            <p className="text-[#6F4E37] font-bold mb-3">{product.price} Lei</p>
                                            <div className="flex flex-wrap gap-2">
                                                {product.flavorNotes.map((note, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-[#f8f3e9] rounded-full text-sm text-[#6F4E37]"
                                                    >
                                                        {note}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="mt-4 flex items-center justify-between">
                                                <span className="text-sm text-gray-500">
                                                    {product.roastLevel} Roast
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {product.origin}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ImageGallery
                images={allImages}
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
                initialIndex={selectedImageIndex}
            />
            <Footer/>
        </>
    );
}