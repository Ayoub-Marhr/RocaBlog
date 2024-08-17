import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // For loading spinner

export default function Search() {
    const [sideBarData, setSideBarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
    });

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false); // Theme switcher state
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');
        

        if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
            setSideBarData((prevData) => ({
                ...prevData,
                searchTerm: searchTermFromUrl || prevData.searchTerm,
                sort: sortFromUrl || prevData.sort,
                category: categoryFromUrl || prevData.category,
            }));
        }

        const fetchPosts = async () => {
            setLoading(true);
            setError(null);
            const searchQuery = urlParams.toString();
            try {
                const res = await fetch(`/api/post/getPosts?${searchQuery}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch posts");
                }
                const data = await res.json();
                setPosts(data.posts);
                setLoading(false);
                setShowMore(data.posts.length === 9);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPosts();
    }, [location.search]);

    const handleSearchChange = (e) => {
        const { id, value } = e.target;
        setSideBarData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sideBarData.searchTerm);
        urlParams.set('sort', sideBarData.sort);
        urlParams.set('category', sideBarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', numberOfPosts);
        const searchQuery = urlParams.toString();

        try {
            const res = await fetch(`/api/post/getPosts?${searchQuery}`);
            if (!res.ok) {
                throw new Error("Failed to fetch more posts");
            }
            const data = await res.json();
            setPosts((prevPosts) => [...prevPosts, ...data.posts]);
            setShowMore(data.posts.length === 9);
        } catch (error) {
            console.error("Error fetching more posts:", error);
            setError(error.message);
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark", !darkMode);
    };

    return (
        <div className={`flex flex-col md:flex-row ${darkMode ? 'dark' : ''} min-h-screen bg-gray-100 dark:bg-gray-900`}>
            {/* Sidebar */}
            <div className="w-full md:w-1/4 lg:w-1/5 p-8 border-b md:border-r border-gray-300 bg-white dark:bg-gray-800 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Search Filters</h2>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="searchTerm">Search Term</label>
                        <TextInput
                            placeholder="Enter keywords..."
                            id="searchTerm"
                            type="text"
                            value={sideBarData.searchTerm}
                            onChange={handleSearchChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="sort">Sort By</label>
                        <Select 
                            id="sort" 
                            value={sideBarData.sort} 
                            onChange={handleSearchChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="desc">Latest</option>
                            <option value="asc">Oldest</option>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="category">Category</label>
                        <Select 
                            id="category" 
                            value={sideBarData.category} 
                            onChange={handleSearchChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="uncategorized">Select a category</option>
                            <option value="production">Production</option>
                            <option value="assurance">Assurance</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="logistique">Logistique</option>
                            <option value="rh">RH</option>
                            <option value="finance">Finance</option>
                            <option value="ventes">Ventes et Marketing</option>
                            <option value="sécurité">Sécurité</option>
                            <option value="administration">Administration</option>
                            <option value="it">IT</option>
                        </Select>
                    </div>
                    <Button 
                        outline
                        type="submit" 
                    >
                        Search
                    </Button>
                </form>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <h1 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-300 dark:border-gray-700 dark:text-white">Search Results</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <div className="col-span-full flex justify-center items-center py-12">
                            <AiOutlineLoading3Quarters className="animate-spin text-5xl text-teal-500" />
                        </div>
                    ) : error ? (
                        <p className="col-span-full text-xl text-red-500 dark:text-red-400">{error}</p>
                    ) : posts.length === 0 ? (
                        <p className="col-span-full text-xl text-gray-500 dark:text-gray-400">No posts found!</p>
                    ) : (
                        posts.map((post) => (
                            <PostCard 
                                key={post._id} 
                                post={post} 
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                            />
                        ))
                    )}
                </div>
                {showMore && (
                    <div className="mt-8 text-center">
                        <button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out"
                            onClick={handleShowMore}
                            aria-label="Show more posts"
                        >
                            Show More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
