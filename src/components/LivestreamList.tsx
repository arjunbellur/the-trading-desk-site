import { LivestreamCard } from "./LivestreamCard";
import type { LivestreamPreview } from "@/mock/content";

interface LivestreamListProps {
  livestreams: LivestreamPreview[];
  title?: string;
  description?: string;
  className?: string;
}

export const LivestreamList = ({ 
  livestreams, 
  title = "Live Trading Sessions",
  description = "Join our expert-led live trading sessions",
  className = "" 
}: LivestreamListProps) => {
  // Group livestreams by status for better organization
  const liveStreams = livestreams.filter(stream => stream.status === 'live');
  const upcomingStreams = livestreams.filter(stream => stream.status === 'upcoming');
  const endedStreams = livestreams.filter(stream => stream.status === 'ended');

  const renderStreamGroup = (streams: LivestreamPreview[], groupTitle: string, emptyMessage: string) => {
    if (streams.length === 0) {
      return (
        <div className="py-6 text-center">
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h3 className="mb-4 text-lg font-semibold">{groupTitle}</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {streams.map((stream) => (
            <LivestreamCard key={stream.id} livestream={stream} />
          ))}
        </div>
      </div>
    );
  };

  if (livestreams.length === 0) {
    return (
      <div className={`py-12 text-center ${className}`}>
        <p className="text-muted-foreground">No livestreams scheduled at the moment.</p>
        <p className="mt-2 text-sm text-muted-foreground">Check back soon for upcoming sessions!</p>
      </div>
    );
  }

  return (
    <section className={`section-padding ${className}`}>
      <div className="container-cinematic">
        {(title || description) && (
          <div className="mb-16 text-center">
            {title && (
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
                {title.includes('Live') ? (
                  <>
                    <span className="text-gradient-gold">Live</span> Trading Sessions
                  </>
                ) : title}
              </h2>
            )}
            {description && (
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}
        
        <div className="space-y-12">
          {/* Live Streams (Priority) */}
          {liveStreams.length > 0 && renderStreamGroup(
            liveStreams, 
            "🔴 Live Now", 
            "No live sessions at the moment"
          )}
          
          {/* Upcoming Streams */}
          {upcomingStreams.length > 0 && renderStreamGroup(
            upcomingStreams, 
            "📅 Upcoming Sessions", 
            "No upcoming sessions scheduled"
          )}
          
          {/* Recent Replays */}
          {endedStreams.length > 0 && renderStreamGroup(
            endedStreams.slice(0, 6), // Limit to 6 most recent
            "📺 Recent Replays", 
            "No replays available"
          )}
        </div>
        
        {/* Summary Stats */}
        {livestreams.length > 0 && (
          <div className="mt-12 border-t border-border/30 pt-8 text-center">
            <div className="mx-auto grid max-w-md grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-foreground">{liveStreams.length}</div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Live Now</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{upcomingStreams.length}</div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Upcoming</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{endedStreams.length}</div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Replays</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
