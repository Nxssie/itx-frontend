// src/services/api.js
import { storage } from '../utils/storage';

const API_BASE_URL = 'https://itx-frontend-test.onrender.com/api';

export const api = {
    getProducts: async () => {
        const CACHE_KEY = 'itx_products';
        const cachedData = storage.get(CACHE_KEY);

        if (cachedData) return cachedData;

        const response = await fetch(`${API_BASE_URL}/product`);
        if (!response.ok) throw new Error('Failed to fetch product list');

        const data = await response.json();

        storage.set(CACHE_KEY, data);
        return data;
    },

    getProductDetail: async (id) => {
        const CACHE_KEY = `itx_product_${id}`;
        const cachedData = storage.get(CACHE_KEY);

        if (cachedData) return cachedData;

        const response = await fetch(`${API_BASE_URL}/product/${id}`);
        if (!response.ok) throw new Error(`Failed to fetch product ${id}`);

        const data = await response.json();
        storage.set(CACHE_KEY, data);

        return data;
    },

    addToCart: async ({ id, colorCode, storageCode }) => {
        const response = await fetch(`${API_BASE_URL}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, colorCode, storageCode }),
        });

        if (!response.ok) throw new Error('Failed to add product to cart');

        return response.json();
    }
};