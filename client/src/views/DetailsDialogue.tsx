import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { SendInquiryView } from "./SendInquiryView";
import { DetailsView } from "./DetailsView";

type DialogueProps = {
  isDialogueOpen: boolean;
  setIsDialogueOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface PropertyCardProps {
  address?: string;
  agentId?: string;
  bathrooms?: number;
  bedrooms?: number;
  description?: string;
  price?: number;
  status?: string;
  title?: string;
  _id?: string;
}

export const DetailsDialogue: React.FC<DialogueProps & PropertyCardProps> = ({
  isDialogueOpen,
  setIsDialogueOpen,
  ...props
}) => {
  const [showInquiryForm, setShowInquiryForm] = React.useState(false);

  return (
    <Dialog
      open={isDialogueOpen}
      onOpenChange={(isOpen) => {
        setIsDialogueOpen(isOpen);
        if (!isOpen) {
          setShowInquiryForm(false);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">More Details</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        {showInquiryForm ? (
          <SendInquiryView
            onBack={() => {
              setShowInquiryForm(false);
            }}
            props={props}
          />
        ) : (
          <DetailsView
            onSendInquiry={() => {
              setShowInquiryForm(true);
            }}
            props={props}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
