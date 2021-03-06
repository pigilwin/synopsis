import { PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isAuthenticatedSelector, setAuthId } from "../store/auth/authSlice";
import { authenticateOut } from "../store/auth/authFirestore";
import { Home, AuthIn, AuthOut, Tags } from "./icons";
import { Theme } from './theme';

export const NavBar = (): JSX.Element => {

    const dispatch = useDispatch();
    const isCurrentlyAuthed = useSelector(isAuthenticatedSelector);
    
    let authButton: JSX.Element = <NavButton title="Sign In" to="/auth"><AuthIn/></NavButton>;
    let tagsButton: JSX.Element | null = null;

    if (isCurrentlyAuthed) {
        const logOutClickHandler = async (): Promise<void> => {
            await authenticateOut();
            dispatch(setAuthId(''));
        };
        authButton = <div title="Sign Out" onClick={logOutClickHandler} className="block mt-4 lg:inline-block lg:mt-0 text-black cursor-pointer hover:text-blue-100 mr-4 text-lg">
            <AuthOut/>
        </div>;

        tagsButton = <NavButton title="Tags" to="/tags"><Tags/></NavButton>
    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="lg:flex-grow text-center lg:text-left">
                    <h1 className="text-3xl">Synopsis</h1>
                </div>
                <div className="text-sm lg:flex-grow text-center lg:text-right">
                    <NavButton to="/" title="Home">
                        <Home/>
                    </NavButton>
                    {tagsButton}
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
    title: string;
}

const NavButton = ({to, children, title}: PropsWithChildren<NavButtonProps>): JSX.Element => {
    return (
        <Link title={title} to={to} className="block mt-4 lg:inline-block lg:mt-0 text-black cursor-pointer hover:text-blue-100 mr-4 text-lg">
            {children}
        </Link>
    );
}