import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowLeft, Coffee } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export function Cart() {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  if (state.items.length === 0) {
    return (
        <div className="min-h-screen pt-24 pb-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <Coffee className="w-16 h-16 mx-auto mb-4 text-[#6F4E37]" />
              <h2 className="text-2xl font-bold mb-4 text-[#2C1810]">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added any coffee to your cart yet.</p>
              <Link
                  to="/shop"
                  className="inline-flex items-center px-6 py-3 bg-[#6F4E37] text-white rounded-lg hover:bg-[#5D3D2B] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen pt-24 pb-16 px-4 bg-[#f8f3e9]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-[#2C1810]">Shopping Cart</h1>
            <Link
                to="/shop"
                className="inline-flex items-center text-[#6F4E37] hover:text-[#5D3D2B] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {state.items.map((item) => (
                  <div
                      key={item.id}
                      className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex gap-6">
                      <img
                          src={item.mainImage}
                          alt={item.name}
                          className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold text-[#2C1810] mb-1">{item.name}</h3>
                            <p className="text-[#6F4E37] font-bold text-lg">{item.price}</p>
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
                          <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="mt-4 flex items-center space-x-2">
                          <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 rounded-full hover:bg-[#f8f3e9] text-[#6F4E37] transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium text-[#2C1810]">{item.quantity}</span>
                          <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 rounded-full hover:bg-[#f8f3e9] text-[#6F4E37] transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>

            <div className="md:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-md sticky top-24">
                <h2 className="text-xl font-bold mb-6 text-[#2C1810] pb-4 border-b border-gray-100">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({state.items.length} items)</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-500">Free</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-bold text-lg text-[#2C1810]">
                    <span>Total</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                </div>
                <Link
                    to="/delivery"
                    className="w-full bg-[#6F4E37] text-white py-4 px-6 rounded-lg hover:bg-[#5D3D2B] transition-colors font-medium inline-block text-center"
                >
                  Proceed to Checkout
                </Link>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Free shipping on all orders
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}