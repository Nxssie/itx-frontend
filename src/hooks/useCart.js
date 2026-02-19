import {storage} from "@/utils/storage.js";
import {useState} from "react";
import {api} from "@/services/api.js";

export const useCart = () => {
    const [count, setCount] = useState(storage.get("cartCount", null) ?? 0);

    const addToCart = ({id, colorCode, storageCode}) => {
        api.addToCart({id, colorCode, storageCode}).then(r => {
            setCount(r.count);
            storage.set("cartCount", r.count);
        }).catch(e => {
            console.error(e);
        })

    }

    return {
        count,
        addToCart,
    };
}