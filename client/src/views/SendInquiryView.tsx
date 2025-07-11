
import { useState } from "react";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React from "react";
import { PropertyCardProps } from "./DetailsDialogue";

export const SendInquiryView = ({
  onBack,
  props,
}: {
  onBack: () => void;
  props: PropertyCardProps;
}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const isValid =
    form.name.trim() && form.email.trim() && form.message.trim();

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const res = await fetch("http://localhost:5001/inquiry", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `AGENT::${props.agentId}`
        },
        body: JSON.stringify({
          ...form,
          propertyId: props._id,
        }),
      });

      if (!res.ok) throw new Error("Failed to send inquiry");

      setSubmitted(true);
    } catch (err) {
      console.error("Inquiry submission error:", err);
      alert("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Inquiry Sent</DialogTitle>
          <DialogDescription>
            We’ve received your message. The agent will get back to you soon.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="default">Close</Button>
          </DialogClose>
        </DialogFooter>
      </>
    );
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Send Inquiry</DialogTitle>
        <DialogDescription>Fill out this form to contact the agent.</DialogDescription>
      </DialogHeader>

      <div className="grid gap-2 py-2">
        <Label>Name</Label>
        <Input value={form.name} onChange={handleChange("name")} />

        <Label>Email</Label>
        <Input value={form.email} onChange={handleChange("email")} />

        <Label>Phone</Label>
        <Input value={form.phone} onChange={handleChange("phone")} />

        <Label>Message</Label>
        <Input
          value={form.message}
          placeholder="I’m interested in this property..."
          onChange={handleChange("message")}
        />
      </div>
      <DialogFooter className="sm:justify-start">
        <Button
          variant="default"
          onClick={handleSubmit}
          disabled={!isValid || submitting}
        >
          {submitting ? "Sending..." : "Send"}
        </Button>
        <Button variant="default" onClick={onBack}>
          Back
        </Button>
        <DialogClose asChild>
          <Button type="button" variant="default">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};

