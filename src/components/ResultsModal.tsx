
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowRight } from "lucide-react";

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  winner: string;
  player1Score: number;
  player2Score: number;
}

const ResultsModal = ({
  isOpen,
  onClose,
  winner,
  player1Score,
  player2Score
}: ResultsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="card-gradient border-primary">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Battle Results</DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <Trophy className="h-10 w-10 text-yellow-500" />
            </div>
          </div>
          
          <h3 className="text-center text-xl font-bold mb-6">
            {winner === "tie" ? "It's a tie!" : `${winner} wins!`}
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="text-lg font-semibold text-player1">Player 1</div>
              <div className="text-3xl font-bold">{player1Score}</div>
              <div className="text-xs text-muted-foreground">points</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-player2">Player 2</div>
              <div className="text-3xl font-bold">{player2Score}</div>
              <div className="text-xs text-muted-foreground">points</div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button onClick={onClose} className="game-button">
              New Battle <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultsModal;
