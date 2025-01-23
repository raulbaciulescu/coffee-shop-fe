import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import {useProducts} from "../../hooks/hooks.ts";
import {ImageGallery} from "../components/ImageGalelery.tsx";

export function ProductDetails() {

    const {id} = useParams<{ id: string }>();
    const {products, loading, error} = useProducts();
    const product = products.find(p => p.id == id);
    const {dispatch} = useCart();
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    if (!product) {
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

    const allImages = [product.image, ...product.galleryImages];

    const addToCart = () => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    };

    const openGallery = (index: number) => {
        setSelectedImageIndex(index);
        setIsGalleryOpen(true);
    };

    return (
        <>
            <div className="min-h-screen pt-24 pb-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <Link to="/" className="inline-flex items-center text-[#6F4E37] hover:underline mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div
                                className="relative cursor-pointer group overflow-hidden rounded-lg"
                                onClick={() => openGallery(0)}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-[400px] object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
                    View Gallery
                  </span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {product.galleryImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className="aspect-square rounded-lg overflow-hidden shadow-md cursor-pointer group"
                                        onClick={() => openGallery(index + 1)}
                                    >
                                        <div className="relative h-full">
                                            <img
                                                src={image}
                                                alt={`${product.name} view ${index + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                            <p className="text-2xl text-[#6F4E37] font-bold mb-6">{product.price}</p>

                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">Description</h2>
                                    <p className="text-gray-600">{product.description}</p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold mb-2">Details</h2>
                                    <dl className="space-y-2">
                                        <div>
                                            <dt className="font-medium">Origin</dt>
                                            <dd className="text-gray-600">{product.origin}</dd>
                                        </div>
                                        <div>
                                            <dt className="font-medium">Roast Level</dt>
                                            <dd className="text-gray-600">{product.roastLevel}</dd>
                                        </div>
                                    </dl>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold mb-2">Flavor Notes</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {product.flavorNotes.map((note, index) => (
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
                </div>
            </div>

            <ImageGallery
                images={allImages}
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
                initialIndex={selectedImageIndex}
            />
        </>
    );
}