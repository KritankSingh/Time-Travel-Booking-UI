
import React, { useState } from 'react';
import { Earth } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface LocationSelectorProps {
  locations: Location[];
  selectedLocation: string;
  onSelectLocation: (locationId: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  locations,
  selectedLocation, 
  onSelectLocation 
}) => {
  const [rotation, setRotation] = useState(0);
  
  const locationCount = locations.length;
  const angleStep = 360 / locationCount;
  
  const handleLocationClick = (locationId: string, index: number) => {
    onSelectLocation(locationId);
    // Rotate to center the selected location
    const targetRotation = -index * angleStep;
    setRotation(targetRotation);
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="text-center text-sm text-portal-glow mb-2">Select Destination</div>
      <div className="relative w-48 h-48 md:w-56 md:h-56">
        {/* Center Earth */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-20 h-20 rounded-full glassmorphism flex items-center justify-center">
            <Earth className="text-portal-accent w-12 h-12 animate-rotate-earth" />
          </div>
        </div>
        
        {/* Spinning location selector */}
        <div 
          className="absolute inset-0 transition-transform duration-1000 ease-in-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {locations.map((location, index) => {
            const angle = index * angleStep;
            const isSelected = location.id === selectedLocation;
            
            return (
              <div
                key={location.id}
                className={`absolute w-12 h-12 rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  isSelected ? 'scale-125 z-20' : ''
                }`}
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${angle}deg) translate(100px) rotate(-${angle}deg)`,
                }}
                onClick={() => handleLocationClick(location.id, index)}
              >
                <div className={`w-full h-full rounded-full glassmorphism flex items-center justify-center ${
                  isSelected ? 'border-2 border-portal-accent animate-portal-pulse' : ''
                }`}>
                  {location.icon || (
                    <span className="text-xs text-portal-glow">
                      {location.name.substring(0, 2)}
                    </span>
                  )}
                </div>
                
                {isSelected && (
                  <div className="absolute top-full mt-2 whitespace-nowrap px-2 py-1 rounded glassmorphism text-xs text-portal-glow">
                    {location.name}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;
