import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  life: number;
  maxLife: number;
  color: string;
  type: 'candlestick' | 'trendline' | 'data-point' | 'chart-bar' | 'price-level';
  value?: number;
  trend?: 'up' | 'down' | 'neutral';
}

interface MousePosition {
  x: number;
  y: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });
  const scrollYRef = useRef<number>(0);

  // Trading-themed particle configuration
  const PARTICLE_COUNT = 180;
  const MOUSE_RADIUS = 150;
  const CONNECTION_DISTANCE = 140;
  const SCROLL_EFFECT_STRENGTH = 0.2;
  const MOUSE_ATTRACTION_STRENGTH = 0.015;
  
  // Trading element types
  const TRADING_TYPES = ['candlestick', 'trendline', 'data-point', 'chart-bar', 'price-level'] as const;
  const TREND_COLORS = {
    up: '#00ff88',      // Bull green
    down: '#ff4757',    // Bear red
    neutral: '#64D4BC'  // Trading Desk mint
  };

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = [];
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const type = TRADING_TYPES[Math.floor(Math.random() * TRADING_TYPES.length)];
      const trend = Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'neutral';
      
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.8,
        opacity: Math.random() * 0.4 + 0.1,
        baseOpacity: Math.random() * 0.25 + 0.1,
        life: Math.random() * 1000,
        maxLife: 2000 + Math.random() * 3000,
        color: TREND_COLORS[trend],
        type,
        value: Math.random() * 1000 + 100, // Mock price/value
        trend
      });
    }
    
    particlesRef.current = particles;
  };

  // Update particle positions and interactions
  const updateParticles = (width: number, height: number, deltaTime: number) => {
    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    const scrollY = scrollYRef.current;

    particles.forEach((particle, index) => {
      // Basic movement
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Subtle scroll effect - much reduced to prevent interference
      particle.y += scrollY * 0.05;

      // Mouse interaction - Sparkland style
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < MOUSE_RADIUS) {
        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
        const angle = Math.atan2(dy, dx);
        
        if (distance < MOUSE_RADIUS * 0.3) {
          // Close particles get repelled
          particle.vx -= Math.cos(angle) * force * 0.03;
          particle.vy -= Math.sin(angle) * force * 0.03;
        } else {
          // Distant particles get attracted
          particle.vx += Math.cos(angle) * force * MOUSE_ATTRACTION_STRENGTH;
          particle.vy += Math.sin(angle) * force * MOUSE_ATTRACTION_STRENGTH;
        }
        
        // Increase opacity and size near mouse
        particle.opacity = Math.min(1, particle.baseOpacity + force * 0.6);
        particle.size = Math.min(4, particle.size + force * 1.5);
      } else {
        // Return to base opacity and size
        particle.opacity = Math.max(particle.baseOpacity, particle.opacity - 0.02);
        particle.size = Math.max(1, particle.size - 0.05);
      }

      // Velocity damping
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Keep particles in bounds with wrapping
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Life cycle
      particle.life += deltaTime;
      if (particle.life > particle.maxLife) {
        particle.life = 0;
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
        particle.vx = (Math.random() - 0.5) * 0.5;
        particle.vy = (Math.random() - 0.5) * 0.5;
      }

      // Subtle pulsing effect
      const pulse = Math.sin(particle.life * 0.01) * 0.1;
      particle.size = Math.max(0.5, particle.size + pulse);
    });
  };

  // Draw trading-themed elements and connections
  const drawTradingElements = (ctx: CanvasRenderingContext2D) => {
    const particles = particlesRef.current;
    
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw trading connections (trend lines between related elements)
    ctx.lineWidth = 0.8;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < CONNECTION_DISTANCE) {
          const opacity = (CONNECTION_DISTANCE - distance) / CONNECTION_DISTANCE * 0.15;
          
          // Draw trend lines based on particle trends
          if (particles[i].trend === particles[j].trend) {
            ctx.strokeStyle = `${particles[i].color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
          } else {
            ctx.strokeStyle = `rgba(100, 212, 188, ${opacity})`;
          }
          
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw trading elements
    particles.forEach(particle => {
      ctx.globalAlpha = particle.opacity;
      
      switch (particle.type) {
        case 'candlestick':
          drawCandlestick(ctx, particle);
          break;
        case 'trendline':
          drawTrendLine(ctx, particle);
          break;
        case 'data-point':
          drawDataPoint(ctx, particle);
          break;
        case 'chart-bar':
          drawChartBar(ctx, particle);
          break;
        case 'price-level':
          drawPriceLevel(ctx, particle);
          break;
      }
    });
    
    ctx.globalAlpha = 1;
  };

  // Draw individual trading elements
  const drawCandlestick = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    const size = particle.size * 4;
    const bodyHeight = size * 0.6;
    const wickHeight = size;
    
    ctx.strokeStyle = particle.color;
    ctx.fillStyle = particle.color;
    ctx.lineWidth = 1;
    
    // Draw wick
    ctx.beginPath();
    ctx.moveTo(particle.x, particle.y - wickHeight/2);
    ctx.lineTo(particle.x, particle.y + wickHeight/2);
    ctx.stroke();
    
    // Draw body
    const bodyWidth = size * 0.4;
    if (particle.trend === 'up') {
      ctx.strokeRect(particle.x - bodyWidth/2, particle.y - bodyHeight/2, bodyWidth, bodyHeight);
    } else {
      ctx.fillRect(particle.x - bodyWidth/2, particle.y - bodyHeight/2, bodyWidth, bodyHeight);
    }
  };

  const drawTrendLine = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    const length = particle.size * 8;
    const angle = particle.life * 0.01;
    
    ctx.strokeStyle = particle.color;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([2, 3]);
    
    ctx.beginPath();
    ctx.moveTo(particle.x - length/2, particle.y);
    ctx.lineTo(particle.x + length/2, particle.y + (particle.trend === 'up' ? -10 : particle.trend === 'down' ? 10 : 0));
    ctx.stroke();
    
    ctx.setLineDash([]);
  };

  const drawDataPoint = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    const size = particle.size * 2;
    
    // Glow effect
    const gradient = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, size * 2
    );
    gradient.addColorStop(0, particle.color);
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, size * 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Core point
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawChartBar = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    const width = particle.size * 2;
    const height = particle.size * 6;
    
    ctx.fillStyle = particle.color;
    ctx.fillRect(particle.x - width/2, particle.y, width, height * (particle.trend === 'up' ? -1 : 1));
    
    // Add subtle border
    ctx.strokeStyle = particle.color;
    ctx.lineWidth = 0.5;
    ctx.strokeRect(particle.x - width/2, particle.y, width, height * (particle.trend === 'up' ? -1 : 1));
  };

  const drawPriceLevel = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    const length = particle.size * 12;
    
    ctx.strokeStyle = particle.color;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 2]);
    
    ctx.beginPath();
    ctx.moveTo(particle.x - length/2, particle.y);
    ctx.lineTo(particle.x + length/2, particle.y);
    ctx.stroke();
    
    // Price label
    ctx.font = `${particle.size * 3}px monospace`;
    ctx.fillStyle = particle.color;
    ctx.fillText(`$${particle.value?.toFixed(0)}`, particle.x + length/2 + 4, particle.y + 2);
    
    ctx.setLineDash([]);
  };

  // Animation loop
  const animate = (currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    updateParticles(canvas.width, canvas.height, 16); // Assuming 60fps
    drawTradingElements(ctx);
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Setup canvas and event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particlesRef.current.length === 0) {
        initParticles(canvas.width, canvas.height);
      }
    };

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    // Scroll tracking - much more dampened
    const handleScroll = () => {
      scrollYRef.current = window.scrollY * 0.002; // Heavily dampened scroll effect
    };

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Initialize
    resizeCanvas();
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{
        background: `
          radial-gradient(ellipse at 15% 30%, rgba(0,35,20,0.4) 0%, transparent 60%),
          radial-gradient(ellipse at 85% 70%, rgba(35,10,0,0.3) 0%, transparent 60%),
          radial-gradient(ellipse at 50% 10%, rgba(0,20,35,0.25) 0%, transparent 60%),
          linear-gradient(145deg, rgba(0,0,0,0.98) 0%, rgba(5,10,8,1) 50%, rgba(8,5,0,1) 100%)
        `
      }}
    />
  );
};

export default ParticleBackground;
