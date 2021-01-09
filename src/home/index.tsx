import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addingNewNote, areWeAddingANewNoteSelector, notesSelector } from "../store/notes/notesSlice";
import { Note } from "../store/notes/notesTypes";
import { Item } from '../components/item';
import { History } from 'history';
import { FabButton } from "../components/input";
import { CreateNote } from "../components/icons";
import { Editor } from "./Editor";

export const Home = (): JSX.Element => {

    const areWeAddingANewNote = useSelector(areWeAddingANewNoteSelector);
    const notes = useSelector(notesSelector);
    const history = useHistory();
    const dispatch = useDispatch();
    const noteList = buildNoteList(notes, history);

    if (areWeAddingANewNote) {
        return <Editor note={{id: '', title: '', text: '', tagged: [], linked: [], authenticationRequiredToView: false}}/>;
    }

    const onCreateNoteHandler = (): void => {
        dispatch(addingNewNote(true));
    }

    return (
        <div className="h-auto mx-auto">
            <div className="grid grid-cols-8 gap-4 p-4">
                {noteList}
            </div>
            <FabButton onClick={onCreateNoteHandler}>
                <CreateNote/>
            </FabButton>
        </div>
    );
}

const buildNoteList = (blogs: Note[], history: History<unknown>): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    blogs.forEach((note: Note, index: number) => {

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