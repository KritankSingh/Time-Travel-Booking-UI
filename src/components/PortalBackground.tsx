
import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
}

const PortalBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    const generateParticles = () => {
      const particleCount = 50;
      const newParticles: Particle[] = [];
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 20 + 10,
          opacity: Math.random() * 0.5 + 0.3,
          delay: Math.random() * 5
        });
      }
      
      setParticles(newParticles);
    };
    
    generateParticles();
  }, []);
  
  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {/* Portal gradient background */}
      <div className="absolute inset-0 bg-portal-dark">
        <div className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at center, rgba(14, 165, 233, 0.2) 0%, rgba(26, 31, 44, 0) 70%)'
            }}
        />
      </div>
      
      {/* Portal rings */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-[800px] h-[800px] portal-ring animate-pulse-glow opacity-10" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] portal-ring animate-pulse-glow opacity-20" 
            style={{ animationDelay: '-1s' }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] portal-ring animate-pulse-glow opacity-30"
            style={{ animationDelay: '-2s' }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 portal-glow w-[900px] h-[900px]" />
      </div>
      
      {/* Floating particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-portal-primary animate-particles"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${particle.speed}s`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  );
};

export default PortalBackground;
