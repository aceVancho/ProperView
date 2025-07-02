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

export const EditView = ({
  onClose,
  ...props
}: PropertyCardProps & { _id?: string; onClose: () => void }) => {
  const [form, setForm] = React.useState({
    title: props.title || "",
    price: props.price || 0,
    address: props.address || "",
    bedrooms: props.bedrooms || 0,
    bathrooms: props.bathrooms || 0,
    description: props.description || "",
    status: props.status || "active",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:5001/properties/${props._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `AGENT::${props.agentId}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update");

      console.log("✅ Property updated");
      onClose();
    } catch (err) {
      console.error("❌ Error updating:", err);
    } finally {
        // TODO: Refresh properties
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this property?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:5001/properties/${props._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("properViewAuthToken")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete");
      console.log("🗑️ Property deleted");
      onClose();
    } catch (err) {
      console.error("❌ Delete error:", err);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Property</DialogTitle>
        <DialogDescription>Update or delete this listing.</DialogDescription>
      </DialogHeader>

      <div className="grid gap-2 py-2">
        <Input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
        <Input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" />
        <Input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
        <Input name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} placeholder="Bedrooms" />
        <Input name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} placeholder="Bathrooms" />
        <Input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <select name="status" value={form.status} onChange={handleChange} className="rounded-md border px-3 py-2">
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
        </select>
      </div>

      <DialogFooter className="sm:justify-between">
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
        <div className="flex gap-2">
          <DialogClose asChild>
            <Button variant="default">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </div>
      </DialogFooter>
    </>
  );
};

