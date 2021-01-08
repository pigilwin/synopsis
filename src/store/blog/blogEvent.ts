import { 
    createPostFirestore, 
    updatePostFirestore, 
    loadPostsFirestore, 
    deletePostFirestore 
} from "../firebase";
import { AppDispatch, AppThunk } from "../store";
import { 
    addPost, 
    addingNewPost, 
    editPost, 
    setPosts, 
    updatePost, 
    deletePost 
} from "./blogSlice";
import { Blog, BlogWithoutId } from "./blogTypes";

export const loadPostsAsync = (): AppThunk => async (dispatch: AppDispatch) => {
    const blogs = await loadPostsFirestore();
    dispatch(setPosts(blogs));
} 

export const createPostAsync = (title: string, content: string): AppThunk => async (dispatch: AppDispatch) => {
    const blog: BlogWithoutId = {
        title: title,
        content: content,
        date: (new Date()).toISOString()
    };
    const blogWithId = await createPostFirestore(blog);
    dispatch(addPost(blogWithId));
    dispatch(addingNewPost(false));
};

export const updatePostAsync = (blog: Blog): AppThunk => async (dispatch: AppDispatch) => {
    await updatePostFirestore(blog);
    dispatch(updatePost(blog));
    dispatch(editPost(''));
};

export const deletePostAsync = (blog: Blog): AppThunk => async (dispatch: AppDispatch) => {
    await deletePostFirestore(blog.id);
    dispatch(deletePost(blog.id));
    dispatch(editPost(''));
}