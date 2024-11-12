import { rulesContent } from "@/constants/Rules";
import { ScrollText, X } from "lucide-react";

const RulesSection = ({
    open,
    setOpen,
  }: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => (
    <div className="w-full flex flex-col items-end gap-4">
      {!open ? (
        <button onClick={() => setOpen(true)} aria-label="Show Rules">
          <ScrollText size={32} className="text-white" />
        </button>
      ) : (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
          <div className="bg-[url('/placeholder.svg?height=600&width=400')] bg-cover bg-center w-full max-w-2xl h-[80vh] rounded-lg shadow-2xl overflow-hidden relative animate-unfurl">
            <div className="absolute inset-0 bg-stone-100 bg-opacity-90"></div>
            <div className="relative h-full flex flex-col p-6 overflow-hidden custom-scrollbar">
              <h2 className="text-3xl font-bold mb-4 text-center text-amber-800 drop-shadow-md">
                WordChamp Rules
              </h2>
              <div className="flex-grow overflow-y-auto custom-scrollbar">
                {rulesContent.map((rule, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-amber-700">
                      {rule.icon}
                      {rule.title}
                    </h3>
                    <p className="text-lg leading-relaxed">{rule.content}</p>
                  </div>
                ))}
              </div>
              <div className="w-full flex justify-end">

              <button
                onClick={() => setOpen(false)}
                className=" bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-200 mt-4 p-2"
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

export default RulesSection;