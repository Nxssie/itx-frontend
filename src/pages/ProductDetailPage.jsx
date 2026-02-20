import {Link, useParams} from 'wouter';
import {useEffect, useState} from "react";
import {api} from "@/services/api.js";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {useCart} from "@/hooks/useCart.js";
import {Button} from "@/components/ui/button.jsx";

const ProductDetailPage = () => {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [colorCode, setColorCode] = useState("");
    const [storageCode, setStorageCode] = useState("");
    const {count, addToCart} = useCart();

    useEffect(() => {
        api.getProductDetail(params.id).then(setProduct);
    }, [])

    if (!product) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{product.brand} {product.model}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="grid grid-cols-2">
                <img src={product.imgUrl}/>
                <div>
                    <h1>{product.brand} - {product.model}</h1>
                    <ul>
                        <li>{product.price}€</li>
                        <li>CPU: {product.cpu}</li>
                        <li>RAM: {product.ram}</li>
                        <li>OS: {product.os}</li>
                        <li>Display Resolution: {product.displayResolution}</li>
                        <li>Battery: {product.battery}</li>
                        <li>Primary Camera: {Array.isArray(product.primaryCamera) ? product.primaryCamera.join(", ") : product.primaryCamera}</li>
                        <li>Secondary Camera: {Array.isArray(product.secondaryCmera) ? product.secondaryCmera.join(", ") : product.secondaryCmera}</li>
                        <li>Dimensions: {product.dimentions}</li>
                        <li>Weight: {product.weight} grams</li>
                    </ul>
                    <div className="grid grid-cols-2 mt-4">
                        <Select value={colorCode} onValueChange={setColorCode}>
                            <SelectTrigger className="w-full max-w-48">
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {product.options.colors.map((item) => (
                                        <SelectItem key={item.code} value={String(item.code)}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Select value={storageCode} onValueChange={setStorageCode}>
                            <SelectTrigger className="w-full max-w-48">
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {product.options.storages.map((item) => (
                                        <SelectItem key={item.code} value={String(item.code)}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="mt-4">
                        <Button onClick={() => addToCart({id: product.id, colorCode, storageCode})}
                                disabled={!colorCode || !storageCode} type="submit">Añadir al carrito</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetailPage;