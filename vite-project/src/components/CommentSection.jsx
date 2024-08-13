import { Alert, Button, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';

export default function CommentSection({ postId }) {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const [visibleComments, setVisibleComments] = useState(3);
    const [showAll, setShowAll] = useState(false);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const maxLength = 200;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (comment.length > 200) {
            return;
        }
        try {
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: comment,
                    postId,
                    userId: currentUser._id,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setComment(''); // Clear comment input
                setCommentError(null);
                setComments([data, ...comments]);
                if (!showAll) setVisibleComments(visibleComments + 1); // Increase visible comments by 1
            }
        } catch (error) {
            setCommentError(error.message);
        }
    };

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getPostComments/${postId}`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getComments();
    }, [postId]);

    const handleShowMore = () => {
        setShowAll(true);
        setVisibleComments(comments.length);
    };

    const handleShowLess = () => {
        setShowAll(false);
        setVisibleComments(3);
    };

    const handleLike = async (commentId) => {
        try {
            if (!currentUser) {
                navigate('/sign-in');
                return;
            }
            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method: 'PUT',
            });
            if (res.ok) {
                const data = await res.json();
                setComments(
                    comments.map((comment) =>
                        comment._id === commentId
                            ? {
                                  ...comment,
                                  likes: data.likes,
                                  numberOfLikes: data.likes.length,
                              }
                            : comment
                    )
                );
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {currentUser ? (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                    <p>Signed in as:</p>
                    <img className='h-5 w-5 object-cover rounded-full' src={currentUser.profilePicture} alt='' />
                    <Link to='/dashboard?tab=profile' className='text-xs text-cyan-600 hover:underline'>
                        @{currentUser.username}
                    </Link>
                </div>
            ) : (
                <div className='text-sm my-5 flex gap-1'>
                    You must be signed in to comment.
                    <Link to='/sign-in' className='text-teal-700 dark:text-teal-400 hover:underline'>
                        Sign-in
                    </Link>
                </div>
            )}
            {currentUser && (
                <form className='border border-teal-700 rounded-md p-3' onSubmit={handleSubmit}>
                    <Textarea
                        placeholder='Add a comment...'
                        rows='3'
                        maxLength={maxLength}
                        onChange={handleCommentChange}
                        value={comment}
                    />
                    <div className='flex justify-between items-center mt-5'>
                        <p className='text-gray-500 text-sm'>{maxLength - comment.length} characters remaining</p>
                        <Button outline gradientDuoTone='purpleToBlue' onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                    {commentError && <Alert color='failure' className='mt-5'>{commentError}</Alert>}
                </form>
            )}
            {comments.length === 0 ? (
                <p className='text-sm my-5'>No comments yet!</p>
            ) : (
                <>
                    <div className='text-sm my-5 flex items-center gap-1'>
                        <p>Comments</p>
                        <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                            <p>{comments.length}</p>
                        </div>
                    </div>
                    {comments.slice(0, visibleComments).map((comment) => (
                        <Comment key={comment._id} comment={comment} onLike={handleLike} />
                    ))}
<div className='mt-4'>
    {visibleComments < comments.length && !showAll && (
        <button
            className='text-blue-600 hover:underline font-medium text-sm py-2 px-4 transition-all duration-300 ease-in-out'
            onClick={handleShowMore}
        >
            Show More Comments
        </button>
    )}
    {showAll && visibleComments >= comments.length && (
        <button
            className='text-blue-600 hover:underline font-medium text-sm py-2 px-4 transition-all duration-300 ease-in-out'
            onClick={handleShowLess}
        >
            Show Less Comments
        </button>
    )}
</div>




                </>
            )}
        </div>
    );
}
