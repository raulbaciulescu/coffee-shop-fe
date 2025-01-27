import React from 'react';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';

export interface FormData {
    name: string;
    phone: string;
    address: string;
    apartment: string;
    city: string;
    zipCode: string;
    instructions: string;
}

interface DeliveryFormProps {
    formData: FormData;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function DeliveryForm({ formData, onSubmit, onChange }: DeliveryFormProps) {
    return (
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Delivery Information</h1>
            <p className="text-gray-600 mb-8">Please provide your delivery details below</p>

            <form onSubmit={onSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                        <Phone className="h-5 w-5 mr-2 text-amber-950" />
                        Contact Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={onChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-white border p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={onChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-white border p-2"
                            />
                        </div>
                    </div>
                </div>

                {/* Delivery Address */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-amber-950" />
                        Delivery Address
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Street Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                required
                                value={formData.address}
                                onChange={onChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-white border p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">Apartment, Suite, etc. (optional)</label>
                            <input
                                type="text"
                                id="apartment"
                                name="apartment"
                                value={formData.apartment}
                                onChange={onChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-white border p-2"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    required
                                    value={formData.city}
                                    onChange={onChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-white border p-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                                <input
                                    type="text"
                                    id="zipCode"
                                    name="zipCode"
                                    required
                                    value={formData.zipCode}
                                    onChange={onChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-white border p-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delivery Instructions */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-amber-950" />
                        Delivery Instructions
                    </h2>
                    <div>
                        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Special Instructions (optional)</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            rows={3}
                            value={formData.instructions}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 bg-white border p-2"
                            placeholder="Add any special delivery instructions here..."
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-amber-950 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors duration-200 flex items-center justify-center"
                    >
                        Complete Order
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </form>
        </div>
    );
}