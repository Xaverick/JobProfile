import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import Loader from '../../components/Loader/Loader';

const UserProfile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/user/getProfile');
        setUserProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);
  
  if (!userProfile) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center h-screen p-3">
        <Loader loading={loading} message={'Loading profile'} />
        <h1 className="text-3xl font-bold mb-4">User Profile</h1>
        <div className="p-6 bg-gray-100 rounded-lg text-center">
          <p className="text-lg">No profile is made.</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => {
              navigate('/createProfile');
            }}
          >
            Create Profile
          </button>
        </div>
      </div>
    );
  }

  const {
    fullName,
    phoneNumber,
    experience,
    specialization,
    education,
    resume,
    linkedIn,
    organization,
    contactMethod,
  } = userProfile;

  return (
    <div className="container mx-auto">
      <Loader loading={loading} message={'Loading profile'} />
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <div className="p-6 bg-gray-100 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold">Full Name:</h2>
            <p>{fullName}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Phone:</h2>
            <p>{phoneNumber}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Experience:</h2>
            <p>{experience}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Specialization:</h2>
            <p>{specialization}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Education:</h2>
            <p>{education}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Organization:</h2>
            <p>{organization}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Contact Method:</h2>
            <p>{contactMethod}</p>
          </div>
          {linkedIn && (
            <div>
              <h2 className="text-lg font-semibold">LinkedIn:</h2>
              <a
                href={linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View LinkedIn
              </a>
            </div>
          )}
          {resume && (
            <div className="col-span-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                <a
                  href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  View Resume
                </a>
              </button>
            </div>
          )}
          <div className="col-span-2">
            {/* Add Link component for navigation */}
            <Link to={`/editProfile/${userProfile.userId}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
