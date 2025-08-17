import { Button } from "@/components/ui/Button";
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
          <Badge className="tm-ui-badge tm-ui-badge--glass bg-red-500/20 text-red-400 animate-pulse">
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
            <Play className="w-4 h-4 mr-2" />
            JOIN LIVE
          </Button>
        );
      case 'upcoming':
        return (
          <Button variant="regular" fullWidth>
            <AlertCircle className="w-4 h-4 mr-2" />
            SET REMINDER
          </Button>
        );
      case 'ended':
        return (
          <Button variant="regular" fullWidth>
            <Play className="w-4 h-4 mr-2" />
            WATCH REPLAY
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={`tm-ui-card tm-ui-card--glass hover:scale-105 transition-all duration-300 ${className}`}>
      <CardHeader className="tm-ui-card__header pb-4">
        <div className="tm-ui-card__badges flex items-start justify-between mb-4">
          <div className="space-y-2">
            {getStatusBadge()}
            {getAccessBadge()}
          </div>
          {livestream.viewerCount && (
            <div className="tm-ui-card__viewers flex items-center gap-1 tm-ui-text--small tm-ui-text--muted">
              <Users className="w-4 h-4" />
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
        <div className="tm-ui-card__schedule space-y-3 mb-6">
          <div className="flex items-center gap-3 tm-ui-text--small">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{formatDate(livestream.scheduledAt)}</span>
          </div>
          <div className="flex items-center gap-3 tm-ui-text--small">
            <Clock className="w-4 h-4 text-primary" />
            <span>{formatTime(livestream.scheduledAt)} • {livestream.duration} min</span>
          </div>
        </div>
        
        {/* Instructor */}
        <div className="tm-ui-card__instructor flex items-center gap-3 mb-6">
          <div className="tm-ui-badge tm-ui-badge--secondary w-8 h-8 rounded-full flex items-center justify-center">
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
          <p className="tm-ui-card__info tm-ui-text--small text-center tm-ui-text--muted mt-3">
            {livestream.accessLevel === 'free' 
              ? 'Free for all students' 
              : `${livestream.accessLevel} members only`}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
