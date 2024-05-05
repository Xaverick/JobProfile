import React, { useState } from 'react';

function Upload() {
    const [categories, setCategories] = useState([
        { id: 1, title: "Category 1", description: "Description for Category 1" },
        { id: 2, title: "Category 2", description: "Description for Category 2" },
        { id: 3, title: "Category 3", description: "Description for Category 3" }
    ]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [resumeInputs, setResumeInputs] = useState([]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleResumeUpload = (event) => {
        const files = Array.from(event.target.files);
        setResumeInputs(files);
    };

    return (
        <div className="flex h-screen">
            {/* Left Panel - Category List */}
            <div className="w-1/4 bg-gray-200 p-4">
                <h2 className="text-2xl font-semibold mb-4">Categories</h2>
                <ul className="space-y-2">
                    {categories.map(category => (
                        <li key={category.id} className="cursor-pointer hover:bg-gray-300 p-2 rounded-md" onClick={() => handleCategorySelect(category)}>
                            {category.title}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Panel - Category Details and File Upload */}
            <div className="w-3/4 bg-gray-100 p-8">
                {selectedCategory ? (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">{selectedCategory.title}</h2>
                        <p className="mb-4">{selectedCategory.description}</p>
                        
                        {/* File Upload Section */}
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">Upload Resumes</h3>
                            <input type="file" onChange={handleResumeUpload} multiple className="py-2 px-4 bg-white border border-gray-300 rounded-md" />
                        </div>

                        {/* Submit Button */}
                        <button className="px-6 py-3 bg-blue-500 text-white rounded-md">Upload</button>
                    </div>
                ) : (
                    <p className="text-xl">Select a category to view details and upload resumes.</p>
                )}
            </div>
        </div>
    );
}

export default Upload;
