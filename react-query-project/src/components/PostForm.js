import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { fetchNewPost, fetchEditPost } from '../api/post';


const PostForm = ({isUpdate, postId}) => {
    const {register, handleSubmit, reset} = useForm();
    const cache = useQueryClient();
    const { isLoading, data, mutateAsync } = useMutation( isUpdate ? "updatePost" : "addnewpost", isUpdate ? fetchEditPost : fetchNewPost, {
        onSuccess: () => {
            isUpdate ? toast('Post has been updated') : toast("Post has been added");

            isUpdate ? cache.invalidateQueries(['post', postId]) : cache.invalidateQueries('posts')
        },
        onMutate: async (newPost) => {
            if(isUpdate){
                await cache.cancelQueries('post');

                // Store the previous data
                const previousData = cache.getQueryData(['post', postId]);

                // Optimistally update at new data
                cache.setQueriesData(['post', postId], (old) => {
                    return { data: previousData };
                })
                return previousData;
            }
        },
        onError: (error, newPost, context) => {
            cache.setQueriesData(['post', postId], context.previousData);
            toast(error.message)
        }
    });

    const formSubmit = async (data) => {
        isUpdate ? await mutateAsync({title: data.title, body: data.body, id: postId}) : await mutateAsync(data);
        reset();
    }


    return (
        <div className="card shadow border-0 p-5">
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Post Title</label>
                    <input {...register('title')} type="text" className="form-control" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Post Body</label>
                    <textarea {...register('body')} className="form-control" required></textarea>
                </div>
                <button className="btn btn-primary" type="submit">
                    {
                        isLoading ? (<>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 
                            {isUpdate ? <span className='ps-2'>Editing</span> : <span className='ps-2'>Adding</span>}
                        </>) : (
                            isUpdate ? <span className='ps-2'>Edit Post</span> : <span className='ps-2'>Add Post</span>
                        )
                    }
                </button>

            </form>
        </div>
    )
}

export default PostForm;
