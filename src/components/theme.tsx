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
        <div className="h-12 w-18">
            <button onClick={onClickHandler} className="focus:outline-none text-2xl">{icon}</button>
        </div>
    );
}