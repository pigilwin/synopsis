import { PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isAuthenticatedSelector, setAuthId } from "../store/auth/authSlice";
import { authenticateOut } from "../store/firebase";
import { Home, AuthIn, AuthOut } from "./icons";
import { Theme } from './theme';

export const NavBar = (): JSX.Element => {

    const dispatch = useDispatch();
    const isCurrentlyAuthed = useSelector(isAuthenticatedSelector);
    let authButton: JSX.Element = <NavButton to="/auth"><AuthIn/></NavButton>;
    if (isCurrentlyAuthed) {
        const logOutClickHandler = async (): Promise<void> => {
            await authenticateOut();
            dispatch(setAuthId(''));
        };
        authButton = <div onClick={logOutClickHandler} className="block mt-4 lg:inline-block lg:mt-0 text-black cursor-pointer hover:text-blue-100 mr-4 text-lg">
            <AuthOut/>
        </div>;
    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="lg:flex-grow text-center lg:text-left">
                    <h1 className="text-3xl">Synopsis</h1>
                </div>
                <div className="text-sm lg:flex-grow text-center lg:text-right">
                    <NavButton to="/">
                        <Home/>
                    </NavButton>
                    {authButton}
                    <div className="block mt-4 lg:inline-block lg:mt-0 text-black cursor-pointer hover:text-blue-100 mr-4 text-lg">
                        <Theme/>
                    </div>
                </div>
            </div>
        </nav>
    );
}

interface NavButtonProps {
    to: string;
}

const NavButton = ({to, children}: PropsWithChildren<NavButtonProps>): JSX.Element => {
    return (
        <Link to={to} className="block mt-4 lg:inline-block lg:mt-0 text-black cursor-pointer hover:text-blue-100 mr-4 text-lg">
            {children}
        </Link>
    );
}