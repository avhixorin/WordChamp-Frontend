"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cross } from "lucide-react";

interface DialogueProps {
  title: string;
  icon1?: React.ReactNode;
  icon2?: React.ReactNode;
  icon3?: React.ReactNode;
  onClick: () => void;
  isOpen: boolean;
}

const CTAbutton = ({ label }: { label: string }) => (
  <button className="bg-[#F6F4E1] text-black font-bold py-2 px-4 rounded">
    {label}
  </button>
);

export default function Dialogue({
  title,
  icon1,
  icon2,
  icon3,
  onClick,
  isOpen,
}: DialogueProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-[28rem] h-64 bg-transparent"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <img src="./images/dialogue.png" className="absolute w-full h-full" alt="" />
            <div className="absolute z-10 w-full h-full">
              <Cross
                className="absolute top-8 right-4 cursor-pointer rotate-45"
                stroke="#000"
                fill="#FFF5D8"
                size={28}
                onClick={onClick}
              />
              <motion.div
                className="w-full text-2xl text-[#F6F4E1] py-2 text-center font-extrabold"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {title}
              </motion.div>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <CTAbutton label="Confirm" />
                </motion.div>
              </div>
              <div className="absolute bottom-4 left-4 flex space-x-2">
                {[icon1, icon2, icon3].map(
                  (icon, index) =>
                    icon && (
                      <motion.div
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        {icon}
                      </motion.div>
                    )
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
