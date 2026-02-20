import {useState, useEffect} from "react";
import {api} from "@/services/api.js";
import ProductCard from "@/components/product/ProductCard.jsx";
import {Input} from "@/components/ui/input.jsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.jsx";
import {Link} from "wouter";

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const filteredProducts = products.filter(e => search === "" || e.model.toLowerCase().includes(search.toLowerCase()) || e.brand.toLowerCase().includes(search.toLowerCase()))

    useEffect(() => {
        api.getProducts().then(setProducts);
    }, [])

    return (

        <>
            <div className="flex justify-between">
                <div className="grid grid-cols-1 gap-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbPage>
                                Home
                            </BreadcrumbPage>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <span>Items: {filteredProducts.length}</span>
                </div>

                <Input className="max-w-md self-center" type="search" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </>
    )

}

export default ProductListPage;