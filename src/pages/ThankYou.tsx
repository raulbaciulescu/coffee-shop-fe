import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ArrowRight, Check } from "lucide-react";

interface LocationState {
    formData: FormData;
    orderId: string;
}

export function ThankYou() {
    const location = useLocation();
    const state = location.state as LocationState;

    if (!state?.formData) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className="max-w-3xl mx-auto px-4 py-12">
            <div>
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <Check className="h-8 w-8 text-green-600"/>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Thank You for Your Order!
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Your coffee is being crafted with care by our expert baristas.
                    </p>

                    <div className="bg-amber-50 rounded-xl p-6 mb-8">
                        <h2 className="text-lg font-semibold text-amber-900 mb-4">
                            Order Details
                        </h2>
                        <div className="text-amber-800">
                            <p>Order #: {state.orderId}</p>
                            <p>Estimated Delivery Time: 30-45 minutes</p>
                            <p className="mt-2 text-left">Delivery to:</p>
                            <p className="text-left text-amber-700">{state.formData.name}</p>
                            <p className="text-left text-amber-700">
                                {state.formData.address} {state.formData.apartment}
                            </p>
                            <p className="text-left text-amber-700">
                                {state.formData.city}, {state.formData.zipCode}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center mx-auto">
                            Track Your Order
                            <ArrowRight className="ml-2 h-5 w-5"/>
                        </button>
                        <p className="text-sm text-gray-500">
                            A confirmation email has been sent to your inbox.
                        </p>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
                        <p className="text-gray-600">123 Coffee Street, Brewville, BV 12345</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="font-semibold text-gray-900 mb-2">Hours</h3>
                        <p className="text-gray-600">Mon-Fri: 6am - 8pm<br/>Sat-Sun: 7am - 6pm</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
                        <p className="text-gray-600">support@dailybrew.com<br/>(555) 123-4567</p>
                    </div>
                </div>
            </div>
        </main>
    );
}