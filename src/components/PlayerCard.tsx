
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Trophy, Clock, Code, User } from "lucide-react";

interface PlayerCardProps {
  playerNumber: 1 | 2;
  name: string;
  score: number;
  isCurrentTurn: boolean;
  timeRemaining?: number;
  maxTime?: number;
}

const PlayerCard = ({
  playerNumber,
  name,
  score,
  isCurrentTurn,
  timeRemaining = 0,
  maxTime = 60
}: PlayerCardProps) => {
  const playerColor = playerNumber === 1 ? 'player1' : 'player2';
  
  return (
    <Card className={`border-${playerColor} ${isCurrentTurn ? 'ring-2 ring-' + playerColor : ''} card-gradient`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <div className={`player-avatar bg-${playerColor} h-10 w-10`}>
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <Badge variant="outline" className={`bg-${playerColor}/10 text-${playerColor}`}>
              Player {playerNumber}
            </Badge>
          </div>
        </div>
        <div className="flex items-center">
          <Trophy className="w-5 h-5 mr-1 text-yellow-500" />
          <span className="font-bold text-xl">{score}</span>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        {isCurrentTurn && (
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">Time Remaining</span>
              </div>
              <span className="font-mono font-bold">{timeRemaining}s</span>
            </div>
            <Progress value={(timeRemaining / maxTime) * 100} className="h-2" />
          </div>
        )}
        <div className="flex items-center mt-3">
          <Code className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">Ready to code!</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
