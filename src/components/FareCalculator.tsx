import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import LocationInput from './LocationInput';
import FareEstimate from './FareEstimate';
import MapComponent from './MapComponent';

const FareCalculator = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [fare, setFare] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const calculateFare = async () => {
    if (!pickup || !dropoff) {
      toast({
        title: "Error",
        description: "Please enter both pickup and dropoff locations",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulating API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Mock fare calculation based on string lengths (replace with actual API call)
      const mockFare = (pickup.length + dropoff.length) * 2.5;
      setFare(mockFare);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to calculate fare. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <LocationInput
                label="Pickup Location"
                placeholder="Enter pickup location"
                value={pickup}
                onChange={setPickup}
              />
              <LocationInput
                label="Dropoff Location"
                placeholder="Enter dropoff location"
                value={dropoff}
                onChange={setDropoff}
              />
              <Button 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={calculateFare}
                disabled={isLoading}
              >
                Get Fare
              </Button>
            </CardContent>
          </Card>
          <FareEstimate fare={fare} isLoading={isLoading} />
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <MapComponent
            onPickupSelect={setPickup}
            onDropoffSelect={setDropoff}
          />
        </div>
      </div>
    </div>
  );
};

export default FareCalculator;