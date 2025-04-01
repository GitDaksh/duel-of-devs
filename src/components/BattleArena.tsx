import React, { useState, useEffect } from 'react';
import PlayerCard from './PlayerCard';
import CodingChallenge from './CodingChallenge';
import CodeEditor from './CodeEditor';
import CountdownTimer from './CountdownTimer';
import ResultsModal from './ResultsModal';
import RoomShare from './RoomShare';
import { Button } from "@/components/ui/button";
import { Play, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlayerState {
  name: string;
  score: number;
  timeRemaining: number;
  code: string;
}

const BattleArena = () => {
  const [gameState, setGameState] = useState<'waiting' | 'countdown' | 'player1' | 'player2' | 'results'>('waiting');
  const [player1, setPlayer1] = useState<PlayerState>({
    name: "Player 1",
    score: 0,
    timeRemaining: 60,
    code: "// Start coding here...\n\nfunction solution() {\n  // Your code here\n  \n}\n",
  });
  const [player2, setPlayer2] = useState<PlayerState>({
    name: "Player 2",
    score: 0,
    timeRemaining: 60,
    code: "// Start coding here...\n\nfunction solution() {\n  // Your code here\n  \n}\n",
  });
  const [showResults, setShowResults] = useState(false);
  const [winner, setWinner] = useState<string>("");
  const [roomId, setRoomId] = useState("");
  const [playerRole, setPlayerRole] = useState<1 | 2>(1);
  const { toast } = useToast();
  
  const challenge = {
    title: "Fibonacci Sequence",
    description: "Write a function that returns the nth number in the Fibonacci sequence. Remember, the Fibonacci sequence is the series of numbers where each number is the sum of the two preceding ones, starting from 0 and 1.",
    difficulty: "Medium" as const,
    category: "Algorithms",
  };
  
  useEffect(() => {
    if (!roomId) {
      const generatedId = Math.random().toString(36).substring(2, 10);
      setRoomId(generatedId);
      
      const urlParams = new URLSearchParams(window.location.search);
      const roomParam = urlParams.get('room');
      if (roomParam) {
        setPlayerRole(2);
        setRoomId(roomParam);
        toast({
          title: "Joined Battle Room",
          description: "You've joined as Player 2 in this coding battle!",
        });
      } else {
        toast({
          title: "Room Created",
          description: "Share the room link to invite Player 2 to join!",
        });
      }
    }
  }, []);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (gameState === 'player1' || gameState === 'player2') {
      const currentPlayer = gameState === 'player1' ? player1 : player2;
      const setPlayer = gameState === 'player1' ? setPlayer1 : setPlayer2;
      
      if (currentPlayer.timeRemaining <= 0) {
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
  
  const handleCodeChange = (playerNumber: 1 | 2, code: string) => {
    if (playerNumber === 1) {
      setPlayer1(prev => ({ ...prev, code }));
    } else {
      setPlayer2(prev => ({ ...prev, code }));
    }
  };
  
  const evaluateFibonacciSolution = (code: string): boolean => {
    try {
      const sandboxFunction = new Function(`
        ${code}
        
        const testCases = [
          { input: 0, expected: 0 },
          { input: 1, expected: 1 },
          { input: 2, expected: 1 },
          { input: 5, expected: 5 },
          { input: 10, expected: 55 }
        ];
        
        if (typeof solution !== 'function') {
          return false;
        }
        
        for (const test of testCases) {
          if (solution(test.input) !== test.expected) {
            return false;
          }
        }
        
        return true;
      `);
      
      return sandboxFunction();
    } catch (error) {
      console.error('Error evaluating solution:', error);
      return false;
    }
  };
  
  const submitSolution = () => {
    try {
      if (gameState === 'player1') {
        if (!player1.code.includes("function solution")) {
          toast({
            title: "Invalid solution",
            description: "Your code must include a 'function solution()'",
            variant: "destructive",
          });
          return;
        }
        
        const isCorrect = evaluateFibonacciSolution(player1.code);
        
        if (isCorrect) {
          setPlayer1({
            ...player1,
            score: player1.score + 10,
          });
          toast({
            title: "Correct solution!",
            description: "Your solution passed all test cases. Player 2's turn now.",
          });
        } else {
          toast({
            title: "Incorrect solution",
            description: "Your solution failed the test cases. Try again!",
            variant: "destructive",
          });
          return;
        }
        
        setGameState('player2');
      } else if (gameState === 'player2') {
        if (!player2.code.includes("function solution")) {
          toast({
            title: "Invalid solution",
            description: "Your code must include a 'function solution()'",
            variant: "destructive",
          });
          return;
        }
        
        const isCorrect = evaluateFibonacciSolution(player2.code);
        
        if (isCorrect) {
          setPlayer2({
            ...player2,
            score: player2.score + 10,
          });
          toast({
            title: "Correct solution!",
            description: "Your solution passed all test cases. Calculating results...",
          });
        } else {
          toast({
            title: "Incorrect solution",
            description: "Your solution failed the test cases. Try again!",
            variant: "destructive",
          });
          return;
        }
        
        endGame();
      }
    } catch (error) {
      toast({
        title: "Error evaluating code",
        description: "There was a problem with your solution.",
        variant: "destructive",
      });
    }
  };
  
  const switchTurns = () => {
    if (gameState === 'player1') {
      setGameState('player2');
      toast({
        title: "Time's up!",
        description: "Player 1's turn is over. Player 2's turn now.",
      });
    } else if (gameState === 'player2') {
      endGame();
      toast({
        title: "Time's up!",
        description: "Player 2's turn is over. Calculating results...",
      });
    }
  };
  
  const endGame = () => {
    setGameState('results');
    
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
      code: "// Start coding here...\n\nfunction solution() {\n  // Your code here\n  \n}\n",
    });
    setPlayer2({
      name: "Player 2",
      score: 0,
      timeRemaining: 60,
      code: "// Start coding here...\n\nfunction solution() {\n  // Your code here\n  \n}\n",
    });
    setGameState('waiting');
    setShowResults(false);
  };
  
  const showMyEditor = () => {
    if (gameState === 'waiting') return true;
    
    if (playerRole === 1 && gameState === 'player1') return true;
    if (playerRole === 2 && gameState === 'player2') return true;
    
    return false;
  };
  
  const showMySubmitButton = () => {
    if (playerRole === 1 && gameState === 'player1') return true;
    if (playerRole === 2 && gameState === 'player2') return true;
    return false;
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
      
      {roomId && <RoomShare roomId={roomId} />}
      
      <div className="mb-8">
        <CodingChallenge {...challenge} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-4">
          <PlayerCard 
            playerNumber={1}
            name={player1.name}
            score={player1.score}
            isCurrentTurn={gameState === 'player1'}
            timeRemaining={player1.timeRemaining}
            maxTime={60}
          />
          {(playerRole === 1 && showMyEditor()) && (
            <>
              <CodeEditor 
                playerNumber={1} 
                initialCode={player1.code}
                readOnly={gameState !== 'player1' && gameState !== 'waiting'}
                onCodeChange={(code) => handleCodeChange(1, code)}
              />
              {showMySubmitButton() && (
                <div className="flex justify-center">
                  <Button onClick={submitSolution} className="game-button">
                    <Check className="mr-2 h-4 w-4" /> Submit Solution
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="flex flex-col space-y-4">
          <PlayerCard 
            playerNumber={2}
            name={player2.name}
            score={player2.score}
            isCurrentTurn={gameState === 'player2'}
            timeRemaining={player2.timeRemaining}
            maxTime={60}
          />
          {(playerRole === 2 && showMyEditor()) && (
            <>
              <CodeEditor 
                playerNumber={2} 
                initialCode={player2.code}
                readOnly={gameState !== 'player2' && gameState !== 'waiting'}
                onCodeChange={(code) => handleCodeChange(2, code)}
              />
              {showMySubmitButton() && (
                <div className="flex justify-center">
                  <Button onClick={submitSolution} className="game-button">
                    <Check className="mr-2 h-4 w-4" /> Submit Solution
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {gameState === 'waiting' && (
        <div className="flex items-center justify-center mt-8">
          <Button onClick={startGame} className="game-button">
            <Play className="mr-2 h-4 w-4" /> Start Battle
          </Button>
        </div>
      )}
      
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
