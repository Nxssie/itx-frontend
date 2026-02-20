import {describe, it, expect, afterEach, vi} from 'vitest';
import {render, screen, cleanup, waitFor, fireEvent} from '@testing-library/react';
import ProductDetailPage from './ProductDetailPage.jsx';
import {api} from "@/services/api.js";
import {CartProvider} from "@/context/CartContext.jsx";

vi.mock('@/services/api.js', () => ({
    api: {
        getProductDetail: vi.fn(),
        addToCart: vi.fn(),
    }
}));

vi.mock('wouter', async () => {
    const actual = await vi.importActual('wouter');
    return {
        ...actual,
        useParams: () => ({id: 'ZmGrkLRPXOTpxsU4jjAcv'}),
    };
});

const mockProduct = {
    id: 'ZmGrkLRPXOTpxsU4jjAcv',
    brand: 'Acer',
    model: 'Iconia Talk S',
    price: '170',
    imgUrl: 'https://itx-frontend-test.onrender.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg',
    cpu: 'Quad-core 1.3 GHz Cortex-A53',
    ram: '2 GB RAM',
    os: 'Android 6.0 (Marshmallow)',
    displayResolution: '7.0 inches (~69.8% screen-to-body ratio)',
    battery: 'Non-removable Li-Ion 3400 mAh battery (12.92 Wh)',
    primaryCamera: ['13 MP', 'autofocus'],
    secondaryCmera: ['2 MP', '720p'],
    dimentions: '191.7 x 101 x 9.4 mm (7.55 x 3.98 x 0.37 in)',
    weight: '260',
    colors: ['Black'],
    options: {
        colors: [
            {code: 1000, name: 'Black'},
        ],
        storages: [
            {code: 2000, name: '16 GB'},
            {code: 2001, name: '32 GB'},
        ],
    },
};

const wrapper = ({children}) => <CartProvider>{children}</CartProvider>;

describe('ProductDetailPage', () => {
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
        localStorage.clear();
    })

    it('should show loading state initially', () => {
        api.getProductDetail.mockReturnValue(new Promise(() => {}));
        render(<ProductDetailPage/>, {wrapper});
        expect(screen.getByText('Loading...')).toBeDefined();
    })

    it('should render product details', async () => {
        api.getProductDetail.mockResolvedValue(mockProduct);
        render(<ProductDetailPage/>, {wrapper});
        await waitFor(() => {
            expect(screen.getByText('Acer - Iconia Talk S')).toBeDefined();
            expect(screen.getByText('170€')).toBeDefined();
        });
    })

    it('should render product specs', async () => {
        api.getProductDetail.mockResolvedValue(mockProduct);
        render(<ProductDetailPage/>, {wrapper});
        await waitFor(() => {
            expect(screen.getByText(/Quad-core 1.3 GHz Cortex-A53/)).toBeDefined();
            expect(screen.getByText(/2 GB RAM/)).toBeDefined();
            expect(screen.getByText(/Android 6.0/)).toBeDefined();
            expect(screen.getByText(/260 grams/)).toBeDefined();
        });
    })

    it('should handle array camera fields', async () => {
        api.getProductDetail.mockResolvedValue(mockProduct);
        render(<ProductDetailPage/>, {wrapper});
        await waitFor(() => {
            expect(screen.getByText(/13 MP, autofocus/)).toBeDefined();
            expect(screen.getByText(/2 MP, 720p/)).toBeDefined();
        });
    })

    it('should handle string camera fields', async () => {
        api.getProductDetail.mockResolvedValue({...mockProduct, secondaryCmera: '5 MP'});
        render(<ProductDetailPage/>, {wrapper});
        await waitFor(() => {
            expect(screen.getByText(/5 MP/)).toBeDefined();
        });
    })

    it('should preselect color when only one option', async () => {
        api.getProductDetail.mockResolvedValue(mockProduct);
        render(<ProductDetailPage/>, {wrapper});
        await waitFor(() => {
            expect(screen.getByText('Black')).toBeDefined();
        });
    })

    it('should disable add to cart button when no storage selected', async () => {
        api.getProductDetail.mockResolvedValue(mockProduct);
        render(<ProductDetailPage/>, {wrapper});
        await waitFor(() => {
            expect(screen.getByText('Add to cart').closest('button').disabled).toBe(true);
        });
    })

    it('should render back link', async () => {
        api.getProductDetail.mockResolvedValue(mockProduct);
        render(<ProductDetailPage/>, {wrapper});
        await waitFor(() => {
            expect(screen.getByText('Back')).toBeDefined();
        });
    })

    it('should show error when api fails', async () => {
        api.getProductDetail.mockRejectedValue(new Error('Product not found'));
        render(<ProductDetailPage/>, {wrapper});
        await waitFor(() => {
            expect(screen.getByText('Product not found')).toBeDefined();
        });
    })
})
