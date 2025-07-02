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
import { useAuth } from '../context/AuthContext';
import { PropertyCardProps } from "./DetailsDialogue";

export const DetailsView = ({
  onSendInquiry,
  props
}: {
  onSendInquiry: () => void;
  props: PropertyCardProps;
}) => {
  const { auth } = useAuth();
  const isUserOwnedProperty = props.agentId === auth?.agent._id 
return (  <>
    <DialogHeader>
      <DialogTitle>Property Details</DialogTitle>
      <DialogDescription>{props.address}</DialogDescription>
    </DialogHeader>
    <div className="grid gap-2">
      <p>Title: {props.title}</p>
      <p>Description: {props.description}</p>
      <p>Price: ${props.price}</p>
      <p>Bathrooms: {props.bathrooms}</p>
      <p>Bedrooms: {props.bedrooms}</p>
      <p>Status: {props.status?.toUpperCase()}</p>
    </div>
    <DialogFooter className="sm:justify-start">
      {!isUserOwnedProperty && <Button onClick={onSendInquiry}>Send Inquiry</Button>}
      <DialogClose asChild>
        <Button variant="default">Close</Button>
      </DialogClose>
    </DialogFooter>
  </>)
};