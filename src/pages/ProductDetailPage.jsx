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
import {useCart} from "@/hooks/useCart.js";
import {Button} from "@/components/ui/button.jsx";
import {CaretLeftIcon, WarningCircleIcon} from "@phosphor-icons/react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {Separator} from "@/components/ui/separator"

const ProductDetailPage = () => {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [colorCode, setColorCode] = useState("");
    const [storageCode, setStorageCode] = useState("");
    const {count, addToCart} = useCart();
    const [error, setError] = useState(null);
    const [cartError, setCartError] = useState(null);

    useEffect(() => {
        api.getProductDetail(params.id).then(setProduct).catch(e => setError(e.message));
    }, [])

    useEffect(() => {
        if (product?.options.colors.length === 1) {
            setColorCode(String(product.options.colors[0].code));
        }
        if (product?.options.storages.length === 1) {
            setStorageCode(String(product.options.storages[0].code));
        }
    }, [product])

    if (error) {
        return (
            <Alert variant="destructive" className="max-w-md">
                <WarningCircleIcon/>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>
        )
    }

    if (!product) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Link to="/" className="flex items-center gap-1"><CaretLeftIcon/> Back </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="border rounded-lg p-4 flex justify-center items-center">
                    <img className="object-contain w-full max-h-96" src={product.imgUrl}/>
                </div>

                <div>
                    <h1 className="text-2xl font-bold">{product.brand} - {product.model}</h1>
                    <p className="text-xl font-semibold">{product.price}€</p>
                    <ul className="space-y-2">
                        <li><span className="font-medium">CPU:</span> {product.cpu}</li>
                        <li><span className="font-medium">RAM:</span> {product.ram}</li>
                        <li><span className="font-medium">OS:</span> {product.os}</li>
                        <li><span className="font-medium">Display Resolution:</span> {product.displayResolution}</li>
                        <li><span className="font-medium">Battery:</span> {product.battery}</li>
                        <li><span className="font-medium">Primary Camera:</span> {Array.isArray(product.primaryCamera) ? product.primaryCamera.join(", ") : product.primaryCamera}</li>
                        <li><span className="font-medium">Secondary Camera:</span> {Array.isArray(product.secondaryCmera) ? product.secondaryCmera.join(", ") : product.secondaryCmera}</li>
                        <li><span className="font-medium">Dimensions:</span> {product.dimentions}</li>
                        <li><span className="font-medium">Weight:</span> {product.weight} grams</li>
                    </ul>
                    <Separator className="my-4" />
                    <div className="flex gap-4">
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
                            onClick={() => {
                                addToCart({id: product.id, colorCode, storageCode}).catch(e => setCartError(e.message));
                            }}
                            disabled={!colorCode || !storageCode}
                            type="submit"
                        >
                            Añadir al carrito
                        </Button>
                        {cartError &&
                            <Alert variant="destructive" className="max-w-md mt-2">
                                <WarningCircleIcon/>
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