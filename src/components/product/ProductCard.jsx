import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Link} from "wouter";
import {Separator} from "@/components/ui/separator.jsx";


const ProductCard = props => {
    return (
        <Link to={`/product/${props.product.id}`}>
            <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="flex justify-center">
                    <img className="py-4 object-contain w-48 h-48" src={props.product.imgUrl} alt={`${props.product.model} image`}/>
                </div>
                <div className="px-4">
                    <Separator  />
                </div>
                <CardHeader>
                    <CardTitle>{props.product.brand} - {props.product.model}</CardTitle>
                    <CardDescription className="font-semibold">{props.product.price === "" ? 0 : props.product.price}€</CardDescription>
                </CardHeader>
            </Card>
        </Link>
    )
}

export default ProductCard;