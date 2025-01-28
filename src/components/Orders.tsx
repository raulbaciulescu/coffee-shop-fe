import React from 'react';
import { Package, Clock, ChevronDown } from 'lucide-react';

interface OrdersProps {
    orders: Order[];
    loading: boolean;
    error: string | null;
    onUpdateStatus: (orderId: string, status: Order['status']) => Promise<void>;
}

export function Orders({ orders, loading, error, onUpdateStatus }: OrdersProps) {
    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading orders...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md">
            <div className="p-6">
                <h2 className="text-xl font-bold text-[#2C1810] flex items-center gap-2">
                    <Package className="w-6 h-6" />
                    Recent Orders
                </h2>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order Details
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer Info
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Items
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                                <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {formatDate(order.createdAt)}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-900">{order.customerName}</div>
                                <div className="text-sm text-gray-500">{order.phone}</div>
                                <div className="text-sm text-gray-500">{order.address}</div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="space-y-1">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="text-sm text-gray-900">
                                            {item.quantity}x {item.name}
                                            <span className="text-gray-500 ml-1">
                          (${item.price.toFixed(2)})
                        </span>
                                        </div>
                                    ))}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="relative inline-block text-left">
                                    <div className="group">
                                        <button
                                            type="button"
                                            className={`inline-flex items-center px-3 py-1 rounded-full ${getStatusColor(
                                                order.status
                                            )} text-xs font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500`}
                                        >
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            <ChevronDown className="ml-1 h-4 w-4" />
                                        </button>
                                        <div className="hidden group-hover:block absolute z-10 mt-1 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                            <div className="py-1" role="menu" aria-orientation="vertical">
                                                {(['pending', 'processing', 'delivered'] as const).map((status) => (
                                                    <button
                                                        key={status}
                                                        onClick={() => onUpdateStatus(order.id, status)}
                                                        className={`block w-full text-left px-4 py-2 text-sm ${
                                                            order.status === status
                                                                ? 'bg-gray-100 text-gray-900'
                                                                : 'text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                        role="menuitem"
                                                    >
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                ${order.total}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}