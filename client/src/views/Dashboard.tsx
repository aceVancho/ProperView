import { PropertyCard } from '@/myComponents/PropertyCard';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button'; // Assuming you’re using shadcn or similar

const Dashboard: React.FC = () => {
  const [properties, setProperties] = useState([]);
  const { auth } = useAuth();

  const fetchProperties = async () => {
    try {
      const res = await fetch('http://localhost:5001/properties', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("properViewAuthToken")}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch properties');
      const data = await res.json();
      const orderedData = data.sort((a: any, b: any) =>
        a.agentId === auth?.agent._id ? -1 : 1
      );
      setProperties(orderedData);
      console.log('Fetched properties:', orderedData);
    } catch (err) {
      console.error('Error fetching properties:', err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className='flex h-screen w-screen'>
      <div className="max-w-screen-xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Proper View</h1>
          <p className="text-muted-foreground text-lg">Welcome to the Proper View dashboard!</p>
        </div>
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <Button variant="default">+ Create Listing</Button>
          <div className="flex gap-2">
            <Button variant="default">Filter</Button>
          </div>
        </div>
        {/* Cards */}
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
