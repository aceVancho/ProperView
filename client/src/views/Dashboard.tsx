import { PropertyCard } from "@/myComponents/PropertyCard";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
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

const Dashboard: React.FC = () => {
  const [properties, setProperties] = useState([]);
  const { auth } = useAuth();

  // Filter state
  const [filters, setFilters] = useState({
    price: "",
    bedrooms: "",
    bathrooms: "",
    location: "",
    status: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFilters((prev) => ({ ...prev, status: value }));
  };

  const fetchProperties = async () => {
    try {
      const res = await fetch("http://localhost:5001/properties", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "properViewAuthToken"
          )}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch properties");
      let data = await res.json();

      // Apply filters
      data = data.filter((property: any) => {
        const matchesPrice = filters.price
          ? property.price <= parseFloat(filters.price)
          : true;
        const matchesBedrooms = filters.bedrooms
          ? property.bedrooms == filters.bedrooms
          : true;
        const matchesBathrooms = filters.bathrooms
          ? property.bathrooms == filters.bathrooms
          : true;
        const matchesLocation = filters.location
          ? property.address
              ?.toLowerCase()
              .includes(filters.location.toLowerCase())
          : true;
        const matchesStatus = filters.status
          ? property.status === filters.status
          : true;
        return (
          matchesPrice &&
          matchesBedrooms &&
          matchesBathrooms &&
          matchesLocation &&
          matchesStatus
        );
      });

      const orderedData = data.sort((a: any, b: any) =>
        a.agentId === auth?.agent._id ? -1 : 1
      );
      setProperties(orderedData);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  return (
    <div className="flex h-screen w-screen">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Proper View</h1>
          <p className="text-muted-foreground text-lg">
            Welcome to the Proper View dashboard!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <Button variant="default">+ Create Listing</Button>
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property: any) => (
            <PropertyCard key={property._id} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
