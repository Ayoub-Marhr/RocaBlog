import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
    return (
        <div className="p-6 max-w-4xl mx-auto min-h-screen bg-gray-100 dark:bg-gray-900">
            <h1 className="text-center text-4xl my-8 font-extrabold text-gray-900 dark:text-gray-100">Create Post</h1>
            <form className="flex flex-col gap-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
                <div className="flex flex-col gap-6 sm:flex-row justify-between">
                    <TextInput 
                        type="text" 
                        placeholder="Title" 
                        required 
                        id="title" 
                        className="flex-1 dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <Select className="dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm">
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
                    <FileInput type="file" accept="image/*" className="dark:bg-gray-800" />
                    <Button type="button" className="bg-gradient-to-r from-purple-700 to-blue-700 text-white hover:from-purple-800 hover:to-blue-800 shadow-lg transition-transform transform hover:scale-105" outline size='sm'>
                        Upload Image
                    </Button>
                </div>
                <ReactQuill 
                    theme="snow" 
                    placeholder="Write something..." 
                    className='h-80 mb-6 dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm'
                />
                <Button type="submit" className="bg-gradient-to-r from-purple-700 to-blue-700 text-white hover:from-purple-800 hover:to-blue-800 shadow-lg transition-transform transform hover:scale-105">
                    Publish
                </Button>
            </form>
        </div>
    );
}
