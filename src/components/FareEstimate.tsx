import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface FareEstimateProps {
  fare: number | null;
  isLoading: boolean;
}

const FareEstimate = ({ fare, isLoading }: FareEstimateProps) => {
  if (isLoading) {
    return (
      <Card className="mt-6 animate-fade-in">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-indigo-600"></div>
            <p className="text-gray-600">Calculating fare...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (fare === null) return null;

  return (
    <Card className="mt-6 animate-fade-in">
      <CardContent className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Estimated Fare</h3>
          <p className="text-3xl font-bold text-indigo-600">${fare.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FareEstimate;