import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeliveryForm } from "../components/DeliveryForm.tsx";
import { FormData } from "../components/DeliveryForm.tsx";
import { useCart } from '../contexts/CartContext';
import { orderService } from '../../services/api';
import { Loader } from 'lucide-react';

export function Delivery() {
    const navigate = useNavigate();
    const { state: cartState } = useCart();
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
            const orderData: Omit<Order, 'id' | 'status' | 'createdAt'> = {
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

    if (cartState.items.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <main className="max-w-3xl mx-auto px-4 py-20">
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
        </main>
    );
}