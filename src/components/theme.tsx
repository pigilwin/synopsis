import { useDispatch, useSelector } from "react-redux";
import { setTheme, themeStateSelector } from "../store/theme/themeSlice";

export const Theme = (): JSX.Element => {

    const dispatch = useDispatch();
    const usingDarkMode = useSelector(themeStateSelector);
    let icon: string = "🌙";
    if (!usingDarkMode) {
        icon = "🌞";
    }

    const onClickHandler = (): void => {
        dispatch(setTheme(!usingDarkMode));
    }
    
    return (
        <div className="absolute top-0 right-0 h-12 w-18 p-4">
            <button onClick={onClickHandler} className="focus:outline-none text-3xl">{icon}</button>
        </div>
    );
}