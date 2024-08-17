import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Spinner, Button } from "flowbite-react";
import CallToActionProduction from "../components/callToAction/CallToActionProduction";
import CallToActionRH from "../components/callToAction/CallToActionRH";
import CallToActionAssurance from "../components/callToAction/CallToActionAssurance";
import CallToActionMaintenance from "../components/callToAction/CallToActionMaintenance";
import CallToActionLogistique from "../components/callToAction/CallToActionLogistique";
import CallToActionFinance from "../components/callToAction/CallToActionFinance";
import CallToActionVentes from "../components/callToAction/CallToActionVentes";
import CallToActionSécurité from "../components/callToAction/CallToActionSécurité";
import CallToActionAdministration from "../components/callToAction/callToActionAdministration";
import CallToActionIt from "../components/callToAction/callToActionIt";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";


const callToActionComponents = {
    production: CallToActionProduction,
    rh: CallToActionRH,
    assurance: CallToActionAssurance,
    maintenance: CallToActionMaintenance,
    logistique: CallToActionLogistique,
    finance: CallToActionFinance,
    ventes: CallToActionVentes,
    sécurité: CallToActionSécurité,
    administration: CallToActionAdministration,
    it: CallToActionIt,
};

export const getRandomCallToAction = () => {
    const keys = Object.keys(callToActionComponents);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return callToActionComponents[randomKey];
};

export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState([]);
    const [showComments, setShowComments] = useState(false); // New state for comments visibility

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const encodedSlug = encodeURIComponent(postSlug);
                const res = await fetch(`/api/post/getPosts?slug=${encodedSlug}`);
                const data = await res.json();

                if (!res.ok) {
                    setError('Failed to fetch post');
                    return;
                }

                if (data.posts && data.posts.length > 0) {
                    setPost(data.posts[0]);
                } else {
                    setError('Post not found');
                }
            } catch (error) {
                setError('Error loading post');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postSlug]);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                const res = await fetch(`/api/post/getPosts?limit=3`);
                const data = await res.json();
                if (res.ok) {
                    setRecentPosts(data.posts);
                } else {
                    console.error('Failed to fetch recent posts:', data.message);
                }
            } catch (error) {
                console.error('Error fetching recent posts:', error);
            }
        };

        fetchRecentPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="xl" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-center text-red-500">
                {error}
            </div>
        );
    }

    const CallToAction = post?.category === "uncategorized" ? getRandomCallToAction() : callToActionComponents[post?.category];

    return (
        <main className='p-6 lg:p-8 flex flex-col max-w-6xl mx-auto min-h-screen bg-white dark:bg-gray-900'>
            <h1 className='text-3xl lg:text-4xl font-serif font-semibold text-center mb-6 dark:text-white'>
                {post?.title}
            </h1>
            <Link
                to={`/search?category=${post?.category}`}
                className='self-center mb-6'
            >
                <Button color='gray' pill size='sm'>
                    {post?.category}
                </Button>
            </Link>
            <img
                src={post?.image}
                alt={post?.title || 'Post Image'}
                className='mt-6 mb-6 max-h-[600px] w-full object-cover rounded-lg shadow-lg'
            />
            <div className='flex justify-between p-4 border-b border-slate-500 mx-auto w-full max-w-2xl text-sm dark:text-gray-400'>
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className='italic'>
                    {post && (post.content.length / 1000).toFixed(0)} mins read
                </span>
            </div>
            <div
                className='p-4 max-w-2xl mx-auto w-full post-content dark:text-gray-300'
                dangerouslySetInnerHTML={{ __html: post?.content }}
            ></div>
            <div className='max-w-4xl mx-auto w-full my-6'>
                <CallToAction />
            </div>
            <div className='flex justify-center items-center mb-6'>
    <Button
        onClick={() => setShowComments(!showComments)}
        color='gray'
        size='sm'
        className='transition-all duration-300 ease-in-out'
    >
        {showComments ? 'Hide Comments' : 'Show Comments'}
    </Button>
</div>

            {showComments && <CommentSection postId={post?._id} />}
            <div className='flex flex-col justify-center items-center mb-5'>
                <h1 className='text-xl mt-5 dark:text-white'>Recent articles</h1>
                <div className='flex flex-row gap-5 mt-5 justify-center'>
                    {recentPosts &&
                        recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
                </div>
            </div>
            
        </main>
    );
}
