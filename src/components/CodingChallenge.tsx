
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Flame } from "lucide-react";

interface CodingChallengeProps {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

const CodingChallenge = ({
  title,
  description,
  difficulty,
  category
}: CodingChallengeProps) => {
  const difficultyColor = {
    'Easy': 'text-green-500 bg-green-500/10',
    'Medium': 'text-yellow-500 bg-yellow-500/10',
    'Hard': 'text-red-500 bg-red-500/10'
  }[difficulty];

  return (
    <Card className="card-gradient">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <Badge className={difficultyColor}>
            {difficulty}
          </Badge>
        </div>
        <div className="flex space-x-2 items-center">
          <Badge variant="outline" className="bg-secondary/50">
            {category}
          </Badge>
          <div className="flex items-center text-amber-500">
            <Flame className="h-4 w-4 mr-1" />
            <span className="text-xs">Challenge</span>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        <div className="prose prose-invert max-w-none">
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodingChallenge;
