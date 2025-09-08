import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { LivestreamList } from "@/components/LivestreamList";
import { Badge } from "@/components/ui/badge";
import { mockLivestreams } from "@/mock/content";
// TODO: Replace mock data with Sanity GROQ queries once schema is approved

const Live = () => {
  // TODO: Replace with actual Sanity queries: getUpcomingLivestreams(), getLiveStreams()
  const livestreams = mockLivestreams;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-16 pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-pulse rounded-full bg-red-500/10 blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/3 h-96 w-96 animate-pulse rounded-full bg-accent/5 blur-3xl delay-1000"></div>
          </div>
        </div>
        
        <div className="container-cinematic relative z-10 text-center">
          <Badge variant="secondary" className="mb-6 bg-red-500/20 px-4 py-2 text-sm text-red-300">
            🔴 Live Trading Sessions
          </Badge>
          
          <h1 className="mb-8 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Learn Trading{" "}
            <span className="text-gradient-gold">Live</span>
          </h1>
          
          <p className="mx-auto mb-12 max-w-4xl text-xl leading-relaxed text-muted-foreground">
            Join our expert traders in real-time as they analyze markets, execute trades, 
            and share their decision-making process. Interactive Q&A sessions included.
          </p>
          
          {/* Live Stats */}
          <div className="mx-auto mb-16 grid max-w-3xl grid-cols-3 gap-8 text-center">
            <div>
              <div className="mb-2 text-3xl font-bold text-foreground">
                {livestreams.filter(s => s.status === 'live').length}
              </div>
              <div className="text-sm uppercase tracking-wide text-muted-foreground">Live Now</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-foreground">
                {livestreams.filter(s => s.status === 'upcoming').length}
              </div>
              <div className="text-sm uppercase tracking-wide text-muted-foreground">This Week</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-foreground">500+</div>
              <div className="text-sm uppercase tracking-wide text-muted-foreground">Hours Streamed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Livestreams List */}
      <LivestreamList 
        livestreams={livestreams} 
        title=""
        description=""
        className="border-t border-border/30"
      />
      
      <Footer />
    </div>
  );
};

export default Live;
