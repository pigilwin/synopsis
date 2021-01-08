import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { notesSelector } from "../store/notes/notesSlice";
import { Note } from "../store/notes/notesTypes";
import { NoteItem } from './item';
import { History } from 'history';

export const Home = (): JSX.Element => {

    const notes = useSelector(notesSelector);
    const history = useHistory();
    const noteList = buildNoteList(notes, history);

    return (
        <div className="h-auto h-screen mx-auto">
            <div className="grid grid-cols-8 gap-4 p-4">
                {noteList}
            </div>
        </div>
    );
}

const buildNoteList = (blogs: Note[], history: History<unknown>): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    blogs.forEach((note: Note, index: number) => {

        const onClickHandler = (): void => {
            history.push('note/' + note.id);
        };

        elements.push(<NoteItem
            title={note.title}
            key={index}
            onClick={onClickHandler}
        />);
    });
    return elements;
}