import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Play, AlertCircle } from "lucide-react";
import type { LivestreamPreview } from "@/mock/content";

interface LivestreamCardProps {
  livestream: LivestreamPreview;
  className?: string;
}

export const LivestreamCard = ({ livestream, className = "" }: LivestreamCardProps) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getStatusBadge = () => {
    switch (livestream.status) {
      case 'live':
        return (
          <Badge className="tm-ui-badge tm-ui-badge--glass animate-pulse bg-red-500/20 text-red-400">
            🔴 LIVE
          </Badge>
        );
      case 'upcoming':
        return (
          <Badge variant="secondary" className="tm-ui-badge tm-ui-badge--secondary bg-blue-500/20 text-blue-400">
            📅 SCHEDULED
          </Badge>
        );
      case 'ended':
        return (
          <Badge variant="secondary" className="tm-ui-badge tm-ui-badge--secondary bg-gray-500/20 text-gray-400">
            📺 REPLAY
          </Badge>
        );
      default:
        return null;
    }
  };

  const getAccessBadge = () => {
    const accessColors = {
      free: "bg-green-500/20 text-green-400",
      paid: "bg-yellow-500/20 text-yellow-400",
      premium: "bg-purple-500/20 text-purple-400"
    };

    return (
      <Badge className={`tm-ui-badge tm-ui-badge--glass ${accessColors[livestream.accessLevel]} border-0 capitalize`}>
        {livestream.accessLevel}
      </Badge>
    );
  };

  const getActionButton = () => {
    switch (livestream.status) {
      case 'live':
        return (
          <Button variant="regular" fullWidth>
            <Play className="mr-2 h-4 w-4" />
            JOIN LIVE
          </Button>
        );
      case 'upcoming':
        return (
          <Button variant="regular" fullWidth>
            <AlertCircle className="mr-2 h-4 w-4" />
            SET REMINDER
          </Button>
        );
      case 'ended':
        return (
          <Button variant="regular" fullWidth>
            <Play className="mr-2 h-4 w-4" />
            WATCH REPLAY
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`tm-ui-card tm-ui-card--glass transition-all duration-300 hover:scale-105 ${className}`}>
      <CardHeader className="tm-ui-card__header pb-4">
        <div className="tm-ui-card__badges mb-4 flex items-start justify-between">
          <div className="space-y-2">
            {getStatusBadge()}
            {getAccessBadge()}
          </div>
          {livestream.viewerCount && (
            <div className="tm-ui-card__viewers tm-ui-text--small tm-ui-text--muted flex items-center gap-1">
              <Users className="h-4 w-4" />
              {livestream.viewerCount}
            </div>
          )}
        </div>
        
        <CardTitle className="tm-ui-card__title tm-ui-text--large mb-2">{livestream.title}</CardTitle>
        <CardDescription className="tm-ui-card__description tm-ui-text--muted leading-relaxed">
          {livestream.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="tm-ui-card__content pt-0">
        {/* Schedule Info */}
        <div className="tm-ui-card__schedule mb-6 space-y-3">
          <div className="tm-ui-text--small flex items-center gap-3">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{formatDate(livestream.scheduledAt)}</span>
          </div>
          <div className="tm-ui-text--small flex items-center gap-3">
            <Clock className="h-4 w-4 text-primary" />
            <span>{formatTime(livestream.scheduledAt)} • {livestream.duration} min</span>
          </div>
        </div>
        
        {/* Instructor */}
        <div className="tm-ui-card__instructor mb-6 flex items-center gap-3">
          <div className="tm-ui-badge tm-ui-badge--secondary flex h-8 w-8 items-center justify-center rounded-full">
            <span className="tm-ui-text--small font-medium">
              {livestream.instructor.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="tm-ui-text--small font-medium">{livestream.instructor.name}</p>
            <p className="tm-ui-text--small tm-ui-text--muted">Instructor</p>
          </div>
        </div>
        
        {/* Action Button */}
        <div className="tm-ui-card__action">
          {getActionButton()}
        </div>
        
        {/* Additional Info */}
        {livestream.status === 'upcoming' && (
          <p className="tm-ui-card__info tm-ui-text--small tm-ui-text--muted mt-3 text-center">
            {livestream.accessLevel === 'free' 
              ? 'Free for all students' 
              : `${livestream.accessLevel} members only`}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
