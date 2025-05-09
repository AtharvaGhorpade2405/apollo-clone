'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IDoctor } from '@/models/Doctor';

interface Filters {
  specialization: string;
  experience: string;
  rating: string;
  location: string;
}

interface DoctorListProps {
  filters?: Filters;
}

const DoctorList: React.FC<DoctorListProps> = ({ filters = {} }) => {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDoctors = async (currentFilters = filters) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...currentFilters,
      });

      const response = await fetch(`/api/doctors?${queryParams}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch doctors');
      }

      setDoctors(data.doctors);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [page, filters]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-2">{error}</div>
        <button
          onClick={() => fetchDoctors()}
          className="text-blue-600 hover:text-blue-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No doctors found matching your criteria.</p>
        <button
          onClick={() => {
            setPage(1);
            fetchDoctors({});
          }}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          View All Doctors
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {doctors.map((doctor) => (
        <div
          key={doctor._id?.toString()}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/5">
              <div className="relative w-32 h-32 mx-auto md:mx-0">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 768px) 128px, 128px"
                />
              </div>
            </div>
            
            <div className="md:w-4/5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-semibold">₹{doctor.consultationFee}</p>
                  <p className="text-sm text-gray-500">Consultation fee</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                <p className="flex items-center text-gray-600">
                  <span className="font-medium">Experience:</span>
                  <span className="ml-2">{doctor.experience} years</span>
                </p>
                <p className="flex items-center text-gray-600">
                  <span className="font-medium">Rating:</span>
                  <span className="ml-2 flex items-center">
                    {doctor.rating} <span className="text-yellow-400 ml-1">⭐</span>
                  </span>
                </p>
                <p className="flex items-center text-gray-600">
                  <span className="font-medium">Location:</span>
                  <span className="ml-2">{doctor.location}</span>
                </p>
                <p className="flex items-center text-gray-600">
                  <span className="font-medium">Languages:</span>
                  <span className="ml-2">{doctor.languages.join(', ')}</span>
                </p>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2 text-gray-900">About</h4>
                <p className="text-gray-600 line-clamp-2">{doctor.about}</p>
              </div>

              <div className="mt-6 flex gap-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Book Appointment
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorList; 