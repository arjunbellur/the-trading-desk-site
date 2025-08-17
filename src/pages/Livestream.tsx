import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Calendar, Clock, Users, Eye, AlertCircle } from "lucide-react";

const Livestream = () => {
  const upcomingSessions = [
    {
      id: 1,
      title: "Market Analysis & Options Trading Strategy",
      instructor: "Michael Torres",
      date: "Tomorrow",
      time: "9:00 AM EST",
      duration: "2 hours",
      description: "Deep dive into current market conditions and advanced options strategies for the upcoming week.",
      viewers: "234",
      isLive: false,
      topics: ["Options Strategy", "Market Analysis", "Risk Management"]
    },
    {
      id: 2,
      title: "Crypto Market Breakdown",
      instructor: "Alex Thompson", 
      date: "Dec 15",
      time: "2:00 PM EST",
      duration: "1.5 hours",
      description: "Analysis of major cryptocurrency movements and DeFi opportunities.",
      viewers: "189",
      isLive: false,
      topics: ["Cryptocurrency", "DeFi", "Technical Analysis"]
    },
    {
      id: 3,
      title: "Day Trading Power Hour",
      instructor: "David Kim",
      date: "Dec 16", 
      time: "11:00 AM EST",
      duration: "1 hour",
      description: "Live day trading session with real-time market analysis and trade execution.",
      viewers: "312",
      isLive: false,
      topics: ["Day Trading", "Live Trading", "Scalping"]
    }
  ];

  const recentReplays = [
    {
      id: 1,
      title: "Forex Week Ahead: Central Bank Decisions",
      instructor: "Emma Rodriguez",
      date: "Dec 10",
      duration: "1 hour 45 min",
      views: "1,247",
      rating: 4.8
    },
    {
      id: 2,
      title: "Technical Analysis Workshop",
      instructor: "Sarah Chen", 
      date: "Dec 8",
      duration: "2 hours 15 min",
      views: "2,156",
      rating: 4.9
    },
    {
      id: 3,
      title: "Options Income Strategies",
      instructor: "Michael Torres",
      date: "Dec 5",
      duration: "1 hour 30 min", 
      views: "1,834",
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-24 pb-16 cinematic-hero-bg">
        <div className="container-cinematic">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm bg-secondary/50 backdrop-blur-sm">
              🔴 Live Trading Education
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Join Our <span className="text-gradient-gold">Live Trading Sessions</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Watch expert traders in action. Learn real-time decision making, market analysis, 
              and trading strategies during our interactive live sessions.
            </p>

            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>500+ Live Viewers Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>Interactive Q&A</span>
              </div>
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                <span>Full Replay Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Now Section */}
      <section className="section-padding">
        <div className="container-cinematic">
          <Card className="card-cinematic p-8 mb-12 border border-accent/20">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <Badge className="bg-accent/20 text-accent animate-pulse">
                    🔴 LIVE NOW
                  </Badge>
                  <span className="text-sm text-muted-foreground">234 viewers</span>
                </div>
                
                <h2 className="text-3xl font-bold mb-4">
                  Morning Market Briefing
                </h2>
                <p className="text-muted-foreground mb-4">
                  Pre-market analysis covering major indices, earnings reports, and key economic data releases.
                </p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span>📍 John Martinez</span>
                  <span>⏱️ Started 15 minutes ago</span>
                  <span>🎯 Market Analysis</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <Button className="text-lg px-8">
                  <Play className="w-5 h-5 mr-2" />
                  Join Live Stream
                </Button>
                <Button variant="ghost">
                  Set Reminder
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Upcoming Sessions */}
      <section className="section-padding bg-secondary/20">
        <div className="container-cinematic">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Upcoming <span className="text-gradient-gold">Live Sessions</span>
              </h2>
              <p className="text-muted-foreground">
                Mark your calendar and join our expert-led trading sessions
              </p>
            </div>
            <Button variant="ghost">
              <Calendar className="w-4 h-4 mr-2" />
              View Full Schedule
            </Button>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {upcomingSessions.map((session) => (
              <Card key={session.id} className="card-cinematic hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{session.title}</CardTitle>
                      <CardDescription>
                        {session.description}
                      </CardDescription>
                    </div>
                    {session.isLive && (
                      <Badge className="bg-accent/20 text-accent">
                        🔴 LIVE
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {session.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {session.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {session.viewers} registered
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {session.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    Instructor: <span className="font-medium">{session.instructor}</span>
                  </p>
                </CardHeader>
                
                <CardContent>
                  <div className="flex gap-3">
                    <Button className="flex-1">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Set Reminder
                    </Button>
                    <Button variant="ghost" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Replays */}
      <section className="section-padding">
        <div className="container-cinematic">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recent <span className="text-gradient-gold">Session Replays</span>
            </h2>
            <p className="text-muted-foreground">
              Missed a session? Catch up with our comprehensive replay library
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentReplays.map((replay) => (
              <Card key={replay.id} className="card-cinematic hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center">
                    <Play className="w-12 h-12 text-primary" />
                  </div>
                  
                  <CardTitle className="text-lg">{replay.title}</CardTitle>
                  <CardDescription>
                    {replay.instructor} • {replay.date}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>Duration: {replay.duration}</span>
                    <span>{replay.views} views</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">Rating:</span>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={`text-xs ${i < Math.floor(replay.rating) ? 'text-primary' : 'text-muted-foreground'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">({replay.rating})</span>
                    </div>
                  </div>
                  
                  <Button fullWidth>
                    <Play className="w-4 h-4 mr-2" />
                    Watch Replay
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="ghost">
              View All Replays
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Livestream;
