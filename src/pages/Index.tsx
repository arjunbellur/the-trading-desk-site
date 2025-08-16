import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import CoursesSection from "@/components/CoursesSection";
import CommunitySection from "@/components/CommunitySection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <CoursesSection />
      <CommunitySection />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Index;
