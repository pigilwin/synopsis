interface RightItemProps {
    title: string;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
export const Item = ({title, onClick}: RightItemProps): JSX.Element => {
    return (
        <div className="px-4 py-6 bg-gray-300 dark:bg-white rounded-lg shadow-md lg:shadow-lg cursor-pointer" onClick={onClick}>
            <div className="text-center">
                <p className="text-gray-700">{title}</p>
            </div>
        </div>
    );
}