import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  let { _id, company, jobTitle, startTime } = job;
  startTime = new Date(startTime);
  
  return (
    <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {company}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {jobTitle}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Start Date: {startTime.toLocaleDateString()}
      </Typography>
      {/* Add any other job details here */}
      {/* Optionally, add a button for more details or to apply */}
      <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
        <Link to={`/job/${job._id}`}>View Details</Link>
      </Button>
    </Paper>
  );
};

export default JobCard;
