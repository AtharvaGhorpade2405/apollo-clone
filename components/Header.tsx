'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/apollo-logo.png"
              alt="Apollo 247"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              Find Doctors
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              Book Lab Tests
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              Buy Medicines
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              Health Packages
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-blue-600">
              Login
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 