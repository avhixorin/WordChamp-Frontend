import { ScrollText, Clock, Target, Star, ShieldAlert, MessageSquare, Flag, Gift, XCircle } from 'lucide-react';
import React from 'react';

export const rulesContent = [
    {
      icon: React.createElement(ScrollText),
      title: "Objective",
      content: "Spell as many words as possible within the time limit to score points. Correct words grant points, while incorrect guesses deduct points or penalize time."
    },
    {
      icon: React.createElement(Clock),
      title: "Gameplay Modes",
      content: `
        - Solo Mode: Play against the clock to reach the highest possible score.
        - Multiplayer Mode: Compete in real-time with other players or friends. The player with the highest score by the end of the timer wins.
        - Difficulty Levels: Choose from Easy, Medium, or Hard. Higher difficulties have longer words and shorter time limits but yield more points per correct word.
      `
    },
    {
      icon: React.createElement(Target),
      title: "Word Selection",
      content: `
        - Words are generated randomly based on the selected difficulty.
        - Each player receives the same word set in multiplayer mode to ensure fairness.
      `
    },
    {
      icon: React.createElement(Star),
      title: "Scoring System",
      content: `
        - Correct Word: Gain points based on word length and difficulty.
        - Incorrect Word: Lose points or receive a time penalty.
        - Combo Points: Score extra points for correct consecutive answers.
      `
    },
    {
      icon: React.createElement(Gift),
      title: "Power-Ups",
      content: `
        - Hint: Reveal the first or last letter of a word. Limited use per game.
        - Freeze Time: Pause the timer temporarily (available only in solo mode).
        - Extra Time: Gain additional time on the clock (available in solo mode).
      `
    },
    {
      icon: React.createElement(ShieldAlert),
      title: "Word Validation",
      content: `
        - Words are checked against an internal dictionary for validity. Only valid words earn points.
        - Repeated or previously guessed words will not be counted.
      `
    },
    {
      icon: React.createElement(MessageSquare),
      title: "Chat and Communication",
      content: "Players can chat with opponents in multiplayer mode, but unsportsmanlike conduct (spamming, insults) is prohibited and may lead to penalties or bans."
    },
    {
      icon: React.createElement(Flag),
      title: "End of Game",
      content: `
        - The game ends when the timer reaches zero. In multiplayer mode, all players see the final leaderboard showing the scores.
        - Tie-Breakers: In case of a tie, an additional round or sudden-death word challenge may be triggered to determine the winner.
      `
    },
    {
      icon: React.createElement(Gift),
      title: "Bonus Rounds",
      content: "Random bonus rounds may appear where points are doubled for a limited time or special words provide extra rewards."
    },
    {
      icon: React.createElement(XCircle),
      title: "Cheating",
      content: "Any form of cheating, including external help or exploiting the game, will lead to disqualification and may result in a ban from future games."
    }
];
