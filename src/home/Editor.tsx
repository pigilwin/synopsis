import { Dispatch, SetStateAction, useState } from "react";
import ReactMde, { Classes } from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import { Button, TextInput, ToggleSwitch } from "../components/input";
import { SelectedItem, SelectedRow } from './item';
import { useDispatch, useSelector } from "react-redux";
import { Note } from "../store/notes/notesTypes";
import { createNoteAsync, updateNoteAsync, deleteNoteAsync } from '../store/notes/notesEvent';
import { addingNewNote, editNote, notesSelector } from "../store/notes/notesSlice";
import { deepCopy } from "../store/deepClone";
import { converter } from "./converter";
import { tagsSelector } from "../store/tags/tagsSlice";
import { Tag } from "../store/tags/tagsTypes";

interface EditorProps {
    note: Note;
}
export const Editor = ({note}: EditorProps): JSX.Element => {
    
    const dispatch = useDispatch();
    const tags = useSelector(tagsSelector);
    const notes = useSelector(notesSelector).filter((innerNote) => {
        return innerNote.id !== note.id;
    });

    const [contentTitle, setContentTitle] = useState(note.title);
    const [value, setValue] = useState(note.text);
    const [linked, setLinked] = useState(note.linked);
    const [tagged, setTagged] = useState(note.tagged);
    const [authenticationRequiredToView, setAuthenticationRequiredToView] = useState(note.authenticationRequiredToView);
    const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

    const generateMarkdownPreview = (markdown: string): Promise<JSX.Element> => {
        return Promise.resolve(markdownPreview(converter.render(markdown)));
    };

    const onChangeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {currentTarget} = e;
        const {value} = currentTarget;
        setContentTitle(value);
    }

    const setAuthenticationRequiredToViewSwitchHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {currentTarget} = e;
        const {checked} = currentTarget;
        setAuthenticationRequiredToView(checked);
    }

    const saveClickHandler = (): void => {

        const savedNote = deepCopy(note);

        savedNote.title = contentTitle;
        savedNote.text = value;
        savedNote.linked = linked;
        savedNote.tagged = tagged;
        savedNote.authenticationRequiredToView = authenticationRequiredToView;

        if (savedNote.id.length === 0) {
            dispatch(createNoteAsync(savedNote));
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
                    onChange={(v: string) => setValue(v)}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    generateMarkdownPreview={generateMarkdownPreview}
                />
            </div>
            <LinkedSelector notes={notes} linkedNotes={linked} setLinked={setLinked}/>
            <TagsSelector tags={tags} linkedTags={tagged} setLinked={setTagged}/>
            <div className="w-full">
                <ToggleSwitch
                    title="Authentication required to view"
                    onChange={setAuthenticationRequiredToViewSwitchHandler}
                    value={authenticationRequiredToView}
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

interface TagsSelectorProps {
    tags: Tag[];
    linkedTags: string[];
    setLinked: Dispatch<SetStateAction<string[]>>;
}
const TagsSelector = ({tags, linkedTags, setLinked}: TagsSelectorProps): JSX.Element => {

    const elements: JSX.Element[] = [];
    tags.forEach((tag, index) => {

        const onClickHandler = (): void => {
            if (linkedTags.includes(tag.id)) {
                const tagsWithRemoved = linkedTags.filter((linked) => linked !== tag.id);
                setLinked(tagsWithRemoved);
            } else {
                const newLinkedTags = [...linkedTags];
                newLinkedTags.push(tag.id);
                setLinked(newLinkedTags);
            }
        };

        elements.push(<SelectedItem key={index} title={tag.title} selected={linkedTags.includes(tag.id)} onClick={onClickHandler}/>);
    });

    return (
        <SelectedRow>
            {elements}
        </SelectedRow>
    );
}

interface LinkedNoteSelectorProps {
    notes: Note[];
    linkedNotes: string[];
    setLinked: Dispatch<SetStateAction<string[]>>;
}
const LinkedSelector = ({notes, linkedNotes, setLinked}: LinkedNoteSelectorProps): JSX.Element => {

    const elements: JSX.Element[] = [];

    notes.forEach((note, index) => {

        const onClickHandler = (): void => {
            if (linkedNotes.includes(note.id)) {
                const notesWithRemoved = linkedNotes.filter((linked) => linked !== note.id);
                setLinked(notesWithRemoved);
            } else {
                const newLinkedNotes = [...linkedNotes];
                newLinkedNotes.push(note.id);
                setLinked(newLinkedNotes);
            }
        };

        elements.push(<SelectedItem key={index} title={note.title} selected={linkedNotes.includes(note.id)} onClick={onClickHandler}/>);
    });
    
    return (
        <SelectedRow>
            {elements}
        </SelectedRow>
    );
}