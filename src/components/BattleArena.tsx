
import React, { useState, useEffect } from 'react';
import PlayerCard from './PlayerCard';
import CodingChallenge from './CodingChallenge';
import CodeEditor from './CodeEditor';
import CountdownTimer from './CountdownTimer';
import ResultsModal from './ResultsModal';
import { Button } from "@/components/ui/button";
import { Play, Check } from "lucide-react";

interface PlayerState {
  name: string;
  score: number;
  timeRemaining: number;
}

const BattleArena = () => {
  const [gameState, setGameState] = useState<'waiting' | 'countdown' | 'player1' | 'player2' | 'results'>('waiting');
  const [player1, setPlayer1] = useState<PlayerState>({
    name: "Player 1",
    score: 0,
    timeRemaining: 60,
  });
  const [player2, setPlayer2] = useState<PlayerState>({
    name: "Player 2",
    score: 0,
    timeRemaining: 60,
  });
  const [showResults, setShowResults] = useState(false);
  const [winner, setWinner] = useState<string>("");
  
  const challenge = {
    title: "Fibonacci Sequence",
    description: "Write a function that returns the nth number in the Fibonacci sequence. Remember, the Fibonacci sequence is the series of numbers where each number is the sum of the two preceding ones, starting from 0 and 1.",
    difficulty: "Medium" as const,
    category: "Algorithms",
  };
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (gameState === 'player1' || gameState === 'player2') {
      const currentPlayer = gameState === 'player1' ? player1 : player2;
      const setPlayer = gameState === 'player1' ? setPlayer1 : setPlayer2;
      
      if (currentPlayer.timeRemaining <= 0) {
        // Time's up for current player
        switchTurns();
      } else {
        timer = setTimeout(() => {
          setPlayer({
            ...currentPlayer,
            timeRemaining: currentPlayer.timeRemaining - 1,
          });
        }, 1000);
      }
    }
    
    return () => clearTimeout(timer);
  }, [gameState, player1.timeRemaining, player2.timeRemaining]);
  
  const startGame = () => {
    setGameState('countdown');
  };
  
  const handleCountdownComplete = () => {
    setGameState('player1');
  };
  
  const submitSolution = () => {
    // In a real app, we'd evaluate the solution here
    if (gameState === 'player1') {
      // Add points to player 1
      setPlayer1({
        ...player1,
        score: player1.score + 10,
      });
      setGameState('player2');
    } else if (gameState === 'player2') {
      // Add points to player 2
      setPlayer2({
        ...player2,
        score: player2.score + 10,
      });
      endGame();
    }
  };
  
  const switchTurns = () => {
    if (gameState === 'player1') {
      setGameState('player2');
    } else if (gameState === 'player2') {
      endGame();
    }
  };
  
  const endGame = () => {
    setGameState('results');
    
    // Determine winner
    if (player1.score > player2.score) {
      setWinner(player1.name);
    } else if (player2.score > player1.score) {
      setWinner(player2.name);
    } else {
      setWinner("tie");
    }
    
    setShowResults(true);
  };
  
  const resetGame = () => {
    setPlayer1({
      name: "Player 1",
      score: 0,
      timeRemaining: 60,
    });
    setPlayer2({
      name: "Player 2",
      score: 0,
      timeRemaining: 60,
    });
    setGameState('waiting');
    setShowResults(false);
  };
  
  return (
    <div className="container py-8">
      {gameState === 'countdown' && (
        <CountdownTimer startFrom={3} onComplete={handleCountdownComplete} />
      )}
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Duel of Devs</h1>
        <p className="text-muted-foreground">
          Prove your coding skills in this head-to-head battle!
        </p>
      </div>
      
      <div className="mb-8">
        <CodingChallenge {...challenge} />
      </div>
      
      <div className="battle-container">
        <div className="flex flex-col space-y-4">
          <PlayerCard 
            playerNumber={1}
            name={player1.name}
            score={player1.score}
            isCurrentTurn={gameState === 'player1'}
            timeRemaining={player1.timeRemaining}
            maxTime={60}
          />
          <CodeEditor playerNumber={1} />
          {gameState === 'player1' && (
            <div className="flex justify-center">
              <Button onClick={submitSolution} className="game-button">
                <Check className="mr-2 h-4 w-4" /> Submit Solution
              </Button>
            </div>
          )}
        </div>
        
        {gameState !== 'waiting' && (
          <div className="flex flex-col space-y-4 relative">
            <PlayerCard 
              playerNumber={2}
              name={player2.name}
              score={player2.score}
              isCurrentTurn={gameState === 'player2'}
              timeRemaining={player2.timeRemaining}
              maxTime={60}
            />
            <CodeEditor playerNumber={2} />
            {gameState === 'player2' && (
              <div className="flex justify-center">
                <Button onClick={submitSolution} className="game-button">
                  <Check className="mr-2 h-4 w-4" /> Submit Solution
                </Button>
              </div>
            )}
          </div>
        )}
        
        {gameState === 'waiting' && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Ready for a coding battle?</h3>
              <Button onClick={startGame} className="game-button">
                <Play className="mr-2 h-4 w-4" /> Start Battle
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <ResultsModal 
        isOpen={showResults}
        onClose={resetGame}
        winner={winner}
        player1Score={player1.score}
        player2Score={player2.score}
      />
    </div>
  );
};

export default BattleArena;
