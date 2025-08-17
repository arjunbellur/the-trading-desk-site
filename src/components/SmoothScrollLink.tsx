import { ReactNode } from 'react';

interface SmoothScrollLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const SmoothScrollLink = ({ href, children, className, onClick }: SmoothScrollLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Check if href is an anchor link
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement && (window as any).lenis) {
        (window as any).lenis.scrollTo(targetElement, {
          offset: -100, // Account for fixed navigation
          duration: 1.2,
        });
      }
    }
    
    if (onClick) {
      onClick();
    }
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

export default SmoothScrollLink;
