import React, { useState, useRef } from 'react';
import { Plus, Loader, Save, Trash2, Image as ImageIcon, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {Product} from "../data/products.ts";
import {useProducts} from "../../hooks/hooks.ts";

interface ProductFormData {
    name: string;
    price: string;
    image: File | null;
    galleryImages: File[];
    description: string;
    origin: string;
    roastLevel: string;
    flavorNotes: string[];
}

const initialFormData: ProductFormData = {
    name: '',
    price: '',
    image: null,
    galleryImages: [],
    description: '',
    origin: '',
    roastLevel: 'Medium',
    flavorNotes: [''],
};

export function Admin() {
    const [formData, setFormData] = useState<ProductFormData>(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editingProduct, setEditingProduct] = useState<string | null>(null);
    const [imagePreviews, setImagePreviews] = useState<{
        main: string | null;
        gallery: string[];
    }>({
        main: null,
        gallery: [],
    });
    const mainImageInputRef = useRef<HTMLInputElement>(null);
    const galleryImageInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { products, loading, error: productsError, createProduct, updateProduct, deleteProduct } = useProducts();

    const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => ({ ...prev, main: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGalleryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setFormData(prev => ({
            ...prev,
            galleryImages: [...prev.galleryImages, ...files],
        }));

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => ({
                    ...prev,
                    gallery: [...prev.gallery, reader.result as string],
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const removeGalleryImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            galleryImages: prev.galleryImages.filter((_, i) => i !== index),
        }));
        setImagePreviews(prev => ({
            ...prev,
            gallery: prev.gallery.filter((_, i) => i !== index),
        }));
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product.id);
        setFormData({
            name: product.name,
            price: product.price,
            image: null, // Can't set File object from URL
            galleryImages: [],
            description: product.description,
            origin: product.origin,
            roastLevel: product.roastLevel,
            flavorNotes: product.flavorNotes,
        });
        setImagePreviews({
            main: product.image,
            gallery: product.galleryImages,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.image && !editingProduct) {
            setError('Main image is required');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('price', formData.price.replace('$', ''));
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }
            formData.galleryImages.forEach(file => {
                formDataToSend.append('galleryImages', file);
            });
            formDataToSend.append('description', formData.description);
            formDataToSend.append('origin', formData.origin);
            formDataToSend.append('roastLevel', formData.roastLevel);
            formDataToSend.append('flavorNotes', JSON.stringify(formData.flavorNotes));

            if (editingProduct) {
                await updateProduct(editingProduct, formDataToSend);
                setEditingProduct(null);
            } else {
                await createProduct(formDataToSend);
            }

            setFormData(initialFormData);
            setImagePreviews({ main: null, gallery: [] });
        } catch (err) {
            setError(editingProduct ? 'Failed to update product' : 'Failed to create product');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteProduct(id);
        } catch (err) {
            setError('Failed to delete product');
        }
    };

    const addFlavorNote = () => {
        setFormData(prev => ({
            ...prev,
            flavorNotes: [...prev.flavorNotes, ''],
        }));
    };

    const removeFlavorNote = (index: number) => {
        setFormData(prev => ({
            ...prev,
            flavorNotes: prev.flavorNotes.filter((_, i) => i !== index),
        }));
    };

    const updateFlavorNote = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            flavorNotes: prev.flavorNotes.map((note, i) => (i === index ? value : note)),
        }));
    };

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 bg-[#f8f3e9]">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#2C1810]">Admin Dashboard</h1>
                    <p className="text-gray-600 mt-2">Manage your coffee products</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Add Product Form */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h2 className="text-xl font-bold mb-6 text-[#2C1810]">Add New Product</h2>

                        {error && (
                            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Price
                                </label>
                                <input
                                    type="text"
                                    value={formData.price}
                                    onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
                                    placeholder="$0.00"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Main Image
                                </label>
                                <div className="space-y-2">
                                    <input
                                        type="file"
                                        ref={mainImageInputRef}
                                        onChange={handleMainImageChange}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <div className="flex gap-4 items-center">
                                        <button
                                            type="button"
                                            onClick={() => mainImageInputRef.current?.click()}
                                            className="flex items-center gap-2 px-4 py-2 border border-[#6F4E37] text-[#6F4E37] rounded-lg hover:bg-[#6F4E37] hover:text-white transition-colors"
                                        >
                                            <Upload className="w-4 h-4" />
                                            {formData.image ? 'Change Image' : 'Upload Image'}
                                        </button>
                                        {imagePreviews.main && (
                                            <div className="relative w-20 h-20">
                                                <img
                                                    src={imagePreviews.main}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData(prev => ({ ...prev, image: null }));
                                                        setImagePreviews(prev => ({ ...prev, main: null }));
                                                    }}
                                                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Gallery Images
                                </label>
                                <div className="space-y-4">
                                    <input
                                        type="file"
                                        ref={galleryImageInputRef}
                                        onChange={handleGalleryImageChange}
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => galleryImageInputRef.current?.click()}
                                        className="flex items-center gap-2 px-4 py-2 border border-[#6F4E37] text-[#6F4E37] rounded-lg hover:bg-[#6F4E37] hover:text-white transition-colors"
                                    >
                                        <ImageIcon className="w-4 h-4" />
                                        Add Gallery Images
                                    </button>
                                    {imagePreviews.gallery.length > 0 && (
                                        <div className="grid grid-cols-4 gap-2">
                                            {imagePreviews.gallery.map((preview, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={preview}
                                                        alt={`Gallery ${index + 1}`}
                                                        className="w-full h-24 object-cover rounded-lg"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeGalleryImage(index)}
                                                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Origin
                                </label>
                                <input
                                    type="text"
                                    value={formData.origin}
                                    onChange={e => setFormData(prev => ({ ...prev, origin: e.target.value }))}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Roast Level
                                </label>
                                <select
                                    value={formData.roastLevel}
                                    onChange={e => setFormData(prev => ({ ...prev, roastLevel: e.target.value }))}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
                                    required
                                >
                                    <option value="Light">Light</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Dark">Dark</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Flavor Notes
                                </label>
                                {formData.flavorNotes.map((note, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={note}
                                            onChange={e => updateFlavorNote(index, e.target.value)}
                                            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeFlavorNote(index)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addFlavorNote}
                                    className="inline-flex items-center text-[#6F4E37] hover:text-[#5D3D2B]"
                                >
                                    <Plus className="w-4 h-4 mr-1" />
                                    Add Flavor Note
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#6F4E37] text-white py-3 px-6 rounded-lg hover:bg-[#5D3D2B] transition-colors flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader className="w-5 h-5 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        {editingProduct ? 'Update Product' : 'Save Product'}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Products List */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h2 className="text-xl font-bold mb-6 text-[#2C1810]">Current Products</h2>
                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <Loader className="w-8 h-8 animate-spin text-[#6F4E37]" />
                            </div>
                        ) : productsError ? (
                            <div className="text-red-500 text-center py-8">{productsError}</div>
                        ) : (
                            <div className="space-y-4">
                                {products.map(product => (
                                    <div key={product.id} className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <div className="mt-2 flex gap-1">
                                                {product.galleryImages.slice(0, 3).map((image, index) => (
                                                    <div key={index} className="w-4 h-4 rounded overflow-hidden">
                                                        <img
                                                            src={image}
                                                            alt={`Gallery ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-[#2C1810]">{product.name}</h3>
                                            <p className="text-[#6F4E37]">{product.price}</p>
                                            <div className="mt-1 flex flex-wrap gap-1">
                                                {product.flavorNotes.map((note, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-0.5 bg-[#f8f3e9] rounded-full text-xs text-[#6F4E37]"
                                                    >
                                                        {note}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}