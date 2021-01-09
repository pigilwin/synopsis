import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../components/input";
import { isAuthenticatedSelector } from "../store/auth/authSlice";
import {
    currentNoteBeingEditedSelector, 
    editNote,
    notesSelector
} from "../store/notes/notesSlice";
import { converter } from "./converter";
import { Editor } from "./Editor";
import { Note } from "../store/notes/notesTypes";
import { SelectedRow, SelectedItem } from "./item";
import { History } from 'history';

export const ViewNote = (): JSX.Element | null => {

    /**
     * Fetch the post id from the params
     */
    const { id } = useParams<{id: string}>();

    /**
     * Load the hooks and selector
     */
    const dispatch = useDispatch();
    const notes = useSelector(notesSelector);
    const isCurrentlyAuthed = useSelector(isAuthenticatedSelector);
    const currentlyEditingNote = useSelector(currentNoteBeingEditedSelector);
    const history = useHistory();

    /**
     * Find the current note by the id from the url
     */
    const note = notes.find((note: Note) => {
        return note.id === id;
    });

    /**
     * If the note is not found then go back to the list of notes
     */
    if (note === undefined) {
        history.goBack();
        return null;
    }

    /**
     * Show the editor if the current note is being edited
     */
    if (isCurrentlyAuthed && currentlyEditingNote.length > 0 && currentlyEditingNote === id) {
        return <Editor
            note={note}
        />
    }

    const html = converter.render(note.text);

    let selectedRow: JSX.Element | null = null;
    if (note.linked.length > 0) {
        selectedRow = buildLinkedNotes(notes, note.linked, history);
    }

    /**
     * If we are currently authenticated, show the edit button
     */
    let editButton: JSX.Element | null = null;
    if (isCurrentlyAuthed) {

        const onEditClickHandler = (): void => {
            dispatch(editNote(note.id));
        };

        editButton = <div className="w-1/2 mx-auto">
            <Button
                title="Edit"
                onClick={onEditClickHandler}
            />
        </div>
    }


    return (
        <article className="py-12 px-4 min-h-screen dark:text-white">
            <h1 className="text-4xl text-center mb-4 font-semibold font-heading">{note.title}</h1>
            <div className="max-w-6xl mx-auto" dangerouslySetInnerHTML={{ __html: html}}></div>
            {selectedRow}
            {editButton}
        </article>
    );
}

const buildLinkedNotes = (notes: Note[], linked: string[], history: History<any>): JSX.Element => {
    
    const elements: JSX.Element[] = [];

    notes.forEach((note, index) => {

        if (linked.includes(note.id)){
        
            const onClickHandler = (): void => {};
            elements.push(<SelectedItem key={index} title={note.title} selected={false} onClick={onClickHandler}/>);
        }
    });
    
    return (
        <div className="max-w-6xl mx-auto">
            <SelectedRow>
                {elements}
            </SelectedRow>
        </div>
    );
}