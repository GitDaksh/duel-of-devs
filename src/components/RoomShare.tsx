
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RoomShareProps {
  roomId: string;
}

const RoomShare = ({ roomId }: RoomShareProps) => {
  const [showCopied, setShowCopied] = useState(false);
  const { toast } = useToast();
  const roomUrl = `${window.location.origin}?room=${roomId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomUrl).then(() => {
      toast({
        title: "Link copied",
        description: "Share this link with your opponent to join the battle!",
      });
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };

  const shareRoom = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join my Duel of Devs battle!',
        text: 'Click to join my coding battle challenge!',
        url: roomUrl,
      }).catch(console.error);
    } else {
      copyToClipboard();
    }
  };

  return (
    <Card className="border-primary mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Battle Room</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-2">
          <Input 
            value={roomUrl} 
            readOnly 
            className="flex-grow font-mono text-sm"
            onClick={() => copyToClipboard()}
          />
          <Button onClick={copyToClipboard} variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-1" />
            {showCopied ? "Copied!" : "Copy"}
          </Button>
          <Button onClick={shareRoom} variant="default" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomShare;
