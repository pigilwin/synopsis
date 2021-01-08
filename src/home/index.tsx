import { useSelector } from "react-redux";
import { notesSelector } from "../store/notes/notesSlice";

export const Home = (): JSX.Element => {

    const notes = useSelector(notesSelector);
    console.log(notes);

    return (
        <div className="max-w-4xl flex items-center h-screen h-auto flex-wrap mx-auto">

        </div>
    );
}