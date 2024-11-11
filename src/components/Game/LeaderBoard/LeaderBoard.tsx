import { RootState } from "@/Redux/store/store";
import { GameMode, MultiplayerUser } from "@/types/types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface ScoreItem {
  id: string;
  name: string;
  score: number;
  rank?: number;
}

const LeaderBoard: React.FC = () => {

  const { score: SoloScore } = useSelector((state: RootState) => state.soloPlayer); 

  const { players } = useSelector((state: RootState) => state.multiPlayerData);

  const [rankedMembers, setRankedMembers] = useState<ScoreItem[]>([]);

  const assignRanks = (players: MultiplayerUser[]) => {
    const sortedMembers = [...players].sort((a, b) => b.score - a.score);
    
    return sortedMembers.map((member, index) => ({
      id: member.id, 
      name: member.username, 
      score: member.score,
      rank: index + 1,
    }));
  };

  const { gameMode } = useSelector((state: RootState) => state.gameMode);

  useEffect(() => {
    if (gameMode === GameMode.MULTIPLAYER && players.length > 0) {
      setRankedMembers(assignRanks(players));
    }
  }, [players, gameMode]); 

  return (
    <div className="bg-transparent text-zinc-700 p-6 rounded-lg text-center backdrop-blur-xl w-full">
      <h2 className="text-3xl font-bold mb-4">LeaderBoard</h2>
      <div className="overflow-auto max-h-[300px]">
        {gameMode === GameMode.MULTIPLAYER ? (
          <table className="w-full">
            <thead>
              <tr className="text-zinc-700">
                <th className="py-2 px-4">Rank</th>
                <th className="py-2 px-4">Player</th>
                <th className="py-2 px-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {rankedMembers.map((member) => (
                <tr key={member.id} className="border-t border-white/20">
                  <td className="py-2 px-4">{member.rank}</td>
                  <td className="py-2 px-4">{member.name}</td>
                  <td className="py-2 px-4">{member.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col justify-between items-center gap-4">
            <p className="text-lg">Total Score</p>
            <p className="text-2xl font-bold">{SoloScore}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderBoard;
