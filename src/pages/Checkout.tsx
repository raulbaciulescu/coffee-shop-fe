import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface DeliveryFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    specialInstructions: string;
}

const initialFormData: DeliveryFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    specialInstructions: '',
};

export function Checkout() {
    const [formData, setFormData] = useState<DeliveryFormData>(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const { state } = useCart();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Here you would typically send the order to your backend
        console.log('Order submitted:', {
            items: state.items,
            total: state.total,
            delivery: formData,
        });

        setIsLoading(false);
        navigate('/order-confirmation');
    };

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 bg-[#f8f3e9]">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => navigate('/cart')}
                    className="inline-flex items-center text-[#6F4E37] hover:text-[#5D3D2B] mb-8"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Cart
                </button>

                <div className="bg-white rounded-xl p-8 shadow-md">
                    <h1 className="text-2xl font-bold mb-6 text-[#2C1810]">Delivery Information</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Street Address
                            </label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    City
                                </label>
                                <input
                                    type="text"
                                    value={formData.city}
                                    onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    State
                                </label>
                                <input
                                    type="text"
                                    value={formData.state}
                                    onChange={e => setFormData(prev => ({ ...prev, state: e.target.value }))}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    ZIP Code
                                </label>
                                <input
                                    type="text"
                                    value={formData.zipCode}
                                    onChange={e => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Special Instructions (Optional)
                            </label>
                            <textarea
                                value={formData.specialInstructions}
                                onChange={e => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6F4E37] focus:border-transparent"
                                rows={3}
                            />
                        </div>

                        <div className="border-t pt-6">
                            <div className="mb-4">
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span>Subtotal</span>
                                    <span>${state.total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span>Shipping</span>
                                    <span className="text-green-500">Free</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-[#2C1810]">
                                    <span>Total</span>
                                    <span>${state.total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#6F4E37] text-white py-4 px-6 rounded-lg hover:bg-[#5D3D2B] transition-colors flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    'Complete Order'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}