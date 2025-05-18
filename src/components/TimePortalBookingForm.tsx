
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormCard from './FormCard';
import TimeSelector from './TimeSelector';
import LocationSelector from './LocationSelector';
import PortalBackground from './PortalBackground';

interface BookingData {
  name: string;
  email: string;
  year: number;
  location: string;
  travelers: number;
  purpose: string;
}

const TimePortalBookingForm: React.FC = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState<BookingData>({
    name: '',
    email: '',
    year: 2150,
    location: 'new-york',
    travelers: 1,
    purpose: ''
  });
  
  const locations = [
    { id: 'new-york', name: 'New York' },
    { id: 'london', name: 'London' },
    { id: 'tokyo', name: 'Tokyo' },
    { id: 'paris', name: 'Paris' },
    { id: 'rome', name: 'Rome' },
    { id: 'cairo', name: 'Cairo' },
    { id: 'rio', name: 'Rio' },
    { id: 'sydney', name: 'Sydney' }
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleYearChange = (year: number) => {
    setBookingData(prev => ({ ...prev, year }));
  };
  
  const handleLocationChange = (locationId: string) => {
    setBookingData(prev => ({ ...prev, location: locationId }));
  };
  
  const handleTravelersChange = (travelers: number) => {
    setBookingData(prev => ({ ...prev, travelers }));
  };
  
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = () => {
    toast({
      title: "Time Travel Booked!",
      description: `Your journey to ${locations.find(l => l.id === bookingData.location)?.name} in ${bookingData.year} has been confirmed.`,
    });
    
    // Reset form
    setCurrentStep(0);
    setBookingData({
      name: '',
      email: '',
      year: 2150,
      location: 'new-york',
      travelers: 1,
      purpose: ''
    });
  };
  
  const selectedLocation = locations.find(l => l.id === bookingData.location)?.name || '';
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-4">
      <PortalBackground />
      
      <div className="w-full max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Time Portal Booking</h1>
          <p className="text-portal-glow">Journey through the corridors of time</p>
        </div>
        
        {currentStep === 0 && (
          <FormCard 
            title="Traveler Information"
            subtitle="Tell us about yourself"
            onNext={handleNextStep}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-portal-glow">Traveler Name</Label>
                <Input 
                  id="name"
                  name="name"
                  value={bookingData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="glassmorphism border-portal-primary/30 text-white placeholder:text-white/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-portal-glow">Contact Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={bookingData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="glassmorphism border-portal-primary/30 text-white placeholder:text-white/50"
                />
              </div>
            </div>
          </FormCard>
        )}
        
        {currentStep === 1 && (
          <FormCard 
            title="Destination Time"
            subtitle="When would you like to travel?"
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          >
            <div className="flex flex-col items-center justify-center py-6">
              <TimeSelector 
                value={bookingData.year}
                onChange={handleYearChange}
                min={1800}
                max={2500}
                step={10}
                label="Select Year"
              />
              
              <div className="mt-6 text-center">
                <p className="text-portal-glow">
                  {bookingData.year < 2023 ? "Past" : "Future"} - {Math.abs(bookingData.year - 2023)} years {bookingData.year < 2023 ? "ago" : "from now"}
                </p>
              </div>
            </div>
          </FormCard>
        )}
        
        {currentStep === 2 && (
          <FormCard 
            title="Destination Place"
            subtitle="Where would you like to travel?"
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          >
            <div className="flex flex-col items-center justify-center py-6">
              <LocationSelector
                locations={locations}
                selectedLocation={bookingData.location}
                onSelectLocation={handleLocationChange}
              />
              
              <div className="mt-6 text-center">
                <p className="text-portal-glow">Selected destination: {selectedLocation}</p>
              </div>
            </div>
          </FormCard>
        )}
        
        {currentStep === 3 && (
          <FormCard 
            title="Journey Details"
            subtitle="Final details for your time travel"
            onNext={handleSubmit}
            onBack={handlePreviousStep}
            isLastStep
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="travelers" className="text-portal-glow">Number of Travelers</Label>
                <div className="flex items-center">
                  <TimeSelector 
                    value={bookingData.travelers}
                    onChange={handleTravelersChange}
                    min={1}
                    max={10}
                    step={1}
                    label="Travelers"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="purpose" className="text-portal-glow">Purpose of Travel</Label>
                <Input 
                  id="purpose"
                  name="purpose"
                  value={bookingData.purpose}
                  onChange={handleInputChange}
                  placeholder="Why are you traveling to this time?"
                  className="glassmorphism border-portal-primary/30 text-white placeholder:text-white/50"
                />
              </div>
              
              <div className="mt-8 p-4 glassmorphism rounded-lg">
                <h3 className="text-lg font-medium text-portal-primary mb-2">Journey Summary</h3>
                <ul className="space-y-2 text-sm text-portal-glow">
                  <li className="flex justify-between">
                    <span>Traveler:</span>
                    <span>{bookingData.name}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Destination Year:</span>
                    <span>{bookingData.year}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Destination Place:</span>
                    <span>{selectedLocation}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Number of Travelers:</span>
                    <span>{bookingData.travelers}</span>
                  </li>
                </ul>
              </div>
            </div>
          </FormCard>
        )}
      </div>
    </div>
  );
};

export default TimePortalBookingForm;
