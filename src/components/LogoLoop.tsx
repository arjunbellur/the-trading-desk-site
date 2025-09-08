import React, { useEffect, useRef } from 'react';

interface LogoItem {
  node?: React.ReactNode;
  src?: string;
  alt?: string;
  title?: string;
  href?: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right';
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
  className?: string;
}

const LogoLoop: React.FC<LogoLoopProps> = ({
  logos,
  speed = 50,
  direction = 'left',
  logoHeight = 48,
  gap = 100,
  pauseOnHover = true,
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor = '#ffffff',
  ariaLabel = 'Logo carousel',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const isPausedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startTime: number | null = null;
    const totalWidth = container.scrollWidth / 2; // Half because we duplicate the content

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      
      if (!isPausedRef.current) {
        const elapsed = currentTime - startTime;
        const progress = (elapsed / speed) % 1;
        const translateX = direction === 'left' ? -progress * totalWidth : progress * totalWidth;
        
        container.style.transform = `translateX(${translateX}px)`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => {
      if (pauseOnHover) isPausedRef.current = true;
    };

    const handleMouseLeave = () => {
      if (pauseOnHover) isPausedRef.current = false;
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [speed, direction, pauseOnHover]);

  const renderLogo = (logo: LogoItem, index: number) => {
    const logoContent = logo.node || (
      logo.src ? (
        <img 
          src={logo.src} 
          alt={logo.alt || logo.title || `Logo ${index + 1}`}
          style={{ height: logoHeight, width: 'auto' }}
        />
      ) : (
        <div 
          style={{ 
            height: logoHeight, 
            display: 'flex', 
            alignItems: 'center',
            fontSize: '18px',
            fontWeight: '700',
            color: 'white',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            padding: '0 20px'
          }}
        >
          {logo.title}
        </div>
      )
    );

    const logoElement = logo.href ? (
      <a 
        href={logo.href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        {logoContent}
      </a>
    ) : (
      logoContent
    );

    return (
      <div
        key={index}
        className={`flex flex-col items-center justify-center ${scaleOnHover ? 'transition-transform duration-300 hover:scale-110' : ''}`}
        style={{ 
          flexShrink: 0,
          marginRight: gap,
        }}
      >
        {/* SVG Icon */}
        <div className="mb-2">
          {logoElement}
        </div>
        
        {/* Company Name */}
        {logo.title && (
          <div 
            style={{ 
              fontSize: '12px',
              fontWeight: '600',
              color: 'white',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              opacity: 0.8
            }}
          >
            {logo.title}
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage: fadeOut ? `linear-gradient(to right, transparent, ${fadeOutColor} 10%, ${fadeOutColor} 90%, transparent)` : 'none',
        WebkitMaskImage: fadeOut ? `linear-gradient(to right, transparent, ${fadeOutColor} 10%, ${fadeOutColor} 90%, transparent)` : 'none',
      }}
      aria-label={ariaLabel}
    >
      <div
        ref={containerRef}
        className="flex items-center"
        style={{
          willChange: 'transform',
        }}
      >
        {/* First set of logos */}
        <div className="flex items-center">
          {logos.map((logo, index) => renderLogo(logo, index))}
        </div>
        
        {/* Duplicate set for seamless loop */}
        <div className="flex items-center">
          {logos.map((logo, index) => renderLogo(logo, index))}
        </div>
      </div>
    </div>
  );
};

export default LogoLoop;