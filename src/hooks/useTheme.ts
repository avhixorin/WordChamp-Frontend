
import { setMultiPlayerUserField } from "@/Redux/features/multiPlayerUserSlice";
import { setSoloPlayerField } from "@/Redux/features/soloPlayerSlice";
import { RootState } from "@/Redux/store/store";
import { GameMode, Theme } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";

const useTheme = () => {
    const dispatch = useDispatch();
    const { gameMode } = useSelector((state: RootState) => state.gameMode);
    const toggleTheme = (theme: Theme) => {
        const htmlElement = document.querySelector("html");

        if (theme === Theme.DARK) {
            htmlElement?.classList.remove("light");
            htmlElement?.classList.add("dark");
            if(gameMode === GameMode.SOLO){
               dispatch(setSoloPlayerField({ key: "theme", value: Theme.DARK })); 
            }else{
                dispatch(setMultiPlayerUserField({ key: "theme", value: Theme.DARK }));
            }
        } else {
            htmlElement?.classList.remove("dark");
            htmlElement?.classList.add("light");
            if(gameMode === GameMode.SOLO){
                dispatch(setSoloPlayerField({ key: "theme", value: Theme.DARK })); 
             }else{
                 dispatch(setMultiPlayerUserField({ key: "theme", value: Theme.DARK }));
             }
        }
    };

    return { toggleTheme };
};

export default useTheme;
