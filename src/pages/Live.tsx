import Navigation from "@/components/Navigation";
import { LivestreamList } from "@/components/LivestreamList";
import { Badge } from "@/components/ui/badge";
import { mockLivestreams } from "@/mock/content";
// TODO: Replace mock data with Sanity GROQ queries once schema is approved

const Live = () => {
  // TODO: Replace with actual Sanity queries: getUpcomingLivestreams(), getLiveStreams()
  const livestreams = mockLivestreams;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>
        
        <div className="container-cinematic text-center relative z-10">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm bg-red-500/20 text-red-300">
            🔴 Live Trading Sessions
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">
            Learn Trading{" "}
            <span className="text-gradient-gold">Live</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Join our expert traders in real-time as they analyze markets, execute trades, 
            and share their decision-making process. Interactive Q&A sessions included.
          </p>
          
          {/* Live Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center mb-16">
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {livestreams.filter(s => s.status === 'live').length}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Live Now</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {livestreams.filter(s => s.status === 'upcoming').length}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">This Week</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">500+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Hours Streamed</div>
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
    </div>
  );
};

export default Live;
