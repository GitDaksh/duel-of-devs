
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CodeEditorProps {
  playerNumber: 1 | 2;
  initialCode?: string;
  readOnly?: boolean;
}

const CodeEditor = ({
  playerNumber,
  initialCode = "// Start coding here...\n\nfunction solution() {\n  // Your code here\n  \n}\n",
  readOnly = false
}: CodeEditorProps) => {
  const playerColor = playerNumber === 1 ? 'player1' : 'player2';
  
  return (
    <Card className={`border-${playerColor} card-gradient h-full flex flex-col`}>
      <CardHeader className="pb-2">
        <CardTitle className={`text-${playerColor} text-sm`}>
          Player {playerNumber} Code
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <div className="code-window h-full">
          <pre className="h-full">
            <code className="language-javascript">{initialCode}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeEditor;
