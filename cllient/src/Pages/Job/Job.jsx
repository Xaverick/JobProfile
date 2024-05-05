// import {useState, useEffect} from 'react'
// import { useParams } from 'react-router-dom'
// const Job = () => {
//   const {id} = useParams()
//   const [getJobData, setGetJobData] = useState(null)

//   useEffect(() => {

//     const fetchData = async () => {
//       const response = await fetch(`http://localhost:4000/user/job/${id}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         credentials: 'include'
//       })

//       if (response.ok) {
//         const data = await response.json()
//         console.log(data)
//         setGetJobData(data)
//       } else {
//         console.log('Failed to fetch job data')
//       }
//     }

//     fetchData();

//   }, [])

//   return (
//     <div>Job</div>
//   )
// }

// export default Job


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Job = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/user/job/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setJobData(data);
        } else {
          console.log('Failed to fetch job data');
        }
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJobData();
  }, [id]);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center mb-6">{jobData ? jobData.jobTitle : 'Loading...'}</h1>
        {jobData && (
          <div>
            <p className="text-lg"><strong>Company:</strong> {jobData.company}</p>
            <div className="flex flex-wrap">
              <p className="mr-2 mb-2 px-3 py-1 rounded-full bg-blue-200 text-lg">{jobData.skills.join(', ')}</p>
            </div>
            <p className="text-lg"><strong>Experience:</strong> {jobData.experience} year(s)</p>
            <p className="text-lg"><strong>Requirements:</strong> {jobData.requirements}</p>
            <p className="text-lg"><strong>Workplace:</strong> {jobData.workplace}</p>
            <p className="text-lg"><strong>Salary:</strong> {jobData.salary}</p>
            <p className="text-lg"><strong>Expectations:</strong> {jobData.expectations}</p>
            <p className="text-lg"><strong>Posted On:</strong> {new Date(jobData.postedOn).toLocaleDateString()}</p>
            <p className="text-lg"><strong>Start Time:</strong> {new Date(jobData.startTime).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Job;

