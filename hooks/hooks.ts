import {useState, useCallback, useEffect} from 'react';
import { productService } from '../services/api';
import {Product} from "../src/data/products.ts";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productService.getAll();
            let data: Product[];
            data = await response.map(product => ({
                id: product.id,
                name: product.name,
                description: product.description,
                galleryImages: [
                    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&q=80"
                ],
                origin: product.origin,
                roastLevel: "Medium",
                flavorNotes: ["Chocolate", "Caramel", "Light citrus"],
                image: product.imageUrl ,
                price: `$${product.price}`,
            }));
            setProducts(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };


    const createProduct = useCallback(async (product: Omit<Product, 'id'>) => {
        try {
            setError(null);
            console.log(product)
            const productDto = {
                name: product.name,
                description: product.description,
                origin: product.origin,
                roastLevel: "Medium",
                imageUrl: product.image,
                price: 3
            }
            await productService.create(productDto);
            await fetchProducts(); // Refresh the list
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

    return {
        products,
        loading,
        error,
        fetchProducts,
        createProduct,
        deleteProduct,
    };
}