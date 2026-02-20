import {describe, it, expect, afterEach} from 'vitest';
import {render, screen, cleanup} from '@testing-library/react';
import ProductCard from './ProductCard.jsx';

const mockProduct = {
    id: 'ZmGrkLRPXOTpxsU4jjAcv',
    brand: 'Acer',
    model: 'Iconia Talk S',
    price: '170',
    imgUrl: 'https://itx-frontend-test.onrender.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg',
};

describe('ProductCard', () => {
    afterEach(() => cleanup())

    it('should render product brand and model', () => {
        render(<ProductCard product={mockProduct}/>);
        expect(screen.getByText('Acer - Iconia Talk S')).toBeDefined();
    })

    it('should render product price with euro symbol', () => {
        render(<ProductCard product={mockProduct}/>);
        expect(screen.getByText('170€')).toBeDefined();
    })

    it('should render 0€ when price is empty', () => {
        render(<ProductCard product={{...mockProduct, price: ''}}/>);
        expect(screen.getByText('0€')).toBeDefined();
    })

    it('should render product image with correct src and alt', () => {
        render(<ProductCard product={mockProduct}/>);
        const img = screen.getByAltText('Iconia Talk S image');
        expect(img).toBeDefined();
        expect(img.src).toBe('https://itx-frontend-test.onrender.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg');
    })

    it('should link to product detail page', () => {
        render(<ProductCard product={mockProduct}/>);
        const link = screen.getByRole('link');
        expect(link.getAttribute('href')).toBe('/product/ZmGrkLRPXOTpxsU4jjAcv');
    })
})
