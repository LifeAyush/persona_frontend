import React from 'react';
import Header from '@/components/Header';
import FareCalculator from '@/components/FareCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <FareCalculator />
    </div>
  );
};

export default Index;