import { ScrollText, Compass, X } from 'lucide-react';
import React, { useState } from 'react';
import { rulesContent } from '@/constants/Rules';

const Rules: React.FC = () => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    // Initialize animatedText with contents from rulesContent
    const [animatedText, setAnimatedText] = useState(rulesContent.map(rule => rule.content));

    return (
        <div className="absolute top-10 right-10 z-10">
            {!open ? (
                <button onClick={handleToggle}>
                    <ScrollText size={32} className="text-white" />
                </button>
            ) : (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
                    <div 
                        className="bg-[url('/placeholder.svg?height=600&width=400')] bg-cover bg-center w-full max-w-2xl h-[80vh] rounded-lg shadow-2xl overflow-hidden relative animate-unfurl"
                    >
                        <div className="absolute inset-0 bg-stone-100 bg-opacity-90 "></div>
                        <div className="relative h-full flex flex-col p-6 overflow-hidden custom-scrollbar">
                            <h2 className="text-3xl font-bold mb-4 text-center text-amber-800 drop-shadow-md">WordChamp Rules</h2>
                            <div className="flex-grow overflow-y-auto custom-scrollbar">
                                {rulesContent.map((rule, index) => (
                                    <div key={index} className="mb-6">
                                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-amber-700">
                                            {rule.icon}
                                            {rule.title}
                                        </h3>
                                        <p className="text-lg leading-relaxed">
                                            {animatedText.includes(rule.content) ? rule.content : ''}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex justify-end items-center">
                                
                                <button
                                    onClick={handleToggle}
                                    className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-200"
                                >
                                    <X className="w-6 h-6" />
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
