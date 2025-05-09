'use client';

import { useState } from 'react';
import DoctorList from '@/components/DoctorList';
import FilterSection from '@/components/FilterSection';
import Header from '@/components/Header';

export default function Home() {
  const [filters, setFilters] = useState({
    specialization: '',
    experience: '',
    rating: '',
    location: '',
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <FilterSection onFilterChange={handleFilterChange} />
          </div>
          <div className="lg:w-3/4">
            <DoctorList filters={filters} />
          </div>
        </div>
      </div>
    </main>
  );
} 