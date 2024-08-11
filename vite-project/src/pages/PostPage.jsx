import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Spinner, Button } from "flowbite-react"
import { Link } from "react-router-dom"
export default function PostPage() {
    const {postSlug} = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [post, setPost] = useState(null)
    
    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const encodedSlug = encodeURIComponent(postSlug);
                console.log('Fetching post with slug:', encodedSlug); // Log the slug being used for fetch
                const res = await fetch(`/api/post/getPosts?slug=${encodedSlug}`);
                const data = await res.json();
    
                if (!res.ok) {
                    console.error('Failed to fetch post:', data.message);
                    setError('Failed to fetch post');
                    setLoading(false);
                    return;
                }
    
                if (data.posts && data.posts.length > 0) {
                    setPost(data.posts[0]);
                } else {
                    console.error('Post not found');
                    setError('Post not found');
                }
    
                setLoading(false);
            } catch (error) {
                console.error('Error loading post:', error);
                setError('Error loading post');
                setLoading(false);
            }
        };
        
        fetchPost();
    }, [postSlug]);
    

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <Spinner size='xl'/>
        </div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen dark:text-white">
            <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl text-gray-800 dark:text-white">
                {post?.title}
            </h1>
            <Link to={`/search?category=${post?.category}`} className='self-center mt-5'>
                <Button color="gray" pill size="xs">{post?.category}</Button>
            </Link>
            <img src={post?.image} alt={post?.title} className="mt-10 p-3 max-h-[600px] w-full object-cover" />
            <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className="italic">{post && Math.round(post.content.length / 1000)} mins read</span>
            </div>
            <div dangerouslySetInnerHTML={{__html: post?.content}} className="p-3 max-w-2xl mx-auto w-full post-content"></div>
        </main>
    )
}