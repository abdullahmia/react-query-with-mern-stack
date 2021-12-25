import { useQuery } from 'react-query';
import {useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchSinglePost } from '../api/post';
import Loader from '../components/Loader';
import PostForm from '../components/PostForm';


const SinglePost = () => {
    const {id} = useParams();
    const {data, isLoading} = useQuery(['post', id], () => fetchSinglePost(id), {onError: (error) => toast(error.message)})

    return (
        <div className="container">
            {
                isLoading ? (<Loader />) : (
                    <>
                        <div className='mb-5'>
                            <PostForm isUpdate={true} postId={data?.post?._id} />
                        </div>
                       <div className='mt-5'>
                            <div className='card border-0 shadow p-5 mt-4'>
                                <h2>{data?.post?.title}</h2>
                                <p>{data?.post?.body}</p>
                            </div>
                        </div> 
                    </>
                )
            }
        </div>
    )
}

export default SinglePost
