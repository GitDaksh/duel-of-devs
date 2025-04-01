
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface CodeEditorProps {
  playerNumber: 1 | 2;
  initialCode?: string;
  readOnly?: boolean;
  onCodeChange?: (code: string) => void;
}

const CodeEditor = ({
  playerNumber,
  initialCode = "// Start coding here...\n\nfunction solution(n) {\n  // Your code here\n  \n}\n",
  readOnly = false,
  onCodeChange
}: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const playerColor = playerNumber === 1 ? 'player1' : 'player2';
  
  // Update code when initialCode prop changes
  useEffect(() => {
    if (initialCode !== code) {
      setCode(initialCode);
    }
  }, [initialCode]);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };
  
  return (
    <Card className={`border-${playerColor} card-gradient h-full flex flex-col`}>
      <CardHeader className="pb-2">
        <CardTitle className={`text-${playerColor} text-sm`}>
          Player {playerNumber} Code
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <div className="code-window h-full">
          <Textarea
            className="h-full w-full resize-none rounded-none border-0 p-4 font-mono text-sm focus-visible:ring-0 bg-transparent"
            value={code}
            onChange={handleChange}
            readOnly={readOnly}
            placeholder="Write your solution here..."
            spellCheck={false}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeEditor;
