import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Button } from "flowbite-react";
import { Link } from "react-router-dom";
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

const getRandomCallToAction = () => {
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

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const encodedSlug = encodeURIComponent(postSlug);
                console.log('Fetching post with slug:', encodedSlug);
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
        return <div>{error}</div>;
    }

    const CallToAction = post?.category === "uncategorized" ? getRandomCallToAction() : callToActionComponents[post?.category];

    return (
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
          <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl dark:text-white'>
            {post && post.title}
          </h1>
          <Link
            to={`/search?category=${post && post.category}`}
            className='self-center mt-5'
          >
            <Button color='gray' pill size='xs'>
              {post && post.category}
            </Button>
          </Link>
          <img
            src={post && post.image}
            alt={post && post.title}
            className='mt-10 p-3 max-h-[600px] w-full object-cover'
          />
          <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs dark:text-gray-400'>
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span className='italic'>
              {post && (post.content.length / 1000).toFixed(0)} mins read
            </span>
          </div>
          <div
            className='p-3 max-w-2xl mx-auto w-full post-content dark:text-white'
            dangerouslySetInnerHTML={{ __html: post && post.content }}
          ></div>
          <div className='max-w-4xl mx-auto w-full'>
            <CallToAction />
          </div>
          <CommentSection postId={post._id} />
    
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
