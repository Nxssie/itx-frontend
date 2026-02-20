import {describe, it, expect, afterEach, vi} from 'vitest';
import {render, screen, cleanup, fireEvent, waitFor} from '@testing-library/react';
import ProductListPage from './ProductListPage.jsx';
import {api} from "@/services/api.js";

vi.mock('@/services/api.js', () => ({
    api: {
        getProducts: vi.fn(),
    }
}));

const mockProducts = [
    {
        id: 'ZmGrkLRPXOTpxsU4jjAcv',
        brand: 'Acer',
        model: 'Iconia Talk S',
        price: '170',
        imgUrl: 'https://itx-frontend-test.onrender.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg',
    },
    {
        id: 'cGjFJlmqNPIwU59AOcY8H',
        brand: 'Acer',
        model: 'Liquid Z6 Plus',
        price: '250',
        imgUrl: 'https://itx-frontend-test.onrender.com/images/cGjFJlmqNPIwU59AOcY8H.jpg',
    },
    {
        id: 'xMwFwMy20sRPsFAhG_mjK',
        brand: 'Samsung',
        model: 'Galaxy S10',
        price: '899',
        imgUrl: 'https://itx-frontend-test.onrender.com/images/xMwFwMy20sRPsFAhG_mjK.jpg',
    },
];

describe('ProductListPage', () => {
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    })

    it('should render product list', async () => {
        api.getProducts.mockResolvedValue(mockProducts);
        render(<ProductListPage/>);
        await waitFor(() => {
            expect(screen.getByText('Acer - Iconia Talk S')).toBeDefined();
            expect(screen.getByText('Acer - Liquid Z6 Plus')).toBeDefined();
            expect(screen.getByText('Samsung - Galaxy S10')).toBeDefined();
        });
    })

    it('should display correct item count', async () => {
        api.getProducts.mockResolvedValue(mockProducts);
        render(<ProductListPage/>);
        await waitFor(() => {
            expect(screen.getByText('Items: 3')).toBeDefined();
        });
    })

    it('should filter products by model', async () => {
        api.getProducts.mockResolvedValue(mockProducts);
        render(<ProductListPage/>);
        await waitFor(() => {
            expect(screen.getByText('Items: 3')).toBeDefined();
        });
        fireEvent.change(screen.getByPlaceholderText('Search...'), {target: {value: 'Galaxy'}});
        expect(screen.getByText('Items: 1')).toBeDefined();
        expect(screen.getByText('Samsung - Galaxy S10')).toBeDefined();
        expect(screen.queryByText('Acer - Iconia Talk S')).toBeNull();
    })

    it('should filter products by brand', async () => {
        api.getProducts.mockResolvedValue(mockProducts);
        render(<ProductListPage/>);
        await waitFor(() => {
            expect(screen.getByText('Items: 3')).toBeDefined();
        });
        fireEvent.change(screen.getByPlaceholderText('Search...'), {target: {value: 'Acer'}});
        expect(screen.getByText('Items: 2')).toBeDefined();
        expect(screen.queryByText('Samsung - Galaxy S10')).toBeNull();
    })

    it('should filter case-insensitive', async () => {
        api.getProducts.mockResolvedValue(mockProducts);
        render(<ProductListPage/>);
        await waitFor(() => {
            expect(screen.getByText('Items: 3')).toBeDefined();
        });
        fireEvent.change(screen.getByPlaceholderText('Search...'), {target: {value: 'galaxy'}});
        expect(screen.getByText('Items: 1')).toBeDefined();
        expect(screen.getByText('Samsung - Galaxy S10')).toBeDefined();
    })

    it('should show all products when search is cleared', async () => {
        api.getProducts.mockResolvedValue(mockProducts);
        render(<ProductListPage/>);
        await waitFor(() => {
            expect(screen.getByText('Items: 3')).toBeDefined();
        });
        fireEvent.change(screen.getByPlaceholderText('Search...'), {target: {value: 'Galaxy'}});
        expect(screen.getByText('Items: 1')).toBeDefined();
        fireEvent.change(screen.getByPlaceholderText('Search...'), {target: {value: ''}});
        expect(screen.getByText('Items: 3')).toBeDefined();
    })

    it('should show error when api fails', async () => {
        api.getProducts.mockRejectedValue(new Error('Network error'));
        render(<ProductListPage/>);
        await waitFor(() => {
            expect(screen.getByText('Network error')).toBeDefined();
        });
    })
})
