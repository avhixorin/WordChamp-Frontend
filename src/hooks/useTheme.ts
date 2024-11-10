import { setTheme } from "@/Redux/features/userSlice";
import { Theme } from "@/types/types";
import { useDispatch } from "react-redux";

const useTheme = () => {
    const dispatch = useDispatch();

    const toggleTheme = (theme: Theme) => {
        const htmlElement = document.querySelector("html");

        if (theme === Theme.DARK) {
            htmlElement?.classList.remove("light");
            htmlElement?.classList.add("dark");
            dispatch(setTheme(Theme.DARK));
        } else {
            htmlElement?.classList.remove("dark");
            htmlElement?.classList.add("light");
            dispatch(setTheme(Theme.LIGHT));
        }
    };

    return { toggleTheme };
};

export default useTheme;
