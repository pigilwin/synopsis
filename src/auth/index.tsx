import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, PasswordInput, TextInput } from "../components/input";
import { setAuthId } from "../store/auth/authSlice";
import { authenticateIn } from "../store/firebase";

export const AuthPage = (): JSX.Element => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const dispatch = useDispatch();
    const history = useHistory();

    const onChangeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {currentTarget} = e;
        const {value} = currentTarget;
        setEmail(value);
    };

    const onChangePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {currentTarget} = e;
        const {value} = currentTarget;
        setPassword(value);
    };

    const signInClickHandler = async (): Promise<void> => {
        try {
            const credential = await authenticateIn(email, password);
            const token = await credential.user?.getIdToken();
            if (token !== undefined){
                dispatch(setAuthId(token));
            }
            history.goBack();
        } catch {
            history.goBack();
        }
    };

    const goBackClickHandler = (): void => {
        history.goBack();
    };
    
    return (
        <div className="flex flex-col h-screen">
            <div className="grid place-items-center m-2 my-20 sm:my-auto">
                <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
                px-6 py-10 sm:px-10 sm:py-6 
                bg-white rounded-lg shadow-md lg:shadow-lg">
                    <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
                        Login
                    </h2>
                    <div className="mt-10">
                        <label className="block text-xs font-semibold text-gray-600 uppercase">E-mail</label>
                        <TextInput
                            onChangeHandler={onChangeEmailHandler}
                            placeholder="E-mail"
                            value={email}
                        />
                        <label htmlFor="password" className="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
                        <PasswordInput
                            onChangeHandler={onChangePasswordHandler}
                            placeholder="******"
                            value={password}
                        />
                        <Button
                            onClick={signInClickHandler}
                            title="Login"
                        />
                        <Button
                            onClick={goBackClickHandler}
                            title="Go Back"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}