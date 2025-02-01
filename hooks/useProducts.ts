import {useCallback, useState} from 'react';
import {productService} from '../services/api';
import {Product} from "../src/data/products.ts";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentProduct, setCurrentProduct] = useState<Product>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getProductById = async (id: string) => {
        try {
            setLoading(true);
            const response = await productService.getProductById(id);
            let data: Product;
            data = {
                id: response.id,
                name: response.name,
                description: response.description,
                galleryImages: response.galleryImages,
                origin: response.origin,
                roastLevel: "Medium",
                flavorNotes: ["Chocolate", "Caramel", "Light citrus"],
                mainImage: response.mainImage,
                price: response.price,
            };
            console.log(data)
            setCurrentProduct(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

        const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productService.getAll();
            let data: Product[];
            data = await response.map(product => ({
                id: product.id,
                name: product.name,
                description: product.description,
                galleryImages: product.galleryImages,
                origin: product.origin,
                roastLevel: "Medium",
                flavorNotes: ["Chocolate", "Caramel", "Light citrus"],
                mainImage: product.mainImage,
                price: product.price,
            }));
            console.log(data)
            setProducts(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const createProduct = useCallback(async (productFormData: FormData) => {
        try {
            setError(null);
            await productService.create(productFormData);
            await fetchProducts()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create product');
            throw err;
        }
    }, [fetchProducts]);

    const deleteProduct = useCallback(async (id: string) => {
        try {
            setError(null);
            await productService.delete(id);
            await fetchProducts(); // Refresh the list
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete product');
            throw err;
        }
    }, [fetchProducts]);

    const updateProduct = useCallback(async (id: number, product: FormData) => {
        console.log(id)
        try {
            setError(null);
            await productService.update(id, product);
            await fetchProducts(); // Refresh the list
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create product');
            throw err;
        }
    }, [fetchProducts]);

    return {
        products,
        loading,
        error,
        fetchProducts,
        createProduct,
        deleteProduct,
        updateProduct,
        getProductById,
        currentProduct
    };
}