import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface StartUpPageProps {
  showGame: boolean;
  setShowGame: (value: boolean) => void;
}

const StartUpPage: React.FC<StartUpPageProps> = ({ showGame, setShowGame }) => {
  
  const [difficulty, setDifficulty] = useState('Easy');
  const [participants, setParticipants] = useState(1); // Start with 1 participant

  const handleConfirm = () => {
    setShowGame(false);
  };

  return (
    <div className="relative w-full h-full bg-transparent text-white font-sans">
      <Dialog open={showGame} onOpenChange={setShowGame}>
        <DialogContent className="bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 border-2 border-cyan-400 shadow-lg shadow-cyan-400/50 max-w-md w-11/12">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center text-fuchsia-500">Game Setup</DialogTitle>
          </DialogHeader>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4 text-white hover:text-fuchsia-500"
            onClick={() => setShowGame(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty" className="text-lg font-semibold text-cyan-400">Select Difficulty:</Label>
              <div className="grid grid-cols-2 gap-2">
                {['Easy', 'Medium', 'Hard', 'God'].map((level) => (
                  <Button
                    key={level}
                    variant={difficulty === level ? "default" : "outline"}
                    onClick={() => setDifficulty(level)}
                    className={`${
                      difficulty === level 
                        ? 'bg-cyan-400 text-black' 
                        : 'bg-transparent text-cyan-400 hover:bg-cyan-400/20'
                    } border-2 border-cyan-400 transition-all duration-300`}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="participants" className="text-lg font-semibold text-green-400">Number of Participants:</Label>
              <Input
                id="participants"
                type="number"
                min="1"  // Changed min to 1
                value={participants}
                onChange={(e) => setParticipants(parseInt(e.target.value) || 1)} // Ensure at least 1
                className="bg-black/50 border-2 border-green-400 text-white placeholder-green-400/50"
              />
            </div>
            {participants > 0 && (
              <div className="space-y-2">
                <Label htmlFor="gameCode" className="text-lg font-semibold text-yellow-400">Game Code:</Label>
                <div className="bg-black/50 border-2 border-yellow-400 p-4 rounded-md font-mono text-yellow-400 text-center text-2xl animate-pulse">
                  XXXX-XXXX-XXXX
                </div>
              </div>
            )}
            <Button 
              onClick={handleConfirm}
              disabled={participants < 1}
              className="w-full bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-3 text-lg transition-all duration-300 animate-bounce"
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StartUpPage;
