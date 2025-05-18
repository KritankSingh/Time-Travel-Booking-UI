
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

interface FormCardProps {
  title: string;
  subtitle?: string;
  onNext?: () => void;
  onBack?: () => void;
  isLastStep?: boolean;
  children: React.ReactNode;
}

const FormCard: React.FC<FormCardProps> = ({ 
  title, 
  subtitle, 
  onNext, 
  onBack, 
  isLastStep = false,
  children 
}) => {
  const [isFlipping, setIsFlipping] = useState(false);
  
  const handleNext = () => {
    if (onNext) {
      setIsFlipping(true);
      setTimeout(() => {
        onNext();
        setIsFlipping(false);
      }, 400); // Half the animation duration
    }
  };
  
  const handleBack = () => {
    if (onBack) {
      setIsFlipping(true);
      setTimeout(() => {
        onBack();
        setIsFlipping(false);
      }, 400); // Half the animation duration
    }
  };
  
  return (
    <div className={`card-3d w-full max-w-md mx-auto glassmorphism rounded-2xl overflow-hidden ${
      isFlipping ? 'animate-flip-card' : ''
    }`}>
      <div className="px-6 py-8 md:px-10">
        <h2 className="text-2xl font-bold text-portal-primary mb-1">{title}</h2>
        {subtitle && (
          <p className="text-sm text-portal-glow/80 mb-6">{subtitle}</p>
        )}
        
        <div className="py-6">
          {children}
        </div>
        
        <div className="flex justify-between mt-8">
          {onBack ? (
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="border-portal-primary/50 text-portal-primary hover:bg-portal-primary/10"
            >
              Back
            </Button>
          ) : (
            <div></div> // Empty div to maintain layout with flex justify-between
          )}
          
          {onNext && (
            <Button 
              onClick={handleNext}
              className="bg-portal-primary hover:bg-portal-secondary text-white"
            >
              {isLastStep ? 'Confirm Booking' : 'Next'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormCard;
