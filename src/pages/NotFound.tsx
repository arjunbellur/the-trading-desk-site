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
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navigation />
      
      {/* 404 Content */}
      <div className="flex flex-1 items-center justify-center pb-16 pt-24">
        <div className="container-cinematic text-center">
          <div className="relative mx-auto max-w-2xl">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute left-1/4 top-1/4 h-32 w-32 animate-pulse rounded-full bg-primary/10 blur-3xl"></div>
              <div className="absolute bottom-1/3 right-1/3 h-48 w-48 animate-pulse rounded-full bg-accent/5 blur-3xl delay-1000"></div>
            </div>
            
            <div className="relative z-10">
              <Badge variant="secondary" className="mb-6 bg-destructive/20 px-4 py-2 text-sm text-destructive">
                🔍 Page Not Found
              </Badge>
              
              <h1 className="mb-6 text-6xl font-bold text-foreground md:text-8xl">404</h1>
              
              <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
                Oops! This page seems to have{" "}
                <span className="text-gradient-gold">disappeared</span>
              </h2>
              
              <p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed text-muted-foreground">
                The page you're looking for doesn't exist. It might have been moved, deleted, 
                or you entered the wrong URL.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild className="px-8 py-4">
                  <Link to="/">
                    <Home className="mr-2 h-5 w-5" />
                    Return to Home
                  </Link>
                </Button>
                <Button variant="regular" className="px-8 py-4" onClick={() => window.history.back()}>
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Go Back
                </Button>
              </div>
              
              {/* Helpful Links */}
              <div className="mt-12 border-t border-border/30 pt-8">
                <p className="mb-4 text-sm text-muted-foreground">Looking for something specific?</p>
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                  <Link to="/courses" className="text-primary transition-colors hover:text-primary/80">
                    Trading Courses
                  </Link>
                  <Link to="/live" className="text-primary transition-colors hover:text-primary/80">
                    Live Sessions
                  </Link>
                  <Link to="/blog" className="text-primary transition-colors hover:text-primary/80">
                    Trading Blog
                  </Link>
                  <Link to="/community" className="text-primary transition-colors hover:text-primary/80">
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
