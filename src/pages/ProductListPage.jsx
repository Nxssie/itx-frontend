import {useState, useEffect} from "react";
import {api} from "@/services/api.js";
import ProductCard from "@/components/product/ProductCard.jsx";
import {Input} from "@/components/ui/input.jsx";

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        api.getProducts().then(setProducts);
    }, [])

    return (
        <>
            <div className="m-5">
                <div className="flex justify-end">
                    <Input className="max-w-md" type="search" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
                    {products.filter(e => search == "" || e.model.toLowerCase().includes(search.toLowerCase()) || e.brand.toLowerCase().includes(search.toLowerCase())).map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>

        </>
    )

}

export default ProductListPage;