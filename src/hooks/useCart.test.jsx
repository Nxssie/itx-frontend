import {describe, it, expect, vi, beforeEach} from 'vitest';
import {renderHook, act} from '@testing-library/react';
import {useCart} from "@/hooks/useCart.js";
import {storage} from "@/utils/storage.js";
import {api} from "@/services/api.js";
import {CartProvider} from "@/context/CartProvider.jsx";

vi.mock('@/services/api.js', () => ({
  api: {
      addToCart: vi.fn(),
  }
}));

const wrapper = ({children}) => <CartProvider>{children}</CartProvider>;

describe('useCart', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    })

    it('should initialize count to 0 when localStorage is empty', () => {
        const {result} = renderHook(() => useCart(), {wrapper});
        expect(result.current.count).toEqual(0);
    })

    it('should initialize count if localstorage is not empty', () => {
        storage.set('cartCount', 5);
        const {result} = renderHook(() => useCart(), {wrapper});
        expect(result.current.count).toEqual(5);
    })

    it('should update count with api response', async () => {
        api.addToCart.mockResolvedValue({count: 3});
        const {result} = renderHook(() => useCart(), {wrapper});
        await act(async () => {
            result.current.addToCart({ id: '1', colorCode: '2', storageCode: '3' })
        })
        expect(result.current.count).toEqual(3);
        expect(storage.get("cartCount")).toEqual(3);
    })

    it('should update count with api response if previous value is present', async () => {
        api.addToCart.mockResolvedValue({count: 1});
        const {result} = renderHook(() => useCart(), {wrapper});
        await act(async () => {
            result.current.addToCart({ id: '1', colorCode: '2', storageCode: '3' })
        })
        await act(async () => {
            result.current.addToCart({ id: '1', colorCode: '2', storageCode: '3' })
        })
        expect(result.current.count).toEqual(2);
        expect(storage.get("cartCount")).toEqual(2);
    })

    it('shouldn\'t update count if api throws error', async () => {
        api.addToCart.mockRejectedValue(new Error('API error'));
        const {result} = renderHook(() => useCart(), {wrapper});
        await act(async () => {
            result.current.addToCart({ id: '1', colorCode: '2', storageCode: '3' }).catch(() => {})
        })
        expect(result.current.count).toEqual(0);
    })

})
