import { PropsWithChildren } from "react";

export const SelectedRow = ({children}: PropsWithChildren<{}>): JSX.Element => {
    return (
        <div className="w-full flex flex-row shadow-md bg-gray-300 p-1 overflow-x-auto rounded-md">
            {children}
        </div>
    );
}


interface SelectedItemProps {
    title: string;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    selected: boolean;
}
export const SelectedItem = ({title, onClick, selected}: SelectedItemProps): JSX.Element => {
    
    const classNames: string[] = [
        "p-6",
        "m-2",
        "rounded-lg",
        "shadow-md",
        "lg:shadow-lg",
        "cursor-pointer"
    ];

    if (selected) {
        classNames.push('bg-green-200');
    } else {
        classNames.push('bg-white');
    }
    
    return (
        <div className={classNames.join(' ')} onClick={onClick}>
            <div className="text-center">
                <p className="text-gray-700">{title}</p>
            </div>
        </div>
    );
}