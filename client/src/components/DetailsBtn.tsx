import React from "react";
import { DetailsDialogue } from "../views/DetailsDialogue";

interface PropertyCardProps {
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

export const DetailsBtn = (props: PropertyCardProps) => {
  const [isDialogueOpen, setIsDialogueOpen] = React.useState(false);
  return (
    <DetailsDialogue
      isDialogueOpen={isDialogueOpen}
      setIsDialogueOpen={setIsDialogueOpen}
      {...props}
    />
  );
};
