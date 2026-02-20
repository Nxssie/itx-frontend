import {useState} from "react";
import {storage} from "@/utils/storage.js";
import {api} from "@/services/api.js";
import {CartContext} from "@/context/CartContext.js";

export const CartProvider = ({children}) => {
    const [count, setCount] = useState(storage.get("cartCount", null) ?? 0);

    const addToCart = ({id, colorCode, storageCode}) => {
        return api.addToCart({id, colorCode, storageCode}).then(r => {
            setCount(prev => {
                const newCount = prev + r.count;
                storage.set("cartCount", newCount);
                return newCount;
            });
        });
    };

    return (
        <CartContext.Provider value={{count, addToCart}}>
            {children}
        </CartContext.Provider>
    );
};
