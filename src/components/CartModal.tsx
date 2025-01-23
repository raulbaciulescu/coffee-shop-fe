import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';

interface CartModalProps {
    isVisible: boolean;
    onClose: () => void;
}

export function CartModal({ isVisible, onClose }: CartModalProps) {
    const { state, dispatch } = useCart();
    const navigate = useNavigate();

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const removeItem = (id: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    const handleViewCart = () => {
        onClose();
        navigate('/cart');
    };

    if (!isVisible) return null;

    return (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-100">
            <div className="max-h-[60vh] overflow-y-auto scrollbar-thin">
                {state.items.length === 0 ? (
                    <div className="p-6 text-center">
                        <ShoppingBag className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500">Your cart is empty</p>
                    </div>
                ) : (
                    <>
                        <div className="p-3 space-y-2">
                            {state.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-14 h-14 object-cover rounded-md"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <div className="truncate pr-2">
                                                <h3 className="font-medium text-sm text-[#2C1810] truncate">{item.name}</h3>
                                                <p className="text-[#6F4E37] font-semibold text-sm">{item.price}</p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <div className="mt-1 flex items-center space-x-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-sm font-medium w-6 text-center text-gray-700">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t p-3 bg-gray-50">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm text-gray-600">Total</span>
                                <span className="font-bold text-[#2C1810]">${state.total.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={handleViewCart}
                                className="w-full bg-[#6F4E37] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#5D3D2B] transition-colors"
                            >
                                View Cart
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}