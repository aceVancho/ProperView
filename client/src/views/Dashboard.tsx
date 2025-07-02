import { PropertyCard } from "@/components/PropertyCard";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { FiltersBtn } from "@/components/FiltersBtn";
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
import { CreateListingBtn } from "@/components/CreateListingsBtn";

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
          <CreateListingBtn />
          <FiltersBtn
            filters={filters}
            setFilters={setFilters}
            handleInputChange={handleInputChange}
            handleStatusChange={handleStatusChange}
          />
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