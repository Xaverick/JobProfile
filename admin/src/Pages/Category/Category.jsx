// import { useState } from 'react';

// function Category() {
//     const [categories, setCategories] = useState([]);
//     const [categoryInput, setCategoryInput] = useState('');
//     const [descriptionInput, setDescriptionInput] = useState('');

//     const handleCategoryChange = (event) => {
//         setCategoryInput(event.target.value);
//     };

//     const handleDescriptionChange = (event) => {
//         setDescriptionInput(event.target.value);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         if (categoryInput.trim() !== '') {
//             setCategories([...categories, { name: categoryInput.trim(), description: descriptionInput }]);
//             setCategoryInput('');
//             setDescriptionInput('');
//         }
//     };

//     const handleDelete = (index) => {
//         const newCategories = [...categories];
//         newCategories.splice(index, 1);
//         setCategories(newCategories);
//     };

//     return (
//         <div className="container mx-auto p-8">
//             <h1 className="text-3xl font-bold mb-8">Admin Portal - Job Categories</h1>
            
//             {/* Form to add/update category */}
//             <div className="mb-8">
//                 <h2 className="text-xl font-semibold mb-4">Add/Update Category</h2>
//                 <form onSubmit={handleSubmit} className="mb-4 w-full">
//                     <div className="flex flex-col w-full">
//                         <input 
//                             type="text" 
//                             placeholder="Enter category name" 
//                             value={categoryInput} 
//                             onChange={handleCategoryChange} 
//                             className="p-2 border border-gray-300 rounded-md mb-4 w-full"
//                         />
//                         <textarea 
//                             placeholder="Enter category description" 
//                             value={descriptionInput} 
//                             onChange={handleDescriptionChange} 
//                             className="p-2 border border-gray-300 rounded-md mb-4 w-full"
//                             rows="4"
//                         />
//                         <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-md w-full">Add Category</button>
//                     </div>
//                 </form>
//             </div>

//             {/* Display all categories */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {categories.map((category, index) => (
//                     <div key={index} className="p-4 border border-gray-300 rounded-md">
//                         <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
//                         <p className="mb-4">{category.description}</p>
//                         <div className="flex justify-between">
//                             <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Edit</button>
//                             <button onClick={() => handleDelete(index)} className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Category;


import React, { useState } from 'react';

function Category() {
    const [categories, setCategories] = useState([]);
    const [categoryInput, setCategoryInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editCategoryInput, setEditCategoryInput] = useState('');
    const [editDescriptionInput, setEditDescriptionInput] = useState('');

    const handleCategoryChange = (event) => {
        setCategoryInput(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescriptionInput(event.target.value);
    };

    const handleEditCategoryChange = (event) => {
        setEditCategoryInput(event.target.value);
    };

    const handleEditDescriptionChange = (event) => {
        setEditDescriptionInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (categoryInput.trim() !== '') {
            setCategories([...categories, { name: categoryInput.trim(), description: descriptionInput }]);
            setCategoryInput('');
            setDescriptionInput('');
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditCategoryInput(categories[index].name);
        setEditDescriptionInput(categories[index].description);
    };

    const handleCancelEdit = () => {
        setEditIndex(null);
    };

    const handleUpdate = () => {
        if (editCategoryInput.trim() !== '') {
            const updatedCategories = [...categories];
            updatedCategories[editIndex] = { name: editCategoryInput.trim(), description: editDescriptionInput };
            setCategories(updatedCategories);
            setEditIndex(null);
        }
    };

    const handleDelete = (index) => {
        const newCategories = [...categories];
        newCategories.splice(index, 1);
        setCategories(newCategories);
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Admin Portal - Job Categories</h1>
            
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Add/Update Category</h2>
                 <form onSubmit={handleSubmit} className="mb-4 w-full">
                  <div className="flex flex-col w-full">
                        <input 
                            type="text" 
                            placeholder="Enter category name" 
                            value={categoryInput} 
                            onChange={handleCategoryChange} 
                            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
                        />
                        <textarea 
                            placeholder="Enter category description" 
                            value={descriptionInput} 
                            onChange={handleDescriptionChange} 
                            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
                            rows="4"
                        />
                        <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-md w-full">Add Category</button>
                    </div>
                </form>
            </div>

            {/* Display all categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                    <div key={index} className="p-4 border border-gray-300 rounded-md">
                        <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                        <p className="mb-4">{category.description}</p>
                        <div className="flex justify-between">
                            <button onClick={() => handleEdit(index)} className="px-4 py-2 bg-green-500 text-white rounded-md">Edit</button>
                            <button onClick={() => handleDelete(index)} className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Category Popup */}
            {editIndex !== null && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-8 rounded-md">
                        <h2 className="text-2xl font-semibold mb-4">Edit Category</h2>
                        <input 
                            type="text" 
                            placeholder="Enter category name" 
                            value={editCategoryInput} 
                            onChange={handleEditCategoryChange} 
                            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
                        />
                        <textarea 
                            placeholder="Enter category description" 
                            value={editDescriptionInput} 
                            onChange={handleEditDescriptionChange} 
                            className="p-2 border border-gray-300 rounded-md mb-4 w-full"
                            rows="4"
                        />
                        <div className="flex justify-end">
                            <button onClick={handleCancelEdit} className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md">Cancel</button>
                            <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded-md">Update</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Category;

