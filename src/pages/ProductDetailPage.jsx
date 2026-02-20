import {Link, useParams} from 'wouter';
import {useEffect, useState} from "react";
import {api} from "@/services/api.js";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
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
import {CaretLeftIcon, WarningCircleIcon} from "@phosphor-icons/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const ProductDetailPage = () => {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [colorCode, setColorCode] = useState("");
    const [storageCode, setStorageCode] = useState("");
    const {count, addToCart} = useCart();
    const [error, setError] = useState(null);
    const [cartError, setCartError] = useState(null);

    useEffect(() => {
        api.getProductDetail(params.id).then(setProduct);
    }, [])

    if (!product) {
        return <p>Loading...</p>
    }

    if( error ) {
        return (
            <Alert variant="destructive" className="max-w-md">
                <WarningCircleIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>
        )
    }

    return (
        <>
            <Link to="/" className="flex items-center gap-1"><CaretLeftIcon/> Back </Link>
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
            <div className="grid grid-cols-1 md:grid-cols-2">
                <img className="mt-4 object-contain mx-auto" src={product.imgUrl}/>
                <div>
                    <h1 className="text-2xl font-bold">{product.brand} - {product.model}</h1>
                    <p className="text-xl font-semibold">{product.price}€</p>
                    <ul>
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
                    <div className="flex gap-4 mt-4">
                        <div className="flex-1">
                            <span className="text-sm font-medium">Color</span>
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
                        </div>
                        <div className="flex-1">
                            <span className="text-sm font-medium">Storage</span>
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

                    </div>
                    <div className="mt-4">
                        <Button
                            onClick={() => addToCart({id: product.id, colorCode, storageCode})
                                .catch(e => setCartError(e.message))}
                            disabled={!colorCode || !storageCode}
                            type="submit"
                        >
                            Añadir al carrito
                        </Button>
                        {cartError &&
                            <Alert variant="destructive" className="max-w-md mt-2">
                                <WarningCircleIcon />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{cartError}</AlertDescription>
                            </Alert>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetailPage;