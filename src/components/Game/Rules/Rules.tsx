import { ScrollText, X } from "lucide-react";
import React, { useState } from "react";
import { rulesContent } from "@/constants/Rules";

const Rules: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // Initialize animatedText with contents from rulesContent
  const [animatedText] = useState(rulesContent.map((rule) => rule.content));

  return (
    <div className="absolute top-4 right-4 z-10 sm:top-10 sm:right-10">
      {!open ? (
        <button onClick={handleToggle}>
          <ScrollText size={24} className="text-white sm:size-32" />
        </button>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-20">
          <div className="bg-[url('/placeholder.svg?height=600&width=400')] bg-cover bg-center w-full max-w-md sm:max-w-2xl h-[70vh] sm:h-[80vh] rounded-lg shadow-2xl overflow-hidden relative animate-unfurl">
            <div className="absolute inset-0 bg-stone-100 bg-opacity-90 "></div>
            <div className="relative h-full flex flex-col p-4 sm:p-6 overflow-hidden custom-scrollbar">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-amber-800 drop-shadow-md">
                WordChamp Rules
              </h2>
              <div className="flex-grow overflow-y-auto custom-scrollbar">
                {rulesContent.map((rule, index) => (
                  <div key={index} className="mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 flex items-center gap-2 text-amber-700">
                      {rule.icon}
                      {rule.title}
                    </h3>
                    <p className="text-base sm:text-lg leading-relaxed">
                      {animatedText.includes(rule.content) ? rule.content : ""}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end items-center">
                <button
                  onClick={handleToggle}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-200"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rules;
