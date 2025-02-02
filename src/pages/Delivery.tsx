import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeliveryForm } from "../components/DeliveryForm.tsx";
import { FormData } from "../components/DeliveryForm.tsx";
import { useCart } from '../contexts/CartContext';
import { orderService } from '../../services/api';
import { Loader, ShoppingBag, Minus, Plus } from 'lucide-react';

export function Delivery() {
    const navigate = useNavigate();
    const { state: cartState, dispatch } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        address: '',
        apartment: '',
        city: '',
        zipCode: '',
        instructions: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const orderData = {
                customerName: formData.name,
                phone: formData.phone,
                address: formData.address + (formData.apartment ? ` ${formData.apartment}` : '') + `, ${formData.city}, ${formData.zipCode}`,
                items: cartState.items.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                total: cartState.total
            };

            const response = await orderService.create(orderData);

            // Clear the cart after successful order
            cartState.items.forEach(item => {
                dispatch({ type: 'REMOVE_ITEM', payload: item.id });
            });

            navigate('/thank-you', {
                state: {
                    formData,
                    orderId: response.id
                }
            });
        } catch (err) {
            setError('Failed to create order. Please try again.');
            console.error('Order creation failed:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    if (cartState.items.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <main className="max-w-6xl mx-auto px-4 py-20">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Delivery Form */}
                <div>
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
                            {error}
                        </div>
                    )}

                    {isSubmitting ? (
                        <div className="flex items-center justify-center p-8">
                            <Loader className="w-8 h-8 animate-spin text-[#6F4E37]" />
                            <span className="ml-2">Processing your order...</span>
                        </div>
                    ) : (
                        <DeliveryForm
                            formData={formData}
                            onSubmit={handleSubmit}
                            onChange={handleChange}
                        />
                    )}
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="flex items-center gap-3 pb-6 border-b border-gray-100">
                            <ShoppingBag className="w-6 h-6 text-[#6F4E37]" />
                            <h2 className="text-2xl font-bold text-[#2C1810]">Order Summary</h2>
                        </div>

                        <div className="mt-6 space-y-4">
                            {cartState.items.map((item) => (
                                <div key={item.id} className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
                                    <img
                                        src={item.mainImage}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="font-medium text-[#2C1810]">{item.name}</h3>
                                            <p className="font-semibold text-[#6F4E37]">{item.price}</p>
                                        </div>
                                        <div className="mt-2 flex items-center space-x-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 rounded-full hover:bg-[#f8f3e9] text-[#6F4E37] transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center font-medium text-[#2C1810]">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 rounded-full hover:bg-[#f8f3e9] text-[#6F4E37] transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {item.flavorNotes.slice(0, 2).map((note, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-[#f8f3e9] rounded-full text-xs text-[#6F4E37]"
                                                >
                                                    {note}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 space-y-3">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${cartState.total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-500">Free</span>
                            </div>
                            <div className="pt-3 border-t flex justify-between font-bold text-lg text-[#2C1810]">
                                <span>Total</span>
                                <span>${cartState.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}