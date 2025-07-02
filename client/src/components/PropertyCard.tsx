import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DetailsBtn } from "./DetailsBtn";
import { useAuth } from "../context/AuthContext";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { Pencil } from "lucide-react";
import { EditView } from "./EditView";
import { AlertCircleIcon, BadgeCheckIcon, CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

export const PropertyCard = (props: PropertyCardProps & { _id?: string }) => {
  const { auth } = useAuth();
  const isUserOwnedProperty = props.agentId === auth?.agent._id;
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>${props.price}</CardTitle>
        <CardDescription>{`${props.bedrooms} bds | ${
          props.bathrooms
        } ba | ${props.status?.toUpperCase()}`}</CardDescription>
        <CardDescription>
          {isUserOwnedProperty && (
            <Badge className="" variant="secondary">
              <BadgeCheckIcon />
              Agent-Owned
            </Badge>
          )}
        </CardDescription>
      </CardHeader>
      <CardFooter className="gap-2">
        <DetailsBtn {...props} />
        {isUserOwnedProperty && (
          <>
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <DialogTrigger asChild>
                <Button type="button" variant="secondary" size="icon">
                  <Pencil className="size-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <EditView {...props} onClose={() => setEditDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
