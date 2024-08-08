import { Alert, Button, TextInput,Modal } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure,deleteUserStart,deleteUserSuccess,deleteUserFailure,signoutSuccess } from '../redux/user/userSlice';
import {  XCircle } from 'react-feather';
import { Link } from 'react-router-dom';

export default function DashProfile() {
  const { currentUser,error,loading } = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageUploadedProgress, setImageUploadedProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateSuccess] = useState(null);
  const [updateUserFail, setUpdateFail] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const storage = getStorage(app);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = () => {
    setImageFileUploading(true);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadedProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError('Could not upload image (file must be less than 2MB)');
        setImageUploadedProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateFail('No change made');
      return;
    }
    if (imageFileUploading) {
      setUpdateFail('Please wait for image to upload');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateFail(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateFail(error.message);
    }
  };
  const handleDeleteUser = async()=>{
    setShowModal(false)
    try{
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,
       { method : 'DELETE'},
      )
      const data = await res.json()
      if(!res.ok){
        dispatch(deleteUserFailure(data.message))
      }else{
        dispatch(deleteUserSuccess(data))
      }
    }catch(error){
      dispatch(deleteUserFailure(error.message))
    }
  }

   const handleSignout =async ()=>{
    try{
      const res= await fetch('api/user/signout',{
        method : 'POST'
      })
      const data = await res.json()
      if(!res.ok){
        console.log(data.message)
      }else{
        dispatch(signoutSuccess())
      }
    }
    catch(error){
    console.log(error.message)
    }
  }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className="text-black dark:text-white my-7 text-center font-semibold text-4xl">Profile</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="file"
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          style={{ display: 'none' }}
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageUploadedProgress && (
            <CircularProgressbar
              value={imageUploadedProgress || 0}
              text={`${imageUploadedProgress}%`}
              strokeWidth={5}
              styles={{ root: { width: "100%", height: "100%", position: 'absolute', top: 0, left: 0 }, path: { stroke: `rgba(62,152,199,${imageUploadedProgress / 100})` } }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full border-8 object-cover border-[lightgray] ${imageUploadedProgress && imageUploadedProgress < 100 && 'opacity-60'}`}
          />
        </div>
        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange} />
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange} />
        <TextInput type='password' id='password' placeholder='password' defaultValue={currentUser.password} onChange={handleChange} />
        <TextInput type='text' id='department' placeholder='department' defaultValue={currentUser.department} onChange={handleChange} />
        <TextInput type='text' id='job' placeholder='job' defaultValue={currentUser.job} onChange={handleChange} />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline disabled={loading||imageFileUploading}>{loading ? 'loading...': 'Update' }</Button>
        {
         currentUser.isAdmin && (
          <Link to={'/create-post'}>
            <Button 
              type='button' 
              className='w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white 
                        font-semibold  rounded-lg shadow-lg 
                        border-2 border-blue-800 hover:shadow-xl 
                        transition-transform transform hover:scale-105'
                        >Create a post
              </Button>
          </Link>)}
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer' onClick={handleSignout}>Sign out</span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserFail && !updateUserSuccess && (
        <Alert color='failure' className='mt-5'>
          {updateUserFail}
        </Alert>
      )}
      {error && !updateUserSuccess && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}
     <Modal show={showModal} onClose={() => setShowModal(false)} size="md" className="transition-all duration-300 ease-in-out transform">
  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full transform transition-all duration-300 ease-in-out">
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <h3 className="text-xl font-bold text-gray-900">Account Deletion</h3>
      <button
        onClick={() => setShowModal(false)}
        className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
      >
        <XCircle size={24} />
      </button>
    </div>
    <div className="p-8">
      <div className="text-center">
        <XCircle size={48} className="mx-auto text-red-500 mb-6" />
        <h3 className="mb-5 text-lg text-gray-500">
          Are you sure you want to delete your account? This action cannot be undone.
        </h3>
      </div>
    </div>
    <div className="flex justify-center gap-4 p-6">
      <Button
        color="failure"
        onClick={handleDeleteUser}
      >
        Yes, I'm sure
      </Button>
      <Button
        onClick={() => setShowModal(false)}
        color="gray"
      >
        Cancel
      </Button>
    </div>
  </div>
</Modal>
    </div>
  );
}
