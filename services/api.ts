import axios from 'axios';
import {Product} from "../src/data/products.ts";

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const productService = {
    getAll: async () => {
        const { data } = await api.get('/products');
        return data;
    },

    getById: async (id: string): Promise<Product> => {
        const { data } = await api.get(`/products/${id}`);
        return data;
    },

    create: async (product: Omit<Product, 'id'>) => {
        const { data } = await api.post('/products', {
            ...product,
            price: product.price.startsWith('$') ? product.price : `$${product.price}`,
        });
        return data;
    },

    delete: async (id: string) => {
        await api.delete(`/products/${id}`);
    },
};

// Error handling interceptor
api.interceptors.response.use(
    response => response,
    error => {
        const message = error.response?.data?.message || 'An error occurred';
        return Promise.reject(new Error(message));
    }
);