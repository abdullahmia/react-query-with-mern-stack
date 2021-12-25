import axios from 'axios';

export const fetchPostData = async (id) => {
    try{
        const {data} = await axios.get(`${process.env.REACT_APP_API}/post`);
        return data;
    }catch (error){
        throw Error("Unable to fetch the Post data. Reload one times");
    }
}


// Fetch Single Data
export const fetchSinglePost = async (id) => {
    try{
        const {data} = await axios.get(`http://localhost:8000/post/${id}`)
        return data;
    }catch(error){
        throw Error("Server side error");
    }
}

// Add new post
export const fetchNewPost = async (formData) => {
    try{
        const { data } = await axios.post('http://localhost:8000/post/create', formData)
        return data;
    }catch(error) {
        throw Error("Unable to fetch the Post data. Reload one times");
    }
}


// Edit a post
export const fetchEditPost = async (formData) => {
    try{
        const editedData = {
            title: formData.title,
            body: formData.body
        }
        const postId = formData.id;
        const { data } = await axios.patch(`http://localhost:8000/post/update/${postId}`, editedData);
        return data;
    }catch (error){
        throw Error("Unable to fetch edit data");
    }
}


// Delete a post
export const fetchDeletePost = async (id) => {
    try{
        const { data } = await axios.delete(`http://localhost:8000/post/${id}`);
        return data;
    }catch(error){
        throw Error("Unable to delete this post");
    }
}