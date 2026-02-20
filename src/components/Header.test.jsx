import {describe, it, expect, afterEach, vi} from 'vitest';
import {render, screen, cleanup} from '@testing-library/react';
import Header from './Header.jsx';
import {CartProvider} from "@/context/CartProvider.jsx";

vi.mock('@/services/api.js', () => ({
    api: {
        addToCart: vi.fn(),
    }
}));

vi.mock('wouter', async () => {
    const actual = await vi.importActual('wouter');
    return {
        ...actual,
        useLocation: vi.fn(() => ['/', vi.fn()]),
    };
});

import {useLocation} from 'wouter';

const wrapper = ({children}) => <CartProvider>{children}</CartProvider>;

describe('Header', () => {
    afterEach(() => cleanup())

    it('should render logo with link to home', () => {
        render(<Header/>, {wrapper});
        const logo = screen.getByText('ITX');
        expect(logo).toBeDefined();
        expect(logo.closest('a').getAttribute('href')).toBe('/');
    })

    it('should render cart count', () => {
        render(<Header/>, {wrapper});
        expect(screen.getByText('0')).toBeDefined();
    })

    it('should render Home breadcrumb as plain text on home page', () => {
        useLocation.mockReturnValue(['/', vi.fn()]);
        render(<Header/>, {wrapper});
        expect(screen.getByText('Home')).toBeDefined();
        expect(screen.queryByText('Product')).toBeNull();
    })

    it('should render breadcrumb with product id on detail page', () => {
        useLocation.mockReturnValue(['/product/ZmGrkLRPXOTpxsU4jjAcv', vi.fn()]);
        render(<Header/>, {wrapper});
        expect(screen.getByText('Home')).toBeDefined();
        expect(screen.getByText('Product ZmGrkLRPXOTpxsU4jjAcv')).toBeDefined();
    })

    it('should render Home as link on detail page', () => {
        useLocation.mockReturnValue(['/product/ZmGrkLRPXOTpxsU4jjAcv', vi.fn()]);
        render(<Header/>, {wrapper});
        const homeLink = screen.getByText('Home');
        expect(homeLink.closest('a').getAttribute('href')).toBe('/');
    })
})
