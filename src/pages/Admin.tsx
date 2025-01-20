import React, { useState } from 'react';
import { Plus, Loader, Save, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {Product} from "../data/products.ts";

interface ProductFormData {
    name: string;
    price: string;
    image: string;
    description: string;
    origin: string;
    roastLevel: string;
    flavorNotes: string[];
}

const initialFormData: ProductFormData = {
    name: '',
    price: '',
    image: '',
    description: '',
    origin: '',
    roastLevel: 'Medium',
    flavorNotes: [''],
};

export function Admin() {
    const [formData, setFormData] = useState<ProductFormData>(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/products');
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError('Failed to load products');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8080/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    price: formData.price.startsWith('$') ? formData.price : `$${formData.price}`,
                }),
            });

            if (!response.ok) throw new Error('Failed to create product');

            setFormData(initialFormData);
            fetchProducts();
        } catch (err) {
            setError('Failed to create product');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8080/products/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete product');
            fetchProducts();
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
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
                                    required
                                />
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
                                        Save Product
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Products List */}
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <h2 className="text-xl font-bold mb-6 text-[#2C1810]">Current Products</h2>
                        <div className="space-y-4">
                            {products.map(product => (
                                <div
                                    key={product.id}
                                    className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-[#2C1810]">{product.name}</h3>
                                        <p className="text-[#6F4E37]">{product.price}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}