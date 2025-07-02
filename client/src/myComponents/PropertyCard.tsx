import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DetailsBtn } from "./DetailsBtn";

interface PropertyCardProps {
  address?: string;
  agentId?: string;
  bathrooms?: number;
  bedrooms?: number;
  description?: string;
  price?: number;
  status?: string;
  title?: string;
}

export const PropertyCard = (props: PropertyCardProps) => {
    return (
        <Card>
        <CardHeader>
            <CardTitle>${props.price}</CardTitle>
            <CardDescription>{`${props.bedrooms} bds | ${props.bathrooms} ba | ${props.status?.toUpperCase()}`}</CardDescription>
            <CardAction></CardAction>
        </CardHeader>
        {/* <CardContent>
            <p>Card Content</p>
        </CardContent> */}
        <CardFooter>
            <DetailsBtn {...props} />
        </CardFooter>
        </Card>
    )   
}