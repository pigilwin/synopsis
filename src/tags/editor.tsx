import { Tag } from "../store/tags/tagsTypes";
import { TextInput, Button } from '../components/input';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deepCopy } from "../store/deepClone";
import { createTagAsync, deleteTagAsync, updateTagAsync } from "../store/tags/tagsEvent";
import { addingNewTag, editTag } from "../store/tags/tagsSlice";

interface TagEditorInterface {
    tag: Tag;
}
export const TagEditor = ({tag}: TagEditorInterface): JSX.Element => {

    const dispatch = useDispatch();
    const [title, setContentTitle] = useState(tag.title);

    const onChangeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {currentTarget} = e;
        const {value} = currentTarget;
        setContentTitle(value);
    }

    const saveClickHandler = (): void => {

        const savedTag = deepCopy(tag);

        savedTag.title = title;

        if (savedTag.id.length === 0) {
            dispatch(createTagAsync(savedTag.title));
        } else {
            dispatch(updateTagAsync(savedTag));
        }
    }

    let deleteButton: JSX.Element | null = null;
    if (tag.id.length > 0) {
        const deleteClickHandler = (): void => {
            dispatch(deleteTagAsync(tag));
        }
        deleteButton = <Button
            onClick={deleteClickHandler}
            title="Delete"
        />;
    }

    const goBackClickHandler = (): void => {
        if (tag.id.length === 0) {
            dispatch(addingNewTag(false));
        } else {
            dispatch(editTag(''));
        }
    }

    return (
        <div className="h-auto h-screen mx-auto">
            <div className="w-1/2 mx-auto">
                <div className="w-full">
                    <Button
                        onClick={goBackClickHandler}
                        title="Go Back"
                    />
                </div>
                <TextInput
                    placeholder="Title"
                    onChangeHandler={onChangeTitleHandler}
                    value={title}
                />
                <div className="w-full grid grid-cols-2 gap-4">
                    <Button
                        onClick={saveClickHandler}
                        title="Save"
                    />
                    {deleteButton}
                </div>
            </div>
        </div>
    );
}