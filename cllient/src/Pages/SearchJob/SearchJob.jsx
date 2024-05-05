import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Grid, CircularProgress, Divider } from '@mui/material';
import JobCard from './JobCard'; 

const recommendedJobsData = [
  { companyName: 'Company A', jobTitle: 'Software Engineer', tenure: '2 years' },
  { companyName: 'Company B', jobTitle: 'Data Analyst', tenure: '1 year' },
  { companyName: 'Company C', jobTitle: 'Project Manager', tenure: '3 years' },
];

const newJobsData = [
  { companyName: 'Company X', jobTitle: 'Frontend Developer', tenure: '1.5 years' },
  { companyName: 'Company Y', jobTitle: 'Marketing Manager', tenure: '2 years' },
  { companyName: 'Company Z', jobTitle: 'Quality Assurance Engineer', tenure: '1 year' },
];

const SearchJobPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendedJobs, setRecommendedJobs] = useState(recommendedJobsData);
  const [newJobs, setNewJobs] = useState(newJobsData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchJobData = async () => {

        const response1 = await fetch('http://localhost:4000/user/recommendedJobs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })

        if (response1.ok) {
          const data = await response1.json();
          setRecommendedJobs(data);
        }

        else{
          console.log('Failed to fetch job data');
        }

        const response2 = await fetch('http://localhost:4000/user/newJobs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })

        if (response2.ok) {
          const data = await response2.json();
          setNewJobs(data);
        }

        else{
          console.log('Failed to fetch job data');
        }

        setLoading(false); // Set loading to false after fetching data

    };

    fetchJobData();
  }, []); 


  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRecommendedJobs = recommendedJobs.filter(
    (job) => job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNewJobs = newJobs.filter(
    (job) => job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" style={{ marginTop: '50px', marginBottom: '50px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography variant="h4" gutterBottom>
            Search Jobs
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Search by Job Name"
            style={{ marginBottom: '20px' }}
            value={searchQuery}
            onChange={handleSearch}
          />

          {loading && <CircularProgress style={{ marginBottom: '20px' }} />}

          {!loading && (
            <>
              <Typography variant="h5" gutterBottom>
                Recommended Jobs
              </Typography>
              <Grid container spacing={2}>
                {filteredRecommendedJobs.map((job, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <JobCard job={job} />
                  </Grid>
                ))}
              </Grid>
              <Divider style={{ margin: '30px 0' }} />
            </>
          )}

          {!loading && (
            <>
              <Typography variant="h5" gutterBottom>
                New Jobs
              </Typography>
              <Grid container spacing={2}>
                {filteredNewJobs.map((job, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <JobCard job={job} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchJobPage;
