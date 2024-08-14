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
    it: CallToActionIt
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
    

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <Spinner size='xl'/>
        </div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const CallToAction = post?.category === "uncategorized" ? getRandomCallToAction() : callToActionComponents[post?.category];

    return (
        <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen dark:text-white">
            <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl text-gray-800 dark:text-white">
                {post?.title}
            </h1>
            <Link to={`/search?category=${post?.category}`} className='self-center mt-5'>
                <Button color="gray" pill size="xs">{post?.category}</Button>
            </Link>
            <div className="fade-transition">
                <img src={post?.image} alt={post?.title} className="mt-10 p-3 max-h-[600px] w-full object-cover" />
            </div>
            <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className="italic">{post && Math.round(post.content.length / 1000)} mins read</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post?.content }} className="p-3 max-w-2xl mx-auto w-full post-content text-container"></div>
            <div className="max-w-4xl mx-auto w-full">
            <div className="my-8 border-t border-gray-300 dark:border-gray-700"></div>
                {CallToAction && <CallToAction />}
            </div>
            <CommentSection postId={post._id}/>
        </main>
    );
}
