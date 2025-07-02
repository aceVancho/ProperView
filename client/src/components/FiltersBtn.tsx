import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export interface Filters {
  price: string;
  bedrooms: string;
  bathrooms: string;
  location: string;
  status: string;
}

export interface FiltersBtnProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStatusChange: (value: string) => void;
}

export const FiltersBtn: React.FC<FiltersBtnProps> = ({
  filters,
  setFilters,
  handleInputChange,
  handleStatusChange,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="default">Filter</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Filters</h4>
            <p className="text-muted-foreground text-sm">
              Set the filters for the properties.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                className="col-span-2 h-8"
                value={filters.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                className="col-span-2 h-8"
                value={filters.bedrooms}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                className="col-span-2 h-8"
                value={filters.bathrooms}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                className="col-span-2 h-8"
                value={filters.location}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="status">Status</Label>
              <Select
                value={filters.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Choose Status</SelectLabel>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="default"
              className="mt-4"
              onClick={() => {
                setFilters({
                  price: "",
                  bedrooms: "",
                  bathrooms: "",
                  location: "",
                  status: "",
                });
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};