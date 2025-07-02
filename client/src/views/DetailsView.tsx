import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
      <div className="flex gap-x-2">
        <span className="font-semibold">Title:</span>
        <p>{props.title}</p>
      </div>
      <div className="flex gap-x-2">
        <span className="font-semibold">Description:</span>
        <p>{props.description}</p>
      </div>
      <div className="flex gap-x-2">
        <span className="font-semibold">Price:</span>
        <p>${props.price}</p>
      </div>
      <div className="flex gap-x-2">
        <span className="font-semibold">Bathrooms:</span>
        <p>{props.bathrooms}</p>
      </div>
      <div className="flex gap-x-2">
        <span className="font-semibold">Bedrooms:</span>
        <p>{props.bedrooms}</p>
      </div>
      <div className="flex gap-x-2">
        <span className="font-semibold">Status:</span>
        <p>{props.status?.toUpperCase()}</p>
      </div>
    </div>
    <DialogFooter className="sm:justify-start">
      {!isUserOwnedProperty && <Button onClick={onSendInquiry}>Send Inquiry</Button>}
      <DialogClose asChild>
        <Button variant="default">Close</Button>
      </DialogClose>
    </DialogFooter>
  </>)
};