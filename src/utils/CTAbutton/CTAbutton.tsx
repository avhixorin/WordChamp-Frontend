import { motion } from 'framer-motion';
import { useState } from 'react';

interface ButtonProps {
  label: string;
  colour: string;
  type: "button" | "submit" | "reset";
  disabled: boolean;
  onClick: () => void;
}

export default function CTAButton({ label, onClick, colour, type, disabled }: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className="relative overflow-hidden rounded-full px-6 py-2 font-semibold text-white shadow-lg transition-all duration-300 ease-out"
      style={{
        background: `linear-gradient(45deg, ${colour} 0%, ${colour}80 50%, ${colour}40 100%)`, 
        boxShadow: isHovered
          ? `0 10px 20px ${colour}40, 0 6px 6px ${colour}40, inset 0 -5px 10px ${colour}20`
          : `0 5px 15px ${colour}20, 0 3px 3px ${colour}20, inset 0 -2px 5px ${colour}10`,
        cursor: disabled ? 'not-allowed' : 'pointer', // Add cursor style based on disabled state
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      initial={{ y: 0 }}
      animate={{ y: [0, -5, 0] }}
      transition={{
        repeat: Infinity,
        repeatType: 'mirror',
        duration: 1.5,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span className="relative z-10 text-lg tracking-wide">{label}</span>
      <motion.div
        className="absolute inset-0 rounded-full -z-10"
        style={{
          background: 'linear-gradient(45deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
        }}
        animate={{
          rotate: isHovered ? 180 : 0,
          opacity: isHovered ? 0.8 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
