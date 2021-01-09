import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addingNewNote, areWeAddingANewNoteSelector, notesSelector } from "../store/notes/notesSlice";
import { emptyNote, Note } from "../store/notes/notesTypes";
import { Item } from '../components/item';
import { History } from 'history';
import { FabButton } from "../components/input";
import { CreateNote } from "../components/icons";
import { Editor } from "./Editor";
import { isAuthenticatedSelector } from "../store/auth/authSlice";

export const Home = (): JSX.Element => {

    const areWeAddingANewNote = useSelector(areWeAddingANewNoteSelector);
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const notes = useSelector(notesSelector);
    const history = useHistory();
    const dispatch = useDispatch();
    const noteList = buildNoteList(notes, history, isAuthenticated);

    /**
     * If we are adding a new note, show a blank version of the selector
     */
    if (areWeAddingANewNote) {
        return <Editor note={emptyNote}/>;
    }

    const onCreateNoteHandler = (): void => {
        dispatch(addingNewNote(true));
    }

    return (
        <div className="min-h-screen mx-auto">
            <div className="grid grid-cols-8 gap-4 p-4">
                {noteList}
            </div>
            <FabButton onClick={onCreateNoteHandler}>
                <CreateNote/>
            </FabButton>
        </div>
    );
}

const buildNoteList = (blogs: Note[], history: History<unknown>, isAuthenticated: boolean): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    blogs.forEach((note: Note, index: number) => {

        /**
         * If the note requires authentication and we are not authenticated
         * We will hide the note
         */
        if (note.authenticationRequiredToView && !isAuthenticated) {
            return;
        }

        const onClickHandler = (): void => {
            history.push('note/' + note.id);
        };

        elements.push(<Item
            title={note.title}
            key={index}
            onClick={onClickHandler}
        />);
    });
    return elements;
}