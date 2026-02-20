import {Link} from "wouter";
import {ShoppingCartIcon} from "@phosphor-icons/react";
import {Badge} from "@/components/ui/badge.jsx";
import {useCart} from "@/hooks/useCart.js";

const Header = () => {
    const {count} = useCart();

    return (
        <>
         <div className="flex justify-between items-center px-5 py-3 border-b">
            <Link to={"/"} className="text-xl font-bold">ITX</Link>
             <div className="flex items-center gap-2">
                 <ShoppingCartIcon className="w-auto h-6"/>
                 <Badge className="w-auto h-4">{count}</Badge>
             </div>
         </div>
        </>
    )

}

export default Header;