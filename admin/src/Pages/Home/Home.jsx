// import React, { useState } from 'react';

// function Home() {
//     const [candidates, setCandidates] = useState([
//         { id: 1, name: "John Doe", category: "Category 1", skills: ["Skill A", "Skill B"], experience: "3 years", education: "Bachelor's Degree" },
//         { id: 2, name: "Jane Smith", category: "Category 2", skills: ["Skill C", "Skill D"], experience: "5 years", education: "Master's Degree" },
//         { id: 3, name: "Alice Johnson", category: "Category 1", skills: ["Skill A", "Skill E"], experience: "2 years", education: "Associate's Degree" }
//     ]);

//     const [filters, setFilters] = useState({
//         category: "",
//         skills: "",
//         experience: "",
//         education: ""
//     });

//     const [isLoading, setIsLoading] = useState(false);

//     const [filteredCandidates, setFilteredCandidates] = useState([])

//     const handleCategoryChange = (event) => {
//         setFilters({ ...filters, category: event.target.value });
//     };

//     const handleSkillsChange = (event) => {
//         setFilters({ ...filters, skills: event.target.value });
//     };

//     const handleExperienceChange = (event) => {
//         setFilters({ ...filters, experience: event.target.value });
//     };

//     const handleEducationChange = (event) => {
//         setFilters({ ...filters, education: event.target.value });
//     };

//     const filterCandidates = () => {
//         let filtered = candidates.filter(candidate => {
//             return candidate.experience >= filters.experience &&
//                    candidate.education.toLowerCase() === filters.education.toLowerCase();
//         });

//         if (filters.category) {
//             filtered = filtered.filter(candidate => candidate.category === filters.category);
//         }

//         if (filters.skills) {
//             const selectedSkills = filters.skills.split(',').map(skill => skill.trim());
//             filtered = filtered.filter(candidate => selectedSkills.every(skill => candidate.skills.includes(skill)));
//         }

//         return filtered;
//     };

//     const handleSearch = () => {
//         setIsLoading(true);
//         setTimeout(() => {
//             setIsLoading(false);
//             const filtering = filterCandidates();
//             // Do something with filteredCandidates, e.g., display them
//             setFilteredCandidates(filtering)
//         }, 1000); // Simulating a loading delay of 1 second
//     };

//     return (
//         <div className="container mx-auto p-8">
//             <h1 className="text-3xl font-bold mb-8">Candidate Search</h1>

//             {/* Filters */}
//             <div className="mb-8">
//                 <h2 className="text-xl font-semibold mb-4">Filters</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {/* Category */}
//                     <div>
//                         <label htmlFor="category" className="block mb-2">Category:</label>
//                         <select id="category" className="p-2 border border-gray-300 rounded-md w-full" value={filters.category} onChange={handleCategoryChange}>
//                             <option value="">Select Category</option>
//                             <option value="Category 1">Category 1</option>
//                             <option value="Category 2">Category 2</option>
//                             <option value="Category 3">Category 3</option>
//                         </select>
//                     </div>

//                     {/* Skills */}
//                     <div>
//                         <label htmlFor="skills" className="block mb-2">Skills:</label>
//                         <input type="text" id="skills" placeholder="Enter skills (comma-separated)" className="p-2 border border-gray-300 rounded-md w-full" value={filters.skills} onChange={handleSkillsChange} />
//                     </div>

//                     {/* Experience */}
//                     <div>
//                         <label htmlFor="experience" className="block mb-2">Experience:</label>
//                         <input type="text" id="experience" placeholder="Enter experience" className="p-2 border border-gray-300 rounded-md w-full" value={filters.experience} onChange={handleExperienceChange} />
//                     </div>

//                     {/* Education */}
//                     <div>
//                         <label htmlFor="education" className="block mb-2">Education:</label>
//                         <input type="text" id="education" placeholder="Enter education" className="p-2 border border-gray-300 rounded-md w-full" value={filters.education} onChange={handleEducationChange} />
//                     </div>
//                 </div>
//             </div>

//             {/* Search Button */}
//             <div className="mb-4">
//                 <button className="px-6 py-3 bg-blue-500 text-white rounded-md" onClick={handleSearch}>Search Candidates</button>
//             </div>

//             {/* Results */}
//             <div>
//                 <h2 className="text-xl font-semibold mb-4">Results</h2>
//                 {isLoading ? (
//                     <p>Loading...</p>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {filteredCandidates.map(candidate => (
//                             <div key={candidate.id} className="p-4 border border-gray-300 rounded-md">
//                                 <h2 className="text-xl font-semibold mb-2">{candidate.name}</h2>
//                                 <p className="mb-2"><strong>Category:</strong> {candidate.category}</p>
//                                 <p className="mb-2"><strong>Skills:</strong> {candidate.skills.join(', ')}</p>
//                                 <p className="mb-2"><strong>Experience:</strong> {candidate.experience}</p>
//                                 <p className="mb-2"><strong>Education:</strong> {candidate.education}</p>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Home;



// src/components/AdminHomePage.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const AdminHomePage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch user data from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/admin/getProfiles');
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
            
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <Link to={`/planstatus/${user._id}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    View Status
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHomePage;
