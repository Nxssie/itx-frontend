import {Link, useLocation} from "wouter";
import {ShoppingCartIcon} from "@phosphor-icons/react";
import {Badge} from "@/components/ui/badge.jsx";
import {useCart} from "@/hooks/useCart.js";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Header = () => {
    const {count} = useCart();
    const [location] = useLocation();
    const isProductDetail = location.startsWith("/product/");
    const productId = isProductDetail ? location.split("/product/")[1] : null;

    return (
        <>
            <div className="flex justify-between items-center px-5 py-3 border-b">
                <Link to={"/"} className="text-xl font-bold">ITX</Link>
                <div className="flex items-center gap-2">
                    <ShoppingCartIcon className="w-auto h-6"/>
                    <Badge className="w-auto h-4">{count}</Badge>
                </div>
            </div>
            <div className="px-5 pt-3">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            {isProductDetail ? (
                                <BreadcrumbLink asChild>
                                    <Link to="/">Home</Link>
                                </BreadcrumbLink>
                            ) : (
                                <BreadcrumbPage>Home</BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                        {isProductDetail && (
                            <>
                                <BreadcrumbSeparator/>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Product {productId}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </>
                        )}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </>
    );
};

export default Header;
