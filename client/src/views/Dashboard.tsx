import { PropertyCard } from '@/myComponents/PropertyCard';
import React, { useEffect, useState } from 'react';

const Dashboard: React.FC = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
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
        setProperties(data);
        console.log('Fetched properties:', data);
      } catch (err) {
        console.error('Error fetching properties:', err);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="dashboard">
      <h1>Proper View</h1>
      <p>Welcome to the Proper View dashboard!</p>
      {properties.map((property: any) => (
        <div key={property.id} className="property-card">
          <PropertyCard { ...property } />
        </div>
      ))} 
    </div>
  );
}

export default Dashboard;