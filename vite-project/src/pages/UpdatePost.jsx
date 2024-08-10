import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate,useParams} from 'react-router-dom'
import { useSelector } from "react-redux";
export default function UpdatePost() {
    const {currentUser}=useSelector((state)=>state.user)
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const {postId}=useParams()
    const navigate= useNavigate()

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[\s]+/g, '-')
            .replace(/[^\w\-]+/g, '');
    };
    useEffect(()=>{
        try {
            const fetchPost=async()=>{
                const res = await fetch(`/api/post/getPosts?postId=${postId}`,{
                
                })
                const data= await res.json()
                if(!res.ok){
                    console.log(data.message)
                    setPublishError(data.message)
                    return
                }
                if(res.ok){
                    setPublishError(null)
                    setFormData(data.posts[0])
                }
            }
            fetchPost()

        } catch (error) {
            console.log(error)
        }
    },[postId])

    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Please select an image');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: downloadUrl });
                    });
                }
            );
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const slug = generateSlug(formData.title);
            const postData = { ...formData, slug };
            
            const res = await fetch(`/api/post/updatePost/${formData._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }
            if(res.ok){
                setPublishError(null);
                navigate(`/post/${slug}`)
            }
        } catch (error) {
            setPublishError('Something went wrong');
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto min-h-screen bg-gray-100 dark:bg-gray-900">
            <h1 className="text-center text-4xl my-8 font-extrabold text-gray-900 dark:text-gray-100">Update Post</h1>
            <form className="flex flex-col gap-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6 sm:flex-row justify-between">
                    <TextInput 
                        type="text" 
                        placeholder="Title" 
                        required 
                        id="title" 
                        className="flex-1 dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {
                            setFormData({ ...formData, title: e.target.value });
                        }}
                        value={formData.title}
                    />
                    <Select 
                        onChange={(e) => {
                            setFormData({ ...formData, category: e.target.value });
                        }} 
                        value={formData.category}
                        className="dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm"
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
                <div className="flex gap-6 items-center justify-between border-4 border-teal-500 border-dotted p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md">
                    <FileInput 
                        type="file" 
                        accept="image/*" 
                        className="dark:bg-gray-800" 
                        onChange={(e) => { setFile(e.target.files[0]); }} 
                    />
                    <Button 
                        type="button" 
                        className="bg-gradient-to-r from-purple-700 to-blue-700 text-white hover:from-purple-800 hover:to-blue-800 shadow-lg transition-transform transform hover:scale-105" 
                        outline 
                        size='sm' 
                        onClick={handleUploadImage}
                        disabled={Boolean(imageUploadProgress)}
                    >
                        {
                            imageUploadProgress ? (
                                <div className="w-16 h-16">
                                    <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress}%`} />
                                </div>
                            ) : (
                                'Upload Image'
                            )
                        }
                    </Button>
                </div>
                {imageUploadError && (
                    <Alert color='failure'>{imageUploadError}</Alert>
                )}
                {formData.image && (
                    <img src={formData.image} alt='upload' className="w-full h-72 object-cover" />
                )}
                <ReactQuill 
                    theme="snow" 
                    value={formData.content}
                    placeholder="Write something..." 
                    className='h-80 mb-6 dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm'
                    required
                    onChange={(value) => {
                        setFormData({ ...formData, content: value });
                    }}
                />
                <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-purple-700 to-blue-700 text-white hover:from-purple-800 hover:to-blue-800 shadow-lg transition-transform transform hover:scale-105"
                >
                    Update
                </Button>
                {
                    publishError && <Alert className="mt-5" color='failure'>{publishError}</Alert>
                }
            </form>
        </div>
    );
}
