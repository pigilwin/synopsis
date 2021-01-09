import { useDispatch, useSelector } from "react-redux";
import { Item } from '../components/item';
import { Dispatch } from "react";
import { Tag } from "../store/tags/tagsTypes";
import { addingNewTag, areWeAddingANewTagSelector, currentTagBeingEditedSelector, editTag, tagsSelector } from "../store/tags/tagsSlice";
import { FabButton } from "../components/input";
import { CreateTag } from "../components/icons";
import { TagEditor } from './editor';

export const TagForm = (): JSX.Element => {

    const tags = useSelector(tagsSelector);
    const editTagId = useSelector(currentTagBeingEditedSelector);
    const currentlyAddingNewTag = useSelector(areWeAddingANewTagSelector);
    const dispatch = useDispatch();
    
    const noteList = buildNoteList(tags, dispatch);

    if (currentlyAddingNewTag) {
        return <TagEditor tag={{id: '', title: ''}}/>;
    }
    

    const addNewTagHandler = (): void => {
        dispatch(addingNewTag(true));
    }

    if (editTagId.length > 0) {
        const foundTag: Tag | undefined = tags.find(innerTag => innerTag.id === editTagId);
        if (foundTag !== undefined) {
            return <TagEditor tag={foundTag}/>;
        }
    }

    return (
        <div className="min-h-screen mx-auto">
            <div className="grid grid-cols-8 gap-4 p-4">
                {noteList}
            </div>
            <FabButton onClick={addNewTagHandler}>
                <CreateTag/>
            </FabButton>
        </div>
    );
}

const buildNoteList = (notes: Tag[], dispatch: Dispatch<any>): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    notes.forEach((tag: Tag, index: number) => {

        const onClickHandler = (): void => {
            dispatch(editTag(tag.id));
        };

        elements.push(<Item
            title={tag.title}
            key={index}
            onClick={onClickHandler}
        />);
    });
    return elements;
}