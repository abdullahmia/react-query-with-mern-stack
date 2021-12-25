import {Link} from 'react-router-dom';

const PostCard = ({post, mutateAsync}) => {
    return (
        <div style={{height: "217px"}} className="card border-0 shadow">
            <div className="card-body">
                <h5 className="card-title">{post.title.slice(0, 20)}</h5>
                <p className="card-text">{post.body.slice(1, 100)}</p>
                <Link to={`/post/${post._id}`} className="btn btn-primary"><i className="fas fa-eye"></i></Link>
                <button onClick={ async () => {
                    await mutateAsync(post._id);
                }} className='btn btn-danger ms-3'>Delete</button>
            </div>
        </div>
    )
}

export default PostCard;