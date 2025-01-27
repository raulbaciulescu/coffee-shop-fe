import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {DeliveryForm} from "../components/DeliveryForm.tsx";
import {FormData} from "../components/DeliveryForm.tsx";

export function Delivery() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: '',
        address: '',
        apartment: '',
        city: '',
        zipCode: '',
        instructions: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/thank-you', { state: { formData } });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <main className="max-w-3xl mx-auto px-4 py-20">
            <DeliveryForm
                formData={formData}
                onSubmit={handleSubmit}
                onChange={handleChange}
            />
        </main>
    );
}