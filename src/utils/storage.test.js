import { describe, it, expect, beforeEach, vi } from "vitest";
import { storage } from "@/utils/storage.js";

describe('storage', () => {

    beforeEach(() => {
        localStorage.clear();
    })

    it('should return the stored value', () => {
       storage.set('key1', 'value1');
       expect(storage.get('key1')).toBe('value1');
    });

    it('should return null due to ttl', () => {
        vi.useFakeTimers();
        storage.set('key1', 'value1');
        vi.advanceTimersByTime(3600001)
        expect(storage.get('key1')).toBeNull();
        vi.useRealTimers();
    });

    it('should return null due to invalid json', () => {
        localStorage.setItem('key1', 'value1');
        expect(storage.get('key1')).toBeNull();
        expect(localStorage.getItem('key1')).toBeNull();
    });

    it('should remove expired entry from localStorage', () => {
        vi.useFakeTimers();
        storage.set('key1', 'value1');
        vi.advanceTimersByTime(3600001)
        expect(storage.get('key1')).toBeNull();
        expect(localStorage.getItem('key1')).toBeNull();
        vi.useRealTimers();
    });

    it('should not expire when ttl is null', () => {
        vi.useFakeTimers();
        storage.set('key1', 'value1');
        vi.advanceTimersByTime(3600001)
        expect(storage.get('key1', null)).toBe('value1');
        vi.useRealTimers();
    });

    it('should remove item', () => {
        storage.set('key1', 'value1');
        storage.remove('key1');
        expect(storage.get('key1')).toBeNull();
    });
})