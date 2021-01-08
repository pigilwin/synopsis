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
    const currentlyEditingBlog = useSelector(currentNoteBeingEditedSelector);
    const history = useHistory();

    /**
     * Find the current blog by the id from the url
     */
    const note = notes.find((blog: Note) => {
        return blog.id === id;
    });

    /**
     * If the blog is not found then go back to the list of blogs
     */
    if (note === undefined) {
        history.replace('/blog');
        return null;
    }

    /**
     * Show the editor if the current blog is being edited
     */
    if (isCurrentlyAuthed && currentlyEditingBlog.length > 0 && currentlyEditingBlog === id) {
        return <Editor
            note={note}
        />
    }

    const html = converter.render(note.content);

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
        <article className="py-12 px-4 h-auto dark:text-white">
            <h1 className="text-4xl text-center mb-4 font-semibold font-heading">{note.title}</h1>
            <div className="max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: html}}></div>
            {editButton}
        </article>
    );
}