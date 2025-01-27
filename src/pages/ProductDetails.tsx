import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {ArrowLeft, Coffee} from 'lucide-react';
import {useCart} from '../contexts/CartContext';
import {useProducts} from "../../hooks/hooks.ts";
import {ImageGallery} from "../components/ImageGalelery.tsx";

export function ProductDetails() {
    const {id} = useParams<{ id: string }>();
    const {currentProduct, loading, error, getProductById} = useProducts();
    const {dispatch} = useCart();
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        getProductById(id!);
    }, []);

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
                    <Link to="/" className="inline-flex items-center text-[#6F4E37] hover:underline mb-8">
                        <ArrowLeft className="w-4 h-4 mr-2"/>
                        Back to Home
                    </Link>

                    <div className="grid md:grid-cols-2 gap-8">
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