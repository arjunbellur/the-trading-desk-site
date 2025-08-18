import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      
      {/* 404 Content */}
      <div className="flex-1 flex items-center justify-center pt-24 pb-16">
        <div className="container-cinematic text-center">
          <div className="relative max-w-2xl mx-auto">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            <div className="relative z-10">
              <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm bg-destructive/20 text-destructive">
                🔍 Page Not Found
              </Badge>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-6 text-foreground">404</h1>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
                Oops! This page seems to have{" "}
                <span className="text-gradient-gold">disappeared</span>
              </h2>
              
              <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
                The page you're looking for doesn't exist. It might have been moved, deleted, 
                or you entered the wrong URL.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="px-8 py-4">
                  <Link to="/">
                    <Home className="w-5 h-5 mr-2" />
                    Return to Home
                  </Link>
                </Button>
                <Button variant="regular" className="px-8 py-4" onClick={() => window.history.back()}>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Go Back
                </Button>
              </div>
              
              {/* Helpful Links */}
              <div className="mt-12 pt-8 border-t border-border/30">
                <p className="text-sm text-muted-foreground mb-4">Looking for something specific?</p>
                <div className="flex flex-wrap gap-6 justify-center text-sm">
                  <Link to="/courses" className="text-primary hover:text-primary/80 transition-colors">
                    Trading Courses
                  </Link>
                  <Link to="/live" className="text-primary hover:text-primary/80 transition-colors">
                    Live Sessions
                  </Link>
                  <Link to="/blog" className="text-primary hover:text-primary/80 transition-colors">
                    Trading Blog
                  </Link>
                  <Link to="/community" className="text-primary hover:text-primary/80 transition-colors">
                    Community
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
