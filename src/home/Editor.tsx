import { useState } from "react";
import ReactMde, { Classes } from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { Button, TextInput } from "../components/input";
import { useDispatch } from "react-redux";
import { Note } from "../store/notes/notesTypes";
import { createNoteAsync, updateNoteAsync, deleteNoteAsync } from '../store/notes/notesEvent';
import { addingNewNote, editNote } from "../store/notes/notesSlice";
import { deepCopy } from "../store/deepClone";
import { converter } from "./converter";

interface EditorProps {
    note: Note;
}
export const Editor = ({note}: EditorProps): JSX.Element => {
    
    const dispatch = useDispatch();
    const [contentTitle, setContentTitle] = useState(note.title);
    const [value, setValue] = useState(note.content);
    
    const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

    const generateMarkdownPreview = (markdown: string): Promise<JSX.Element> => {
        return Promise.resolve(markdownPreview(converter.render(markdown)));
    };

    const onChangeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {currentTarget} = e;
        const {value} = currentTarget;
        setContentTitle(value);
    }

    const onChangeContent = (v: string): void => {
        setValue(v);
    }

    const saveClickHandler = (): void => {

        const savedNote = deepCopy(note);

        savedNote.title = contentTitle;
        savedNote.content = value;

        if (savedNote.id.length === 0) {
            dispatch(createNoteAsync(savedNote.title, savedNote.content));
        } else {
            dispatch(updateNoteAsync(savedNote));
        }
    }

    let deleteButton: JSX.Element | null = null;
    if (note.id.length > 0) {
        const deleteClickHandler = (): void => {
            dispatch(deleteNoteAsync(note));
        }
        deleteButton = <Button
            onClick={deleteClickHandler}
            title="Delete"
        />;
    }

    const goBackClickHandler = (): void => {
        if (note.id.length === 0) {
            dispatch(addingNewNote(false));
        } else {
            dispatch(editNote(''));
        }
    }

    const classes: Classes = {
        preview: "bg-white"
    };
    
    return (
        <div className="max-w-4xl flex items-center h-screen flex-wrap mx-auto">
            <div className="w-full">
                <Button
                    onClick={goBackClickHandler}
                    title="Go Back"
                />
            </div>
            <TextInput
                placeholder="Title"
                onChangeHandler={onChangeTitleHandler}
                value={contentTitle}
            />
            <div className="w-full rounded-lg shadow-2xl opacity-75 my-4">
                <ReactMde
                    classes={classes}
                    value={value}
                    onChange={onChangeContent}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    generateMarkdownPreview={generateMarkdownPreview}
                />
            </div>
            <div className="w-full grid grid-cols-2 gap-4">
                <Button
                    onClick={saveClickHandler}
                    title="Save"
                />
                {deleteButton}
            </div>
        </div>
    );
}

const markdownPreview = (html: string): JSX.Element => {
    return (
        <div className="dark" dangerouslySetInnerHTML={{ __html: html}}></div>
    );
}