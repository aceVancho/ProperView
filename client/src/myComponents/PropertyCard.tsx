import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DetailsBtn } from "./DetailsBtn";
import { useAuth } from "../context/AuthContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React from "react";
import { Copy, Pencil } from "lucide-react";
import { EditView } from "./EditView";

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
      </CardHeader>
      <CardFooter className="gap-2">
        <DetailsBtn {...props} />
        {isUserOwnedProperty && (
          <>
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <DialogTrigger asChild>
                <Button type="button" variant="default" size="icon">
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
