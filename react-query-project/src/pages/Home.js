import { useMutation, useQuery, useQueryClient } from 'react-query';
import Loader from '../components/Loader';
import PostCard from '../components/PostCard';
import Banner from '../components/Banner'
import { toast } from 'react-toastify';
import PostForm from '../components/PostForm';
import { fetchDeletePost, fetchPostData } from '../api/post';

const Home = () => {
    const cache = useQueryClient();
    const {data, isLoading} = useQuery('posts', fetchPostData, {onError: (error) => toast(error.message)});

    const {isLoading: isMutating, mutateAsync} = useMutation('deletePost', fetchDeletePost, {
        onError: (error) => {
            toast(error.message);
        },
        onSuccess: () => {
            toast('Post has been deleted');
            cache.invalidateQueries('posts');
        }
    });
    
    return (
        <div>
            <Banner />
                <div className='container'>
                    <div style={{background: "tomato"}} className="mt-5 row">
                        <div className="col-12 text-center py-3 text-light">
                            <h3>ADD NEW POSTS</h3>
                        </div>
                    </div>

                    <div className="my-4">
                        <PostForm />
                    </div>


                    <div className="mt-5 row bg-primary">
                        <div className="col-12 text-center py-3 text-light">
                            <h3>ALL POSTS</h3>
                        </div>
                    </div>

                    {isLoading ? (<Loader />) : (
                        <div className="mt-3 row">
                            {
                                data?.posts.map((post, key) => (
                                    <div key={key} className="col-lg-3 col-md-6 col-12 mb-4">
                                        <PostCard post={post} mutateAsync={mutateAsync} />
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>


        </div>
    )
}

export default Home
