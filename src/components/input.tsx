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