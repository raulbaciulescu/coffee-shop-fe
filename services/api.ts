import axios from 'axios';
import {Product} from "../src/data/products.ts";

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiImage = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'multipart/form-data;',
    },
});


export const productService = {
    getAll: async () => {
        const { data } = await api.get('/products');
        return data;
    },

    getProductById: async (id: string): Promise<Product> => {
        const { data } = await api.get(`/products/${id}`);
        return data;
    },

    create: async (product: FormData) => {
        const { data } = await apiImage.post('/products', product);
        return data;
    },

    update: async (id: number, product: FormData) => {
        const { data } = await apiImage.put(`/products/${id}`, product);
        return data;
    },

    delete: async (id: string) => {
        await api.delete(`/products/${id}`);
    }
};

export const orderService = {
    getAll: async () => {
        const { data } = await api.get('/orders');
        return data;
    },

    updateOrderStatus: async (orderId: number, status: number) => {
        const { data } = await api.put(`/orders/${orderId}/${status}`);
        return data;
    },
    create: async (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
        const { data } = await api.post('/orders', order);
        return data;
    },
};

api.interceptors.response.use(
    response => response,
    error => {
        const message = error.response?.data?.message || 'An error occurred';
        return Promise.reject(new Error(message));
    }
);