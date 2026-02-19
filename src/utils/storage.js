const DEFAULT_TTL = 60 * 60 * 1000; // 1 hour in ms

export const storage = {
    set: (key, value) => {
        try {
            const payload = JSON.stringify({
                value,
                timestamp: Date.now(),
            });
            localStorage.setItem(key, payload);
        } catch (error) {
            console.warn(`Failed to save to localStorage (key: ${key})`, error);
        }
    },

    get: (key, ttl = DEFAULT_TTL) => {
        try {
            const itemStr = localStorage.getItem(key);
            if (!itemStr) return null;

            const { value, timestamp } = JSON.parse(itemStr);

            // If a TTL is provided and the elapsed time exceeds it, invalidate the cache
            if (ttl !== null && (Date.now() - timestamp > ttl)) {
                localStorage.removeItem(key);
                return null;
            }

            return value;
        } catch (error) {
            // Clean up corrupted or invalid JSON data
            localStorage.removeItem(key);
            return null;
        }
    },

    remove: (key) => {
        localStorage.removeItem(key);
    }
};