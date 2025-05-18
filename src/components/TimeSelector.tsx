
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeSelectorProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  label: string;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ 
  value, 
  onChange, 
  min, 
  max, 
  step = 1,
  label 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [angle, setAngle] = useState(0);
  
  // Calculate the percentage for the circle fill
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Calculate the angle for the selector
  useEffect(() => {
    const newAngle = ((value - min) / (max - min)) * 360;
    setAngle(newAngle);
  }, [value, min, max]);

  // Handle mouse/touch events for the circular selector
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMouseMove(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    
    // Calculate angle from center
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    angle = (angle + 90) % 360; // Adjust to start from top
    if (angle < 0) angle += 360;
    
    // Convert angle to value
    const range = max - min;
    const newValue = min + (range * angle) / 360;
    
    // Round to step
    const roundedValue = Math.round(newValue / step) * step;
    
    // Ensure value is within bounds
    const clampedValue = Math.min(Math.max(roundedValue, min), max);
    
    onChange(clampedValue);
  };

  // Clean up event listeners
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="text-center text-sm text-portal-glow mb-2">{label}</div>
      <div 
        className="w-40 h-40 md:w-48 md:h-48 relative cursor-pointer"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Background circle */}
        <div className="absolute inset-0 rounded-full bg-portal-dark border-2 border-portal-primary/30" />
        
        {/* Progress circle */}
        <div 
          className="circle-selector"
          style={{ '--percentage': `${percentage}%` } as React.CSSProperties}
        />
        
        {/* Center point */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center animate-pulse-glow">
            <Clock className="text-portal-primary w-6 h-6 animate-rotate-clock" />
          </div>
        </div>
        
        {/* Value marker */}
        <div 
          className="absolute w-4 h-4 rounded-full bg-portal-glow"
          style={{ 
            top: '50%', 
            left: '50%', 
            transform: `rotate(${angle}deg) translateY(-20px) translateX(-50%)`,
            transformOrigin: 'center center',
            boxShadow: '0 0 10px 2px rgba(51, 195, 240, 0.6)'
          }}
        />
        
        {/* Value display */}
        <div className="absolute bottom-0 left-0 right-0 text-center text-2xl font-bold text-white">
          {value}
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;
