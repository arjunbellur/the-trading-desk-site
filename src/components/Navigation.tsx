import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SmoothScrollLink from "./SmoothScrollLink";
import { Menu, X } from "lucide-react";

// Discord icon component
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "How it Works", href: "/#value-proposition" },
    { name: "Plans", href: "/courses" },
    { name: "Affiliate", href: "/community" },
    { name: "Support", href: "/blog" },
  ];

  return (
    <nav className="tm-layout-nav tm-layout-nav--transparent">
      <div className="tm-layout-nav__container">
        {/* Logo */}
        <Link 
          to="/" 
          className="tm-layout-nav__brand"
          onClick={() => console.log('Logo clicked - navigating to home')}
        >
          <img 
            src="/logo.svg" 
            alt="The Trading Desk Logo" 
            className="h-8 w-auto text-white transition-colors"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <span className="tm-ui-text--large font-semibold text-white/90 group-hover:text-white transition-colors">
            The Trading Desk
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="tm-layout-nav__links hidden md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="tm-ui-button tm-ui-button--nav"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="tm-layout-nav__links hidden md:flex">
          <a href="#discord" className="tm-ui-button tm-ui-button--nav flex items-center gap-2">
            <DiscordIcon className="w-4 h-4" />
            Discord
          </a>
          <Link to="/login" className="tm-ui-button tm-ui-button--nav hidden lg:inline-flex">Login</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="tm-ui-button tm-ui-button--nav md:hidden"
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="tm-layout-nav__mobile md:hidden py-4 border-t border-white/10">
          <div className="tm-layout-container flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="tm-layout-nav__link tm-ui-text--large font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
              <Link to="/login" onClick={() => setIsOpen(false)} className="tm-layout-nav__link tm-ui-text--large text-center py-2">Login</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
