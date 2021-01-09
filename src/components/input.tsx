import { PropsWithChildren } from "react";

interface TextInputProps {
    value: string;
    placeholder: string;
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const TextInput = ({value, onChangeHandler, placeholder}: TextInputProps): JSX.Element => {
    return (
        <input 
            value={value} 
            onChange={onChangeHandler} 
            placeholder={placeholder} 
            className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:outline-none rounded-lg" required 
        />
    );
}

interface PasswordInputProps {
    value: string;
    placeholder: string;
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const PasswordInput = ({value, onChangeHandler, placeholder}: PasswordInputProps): JSX.Element => {
    return (
        <input 
            type="password"
            value={value} 
            onChange={onChangeHandler} 
            placeholder={placeholder} 
            className="block w-full py-3 px-1 mt-2 text-gray-800 appearance-none border-b-2 border-gray-100 focus:outline-none rounded-lg" required 
        />
    );
}

interface ButtonProps {
    title: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const Button = ({onClick, title}: ButtonProps): JSX.Element => {
    return (
        <button 
            onClick={onClick}
            className="w-full py-3 mt-10 bg-gray-800 rounded-sm font-medium text-white uppercase focus:outline-none hover:shadow-none"
        >
        {title}
        </button>
    );
}

interface FabButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const FabButton = ({onClick, children}: PropsWithChildren<FabButtonProps>): JSX.Element => {
    return (
        <button onClick={onClick} className="absolute bottom-0 right-0 m-4 w-16 h-16 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
            {children}
        </button>
    );
}

interface ToggleSwitchInterface {
    title: string;
    value: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const ToggleSwitch = (toggle: ToggleSwitchInterface): JSX.Element => {
    return (
        <div>
            <div className="toggle-switch flex flex-col">
                <label className="flex items-center cursor-pointer">
                    <p className="text-2xl dark:text-white text-black">{toggle.title}</p>
                    <div className="relative ml-3">
                        <input onChange={toggle.onChange} checked={toggle.value} type="checkbox" className="hidden" />
                        <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                        <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
                    </div>
                </label>
            </div>
        </div>
    );
}