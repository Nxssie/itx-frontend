import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Link} from "wouter";


const ProductCard = props => {
    return (
        <Link to={`/product/${props.product.id}`}>
            <Card className="hover:shadow-lg transition-shadow">
                <div className="flex justify-center">
                    <img className="pt-4 object-contain w-48 h-48" src={props.product.imgUrl} alt={`${props.product.model} image`}/>
                </div>
                <CardHeader>
                    <CardTitle>{props.product.brand} - {props.product.model}</CardTitle>
                    <CardDescription>{props.product.price}€</CardDescription>
                </CardHeader>
            </Card>
        </Link>
    )
}

export default ProductCard;