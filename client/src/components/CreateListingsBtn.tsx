import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export const CreateListingBtn: React.FC = () => {
  const { auth } = useAuth();
  const [form, setForm] = useState({
    title: "",
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    status: "active",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    const { title, price, address, bedrooms, bathrooms, description, status } = form;

    if (!title || !price || !address || !bedrooms || !bathrooms || !description || !status) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/properties", {
        method: "POST",
        headers: {
          Authorization: `AGENT::${auth?.agent._id}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price: Number(price),
          address,
          bedrooms: Number(bedrooms),
          bathrooms: Number(bathrooms),
          description,
          status,
        }),
      });

      if (!res.ok) throw new Error("Failed to create listing");

      setForm({
        title: "",
        price: "",
        address: "",
        bedrooms: "",
        bathrooms: "",
        description: "",
        status: "active",
      });
      setError("");
      window.location.reload(); // Or trigger a re-fetch
    } catch (err) {
      setError("Submission failed.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create Listing +</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Property</DialogTitle>
          <DialogDescription>Enter the property details below.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          {["title", "price", "address", "bedrooms", "bathrooms", "description"].map(field => (
            <div className="grid gap-1" key={field}>
              <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
              <Input
                id={field}
                value={(form as any)[field]}
                onChange={handleChange}
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}
        </div>

        {error && <p className="text-destructive text-sm">{error}</p>}

        <DialogFooter className="sm:justify-between pt-2">
          <Button variant="default" onClick={handleSubmit}>
            Submit
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="default">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

