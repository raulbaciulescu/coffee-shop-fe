import { useState, useCallback } from 'react';
import {orderService, productService} from "../services/api.ts";

export interface Order {
    id: string;
    customerName: string;
    address: string;
    phone: string;
    items: {
        id: string
        name: string;
        quantity: number;
        price: number;
    }[];
    total: number;
    status: 'pending' | 'processing' | 'delivered';
    createdAt: string;
}

export function useOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        console.log("call")
        setLoading(true);
        setError(null);
        try {
            const response = await orderService.getAll();
            const data = await response;
            setOrders(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    }, []);

    const updateOrderStatus = useCallback(async (orderId: string, status: string) => {
        setError(null);
        try {
            await orderService.updateOrderStatus(orderId, status);
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id == orderId ? { ...order, status } : order
                )
            );

            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update order status');
            return false;
        }
    }, []);

    return {
        orders,
        loading,
        error,
        fetchOrders,
        updateOrderStatus,
    };
}