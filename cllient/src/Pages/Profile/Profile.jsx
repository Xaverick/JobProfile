// import React, { useState, useEffect } from 'react';
// import { Container, Typography, Button, Grid, Paper } from '@mui/material';
// import { Link,useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation

// const UserProfile = () => {
//   // Dummy user profile data
//   const dummyUserProfile = {
//     fullName: 'John Doe',
//     email: 'john@example.com',
//     phone: '123-456-7890',
//     experience: 'Senior Software Engineer at ABC Inc.',
//     skills: 'React, Node.js, JavaScript',
//     education: 'Bachelor of Science in Computer Science',
//     additionalInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae metus id massa mattis tincidunt.',
//   };

//   // State for user profile
//   const [userProfile, setUserProfile] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {

//     const fetchedUserProfile = async () => {
//       const response = await fetch('http://localhost:4000/user/getProfile', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//       });


//       if(response.ok){
//         const data = await response.json();
//         console.log(data);
//         setUserProfile(data);
//       }

//       else{
//         console.log('Failed to fetch user profile');
//         navigate('/makeProfile');
//       }

//     };

//     fetchedUserProfile();

//   }, []); // Empty dependency array to run once on component mount



//   if (!userProfile) {
//     return (
//       <Container maxWidth="md" style={{ marginTop: '50px', marginBottom: '50px' }}>
//         <Typography variant="h4" gutterBottom>
//           User Profile
//         </Typography>
//         <Paper elevation={3} style={{ padding: '20px' }}>
//           <Typography variant="body1">No profile is made.</Typography>
//           <Button component={Link} to="/makeProfile" variant="contained" color="primary" style={{ marginTop: '20px' }}>
//             Create Profile
//           </Button>
//         </Paper>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="md" style={{ marginTop: '50px', marginBottom: '50px' }}>
//       <Typography variant="h4" gutterBottom>
//         User Profile
//       </Typography>
//       <Paper elevation={3} style={{ padding: '20px' }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h6">Full Name:</Typography>
//             <Typography>{userProfile.fullName}</Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h6">Email:</Typography>
//             <Typography>{userProfile.email}</Typography>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h6">Phone:</Typography>
//             <Typography>{userProfile.phone}</Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="h6">Experience:</Typography>
//             <Typography>{userProfile.experience}</Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="h6">Skills:</Typography>
//             <Typography>{userProfile.skills}</Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="h6">Education:</Typography>
//             <Typography>{userProfile.education}</Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography variant="h6">Additional Information:</Typography>
//             <Typography>{userProfile.additionalInfo}</Typography>
//           </Grid>
//         </Grid>
//         <Grid item xs={12} style={{ marginTop: '20px' }}>
//             <Button component={Link} to="/edit-profile" variant="outlined" color="primary">
//               Edit Profile
//             </Button>
//           </Grid>
//       </Paper>
//     </Container>
//   );
// };

// export default UserProfile;


import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:4000/user/getProfile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          let data = await response.json();
          setUserProfile(data.profile);
          setUser(data.user);
        } else {
          console.log('Failed to fetch user profile');
          navigate('/makeProfile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array to run once on component mount

  if (!userProfile) {
    return (
      <Container maxWidth="md" style={{ marginTop: '50px', marginBottom: '50px' }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="body1">No profile is made.</Typography>
          <Button component={Link} to="/makeProfile" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Create Profile
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '50px', marginBottom: '50px' }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Full Name:</Typography>
            <Typography>{userProfile.firstName} {userProfile.lastName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Email:</Typography>
            <Typography>{user.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Phone:</Typography>
            <Typography>{userProfile.phoneNumber}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Address:</Typography>
            <Typography>{userProfile.address}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Skills:</Typography>
            <Typography>{userProfile.skills.join(', ')}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Education:</Typography>
            {userProfile.education.map((edu, index) => (
              <Typography key={index}>{edu.degree} - {edu.institution}, {edu.fieldOfStudy}</Typography>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Experience:</Typography>
            {userProfile.experience.map((exp, index) => (
              <Typography key={index}>{exp.title} at {exp.company}, {new Date(exp.startDate).toLocaleDateString()} to {new Date(exp.endDate).toLocaleDateString()}</Typography>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" color="primary" href={userProfile.resume} target="_blank">
              View Resume
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginTop: '20px' }}>
          {/* <Button component={Link} to="/edit-profile" variant="outlined" color="primary">
            Edit Profile
          </Button> */}
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserProfile;
