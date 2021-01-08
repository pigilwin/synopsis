import { useDispatch, useSelector } from "react-redux";
import { NoteItem } from '../components/item';
import { Dispatch } from "react";
import { Tag } from "../store/tags/tagsTypes";
import { tagsSelector } from "../store/tags/tagsSlice";

export const TagForm = (): JSX.Element => {

    const tags = useSelector(tagsSelector);
    const dispatch = useDispatch();
    const noteList = buildNoteList(tags, dispatch);

    return (
        <div className="h-auto h-screen mx-auto">
            <div className="grid grid-cols-8 gap-4 p-4">
                {noteList}
            </div>
        </div>
    );
}

const buildNoteList = (blogs: Tag[], history: Dispatch<any>): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    blogs.forEach((tag: Tag, index: number) => {

        const onClickHandler = (): void => {
            
        };

        elements.push(<NoteItem
            title={tag.title}
            key={index}
            onClick={onClickHandler}
        />);
    });
    return elements;
}