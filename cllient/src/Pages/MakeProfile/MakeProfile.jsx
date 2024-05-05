import React, { useState } from 'react';
import { Container, TextField, Button, Grid } from '@mui/material';
import "./MakeProfile.scss"
import { useNavigate } from 'react-router-dom';


const JobProfileForm = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    skills: [''], // Initialize with one empty skill
    education: [{ degree: '', institution: '', fieldOfStudy: '' }],
    experience: [{ title: '', company: '', startDate: '', endDate: '', description: '' }],
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'skills') {
      setProfileData({
        ...profileData,
        [name]: value.split(',').map((skill) => skill.trim()),
      });
    }
    else{
      setProfileData({
        ...profileData,
        [name]: value,
      });
    }
  };

  const handleResumeChange = (e) => {
    setProfileData({
      ...profileData,
      file: e.target.files[0],
    });
  }


  const handleEducationChange = (index) => (e) => {
    const { name, value } = e.target;
    const updatedEducation = profileData.education.map((edu, i) =>
      i === index ? { ...edu, [name]: value } : edu
    );
    setProfileData({
      ...profileData,
      education: updatedEducation,
    });
  };

  const handleExperienceChange = (index) => (e) => {
    const { name, value } = e.target;
    const updatedExperience = profileData.experience.map((exp, i) =>
      i === index ? { ...exp, [name]: value } : exp
    );
    setProfileData({
      ...profileData,
      experience: updatedExperience,
    });
  };

  const handleAddSkill = () => {
    setProfileData({ ...profileData, skills: [...profileData.skills, ''] });
  };

  const handleRemoveSkill = (index) => () => {
    const updatedSkills = [...profileData.skills];
    updatedSkills.splice(index, 1);
    setProfileData({ ...profileData, skills: updatedSkills });
  };



  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(profileData);
    const formData = new FormData();
    formData.append('file', profileData.file);
    formData.append('firstName', profileData.firstName);
    formData.append('lastName', profileData.lastName);
    formData.append('phoneNumber', profileData.phoneNumber);
    formData.append('address', profileData.address);
    formData.append('skills', JSON.stringify(profileData.skills));
    formData.append('education', JSON.stringify(profileData.education));
    formData.append('experience', JSON.stringify(profileData.experience));

    const response = await fetch('http://localhost:4000/admin/addresume', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })

    if (response.ok) {
        alert('Profile created successfully');
        navigate('/searchJob');
      
    }
    else{
      alert('Profile creation failed');
    }

  };

  const handleAddEducation = () => {
    setProfileData({
      ...profileData,
      education: [...profileData.education, { degree: '', institution: '', fieldOfStudy: '' }],
    });
  };
  
  const handleAddExperience = () => {
    setProfileData({
      ...profileData,
      experience: [...profileData.experience, { title: '', company: '', startDate: '', endDate: '', description: '' }],
    });
  };

  const handleRemoveExperience = (index) => () => {
    const updatedExperience = [...profileData.experience];
    updatedExperience.splice(index, 1);
    setProfileData({ ...profileData, experience: updatedExperience });
  }

  const handleRemoveEducation = (index) => () => {
    const updatedEducation = [...profileData.education];
    updatedEducation.splice(index, 1);
    setProfileData({ ...profileData, education: updatedEducation });
  }
  

  return (
    <div className="profileForm" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="md" style={{ backgroundColor: 'white', padding: '50px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', marginTop: '50px', marginBottom: '50px' }}>
        <h1 className='profileFormHeading'>Job Profile Form</h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={profileData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={profileData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={profileData.phoneNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={profileData.address}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>         
                <h2 className='mb-3'>Skills</h2>
              {profileData.skills.map((skill, index) => (
                <React.Fragment key={index}>
                  <TextField
                    fullWidth
                    label={`Skill ${index + 1}`}
                    value={skill}
                    onChange={(e) => setProfileData({ ...profileData, skills: profileData.skills.map((s, i) => i === index ? e.target.value : s) })}
                    required
                  />
                  <Button onClick={handleRemoveSkill(index)} style={{ marginTop: '20px', marginRight: '10px' }}>Remove</Button>
                </React.Fragment>
              ))}
              <Button variant="outlined" onClick={handleAddSkill} style={{ marginTop: '20px' }} >
                Add Skill
              </Button>
            </Grid>
            <Grid item xs={12}>
              <h2>Education</h2>
              </Grid>
            <Grid item xs={12} >
              {profileData.education.map((edu, index) => (
                <React.Fragment key={index}>
                  <TextField
                    label={`Degree ${index + 1}`}
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index)({ target: { name: 'degree', value: e.target.value } })}
                    required
                  />
                  <TextField
                    label={`Institution ${index + 1}`}
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index)({ target: { name: 'institution', value: e.target.value } })}
                    required
                  />
                  <TextField
                    label={`Field of Study ${index + 1}`}
                    value={edu.fieldOfStudy}
                    onChange={(e) => handleEducationChange(index)({ target: { name: 'fieldOfStudy', value: e.target.value } })}
                    required
                  />

                  <Button onClick={handleRemoveEducation(index)} style={{ marginTop: '20px', marginRight: '10px' }}>Remove</Button>
                </React.Fragment>

              ))}
              <Button variant="outlined" onClick={handleAddEducation}>
                Add Education
              </Button>
            </Grid>
            <Grid item xs={12} >
              <h2 className='mb-3'>Experience</h2>
              {profileData.experience.map((exp, index) => (
                <React.Fragment key={index}>
                  <TextField
                    fullWidth
                    label={`Title ${index + 1}`}
                    name={`experience-${index}-title`}
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(index)({ target: { name: `title`, value: e.target.value } })}
                    required
                  
                  />
                  
                  <TextField
                    fullWidth
                    label={`Company ${index + 1}`}
                    name={`experience-${index}-company`}
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index)({ target: { name: `company`, value: e.target.value } })}
                    required
                  />
                  <TextField
                        fullWidth
                        label={`Start Date ${index + 1}`}
                        type="date"
                        name={`experience-${index}-startDate`}
                        value={exp.startDate}
                        onChange={(e) => handleExperienceChange(index)({ target: { name: `startDate`, value: e.target.value } })}
                        required
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        label={`End Date ${index + 1}`}
                        type="date"
                        name={`experience-${index}-endDate`}
                        value={exp.endDate}
                        onChange={(e) => handleExperienceChange(index)({ target: { name: `endDate`, value: e.target.value } })}
                        required
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                  <TextField
                    fullWidth
                    label={`Description ${index + 1}`}
                    name={`experience-${index}-description`}
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index)({ target: { name: `description`, value: e.target.value } })}
                    required
                  />
                  <Button onClick={handleRemoveExperience(index)} style={{ marginTop: '20px', marginRight: '10px' }}>Remove</Button>
                </React.Fragment>
              ))}
              <Button variant="outlined" onClick={handleAddExperience}>
                Add Experience
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="file"
                label="Upload Resume"
                name="file"
                onChange={handleResumeChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default JobProfileForm;

