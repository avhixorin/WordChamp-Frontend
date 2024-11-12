import AlphabetSection from "../../AlphabetSection/Alphabets";
import GuessedWords from "../../GuessedWords/GuessedWords";
import InputSection from "../../InputSection/Input";

const MainGameSection = () => (
    <div className="w-full h-full flex flex-col justify-around items-center font-super">
      <AlphabetSection />
      <GuessedWords />
      <InputSection />
    </div>
  );

export default MainGameSection;